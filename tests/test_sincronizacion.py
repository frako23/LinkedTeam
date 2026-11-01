"""Sincronización sin conexión: idempotencia por offline_id, validaciones y conflictos de etapa."""
from datetime import datetime, timedelta, timezone

from api.models import Client_Activity, Cliente, Role, db

from tests.conftest import auth, make_user


def crear_cliente(user, **kw):
    datos = dict(name="Ana Pérez", trust="Alta", status="Prospecto", user_id=user.id)
    datos.update(kw)
    return Cliente.create(**datos)


def iso(dt):
    return dt.astimezone(timezone.utc).isoformat()


# ---------------------------------------------------------------- interacciones

def actividad(**kw):
    datos = {"date": "2026-11-01", "contact_type": "cita", "comment": "Hola"}
    datos.update(kw)
    return datos


def test_interaccion_con_el_mismo_offline_id_no_se_duplica(client, app):
    asesor = make_user("a@x.com")
    negocio = crear_cliente(asesor)
    h = auth(client, "a@x.com")
    cuerpo = actividad(offline_id="uuid-1")

    primera = client.post(f"/api/client_activity/{negocio.id}", json=cuerpo, headers=h)
    segunda = client.post(f"/api/client_activity/{negocio.id}", json=cuerpo, headers=h)

    assert primera.status_code == 201
    assert segunda.status_code == 200
    assert primera.get_json()["id"] == segunda.get_json()["id"]
    assert primera.get_json()["offline_id"] == "uuid-1"
    assert Client_Activity.query.count() == 1


def test_interaccion_sobre_negocio_ajeno_es_403(client, app):
    due = make_user("due@x.com")
    make_user("otro@x.com")
    negocio = crear_cliente(due)
    h = auth(client, "otro@x.com")

    res = client.post(
        f"/api/client_activity/{negocio.id}", json=actividad(offline_id="u"), headers=h
    )

    assert res.status_code == 403
    assert Client_Activity.query.count() == 0


def test_interaccion_inexistente_es_404(client, app):
    make_user("a@x.com")
    h = auth(client, "a@x.com")
    res = client.post("/api/client_activity/9999", json=actividad(), headers=h)
    assert res.status_code == 404


def test_interaccion_valida_los_datos(client, app):
    asesor = make_user("a@x.com")
    negocio = crear_cliente(asesor)
    h = auth(client, "a@x.com")
    url = f"/api/client_activity/{negocio.id}"

    res = client.post(url, json=actividad(contact_type="fax"), headers=h)
    assert res.status_code == 400
    assert res.get_json() == "Elige el tipo de contacto."

    res = client.post(url, json=actividad(comment=""), headers=h)
    assert res.status_code == 400
    assert res.get_json() == "Escribe un comentario."

    res = client.post(url, json=actividad(date=""), headers=h)
    assert res.status_code == 400
    assert res.get_json() == "Elige la fecha."
    assert Client_Activity.query.count() == 0


def test_interaccion_sin_offline_id_sigue_funcionando(client, app):
    asesor = make_user("a@x.com")
    negocio = crear_cliente(asesor)
    h = auth(client, "a@x.com")
    res = client.post(f"/api/client_activity/{negocio.id}", json=actividad(), headers=h)
    assert res.status_code == 201
    assert res.get_json()["offline_id"] is None


# ---------------------------------------------------------------- negocios

def negocio_json(**kw):
    datos = {"name": "Luis Gómez", "status": "Prospecto", "trust": "Alta", "tag": "white"}
    datos.update(kw)
    return datos


def test_negocio_con_el_mismo_offline_id_no_se_duplica(client, app):
    make_user("a@x.com")
    h = auth(client, "a@x.com")
    cuerpo = negocio_json(offline_id="n-1")

    primera = client.post("/api/clientes", json=dict(cuerpo), headers=h)
    segunda = client.post("/api/clientes", json=dict(cuerpo), headers=h)

    assert primera.status_code == 201
    assert segunda.status_code == 200
    assert primera.get_json()["id"] == segunda.get_json()["id"]
    assert Cliente.query.count() == 1


def test_dos_usuarios_pueden_usar_el_mismo_offline_id(client, app):
    make_user("a@x.com")
    make_user("b@x.com")
    ha = auth(client, "a@x.com")
    hb = auth(client, "b@x.com")

    ra = client.post("/api/clientes", json=negocio_json(offline_id="n-1"), headers=ha)
    rb = client.post("/api/clientes", json=negocio_json(offline_id="n-1"), headers=hb)

    assert ra.status_code == 201 and rb.status_code == 201
    assert ra.get_json()["id"] != rb.get_json()["id"]
    assert Cliente.query.count() == 2


def test_negocio_valida_la_etapa_y_el_nombre(client, app):
    make_user("a@x.com")
    h = auth(client, "a@x.com")

    res = client.post("/api/clientes", json=negocio_json(status="Ganado"), headers=h)
    assert res.status_code == 400
    assert res.get_json() == "Elige la etapa."

    res = client.post("/api/clientes", json=negocio_json(name=""), headers=h)
    assert res.status_code == 400
    assert res.get_json() == "Escribe el nombre del negocio."

    res = client.post("/api/clientes", json=negocio_json(trust=""), headers=h)
    assert res.status_code == 400
    assert res.get_json() == "Elige el nivel de confianza."
    assert Cliente.query.count() == 0


def test_negocio_acepta_la_etapa_cliente(client, app):
    make_user("a@x.com")
    h = auth(client, "a@x.com")
    res = client.post("/api/clientes", json=negocio_json(status="Cliente"), headers=h)
    assert res.status_code == 201


# ---------------------------------------------------------------- cambio de etapa

def test_etapa_con_changed_at_anterior_responde_409(client, app):
    asesor = make_user("a@x.com")
    negocio = crear_cliente(asesor)
    h = auth(client, "a@x.com")
    ahora = datetime.now(timezone.utc)

    ok = client.put(
        f"/api/cliente/{negocio.id}",
        json={"status": "Negociación", "changed_at": iso(ahora - timedelta(minutes=1))},
        headers=h,
    )
    assert ok.status_code == 200

    viejo = client.put(
        f"/api/cliente/{negocio.id}",
        json={"status": "Contactado", "changed_at": iso(ahora - timedelta(hours=1))},
        headers=h,
    )
    assert viejo.status_code == 409
    cuerpo = viejo.get_json()
    assert cuerpo["msg"] == "Ana Pérez quedó en Negociación porque se movió ahí después de tu cambio."
    assert cuerpo["cliente"]["status"] == "Negociación"
    assert db.session.get(Cliente, negocio.id).status == "Negociación"


def test_etapa_con_changed_at_posterior_se_aplica(client, app):
    asesor = make_user("a@x.com")
    negocio = crear_cliente(asesor)
    h = auth(client, "a@x.com")
    futuro_cercano = datetime.now(timezone.utc) - timedelta(seconds=1)

    res = client.put(
        f"/api/cliente/{negocio.id}",
        json={"status": "Primera Cita", "changed_at": iso(futuro_cercano)},
        headers=h,
    )

    assert res.status_code == 200
    assert res.get_json()["status"] == "Primera Cita"


def test_etapa_con_changed_at_en_el_futuro_se_recorta(client, app):
    asesor = make_user("a@x.com")
    negocio = crear_cliente(asesor)
    h = auth(client, "a@x.com")
    antes = datetime.now(timezone.utc)

    res = client.put(
        f"/api/cliente/{negocio.id}",
        json={"status": "Cerrado", "changed_at": iso(antes + timedelta(days=30))},
        headers=h,
    )

    assert res.status_code == 200
    guardado = db.session.get(Cliente, negocio.id).status_changed_at
    if guardado.tzinfo is None:
        guardado = guardado.replace(tzinfo=timezone.utc)
    assert guardado <= datetime.now(timezone.utc) + timedelta(seconds=1)


def test_etapa_repetida_da_el_mismo_resultado(client, app):
    asesor = make_user("a@x.com")
    negocio = crear_cliente(asesor)
    h = auth(client, "a@x.com")
    cuerpo = {
        "status": "Negociación",
        "changed_at": iso(datetime.now(timezone.utc) - timedelta(minutes=5)),
    }

    a = client.put(f"/api/cliente/{negocio.id}", json=cuerpo, headers=h)
    b = client.put(f"/api/cliente/{negocio.id}", json=cuerpo, headers=h)

    assert a.status_code == 200 and b.status_code == 200
    assert b.get_json()["status"] == "Negociación"


def test_etapa_de_negocio_ajeno_es_403(client, app):
    due = make_user("due@x.com")
    make_user("otro@x.com")
    negocio = crear_cliente(due)
    h = auth(client, "otro@x.com")

    res = client.put(f"/api/cliente/{negocio.id}", json={"status": "Cerrado"}, headers=h)

    assert res.status_code == 403
    assert db.session.get(Cliente, negocio.id).status == "Prospecto"


def test_etapa_invalida_es_400(client, app):
    asesor = make_user("a@x.com")
    negocio = crear_cliente(asesor)
    h = auth(client, "a@x.com")

    res = client.put(f"/api/cliente/{negocio.id}", json={"status": "Ganado"}, headers=h)

    assert res.status_code == 400
    assert res.get_json() == "Elige la etapa."


def test_admin_puede_mover_cualquier_negocio(client, app):
    asesor = make_user("a@x.com")
    make_user("admin@x.com", role=Role.admin)
    negocio = crear_cliente(asesor)
    h = auth(client, "admin@x.com")

    res = client.put(f"/api/cliente/{negocio.id}", json={"status": "Cerrado"}, headers=h)

    assert res.status_code == 200


def test_modify_cliente_que_cambia_la_etapa_cuenta_en_el_conflicto(client, app):
    asesor = make_user("a@x.com")
    negocio = crear_cliente(asesor)
    h = auth(client, "a@x.com")
    movimiento_viejo = iso(datetime.now(timezone.utc) - timedelta(hours=1))

    editado = client.put(
        f"/api/modify_cliente/{negocio.id}", json={"status": "Negociación"}, headers=h
    )
    assert editado.status_code == 200

    res = client.put(
        f"/api/cliente/{negocio.id}",
        json={"status": "Contactado", "changed_at": movimiento_viejo},
        headers=h,
    )
    assert res.status_code == 409
    assert db.session.get(Cliente, negocio.id).status == "Negociación"


def test_modify_cliente_valida_la_etapa(client, app):
    asesor = make_user("a@x.com")
    negocio = crear_cliente(asesor)
    h = auth(client, "a@x.com")

    res = client.put(
        f"/api/modify_cliente/{negocio.id}", json={"status": "Ganado"}, headers=h
    )

    assert res.status_code == 400
    assert res.get_json() == "Elige la etapa."
