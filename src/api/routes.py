"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Cliente, Role, Comment, Response, Tarea, Client_Activity
from api.utils import generate_sitemap, APIException
from werkzeug.security import generate_password_hash, check_password_hash
from base64 import b64encode
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
import os


api = Blueprint('api', __name__)

def set_password(password, salt):
    return generate_password_hash(f"{password}{salt}")

def check_password(hash_password, password, salt):
    return check_password_hash(hash_password, f"{password}{salt}")

# endpoint para registrar usuarios
@api.route("/token", methods=["POST"])
def login():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    if email is None or password is None:
        return jsonify({"msg": "Mal Email o Password"}), 401
    else:
        user = User.query.filter_by(email=email).first()
        if user is None:
            return jsonify({"msg":"credenciales invalidas"}), 401 
        else:
            if check_password(user.password, password, user.salt):
                access_token = create_access_token(identity=user.id)
                return jsonify(access_token=access_token)
            else:
                return jsonify({"msg":"credenciales invalidas"}), 401 
                

# endpoints de usuarios
@api.route('/users', methods=['GET'])
def get_users():
    if request.method == 'GET':
        users = User.query.all()
        users_dictionaries = []
        for user in users:
            users_dictionaries.append(user.serialize())
        return jsonify(users_dictionaries), 200
   
@api.route('/user', methods=['POST'])
def add_user():
    new_user_data = request.json
    try:
        if "name" not in new_user_data or new_user_data["name"] == "":
            raise Exception("No ingresaste tu nombre", 400)
        if "lastname" not in new_user_data or new_user_data["lastname"] == "":
            raise Exception("No ingresaste tu apellido", 400)
        if "email" not in new_user_data or new_user_data["email"] == "":
            raise Exception("No ingresaste el email", 400)
        if "password" not in new_user_data or new_user_data["password"] == "":
            raise Exception("No ingresaste el password", 400)
        if "role" not in new_user_data or new_user_data["role"] == "":
            raise Exception("No ingresaste el role",400)
        if new_user_data["role"] not in Role.__members__:
            return {"error": f"No existe en los roles disponibles"},400
        
        salt = b64encode(os.urandom(32)).decode('utf-8')
        new_user_data["password"] = set_password(new_user_data["password"], salt)
        new_user = User.create(**new_user_data, salt=salt)
       
        return jsonify(new_user.serialize()), 201
    except Exception as error:
        return jsonify(error.args[0]), error.args[1] if len(error.args) > 1 else 500

# endpoints de clientes
@api.route('/clientes', methods=['GET','POST'])
@jwt_required()
def post_get_clientes():
    user_id = get_jwt_identity()
    if request.method == 'GET':
        clientes = Cliente.query.filter_by(user_id = user_id)
        clientes_dictionaries = []
        for cliente in clientes:
            clientes_dictionaries.append(cliente.serialize())
        return jsonify(clientes_dictionaries), 200
    new_cliente_data = request.json
    try:
        if "nombre" not in new_cliente_data or new_cliente_data["nombre"] == "":
            raise Exception("No ingresaste el nombre", 400)
        if "fecha" in new_cliente_data["fecha"] == "":
            raise Exception("No ingresaste la fecha", 400)
        if "email" not in new_cliente_data or new_cliente_data["email"] == "":
            raise Exception("No ingresaste el email", 400)
        if "celular" not in new_cliente_data or new_cliente_data["celular"] == "":
            raise Exception("No ingresaste el celular", 400)
        if "monto" not in new_cliente_data or new_cliente_data["monto"] == "":
            raise Exception("No ingresaste el monto", 400)
        if "estatus" not in new_cliente_data or new_cliente_data["estatus"] == "":
            raise Exception("No ingresaste el estatus", 400)
        if "confianza" not in new_cliente_data or new_cliente_data["confianza"] == "":
            raise Exception("No ingresaste el nivel de confianza", 400)
        if "notas" not in new_cliente_data or new_cliente_data["notas"] == "":
            raise Exception("No ingresaste notas", 400)
        new_cliente = Cliente.create(**new_cliente_data, user_id = user_id)
        return jsonify(new_cliente.serialize()), 201
    except Exception as error:
        return jsonify(error.args[0]), error.args[1] if len(error.args) > 1 else 500

@api.route('/cliente/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_cliente(id):
    cliente = Cliente.query.get(id)

    if not cliente:
        return jsonify({"msg": "No existe el cliente"}),404
    
    db.session.delete(cliente)
    try:
        db.session.commit()
        return jsonify({"msg": "Se elimino el cliente"}),200 
    except Exception as error:
        return jsonify({"message": f"Error: {error.args[0]}"}), error.args[1] if len(error.args) > 1 else 500   

@api.route('/cliente/<int:id>', methods=['PUT'])
def update_cliente(id):

    try:
        cliente = Cliente.query.get(id)
        
        cliente.estatus = request.json['estatus']

        db.session.commit()
        return jsonify(cliente.serialize()),200 

    except Exception as error:
        return jsonify({"message": f"Error: {error.args[0]}"}), error.args[1] if len(error.args) > 1 else 500   



#endpoints comentarios
@api.route('/comments/<int:video_id>', methods=['GET'])
def get_comments(video_id):
    comments = Comment.query.filter_by(video_id=video_id)
    
    return jsonify(
            [comment.serialize() for comment in comments]
        ),200

@api.route('/comments/<int:video_id>', methods=['POST'])
@jwt_required()
def add_comment(video_id):
    user_id = get_jwt_identity()
    body = request.json
    content = body.get("content", None)
    
    if content is None:
            return jsonify({"msg":"No se ingreso comentario"})
    try:
        comentario = Comment.create(content = content, video_id = video_id, user_id=user_id)
        return comentario
    except Exception as error:
        return jsonify({"message": f"Error: {error.args[0]}"}), error.args[1] if len(error.args) > 1 else 500
    
@api.route('/comment/<int:id>', methods=['DELETE'])
def delete_comment(id):
    comment = Comment.query.get(id)

    if not comment:
        return jsonify({"msg": "No existe el comentario"}),404
    
    db.session.delete(comment)
    try:
        db.session.commit()
        return jsonify({"msg": "Se elimino el comentario"}),200 
    except Exception as error:
        return jsonify({"message": f"Error: {error.args[0]}"}), error.args[1] if len(error.args) > 1 else 500   

#enpoints responses
@api.route('/responses/<int:comment_id>', methods=['GET'])
def get_responses(comment_id):
    responses = Response.query.filter_by(comment_id=comment_id)
    
    return jsonify(
            [response.serialize() for response in responses]
        ),200

@api.route('/response/<int:comment_id>', methods=['POST'])
@jwt_required()
def add_response(comment_id):
    user_id = get_jwt_identity()
    body = request.json
    content = body.get("content", None)
    
    if content is None:
        return jsonify({"msg":"No se ingreso comentario"})
    comment = Comment.query.get(comment_id)
    if not comment:
        return jsonify({"msg":"No existe el comentario"})
    try:
        response = Response.create(content = content, comment_id = comment_id, user_id=user_id)
        return response
    except Exception as error:
        return jsonify({"message": f"Error: {error.args[0]}"}), error.args[1] if len(error.args) > 1 else 500
    

@api.route('/response/<int:id>', methods=['DELETE'])
def delete_response(id):
    response = Response.query.get(id)

    if not response:
        return jsonify({"msg": "No existe la respuesta"}),404
    
    db.session.delete(response)
    try:
        db.session.commit()
        return jsonify({"msg": "Se elimino la respuesta"}),200 
    except Exception as error:
        return jsonify({"message": f"Error: {error.args[0]}"}), error.args[1] if len(error.args) > 1 else 500   

# endpoint para TAREAS
@api.route('/tareas', methods=['GET','POST'])
@jwt_required()
def post_get_tareas():
    user_id = get_jwt_identity()
    if request.method == 'GET':
        tareas = Tarea.query.filter_by(user_id = user_id)
        tareas_dictionaries = []
        for tarea in tareas:
            tareas_dictionaries.append(tarea.serialize())
        return jsonify(tareas_dictionaries), 200
    new_tarea_data = request.json
    try:
        if "tarea" not in new_tarea_data or new_tarea_data["tarea"] == "":
            raise Exception("No ingresaste la tarea", 400)
        if "estatus" not in new_tarea_data or new_tarea_data["estatus"] == "":
            raise Exception("No ingresaste el estatus", 400)
        new_tarea = Tarea.create(**new_tarea_data, user_id = user_id)
        return jsonify(new_tarea.serialize()), 201
    except Exception as error:
        return jsonify(error.args[0]), error.args[1] if len(error.args) > 1 else 500

# rutas de actividades de clientes

@api.route('/client_activity/<int:user_id>/<int:client_id>', methods=['GET'])
def get_client_activity(user_id, client_id):
    client_activities = Client_Activity.query.filter_by(user_id = user_id, client_id = client_id)
    print(client_activities)
    return jsonify(
            [client_activity.serialize() for client_activity in client_activities]
        ),200

@api.route('/client_activity/<int:client_id>', methods=['POST'])
@jwt_required()
def add_client_activity(client_id):
    user_id = get_jwt_identity()
    new_client_activity_data = request.json
    try:
        if "fecha" not in new_client_activity_data or new_client_activity_data["fecha"] == "":
            raise Exception("No ingresaste la fecha", 400)
        if "tipo_de_contacto" not in new_client_activity_data or new_client_activity_data["tipo_de_contacto"] == "":
            raise Exception("No ingresaste el tipo de contacto", 400)
        if "comentario" not in new_client_activity_data or new_client_activity_data["comentario"] == "":
            raise Exception("No ingresaste el tipo de contacto", 400)

        new_client_activity = Client_Activity.create(**new_client_activity_data, client_id = client_id)
        return jsonify(new_client_activity.serialize()), 201
    except Exception as error:
        return jsonify(error.args[0]), error.args[1] if len(error.args) > 1 else 500