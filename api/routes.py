"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Cliente, Role, Tarea, Client_Activity, Courses, Payment, Account_Information, Products, Client_Products
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

# ----------------------- API PARA HACER LOGIN ----------------------- #
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
            

# -------------------- API PARA TRAER LA LISTA DE USUARIOS ------------------- #
@api.route('/users', methods=['GET'])
@jwt_required()
def get_users():
    admin_id = get_jwt_identity()
    admin = User.query.get(admin_id)
    if admin.role.value == 'admin':
        users = User.query.all()
        users_dictionaries = []
        for user in users:
            users_dictionaries.append(user.serialize())
        return jsonify(users_dictionaries), 200
    else:
        return jsonify({"msg":"no eres el administrador de la aplicación, acceso denegado 🚫"  f"user: {admin.role.value.value} "} ), 401 

# --------------- MÉTODO PUT PARA ASIGNAR GERENCIA AL USUARIO -------------- #
@api.route('/management_assignment/<int:id>', methods=['PUT'])
@jwt_required()
def put_user_manager(id):
    admin_id = get_jwt_identity()
    admin = User.query.get(admin_id)
    if admin.role.value == 'admin':
        try:
            user = User.query.get(id)
            user.manager = request.json['manager']
            user.manager_id = request.json['manager_id']
            db.session.commit()
            return jsonify(user.serialize()),200 

        except Exception as error:
            return jsonify({"message": f"Error: {error.args[0]}"}), error.args[1] if len(error.args) > 1 else 500 
    else:
        return jsonify({"msg":"no eres el administrador de la aplicación, acceso denegado 🚫"}), 401 

# --------------- MÉTODO PUT PARA ASIGNAR GPT COINS -------------- #
@api.route('/gpt_coins/<int:user_id>', methods=['PUT'])
@jwt_required()
def put_user_gpt_coins(user_id):
    try:
        user = User.query.get(user_id)
        user.gpt_coins = request.json['gpt_coins']
        db.session.commit()
        return jsonify(user.serialize()),200 

    except Exception as error:
        return jsonify({"message": f"Error: {error.args[0]}"}), error.args

# --------------- MÉTODO PUT PARA RESETEAR CONTRASEÑA AL USUARIO -------------- #
@api.route('/reset_pass/<int:user_id>', methods=['PUT'])
@jwt_required()
def put_user_gpt_coins(user_id):
    try:
        user = User.query.get(user_id)
        user.password = request.json['password']
        db.session.commit()
        return jsonify(user.serialize()),200 

    except Exception as error:
        return jsonify({"message": f"Error: {error.args[0]}"}), error.args

# ---------- API PARA OBTENER USUARIOS DE LA GERENCIA QUE PERTENECEN ---------- #
@api.route('/users_by_manager/<int:manager_id>', methods=['GET'])
@jwt_required()
def get_users_by_manager(manager_id):
    users = User.query.filter_by( manager_id = manager_id)
    users_dictionaries = []
    for user in users:
        users_dictionaries.append(user.serialize())
    return jsonify(users_dictionaries), 200

# --------------------- API PARA TRAER AL USUARIO QUE HACE LOGIN --------------------- #
@api.route('/user', methods=['GET'])
@jwt_required()
def get_user():
    id = get_jwt_identity()
    # print(id)
    user = User.query.get(id)
    # print(user)
    return jsonify(user.serialize()), 200
   
# ------------------------ API PARA REGISTRAR USUARIOS ----------------------- #
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
            if not Role.has_member(new_user_data["role"]):
                return {"error": f"No existe en los roles disponibles"},400
        salt = b64encode(os.urandom(32)).decode('utf-8')
        new_user_data["password"] = set_password(new_user_data["password"], salt)
        new_user = User.create(**new_user_data, salt=salt)
        return jsonify(new_user.serialize()), 201
    except Exception as error:
        return jsonify(error.args[0]), error.args[1] if len(error.args) > 1 else 500


# --------------- MÉTODO PUT PARA SELECCIONAR LA META DE VENTAS -------------- #
@api.route('/user_sales_goal', methods=['PUT'])
@jwt_required()
def put_user_sales_goal():
    id = get_jwt_identity()
    try:
        user = User.query.get(id)
        
        user.sales_goal = request.json['sales_goal']
        
        db.session.commit()
        return jsonify(user.serialize()),200 

    except Exception as error:
        return jsonify({"message": f"Error: {error.args[0]}"}), error.args[1] if len(error.args) > 1 else 500 

# -------------- MÉTODO PUT PARA CAMBIAR EL ROL DEL USUARIO A ADMIN -------------- #
@api.route('/user_role_admin/<int:user_id>', methods=['PUT'])
@jwt_required()
def put_user_role_admin(user_id):
    admin_id = get_jwt_identity()
    admin = User.query.get(admin_id)
    print(admin)
    if admin.role.value.value == 'admin':
        try:
            user = User.query.get(user_id)
            
            user.role = request.json['role']

            db.session.commit()
            return jsonify(user.serialize()),200 

        except Exception as error:
            return jsonify({"message": f"Error: {error.args[0]}"}), error.args[1] if len(error.args) > 1 else 500
    else:
        return jsonify({"msg":"no eres el administrador de la aplicación, acceso denegado 🚫"  f"user: {admin} "}), 401 

# ---------- MÉTODO PUT PARA CAMBIAR EL ROL DEL USUARIO A GERENTE ---------- #
@api.route('/user_role/<int:user_id>', methods=['PUT'])
def put_user_role_manager(user_id):
    try:
        user = User.query.get(user_id)
        user.role = request.json['role']
        db.session.commit()
        return jsonify(user.serialize()),200 

    except Exception as error:
        return jsonify({"message": f"Error: {error.args[0]}"}), error.args[1] if len(error.args) > 1 else 500

# ------------ MÉTODO PUT PARA CAMBIAR EL ESTATUS DE LOS USUARIOS ------------ #
@api.route('/user_status/<int:user_id>', methods=['PUT'])
@jwt_required()
def put_user_status(user_id):
    try:
        user = User.query.get(user_id)
        
        user.status = request.json['status']

        db.session.commit()
        return jsonify(user.serialize()),200 

    except Exception as error:
        return jsonify({"message": f"Error: {error.args[0]}"}), error.args[1] if len(error.args) > 1 else 500

# ------------------------------ API DE CLIENTES ----------------------------- #
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
        if "status" not in new_cliente_data or new_cliente_data["status"] == "":
            raise Exception("No ingresaste el status", 400)
        if "trust" not in new_cliente_data or new_cliente_data["trust"] == "":
            raise Exception("No ingresaste el nivel de trust", 400)
        new_cliente = Cliente.create(**new_cliente_data, user_id = user_id)
        return jsonify(new_cliente.serialize()), 201
    except Exception as error:
        return jsonify(error.args[0]), error.args[1] if len(error.args) > 1 else 500

# --------------- API PARA TRAER LOS CLIENTES DE LOS ASOCIADOS --------------- #
@api.route('/user_clients/<int:id>', methods=['GET'])
@jwt_required()
def get_user_clients(id):    
    clientes = Cliente.query.filter_by(user_id = id)
    clientes_dictionaries = []
    for cliente in clientes:
        clientes_dictionaries.append(cliente.serialize())
    return jsonify(clientes_dictionaries), 200

# ----------- API PARA TRAER LA DATA DE LOS CLIENTES A LOS GERENTES ---------- #
@api.route('/manager_user_clients/<int:id>/<int:client_id>', methods=['GET'])
@jwt_required()
def get_manager_user_clients(id, client_id):    
    clientes = Cliente.query.filter_by(user_id = id, client_id = client_id)
    clientes_dictionaries = []
    for cliente in clientes:
        clientes_dictionaries.append(cliente.serialize())
    return jsonify(clientes_dictionaries), 200

# ------------------------ API PARA ELIMINAR CLIENTES ------------------------ #
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

# ---------------- API PARA CAMBIAR ESTATUS DE LOS PROSPECTOS ---------------- #
@api.route('/cliente/<int:id>', methods=['PUT'])
@jwt_required()
def update_cliente(id):

    try:
        cliente = Cliente.query.get(id)
        
        cliente.status = request.json['status']

        db.session.commit()
        return jsonify(cliente.serialize()),200 

    except Exception as error:
        return jsonify({"message": f"Error: {error.args[0]}"}), error.args[1] if len(error.args) > 1 else 500   

# ----- API PARA CAMBIAR TODAS LAS DEMÁS CARATERÍSTICAS DE LOS PROSPECTOS ---- #
@api.route('/modify_cliente/<int:id>', methods=['PUT'])
@jwt_required()
def modify_cliente(id):
    body = request.json

    client = Cliente.query.get(id)
    name= body.get("name", None)
    birthdate= body.get("birthdate", None)
    email= body.get("email", None)
    cellphone= body.get("cellphone", None)
    amount= body.get("amount", None)
    trust= body.get("trust", None)
    status= body.get("status", None)
    notes= body.get("notes", None)
    tag= body.get("tag", None)
    
    if name is not None and name != "":
        client.name = name
    if birthdate is not None and birthdate != "":
        client.birthdate = birthdate
    if email is not None and email != "":
        client.email = email
    if cellphone is not None and cellphone != "":
        client.cellphone = cellphone
    if amount is not None and amount != "":
        client.amount = amount
    if trust is not None and trust != "":
        client.trust = trust
    if status is not None and status != "":
        client.status = status
    if notes is not None and notes != "":
        client.notes = notes
    if tag is not None and tag != "":
        client.tag = tag
    try:
        db.session.commit()
        return jsonify(client.serialize()),200 

    except Exception as error:
        return jsonify({"message": f"Error: {error.args[0]}"}), error.args[1] if len(error.args) > 1 else 500   

# ------------------------------ API PARA TRAER Y ELIMINAR TAREAS ----------------------------- #
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

# ------------------------- API PARA MODIFICAR TAREAS ------------------------ #
@api.route('/tareas/<int:id>', methods=['PUT'])
@jwt_required()
def update_tarea(id):

    try:
        tarea = Tarea.query.get(id)
        
        tarea.status = request.json['status']

        db.session.commit()
        return jsonify(tarea.serialize()),200 

    except Exception as error:
        return jsonify({"message": f"Error: {error.args[0]}"}), error.args[1] if len(error.args) > 1 else 500   

# ------------------------- API PARA ELIMINAR TAREAS ------------------------- #
@api.route('/tareas/<int:id>', methods=['DELETE'])
@jwt_required()
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

# -------------------- API DE ACTIVIDADES DE LOS CLIENTES -------------------- #
@api.route('/client_activity/', methods=['GET'])
@jwt_required()
def get_client_activity():
    user_id = get_jwt_identity()
    client_activities = Client_Activity.query.filter_by(user_id = user_id)

    return jsonify(
            [client_activity.serialize() for client_activity in client_activities]
        ),200

# ------- API PARA QUE GERENTES VEAN ACTIVIDAD DE CLIENTES DE ASOCIADOS ------ #
@api.route('/manager_client_activity/<int:user_id>/', methods=['GET'])
@jwt_required()
def get_manager_client_activity(user_id):
    client_activities = Client_Activity.query.filter_by(user_id = user_id)
    return jsonify(
            [client_activity.serialize() for client_activity in client_activities]
        ),200

# ----- API PARA QUE LOS USUARIOS CARGUEN LAS ACTIVIDADES DE LOS CLIENTES ---- #
@api.route('/client_activity/<int:client_id>', methods=['POST'])
@jwt_required()
def add_client_activity(client_id):
    user_id = get_jwt_identity()
    new_client_activity_data = request.json
    try:
        if "date" not in new_client_activity_data or new_client_activity_data["date"] == "":
            raise Exception("No ingresaste la fecha", 400)
        if "contact_type" not in new_client_activity_data or new_client_activity_data["contact_type"] == "":
            raise Exception("No ingresaste el tipo de contacto", 400)
        if "comment" not in new_client_activity_data or new_client_activity_data["comment"] == "":
            raise Exception("No ingresaste el tipo de contacto", 400)

        new_client_activity = Client_Activity.create(**new_client_activity_data, user_id = user_id, client_id = client_id)
        return new_client_activity, 201
    except Exception as error:
        return jsonify(error.args[0]), error.args[1] if len(error.args) > 1 else 500

# ---------------- API PARA ELIMINAR ACTIVIDADES CON LOS CLIENTES ---------------- #
@api.route('/delete_client_activity/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_client_activity(id):
    client_activity = Client_Activity.query.get(id)

    if not client_activity:
        return jsonify({"msg": "No existe la acvitidad del cliente"}),404
    
    db.session.delete(client_activity)
    try:
        db.session.commit()
        return jsonify({"msg": "Se elimino la acvitidad del cliente"}),200 
    except Exception as error:
        return jsonify({"message": f"Error: {error.args[0]}"}), error.args[1] if len(error.args) > 1 else 500

# ---------------------- API PARA CARGAR LOS CURSOS ---------------------- #
@api.route('/courses/<int:id>', methods=['GET','POST'])
@jwt_required()
def post_get_courses_data(id):
    if request.method == 'GET':
        courses_data = Courses.query.filter_by(manager_id = id)
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
        new_course = Courses.create(**new_course_data, manager_id = id)
        return jsonify(new_course.serialize()), 201
    except Exception as error:
        return jsonify(error.args[0]), error.args[1] if len(error.args) > 1 else 500

# -------------------- API PARA CAMBIAR Y ELIMINAR CURSOS -------------------- #
@api.route('/courses/<int:id>', methods=['DELETE', 'PUT'])
@jwt_required()
def delete_put_courses_data(id):
    if request.method == 'DELETE':
        course = Courses.query.get(id)
        if not course:
            return jsonify({"msg": "No existen cursos para este usuario"}),404
    
        db.session.delete(course)
        try:
            db.session.commit()
            return jsonify({"msg": "Se elimino el curso del usuario correctamente"}),200 
        except Exception as error:
            return jsonify({"message": f"Error: {error.args[0]}"}), error.args[1] if len(error.args) > 1 else 500
    
    body = request.json
    course = Courses.query.get(id)

    title= body.get("title", None)
    description= body.get("description", None)
    img_url= body.get("img_url", None)
    link_url= body.get("link_url", None)
    category= body.get("category", None)
    tag= body.get("tag", None)
    
    if title is not None and title != "":
        course.title = title
    if description is not None and description != "":
        course.description = description
    if img_url is not None and img_url != "":
        course.img_url = img_url
    if link_url is not None and link_url != "":
        course.link_url = link_url
    if category is not None and category != "":
        course.category = category
    if tag is not None and tag != "":
        course.tag = tag
    try:
        db.session.commit()
        return jsonify(course.serialize()),200 

    except Exception as error:
        return jsonify({"message": f"Error: {error.args[0]}"}), error.args[1] if len(error.args) > 1 else 500   
    


# ------------------------ API PARA REGRISTRO DE PAGOS ----------------------- #
@api.route('/get_payments/<int:user_id>', methods=['GET'])
@jwt_required()
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

# -------------------------- API PARA CREAR CARGAR PRODUCTOS -------------------------- #
@api.route('/products', methods=['GET','POST'])
@jwt_required()
def post_get_products():
    user_id = get_jwt_identity()
    if request.method == 'GET':
        products_names = Products.query.filter_by(user_id = user_id)
        products_names_dictionary = []
        for product in products_names:
            products_names_dictionary.append(product.serialize())
        return jsonify(products_names_dictionary), 200
    new_product_data = request.json
    try:
        if "company" not in new_product_data or new_product_data["company"] == "":
            raise Exception("No ingresaste la compañía del producto", 400)
        if "product_name" not in new_product_data or new_product_data["product_name"] == "":
            raise Exception("No ingresaste el nombre del producto", 400)
        if "product_type" not in new_product_data or new_product_data["product_type"] == "":
            raise Exception("No ingresaste el tipo de producto", 400)
        new_product = Products.create(**new_product_data, user_id = user_id)
        return jsonify(new_product.serialize()), 201
    except Exception as error:
        print([arg for arg in error.args])
        return jsonify(error.args[0]), error.args[1] if len(error.args) > 1 else 500

# -------------------- API PARA CAMBIAR Y ELIMINAR PRODUCTOS -------------------- #
@api.route('/products/<int:product_id>', methods=['DELETE', 'PUT'])
@jwt_required()
def delete_put_products(product_id):
    if request.method == 'DELETE':
        product = Products.query.get(product_id)
        if not product:
            return jsonify({"msg": "No existe el producto que deseas eliminar"}),404
    
        db.session.delete(product)
        try:
            db.session.commit()
            return jsonify({"msg": "Se eliminó el producto correctamente"}),200 
        except Exception as error:
            return jsonify({"message": f"Error: {error.args[0]}"}), error.args[1] if len(error.args) > 1 else 500
    
    body = request.json
    product = Products.query.get(product_id)

    company= body.get("company", None)
    product_name= body.get("product_name", None)
    product_type= body.get("product_type", None)
    product_description= body.get("product_description", None)
    
    if company is not None and company != "":
        product.company = company
    if product_name is not None and product_name != "":
        product.product_name = product_name
    if product_type is not None and product_type != "":
        product.product_type = product_type
    if product_description is not None and product_description != "":
        product.product_description = product_description
    try:
        db.session.commit()
        return jsonify(product.serialize()),200 

    except Exception as error:
        return jsonify({"message": f"Error: {error.args[0]}"}), error.args[1] if len(error.args) > 1 else 500   

# -------------------------- API PARA CREAR CARGAR POLIZAS A LOS CLIENTES-------------------------- #
@api.route('/client_products/<int:client_id>/<int:product_id>', methods=['GET','POST'])
@jwt_required()
def post_get_client_products(client_id, product_id):
    if request.method == 'GET':
        client_products = Client_Products.query.filter_by(product_id = product_id, client_id = client_id)
        client_products_dictionary = []
        for client_policy in client_products:
            client_products_dictionary.append(client_policy.serialize())
        return jsonify(client_products_dictionary), 200
    new_client_policy_data = request.json
    try:
        if "amount" not in new_client_policy_data or new_client_policy_data["amount"] == "":
            raise Exception("Monto", 400)
        if "date_of_closing" not in new_client_policy_data or new_client_policy_data["date_of_closing"] == "":
            raise Exception("No ingresaste la fecha del cierre", 400)
        if "payment_recurrence" not in new_client_policy_data or new_client_policy_data["payment_recurrence"] == "":
            raise Exception("No ingresaste la frecuenta de pago", 400)

        new_client_policy = Client_Products.create(**new_client_policy_data, product_id = product_id, client_id = client_id)
        return jsonify(new_client_policy.serialize()), 201
    except Exception as error:
        return jsonify(error.args[0]), error.args[1] if len(error.args) > 1 else 500

# -------------------- API PARA CAMBIAR Y ELIMINAR PRODUCTOS DE LOS CLIENTES -------------------- #
@api.route('/client_products/<int:id>', methods=['DELETE', 'PUT'])
@jwt_required()
def delete_put_client_products(id):
    if request.method == 'DELETE':
        client_product = Client_Products.query.get(id)
        if not client_product:
            return jsonify({"msg": "No existe el producto para ese cliente"}),404
    
        db.session.delete(client_product)
        try:
            db.session.commit()
            return jsonify({"msg": "Se eliminó el producto correctamente"}),200 
        except Exception as error:
            return jsonify({"message": f"Error: {error.args[0]}"}), error.args[1] if len(error.args) > 1 else 500
    
    body = request.json
    client_product = Client_Products.query.get(id)

    amount= body.get("amount", None)
    date_of_closing= body.get("date_of_closing", None)
    notes= body.get("notes", None)
    payment_recurrence= body.get("payment_recurrence", None)
    product_description= body.get("product_description", None)
    
    if amount is not None and amount != "":
        client_product.amount = amount
    if date_of_closing is not None and date_of_closing != "":
        client_product.date_of_closing = date_of_closing
    if notes is not None and notes != "":
        client_product.notes = notes
    if payment_recurrence is not None and payment_recurrence != "":
        client_product.payment_recurrence = payment_recurrence
    try:
        db.session.commit()
        return jsonify(client_product.serialize()),200 

    except Exception as error:
        return jsonify({"message": f"Error: {error.args[0]}"}), error.args[1] if len(error.args) > 1 else 500

# ------------------------------ APIS DESECHADAS ----------------------------- #
    

# --------- METODO PUT PARA SELECCIONAR LA AGENCIA A LA QUE PERTENECE -------- #
# @api.route('/user/agency_ybt/<int:agency_id>', methods=['PUT'])
# @jwt_required()
# def put_user_agency(agency_id):
#     id = get_jwt_identity()
#     agency = Agencies.query.get(agency_id)

#     if agency is None:
#         return jsonify({"msg":"No existe la agencia"}), 401
#     try:
#         user = User.query.get(id)
        
#         user.agency_id = agency_id

#         db.session.commit()
#         return jsonify(user.serialize()),200 

#     except Exception as error:
#         return jsonify({"message": f"Error: {error.args[0]}"}), error.args[1] if len(error.args) > 1 else 500   

# ------------ MÉTODO PUT PARA RESETEAR LA AGENCIA DE LOS USUARIOS ----------- #
# @api.route('/agency/<int:user_id>', methods=['PUT'])
# def reset_user_agency(user_id):
#     try:
#         user = User.query.get(user_id)
        
#         user.agency = request.json['agency']
#         user.agency_id = request.json['agency_id']

#         db.session.commit()
#         return jsonify(user.serialize()),200 

#     except Exception as error:
#         return jsonify({"message": f"Error: {error.args[0]}"}), error.args[1] if len(error.args) > 1 else 500 

# -------- MÉTODO PUT PARA QUE LOS GERENTES CREEN SUS PROPIAS AGENCIAS -------- #
# @api.route('/user/own_agency/<int:id>/<int:agency_id>', methods=['PUT'])
# def put_user_own_agency(agency_id, id):
#     agency = Agencies.query.get(agency_id)
#     print(agency)

#     if agency is None:
#         return jsonify({"msg":"No existe la agencia"}), 401
#     try:
#         user = User.query.get(id)
        
#         user.own_agency_id = agency.id

#         db.session.commit()
#         return jsonify(user.serialize()),200 

#     except Exception as error:
#         return jsonify({"message": f"Error: {error.args[0]}"}), error.args[1] if len(error.args) > 1 else 500
    
# --------------------- API PARA TRAER TODAS LAS AGENCIAS -------------------- #
# @api.route('/agencies', methods=['GET'])
# @jwt_required()
# def get_agencies():
#     agencies = Agencies.query.all()
    
#     agencies = list(map(lambda agency: agency.serialize(), agencies))
    
#     return jsonify(agencies), 200

#endpoint para traer agencias por compañia
# @api.route('/agencies/<int:company_id>', methods=['GET'])
# @jwt_required()
# def get_agencies_by_company(company_id):
#     agencies = Agencies.query.filter_by(company_id = company_id)
    
#     agencies = list(map(lambda agency: agency.serialize(), agencies))
    
#     return jsonify(agencies), 200

# --------------- API PARA TRAER LAS AGENCIAS DE MIS ASOCIADOS --------------- #
# @api.route('/own_agencies', methods=['GET'])
# @jwt_required()
# def get_own_agencies():
#     user_id = get_jwt_identity()
#     user = User.query.get(user_id)
#     my_users = User.query.filter_by( agency_id= user.own_agency_id)

#     def check_own_agency(user):
#         if user.serialize()["own_agency"] != None and user.serialize()["agency"] != user.serialize()["own_agency"]["name"]:
#             return True
#         return False
    
#     users_filter = list(filter(check_own_agency, my_users))
#     users = list(map(lambda user: user.serialize()["own_agency"], users_filter))
#     return jsonify(users), 200

# ------------------------- API PARA AÑADIR AGENCIAS ------------------------- #
# @api.route('/agencies/<int:user_id>', methods=['POST'])
# @jwt_required()
# def add_agency(user_id):
#     user_id = get_jwt_identity()

#     user = User.query.get(user_id)
#     print(user.role.value)
#     if user.role.value != "manager":
#         return jsonify({"msg":"No tienes permisos para crear agencias"})
    
#     new_agency_data = request.json

#     if "name" not in new_agency_data or new_agency_data["name"] == "":
#         raise Exception("No ingresaste el nombre", 400)
    
#     new_agency = Agencies.create(**new_agency_data,user_id = user_id)

#     db.session.add(new_agency)
#     try:
#         db.session.commit()
#         return jsonify(new_agency.serialize()), 201
#     except Exception as error:
#         return jsonify({"message": f"Error: {error.args[0]}"}), error.args[1] if len(error.args) > 1 else 500
    
# ------------------------ API PARA AGREGAR COMPAÑÍAS ------------------------ #
# @api.route('/company/', methods=['GET','POST'])
# def post_get_company():
#     if request.method == 'GET':
#         companies = Company.query.all()
#         company_dictionary = []
#         for company in companies:
#             company_dictionary.append(company.serialize())
#         return jsonify(company_dictionary), 200
#     new_company = request.json
#     try:
#         if "name" not in new_company or new_company["name"] == "":
#             raise Exception("No ingresaste el nombre de la empresa", 400)
#         new_company = Company.create(**new_company)
#         return jsonify(new_company.serialize()), 201
#     except Exception as error:
#         return jsonify(error.args[0]), error.args[1] if len(error.args) > 1 else 500
    
# ---------------------------- API PARA TRAER COMENTARIOS DE LOS VIDEOS ---------------------------- #
# @api.route('/comments/<int:video_id>', methods=['GET'])
# def get_comments(video_id):
#     comments = Comment.query.filter_by(video_id=video_id)
    
#     return jsonify(
#             [comment.serialize() for comment in comments]
#         ),200

# ---------------- API PARA PUBLICAR COMENTARIOS DE LOS VIDEOS --------------- #
# @api.route('/comments/<int:video_id>', methods=['POST'])
# @jwt_required()
# def add_comment(video_id):
#     user_id = get_jwt_identity()
#     body = request.json
#     content = body.get("content", None)
    
#     if content is None:
#             return jsonify({"msg":"No se ingreso comentario"})
#     try:
#         comentario = Comment.create(content = content, video_id = video_id, user_id=user_id)
#         return comentario
#     except Exception as error:
#         return jsonify({"message": f"Error: {error.args[0]}"}), error.args[1] if len(error.args) > 1 else 500

# ---------------- API PARA ELIMINAR COMENTARIOS DE LOS VIDEOS --------------- #
# @api.route('/comments/<int:id>', methods=['DELETE'])
# def delete_comment(id):
#     comment = Comment.query.get(id)

#     if not comment:
#         return jsonify({"msg": "No existe el comentario"}),404
    
#     db.session.delete(comment)
#     try:
#         db.session.commit()
#         return jsonify({"msg": "Se elimino el comentario"}),200 
#     except Exception as error:
#         return jsonify({"message": f"Error: {error.args[0]}"}), error.args[1] if len(error.args) > 1 else 500   

# ----------------------------- API PARA TRAER RESPUESTA A LOS COMENTARIOS ---------------------------- #
# @api.route('/responses/<int:comment_id>', methods=['GET'])
# def get_responses(comment_id):
#     responses = Response.query.filter_by(comment_id=comment_id)
    
#     return jsonify(
#             [response.serialize() for response in responses]
#         ),200

# --------------- API PARA AGREGAR RESPUESTA A LOS COMENTARIOS --------------- #
# @api.route('/responses/<int:comment_id>', methods=['POST'])
# @jwt_required()
# def add_response(comment_id):
#     user_id = get_jwt_identity()
#     body = request.json
#     content = body.get("content", None)
    
#     if content is None:
#         return jsonify({"msg":"No se ingreso comentario"})
#     comment = Comment.query.get(comment_id)
#     if not comment:
#         return jsonify({"msg":"No existe el comentario"})
#     try:
#         response = Response.create(content = content, comment_id = comment_id, user_id=user_id)
#         return response
#     except Exception as error:
#         return jsonify({"message": f"Error: {error.args[0]}"}), error.args[1] if len(error.args) > 1 else 500
    
# ---------------- API PARA ELIMINAR RESPUESTA DE COMENTARIOS ---------------- #
# @api.route('/response/<int:id>', methods=['DELETE'])
# def delete_response(id):
#     response = Response.query.get(id)

#     if not response:
#         return jsonify({"msg": "No existe la respuesta"}),404
    
#     db.session.delete(response)
#     try:
#         db.session.commit()
#         return jsonify({"msg": "Se elimino la respuesta"}),200 
#     except Exception as error:
#         return jsonify({"message": f"Error: {error.args[0]}"}), error.args[1] if len(error.args) > 1 else 500   