"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Cliente, Role, Comment, Response, Tarea, Client_Activity, Courses, Agencies, Company, Payment
from api.utils import generate_sitemap, APIException
from werkzeug.security import generate_password_hash, check_password_hash
from base64 import b64encode
from flask_jwt_extended import create_access_token, get_jwt_identity,jwt_required
from datetime import date


api = Blueprint('api', __name__)

def set_password(password, salt):
    return generate_password_hash(f"{password}{salt}")

def check_password(hash_password, password, salt):
    return check_password_hash(hash_password, f"{password}{salt}")

def check_date(user_date):
    today = date.today()
    # if today - user_date > 90:
    #     return False
    return True
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
        if user.status == "inactive":
            return jsonify({"msg":"Usuario inactivo"}), 401
        if not check_date(user.updated_at):
            return jsonify({"msg":"debes renovar tu suscripción"}), 401 
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

@api.route('/users_by_agency/<agency_ybt>', methods=['GET'])
def get_users_by_agency(agency_ybt):
    users = User.query.filter_by( agency_ybt = agency_ybt)
    print(users)
    users_dictionaries = []
    for user in users:
        users_dictionaries.append(user.serialize())
    return jsonify(users_dictionaries), 200


@api.route('/user', methods=['GET'])
@jwt_required()
def get_user():
    id = get_jwt_identity()
    # print(id)
    user = User.query.get(id)
    # print(user)
    return jsonify(user.serialize()), 200
   
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
        if  "role" in new_user_data:
            if new_user_data["role"] not in Role.__members__:
                return {"error": f"No existe en los roles disponibles"},400
        
        salt = b64encode(os.urandom(32)).decode('utf-8')
        new_user_data["password"] = set_password(new_user_data["password"], salt)
        new_user = User.create(**new_user_data, salt=salt)
        return jsonify(new_user.serialize()), 201
       
    except Exception as error:
        return jsonify(error.args[0]), error.args[1] if len(error.args) > 1 else 500

# método PUT para seleccionar la agencia a la que perteneces
@api.route('/user/agency_ybt/<int:agency_id>', methods=['PUT'])
@jwt_required()
def put_user_agency(agency_id):
    id = get_jwt_identity()
    agency = Agencies.query.get(agency_id)

    if agency is None:
        return jsonify({"msg":"No existe la agencia"}), 401
    try:
        user = User.query.get(id)
        
        user.agency_id = agency_id

        db.session.commit()
        return jsonify(user.serialize()),200 

    except Exception as error:
        return jsonify({"message": f"Error: {error.args[0]}"}), error.args[1] if len(error.args) > 1 else 500   

# método PUT para resetear la agencia de un usuario seleccionado
@api.route('/agency/<int:user_id>', methods=['PUT'])
def reset_user_agency(user_id):
    try:
        user = User.query.get(user_id)
        
        user.agency = request.json['agency']
        user.agency_id = request.json['agency_id']

        db.session.commit()
        return jsonify(user.serialize()),200 

    except Exception as error:
        return jsonify({"message": f"Error: {error.args[0]}"}), error.args[1] if len(error.args) > 1 else 500 

# método PUT para que los gerentes coloquen su propia agencia
@api.route('/user/own_agency/<int:agency_id>', methods=['PUT'])
@jwt_required()
def put_user_own_agency(agency_id):
    id = get_jwt_identity()
    agency = Agencies.query.get(agency_id)
    print(agency)

    if agency is None:
        return jsonify({"msg":"No existe la agencia"}), 401
    try:
        user = User.query.get(id)
        
        user.own_agency_id = agency.id

        db.session.commit()
        return jsonify(user.serialize()),200 

    except Exception as error:
        return jsonify({"message": f"Error: {error.args[0]}"}), error.args[1] if len(error.args) > 1 else 500

# PUT para elegir la meta de ventas del usuario
@api.route('/user_sales_goal/<int:id>', methods=['PUT'])
@jwt_required()
def put_user_sales_goal(id):
    id = get_jwt_identity()
    try:
        user = User.query.get(id)
        
        user.sales_goal = request.json['sales_goal']
        
        db.session.commit()
        return jsonify(user.serialize()),200 

    except Exception as error:
        return jsonify({"message": f"Error: {error.args[0]}"}), error.args[1] if len(error.args) > 1 else 500 

# método PUT para cambiar los roles de los usuarios
@api.route('/user_role_admin/<int:user_id>', methods=['PUT'])
def put_user_role_admin(user_id):
    try:
        user = User.query.get(user_id)
        
        user.role = request.json['role']

        db.session.commit()
        return jsonify(user.serialize()),200 

    except Exception as error:
        return jsonify({"message": f"Error: {error.args[0]}"}), error.args[1] if len(error.args) > 1 else 500

# método PUT para cambiar los own_agency de los usuarios
@api.route('/user_role/<int:user_id>', methods=['PUT'])
def put_user_role_own_agency(user_id):
    try:
        user = User.query.get(user_id)
        
        user.role = request.json['role']
        user.own_agency_id = request.json['own_agency_id']

        db.session.commit()
        return jsonify(user.serialize()),200 

    except Exception as error:
        return jsonify({"message": f"Error: {error.args[0]}"}), error.args[1] if len(error.args) > 1 else 500

# método PUT para cambiar status de los usuarios
@api.route('/user_status/<int:user_id>', methods=['PUT'])
def put_user_status(user_id):
    try:
        user = User.query.get(user_id)
        
        user.status = request.json['status']

        db.session.commit()
        return jsonify(user.serialize()),200 

    except Exception as error:
        return jsonify({"message": f"Error: {error.args[0]}"}), error.args[1] if len(error.args) > 1 else 500

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
        if "name" not in new_cliente_data or new_cliente_data["name"] == "":
            raise Exception("No ingresaste el name", 400)
        if "birthdate" in new_cliente_data["birthdate"] == "":
            raise Exception("No ingresaste la birthdate", 400)
        if "email" not in new_cliente_data or new_cliente_data["email"] == "":
            raise Exception("No ingresaste el email", 400)
        if "cellphone" not in new_cliente_data or new_cliente_data["cellphone"] == "":
            raise Exception("No ingresaste el cellphone", 400)
        if "amount" not in new_cliente_data or new_cliente_data["amount"] == "":
            raise Exception("No ingresaste el amount", 400)
        if "status" not in new_cliente_data or new_cliente_data["status"] == "":
            raise Exception("No ingresaste el status", 400)
        if "trust" not in new_cliente_data or new_cliente_data["trust"] == "":
            raise Exception("No ingresaste el nivel de trust", 400)
        if "notes" not in new_cliente_data or new_cliente_data["notes"] == "":
            raise Exception("No ingresaste notes", 400)
        new_cliente = Cliente.create(**new_cliente_data, user_id = user_id)
        return jsonify(new_cliente.serialize()), 201
    except Exception as error:
        return jsonify(error.args[0]), error.args[1] if len(error.args) > 1 else 500

@api.route('/user_clients/<int:id>', methods=['GET'])
# @jwt_required()
def get_user_clients(id):    
    clientes = Cliente.query.filter_by(user_id = id)
    clientes_dictionaries = []
    for cliente in clientes:
        clientes_dictionaries.append(cliente.serialize())
    return jsonify(clientes_dictionaries), 200

# traer la data de los clientes para vista de gerentes
@api.route('/manager_user_clients/<int:id>/<int:client_id>', methods=['GET'])
def get_manager_user_clients(id, client_id):    
    clientes = Cliente.query.filter_by(user_id = id, client_id = client_id)
    clientes_dictionaries = []
    for cliente in clientes:
        clientes_dictionaries.append(cliente.serialize())
    return jsonify(clientes_dictionaries), 200

@api.route('/cliente/<int:id>', methods=['DELETE'])
# @jwt_required()
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

# cambiar estatus del prospecto
@api.route('/cliente/<int:id>', methods=['PUT'])
def update_cliente(id):

    try:
        cliente = Cliente.query.get(id)
        
        cliente.status = request.json['status']

        db.session.commit()
        return jsonify(cliente.serialize()),200 

    except Exception as error:
        return jsonify({"message": f"Error: {error.args[0]}"}), error.args[1] if len(error.args) > 1 else 500   

# cambiar todas las demás caracteristicas el prospecto
@api.route('/modify_cliente/<int:id>', methods=['PUT'])
def modify_cliente(id):
    body = request.json

    client = Cliente.query.get(id)
    nombre= body.get("nombre", None)
    fecha= body.get("fecha", None)
    email= body.get("email", None)
    celular= body.get("celular", None)
    monto= body.get("monto", None)
    confianza= body.get("confianza", None)
    notas= body.get("notas", None)
    
    if nombre is not None and nombre != "":
        client.nombre = nombre
    if fecha is not None and fecha != "":
        client.fecha = fecha
    if email is not None and email != "":
        client.email = email
    if celular is not None and celular != "":
        client.celular = celular
    if monto is not None and monto != "":
        client.monto = monto
    if confianza is not None and confianza != "":
        client.confianza = confianza
    if notas is not None and notas != "":
        client.notas = notas
    try:
        db.session.commit()
        return jsonify(client.serialize()),200 

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
    
@api.route('/comments/<int:id>', methods=['DELETE'])
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

@api.route('/responses/<int:comment_id>', methods=['POST'])
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
@api.route('/tareas/', methods=['GET','POST'])
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
        if "task" not in new_tarea_data or new_tarea_data["task"] == "":
            raise Exception("No ingresaste la tarea", 400)
        if "status" not in new_tarea_data or new_tarea_data["status"] == "":
            raise Exception("No ingresaste el estatus", 400)
        new_tarea = Tarea.create(**new_tarea_data, user_id = user_id)
        return jsonify(new_tarea.serialize()), 201
    except Exception as error:
        return jsonify(error.args[0]), error.args[1] if len(error.args) > 1 else 500
        
@api.route('/tareas/<int:id>', methods=['PUT'])
def update_tarea(id):

    try:
        tarea = Tarea.query.get(id)
        
        tarea.status = request.json['status']

        db.session.commit()
        return jsonify(tarea.serialize()),200 

    except Exception as error:
        return jsonify({"message": f"Error: {error.args[0]}"}), error.args[1] if len(error.args) > 1 else 500   

@api.route('/tareas/<int:id>', methods=['DELETE'])
def delete_tarea(id):
    tarea = Tarea.query.get(id)

    if not tarea:
        return jsonify({"msg": "No existe la tarea"}),404
    
    db.session.delete(tarea)
    try:
        db.session.commit()
        return jsonify({"msg": "Se elimino la tarea"}),200 
    except Exception as error:
        return jsonify({"message": f"Error: {error.args[0]}"}), error.args[1] if len(error.args) > 1 else 500 

# rutas de actividades de clientes
@api.route('/client_activity/<int:client_id>', methods=['GET'])
@jwt_required()
def get_client_activity(client_id):
    user_id = get_jwt_identity()
    client_activities = Client_Activity.query.filter_by(user_id = user_id, client_id = client_id)

    return jsonify(
            [client_activity.serialize() for client_activity in client_activities]
        ),200

# ruta para que los gerentes vean la actividad de clientes
@api.route('/manager_client_activity/<int:user_id>/<int:client_id>', methods=['GET'])
def get_manager_client_activity(user_id, client_id):
    client_activities = Client_Activity.query.filter_by(user_id = user_id, client_id = client_id)

    return jsonify(
            [client_activity.serialize() for client_activity in client_activities]
        ),200

# ruta para que los usuarios carguen las actividades con los clientes
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

        new_client_activity = Client_Activity.create(**new_client_activity_data, user_id = user_id, client_id = client_id)
        return new_client_activity, 201
    except Exception as error:
        return jsonify(error.args[0]), error.args[1] if len(error.args) > 1 else 500

# RUTA PARA LA DATA DE LOS CURSOS
@api.route('/courses/<int:agencies_id>', methods=['GET','POST'])
def post_get_courses_data(agencies_id):
    if request.method == 'GET':
        courses_data = Courses.query.filter_by(agencies_id = agencies_id)
        courses_data_dictionary = []
        for course_data in courses_data:
            courses_data_dictionary.append(course_data.serialize())
        return jsonify(courses_data_dictionary), 200
    new_course_data = request.json
    try:
        if "title" not in new_course_data or new_course_data["title"] == "":
            raise Exception("No ingresaste el titulo", 400)
        if "description" not in new_course_data or new_course_data["description"] == "":
            raise Exception("No ingresaste la descripcion", 400)
        if "img_url" not in new_course_data or new_course_data["img_url"] == "":
            raise Exception("No ingresaste el img_url", 400)
        if "link_url" not in new_course_data or new_course_data["link_url"] == "":
            raise Exception("No ingresaste el link_url", 400)
        new_course = Courses.create(**new_course_data, agencies_id = agencies_id)
        return jsonify(new_course.serialize()), 201
    except Exception as error:
        return jsonify(error.args[0]), error.args[1] if len(error.args) > 1 else 500

# RUTA PARA COMPAÑIAS
@api.route('/company/', methods=['GET','POST'])
def post_get_company():
    if request.method == 'GET':
        companies = Company.query.all()
        company_dictionary = []
        for company in companies:
            company_dictionary.append(company.serialize())
        return jsonify(company_dictionary), 200
    new_company = request.json
    try:
        if "name" not in new_company or new_company["name"] == "":
            raise Exception("No ingresaste el nombre de la empresa", 400)
        new_company = Company.create(**new_company)
        return jsonify(new_company.serialize()), 201
    except Exception as error:
        return jsonify(error.args[0]), error.args[1] if len(error.args) > 1 else 500

# rutas de agencias
# endpoint para traer todas las agencias
# @api.route('/agencies', methods=['GET'])
# @jwt_required()
# def get_agencies():
#     agencies = Agencies.query.all()
    
#     agencies = list(map(lambda agency: agency.serialize(), agencies))
    
#     return jsonify(agencies), 200

#endpoint para traer agencias por compañia
@api.route('/agencies/<int:company_id>', methods=['GET'])
@jwt_required()
def get_agencies_by_company(company_id):
    agencies = Agencies.query.filter_by(company_id = company_id)
    
    agencies = list(map(lambda agency: agency.serialize(), agencies))
    
    return jsonify(agencies), 200

#endpoit para traer las agencias de mis asociados
@api.route('/own_agencies', methods=['GET'])
@jwt_required()
def get_own_agencies():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    my_users = User.query.filter_by( agency_id= user.own_agency_id)

    def check_own_agency(user):
        if user.serialize()["own_agency"] != None and user.serialize()["agency"] != user.serialize()["own_agency"]["name"]:
            return True
        return False
    
    users_filter = list(filter(check_own_agency, my_users))
    users = list(map(lambda user: user.serialize()["own_agency"], users_filter))
    return jsonify(users), 200

# endpoint para añadir agencias
@api.route('/agencies/<int:company_id>', methods=['POST'])
@jwt_required()
def add_agency(company_id):
    user_id = get_jwt_identity()

    user = User.query.get(user_id)
    print(user.role.value)
    if user.role.value != "admin":
        return jsonify({"msg":"No tienes permisos para crear agencias"})
    
    new_agency_data = request.json

    if "name" not in new_agency_data or new_agency_data["name"] == "":
        raise Exception("No ingresaste el nombre", 400)
    
    new_agency = Agencies.create(**new_agency_data,company_id = company_id)

    db.session.add(new_agency)
    try:
        db.session.commit()
        return jsonify(new_agency.serialize()), 201
    except Exception as error:
        return jsonify({"message": f"Error: {error.args[0]}"}), error.args[1] if len(error.args) > 1 else 500
    
# RUTA PARA LA DATA DE PAGOS
@api.route('/get_payments/<int:user_id>', methods=['GET'])
def get_payments(user_id):
    payments_data = Payment.query.filter_by(user_id = user_id)
    payments_data_dictionary = []
    for payment_data in payments_data:
        payments_data_dictionary.append(payment_data.serialize())
    return jsonify(payments_data_dictionary), 200


@api.route('/payments', methods=['GET','POST'])
@jwt_required()
def post_payments():
    user_id = get_jwt_identity()
    try:
        new_payment_data = request.json
        if "payment_date" not in new_payment_data or new_payment_data["payment_date"] == "":
            raise Exception("No ingresaste la fecha del pago", 400)
        if "notes" not in new_payment_data or new_payment_data["notes"] == "":
            raise Exception("No ingresaste la descripcion", 400)
        if "reference" not in new_payment_data or new_payment_data["reference"] == "":
            raise Exception("No ingresaste la referencia", 400)
        if "amount" not in new_payment_data or new_payment_data["amount"] == "":
            raise Exception("No ingresaste el monto", 400)
        if "payment_method" not in new_payment_data or new_payment_data["payment_method"] == "":
            raise Exception("No ingresaste el médtodo de pago", 400)
        new_payment = Payment.create(**new_payment_data, user_id = user_id)
        return jsonify(new_payment.serialize()), 201
    except Exception as error:
        return jsonify(error.args[0]), error.args[1] if len(error.args) > 1 else 500