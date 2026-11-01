# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Qué es

API REST en Flask de LinkedTeam: CRM + plataforma e-learning para equipos de venta de seguros (gerentes y asesores). El frontend React vive en otro repo (`../LinKedteam-frontend`, https://github.com/frako23/linkedteam-frontend). Parte de la plantilla `react-flask-hello` de 4Geeks Academy; el código de plantilla (sitemap de "Rigo" en `api/utils.py`, `api/admin.py`, `api/commands.py`, `docs/`) sigue casi intacto.

## Comandos

Usar **Pipenv** (`Pipfile` + `Pipfile.lock`, Python 3.10). `requirements.txt` es una exportación vieja (Flask 1.1.2) que no coincide con el lock (Flask 3.1, Flask-SQLAlchemy 3.0, SQLAlchemy 1.4); no tomarla como referencia de versiones.

```bash
pipenv install            # instalar dependencias
pipenv run start          # flask run en 0.0.0.0:3001 (usa FLASK_APP=app.py del .env)
pipenv run migrate        # flask db migrate → nueva migración en migrations/versions/
pipenv run upgrade        # flask db upgrade
docker-compose up         # Postgres 13 + API en :5000 (DATABASE_URL apunta al servicio `db`)
python test_db.py         # solo prueba la conexión a DATABASE_URL
```

- Tests: `python -m pytest tests -q` (un solo test: `-k nombre`). Usan SQLite temporal y un `FLASK_APP_KEY` propio (`tests/conftest.py`), no necesitan Postgres. `pytest` no está en el `Pipfile` a propósito: tocarlo invalida el hash del `Pipfile.lock` y `pipenv install --deploy` del Dockerfile falla; instalarlo aparte. Ojo: SQLite no acepta fechas como texto, Postgres sí.
- No hay linter ni CI. `pycodestyle.cfg` ignora E501 y E302.
- Sin `DATABASE_URL`, la app usa SQLite en `/tmp/test.db`.
- `pipenv run reset_db` (`docs/assets/reset_migrations.bash`) borra `migrations/` y recrea la BD `example` con el usuario `gitpod`: es del entorno Gitpod de la plantilla y no sirve para el setup local/Docker.
- `flask insert-test-users` (`api/commands.py`) está roto: `User()` exige kwargs.

## Arquitectura

- `app.py`: crea la app, configura JWT (secreto = `FLASK_APP_KEY`, expiración 12 h), CORS abierto y registra el blueprint `api` bajo `/api`. `setup_admin` (Flask-Admin) está comentado. `static_file_dir` apunta a `../public/`, que no existe (resto de cuando la app vivía en `src/`); la carpeta `public/` del repo es un build viejo del frontend y no se sirve.
- `api/models.py`: todos los modelos. Cada uno repite el mismo patrón: `__init__(**kwargs)` que copia campo por campo (un campo nuevo también hay que agregarlo ahí), `@classmethod create(**kwargs)` que hace `add` + `commit` y relanza `Exception(msg, 400)`, y `serialize()` para el JSON de respuesta.
- `api/auth.py`: autorización. `roles_required(...)` (con alias `any_user` y `admin_only` en `routes.py`) exige JWT válido, usuario `active` y rol; `can_access_user` / `can_access_client` implementan la regla "uno mismo, su gerente o admin". Todo endpoint nuevo que reciba un id debe usarlos; no basta con `@jwt_required()`.
- `app.py` se niega a arrancar sin `FLASK_APP_KEY`, y con una débil (ejemplo o < 32 caracteres) si `FLASK_ENV` no es `development`.
- `api/routes.py`: todos los endpoints en un único blueprint. Patrón de errores: validar con `raise Exception("mensaje", 400)` dentro de un `try` y responder `jsonify(error.args[0]), error.args[1]`. `APIException` (`api/utils.py`) tiene handler registrado pero casi no se usa. Los mensajes al usuario están en español. Desde la sección `APIS DESECHADAS` (~línea 690) hay endpoints comentados de agencias, compañías, comentarios y respuestas; sus modelos también están comentados en `models.py`, aunque el frontend todavía los llama.

### Dominio

- `User.role` (Enum `Role`): `admin` / `manager` (gerente) / `associated` (asesor). La relación gerente → asesor no es FK: `User.manager_id` es un entero suelto y `User.manager` guarda el nombre. `Courses.manager_id` funciona igual.
- `Cliente`: prospecto o cliente de un usuario (`user_id`). `Cliente.status` es texto libre que debe coincidir con las columnas del Kanban del frontend: `Prospecto`, `Contactado`, `Primera Cita`, `Negociación`, `Cerrado`.
- Sincronización sin conexión: `Cliente` y `Client_Activity` tienen `offline_id` (UUID generado en el teléfono, único junto con `user_id`): un `POST` repetido con el mismo `offline_id` devuelve el registro existente con `200` en vez de crear otro. `Cliente.status_changed_at` (nulo hasta el primer cambio de etapa) y el campo `changed_at` de `PUT /cliente/<id>` resuelven conflictos: si el cambio es anterior al último cambio de etapa aceptado, responde `409` con el mensaje y el cliente vigente; `changed_at` ausente, inválido o futuro se toma como la hora del servidor. `ESTADOS_CLIENTE` (`api/models.py`) es la lista válida de `Cliente.status` (las 5 etapas más `Cliente`) y se valida en `POST /clientes`, `PUT /cliente/<id>` y `PUT /modify_cliente/<id>`. Contratos en `specs/001-pwa-offline-sync/contracts/api.md`.
- `Client_Activity` (llamada/mensaje/cita con un cliente), `Tarea` (to-do), `Courses` (videos de YouTube que un gerente asigna a su equipo), `Products` (pólizas por aseguradora, por usuario) y `Client_Products` (póliza vendida a un cliente: monto, fecha de cierre, recurrencia de pago). `Payment` y `Account_Information` son del antiguo modelo de suscripción; el frontend ahora muestra una página de suscripción con datos de pago.
- Los nombres de tabla se autogeneran desde la clase: `Client_Activity` → `client__activity`, `Account_Information` → `account__information` (doble guion bajo).
- Varias fechas y montos son `String` (`Cliente.birthdate`, `Cliente.amount`, `Client_Activity.date`, `Client_Products.amount` y `date_of_closing`); el frontend los convierte.
- Contraseñas: `generate_password_hash(password + salt)` con un salt aleatorio por usuario guardado en `User.salt` (`set_password` / `check_password` en `routes.py`).
- La identidad del JWT es `str(user.id)` (PyJWT ≥ 2.10 exige `sub` string); `current_user()` la convierte a `int` al leer.

## Problemas conocidos (pendientes)

Actualizar esta sección a medida que se corrijan.

- Sin HTTPS: el servidor de producción se expone por HTTP plano (infraestructura, no código). Falta rotar el `FLASK_APP_KEY` real de producción.
- El primer admin ya no se puede crear por la API: hay que promover un usuario directamente en la BD (`UPDATE "user" SET role = 'admin' WHERE email = ...`).
- `Cliente.tag` y `Courses.tag` se inicializan en `None` y `serialize()` hace `self.tag.value`; crear sin `tag` puede fallar. Además `Courses.__init__` mira `'sales_goal'` en vez de `'tag'`.
- Los `PUT` que asignan `gerente` desde el body no validan el contenido (la etapa de `Cliente.status` sí se valida; también los de rol y estatus de usuario).
- Eliminar un `Cliente` que tiene interacciones (`Client_Activity`) falla por la llave foránea (no hay `cascade`).
- CORS está abierto a cualquier origen y el Dockerfile corre `flask run` (servidor de desarrollo), no gunicorn.
- `check_date` está desactivado; `Payment`/`Account_Information` son del modelo de suscripción abandonado y `/approvepayments` no existe.
