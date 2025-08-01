# LinkedTeam

## Descripción

LinkedTeam es una aplicación CRM innovadora diseñada para gestionar y hacer seguimiento de clientes, integrando una plataforma de e-learning para la capacitación continua de la fuerza de ventas. Además, incluye una lista de tareas para asegurar que ningún compromiso o actividad importante sea olvidada.

## Características

- **CRM**: Gestión y seguimiento detallado de clientes.
- **E-learning**: Plataforma integrada para la formación y el desarrollo de habilidades de ventas.
- **Todo List**: Organizador de tareas para maximizar la productividad del equipo.

## Tecnologías

- **Backend**: Python con el framework Flask.
- **Base de Datos**: PostgreSQL.
- **ORM**: SQLAlchemy.
- **Autenticación**: JWT (JSON Web Tokens).

## Instalación 

# Primera opción

1. Clona el repositorio:
   ```bash
   git clone https://github.com/tu-usuario/linkedteam.git
   ```
2. Instala las dependencias:
   ```bash
   pip install -r requirements.txt
   ```
3. Configura tus variables de entorno en `.env`.

4. Ejecuta la aplicación:
   ```bash
   pipenv run start
   ```

# Segunda opción (Docker)

1. Clona el repositorio:
   ```bash
   git clone https://github.com/tu-usuario/linkedteam.git
   ```
2. Configura el archivo .env (usa .env.example como referencia).
3. Construye y levanta los contenedores:
```bash
docker-compose up
```

4. Accede a la aplicación en http://localhost:5000 (o el puerto configurado).


## Uso

Para iniciar sesión en la aplicación, envía una solicitud POST a `/api/user` con tus credenciales para recibir un JWT. Utiliza este token para autenticarte en las siguientes solicitudes.

## Contribuir

Si deseas contribuir al proyecto, por favor envía un pull request o abre un issue para discutir los cambios que propones.

## Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo `LICENSE` para más detalles.

## Contacto

Si tienes alguna pregunta o comentario, no dudes en contactarme a través de [frakodev.code@gmail.com](mailto:frakodev.code@gmail.com).
