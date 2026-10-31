"""
Crea (o promueve) el usuario administrador de LinkedTeam.

Uso dentro del contenedor:
    docker-compose exec web python create_admin.py
    docker-compose exec web python create_admin.py otro@correo.com

La contraseña se pide por teclado (no se muestra ni queda en el historial).
Si el correo ya existe, se convierte en admin, se activa y se le pone la nueva
contraseña.
"""
import getpass
import secrets
import sys

from dotenv import load_dotenv

load_dotenv()  # python puro no lee el .env como lo hace el CLI de flask

from app import app  # noqa: E402
from api.models import db, User, Role, Status  # noqa: E402
from api.routes import set_password  # noqa: E402

DEFAULT_EMAIL = "frakodev.code@gmail.com"
MIN_LEN = 8


def pedir_password():
    while True:
        pw = getpass.getpass("Contraseña del admin: ")
        if len(pw) < MIN_LEN:
            print(f"Debe tener al menos {MIN_LEN} caracteres.")
            continue
        if pw != getpass.getpass("Repite la contraseña: "):
            print("No coinciden, inténtalo de nuevo.")
            continue
        return pw


def main():
    email = (sys.argv[1] if len(sys.argv) > 1 else DEFAULT_EMAIL).strip().lower()

    with app.app_context():
        user = User.query.filter_by(email=email).first()

        if user is None:
            name = input("Nombre: ").strip() or "Admin"
            lastname = input("Apellido: ").strip() or "LinkedTeam"
        else:
            print(f"El usuario {email} ya existe: se convertirá en admin y se cambiará su contraseña.")

        password = pedir_password()
        salt = secrets.token_hex(16)

        if user is None:
            user = User(
                name=name,
                lastname=lastname,
                email=email,
                password=set_password(password, salt),
                salt=salt,
                role=Role.admin,
            )
            db.session.add(user)
        else:
            user.password = set_password(password, salt)
            user.salt = salt
            user.role = Role.admin

        user.status = Status.active
        db.session.commit()
        print(f"Listo: {email} es admin (id {user.id}).")


if __name__ == "__main__":
    main()