import os
import sys
import tempfile

import pytest

# Debe configurarse antes de importar la app
_db_file = os.path.join(tempfile.mkdtemp(), "test.db")
os.environ["DATABASE_URL"] = f"sqlite:///{_db_file}"
os.environ["FLASK_APP_KEY"] = "t" * 48
os.environ["FLASK_ENV"] = "development"
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app import app as flask_app  # noqa: E402
from api.models import db, User, Role  # noqa: E402
from api.routes import set_password  # noqa: E402


@pytest.fixture()
def app():
    with flask_app.app_context():
        db.drop_all()
        db.create_all()
        yield flask_app
        db.session.remove()


@pytest.fixture()
def client(app):
    return app.test_client()


def make_user(email, role=Role.associated, manager_id=None, password="clave123"):
    salt = "salt-" + email
    return User.create(name="N", lastname="L", email=email, salt=salt,
                       password=set_password(password, salt), role=role,
                       manager_id=manager_id)


def auth(client, email, password="clave123"):
    res = client.post("/api/token", json={"email": email, "password": password})
    assert res.status_code == 200, res.get_json()
    return {"Authorization": f"Bearer {res.get_json()['access_token']}"}
