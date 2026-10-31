from functools import wraps
from flask import jsonify
from flask_jwt_extended import get_jwt_identity, jwt_required
from api.models import db, User, Role, Status, Cliente


def current_user():
    return db.session.get(User, get_jwt_identity())


def roles_required(*roles):
    """Exige JWT válido, usuario activo y uno de los roles indicados."""
    def decorator(fn):
        @wraps(fn)
        @jwt_required()
        def wrapper(*args, **kwargs):
            user = current_user()
            if user is None or user.status != Status.active:
                return jsonify({"msg": "Usuario no autorizado"}), 401
            if user.role not in roles:
                return jsonify({"msg": "No tienes permisos para esta acción"}), 403
            return fn(*args, **kwargs)
        return wrapper
    return decorator


def is_admin(user):
    return user.role == Role.admin


def can_access_user(me, target_user_id):
    """Un usuario accede a sí mismo; el gerente a sus asesores; el admin a todos."""
    if is_admin(me) or me.id == target_user_id:
        return True
    target = db.session.get(User, target_user_id)
    return target is not None and me.role == Role.manager and target.manager_id == me.id


def can_access_client(me, client):
    return client is not None and can_access_user(me, client.user_id)


def not_found(msg="No encontrado"):
    return jsonify({"msg": msg}), 404


def forbidden():
    return jsonify({"msg": "No tienes permisos para esta acción"}), 403


any_user = roles_required(*Role)
