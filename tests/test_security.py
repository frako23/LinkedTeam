import os
import subprocess
import sys

from api.models import db, Role, Status, Cliente
from tests.conftest import make_user, auth

CLIENT = {"name": "Cliente", "status": "Prospecto", "trust": "50", "tag": "white"}


def test_registro_publico_ignora_el_rol(client):
    res = client.post("/api/user", json={
        "name": "A", "lastname": "B", "email": "a@x.com", "password": "clave123",
        "role": "admin", "manager_id": 99, "sales_goal": 1})
    assert res.status_code == 201
    body = res.get_json()
    assert body["role"] == "associated"
    assert body["manager_id"] is None


def test_cambiar_rol_exige_token(client):
    victima = make_user("v@x.com")
    res = client.put(f"/api/user_role/{victima.id}", json={"role": "admin"})
    assert res.status_code == 401


def test_asesor_no_puede_cambiar_roles_pero_admin_si(client):
    asesor = make_user("a@x.com")
    make_user("adm@x.com", role=Role.admin)
    res = client.put(f"/api/user_role/{asesor.id}", json={"role": "admin"},
                     headers=auth(client, "a@x.com"))
    assert res.status_code == 403
    for ruta in ("user_role", "user_role_admin"):
        res = client.put(f"/api/{ruta}/{asesor.id}", json={"role": "manager"},
                         headers=auth(client, "adm@x.com"))
        assert res.status_code == 200, res.get_json()
        assert res.get_json()["role"] == "manager"
    res = client.put(f"/api/user_role/{asesor.id}", json={"role": "root"},
                     headers=auth(client, "adm@x.com"))
    assert res.status_code == 400


def test_listar_usuarios_solo_admin(client):
    make_user("a@x.com")
    make_user("adm@x.com", role=Role.admin)
    assert client.get("/api/users", headers=auth(client, "a@x.com")).status_code == 403
    assert client.get("/api/users", headers=auth(client, "adm@x.com")).status_code == 200


def test_no_se_puede_tocar_datos_de_otro_usuario(client):
    a = make_user("a@x.com")
    make_user("b@x.com")
    ha, hb = auth(client, "a@x.com"), auth(client, "b@x.com")
    res = client.post("/api/clientes", json=CLIENT, headers=ha)
    assert res.status_code == 201, res.get_json()
    cid = res.get_json()["id"]

    assert client.get(f"/api/user_clients/{a.id}", headers=hb).status_code == 403
    assert client.get(f"/api/get_all_client_products/{cid}", headers=hb).status_code == 403
    assert client.put(f"/api/modify_cliente/{cid}", json={"name": "x"}, headers=hb).status_code == 403
    assert client.put(f"/api/cliente/{cid}", json={"status": "Cerrado"}, headers=hb).status_code == 403
    assert client.delete(f"/api/cliente/{cid}", headers=hb).status_code == 403
    assert client.post(f"/api/client_activity/{cid}", headers=hb,
                       json={"date": "2026-01-01", "contact_type": "llamada", "comment": "x"}).status_code == 403
    assert client.put(f"/api/reset_pass/{a.id}", json={"password": "hack"}, headers=hb).status_code == 403
    assert client.get(f"/api/get_payments/{a.id}", headers=hb).status_code == 403
    assert db.session.get(Cliente, cid) is not None
    # el dueño sí
    assert client.get(f"/api/user_clients/{a.id}", headers=ha).status_code == 200
    assert client.put(f"/api/modify_cliente/{cid}", json={"name": "ok"}, headers=ha).status_code == 200


def test_gerente_ve_solo_a_sus_asesores(client):
    g = make_user("g@x.com", role=Role.manager)
    otro_g = make_user("g2@x.com", role=Role.manager)
    suyo = make_user("s@x.com", manager_id=g.id)
    ajeno = make_user("z@x.com", manager_id=otro_g.id)
    hg = auth(client, "g@x.com")
    assert client.get(f"/api/user_clients/{suyo.id}", headers=hg).status_code == 200
    assert client.get(f"/api/user_clients/{ajeno.id}", headers=hg).status_code == 403
    assert client.get(f"/api/users_by_manager/{g.id}", headers=hg).status_code == 200
    assert client.get(f"/api/users_by_manager/{otro_g.id}", headers=hg).status_code == 403
    assert client.get(f"/api/manager_client_activity/{ajeno.id}/", headers=hg).status_code == 403


def test_cursos_solo_gerente_dueno(client):
    g = make_user("g@x.com", role=Role.manager)
    make_user("s@x.com", manager_id=g.id)
    make_user("z@x.com")
    curso = {"title": "t", "description": "d", "img_url": "u", "link_url": "l"}
    hs, hz, hg = auth(client, "s@x.com"), auth(client, "z@x.com"), auth(client, "g@x.com")
    assert client.post(f"/api/courses/{g.id}", json=curso, headers=hs).status_code == 403
    res = client.post(f"/api/courses/{g.id}", json=curso, headers=hg)
    assert res.status_code == 201, res.get_json()
    cid = res.get_json()["id"]
    assert client.get(f"/api/courses/{g.id}", headers=hs).status_code == 200
    assert client.get(f"/api/courses/{g.id}", headers=hz).status_code == 403
    assert client.delete(f"/api/courses/{cid}", headers=hs).status_code == 403
    assert client.delete(f"/api/courses/{cid}", headers=hg).status_code == 200


def test_usuario_inactivo_no_inicia_sesion(client):
    u = make_user("i@x.com")
    u.status = Status.inactive
    db.session.commit()
    res = client.post("/api/token", json={"email": "i@x.com", "password": "clave123"})
    assert res.status_code == 401


def test_token_de_usuario_desactivado_deja_de_servir(client):
    u = make_user("i@x.com")
    h = auth(client, "i@x.com")
    u.status = Status.inactive
    db.session.commit()
    assert client.get("/api/clientes", headers=h).status_code == 401


def test_pago_no_se_autoaprueba(client, monkeypatch):
    usuario = make_user("a@x.com")
    h = auth(client, "a@x.com")
    recibido = {}

    class Falso:
        def serialize(self):
            return {}

    def create(**kwargs):
        recibido.update(kwargs)
        return Falso()

    # SQLite no acepta fechas como texto (Postgres sí), así que se intercepta el modelo
    monkeypatch.setattr("api.routes.Payment.create", create)
    res = client.post("/api/payments", headers=h, json={
        "payment_date": "2026-01-01", "notes": "n", "reference": "r",
        "amount": 10, "payment_method": "Zelle", "status": "approved", "user_id": 999})
    assert res.status_code == 201
    assert "status" not in recibido
    assert recibido["user_id"] == usuario.id


def test_arranque_rechaza_secreto_debil_fuera_de_desarrollo():
    raiz = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    casos = (("any key works", "production", True),
             ("", "production", True),
             ("x" * 48, "production", False))
    for key, env, debe_fallar in casos:
        r = subprocess.run([sys.executable, "-c", "import app"], capture_output=True,
                           text=True, cwd=raiz,
                           env={**os.environ, "FLASK_APP_KEY": key, "FLASK_ENV": env,
                                "DATABASE_URL": "sqlite://"})
        assert (r.returncode != 0) == debe_fallar, (key, r.stderr[-300:])
