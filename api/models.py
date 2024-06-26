from flask_sqlalchemy import SQLAlchemy
from flask import jsonify
from enum import Enum
import datetime
from datetime import date

db = SQLAlchemy()

class Role(Enum):
    admin = "admin"
    manager = "manager"
    associated = "associated"

    @classmethod
    def has_member(cls, value):
        return value in cls._value2member_map_

class TipoDeContacto(Enum):
    llamada = "llamada"
    mensaje = "mensaje"
    cita = "cita"

class Status(Enum):
    active = "active"
    inactive = "inactive"

class PaymentStatus(Enum):
    approved = "approved"
    not_approved = "not_approved"

class Color(Enum):
    white = 'white'
    black = 'black'
    blue = 'blue'
    grey = 'grey'
    green = 'green'
    yellow = 'yellow'
    orange = 'orange'
    pink = 'pink'
    purple= 'purple'
    red = 'red'

class Payment_Method(Enum):
    anual = 'anual'
    semestral = 'semestral'
    trimestral = 'trimestral'
    mensual = 'mensual'

# ---------------------- TABLAS DE REGISTROS DE USUARIOS --------------------- #
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), unique=False, nullable=False)
    lastname = db.Column(db.String(50), unique=False, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(120), unique=False, nullable=False)
    salt = db.Column(db.String(80), unique=False, nullable=False)
    role = db.Column(db.Enum(Role), default=Role.associated)
    created_at = db.Column(db.DateTime(timezone=True), default=date.today())
    updated_at = db.Column(db.DateTime(timezone=True), default=date.today(), onupdate=date.today())
    status = db.Column(db.Enum(Status), default = Status.active)
    sales_goal = db.Column(db.Integer, unique=False)
    manager = db.Column(db.String(100), unique=False, nullable=True)
    manager_id = db.Column(db.Integer, unique=False, nullable=True)
    gpt_coins = db.Column(db.Integer, nullable=True,default=5)


    def __init__(self, **kwargs):
        self.name = kwargs['name']
        self.lastname = kwargs['lastname']
        self.email = kwargs['email']
        self.password = kwargs['password']
        self.salt = kwargs['salt']
        self.role =  kwargs['role'] if 'role' in kwargs else Role.associated
        self.sales_goal = kwargs['sales_goal'] if 'sales_goal' in kwargs else None
        self.manager = kwargs['manager'] if 'manager' in kwargs else None
        self.manager_id = kwargs['manager_id'] if 'manager_id' in kwargs else None


    @classmethod
    def create(cls, **kwargs):
        new_user = cls(**kwargs)
        db.session.add(new_user)
        try:
            db.session.commit()
            return new_user
        except Exception as error:
            print(error)
            raise Exception(error.args[0], 400)
        

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "name": self.name,
            "lastname": self.lastname,
            "role": self.role.value,
            "created_at": self.created_at,
            "updated_at": self.updated_at,
            "manager": self.manager,
            "manager_id": self.manager_id, 
            "status": self.status.value,
            "sales_goal": self.sales_goal,
            "gpt_coins": self.gpt_coins            
            # do not serialize the password, its a security breach
        }

# ---------------------- TABLA DE REGISTROS DE CLIENTES ---------------------- #
class Cliente(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), unique=False, nullable=False)
    birthdate = db.Column(db.String(50), unique=False, nullable=True)
    email = db.Column(db.String(50), unique=False, nullable=True)
    cellphone = db.Column(db.String(50), unique=False, nullable=True)
    amount = db.Column(db.String(20), unique=False, nullable=True)
    trust = db.Column(db.String(20), unique=False, nullable=False)
    notes = db.Column(db.String(1000), unique=False, nullable=True)
    status = db.Column(db.String(50), unique=False, nullable=False)
    tag = db.Column(db.Enum(Color), default=Color.white)
    created_at = db.Column(db.DateTime(timezone=True), default=date.today())
    updated_at = db.Column(db.DateTime(timezone=True), default=date.today(), onupdate=date.today())
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))

    def __init__(self, **kwargs):
        self.name = kwargs['name']
        self.birthdate = kwargs['birthdate'] if 'birthdate' in kwargs else None
        self.email = kwargs['email'] if 'email' in kwargs else None
        self.cellphone = kwargs['cellphone'] if 'cellphone' in kwargs else None
        self.amount = kwargs['amount'] if 'amount' in kwargs else None 
        self.trust = kwargs['trust']
        self.notes = kwargs['notes'] if 'notes' in kwargs else None
        self.status = kwargs['status']
        self.tag = kwargs['tag'] if 'tag' in kwargs else None
        self.user_id = kwargs['user_id']

    @classmethod
    def create(cls, **kwargs):
        new_cliente = cls(**kwargs)
        db.session.add(new_cliente)
        try:
            db.session.commit()
            return new_cliente
        except Exception as error:
            raise Exception(error.args[0], 400)
        

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "birthdate": self.birthdate,
            "email": self.email,
            "cellphone": self.cellphone,
            "amount": self.amount,
            "trust": self.trust,
            "notes": self.notes,
            "status": self.status,
            "tag": self.tag.value,
            "created_at": self.created_at,
            "updated_at": self.updated_at,
            "user_id": self.user_id
            # do not serialize the password, its a security breach
        }

# ------------- TABLA DE TAREAS PARA LA SECCIÓN TAREAS PENDIENTES ------------ #
class Tarea(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    task = db.Column(db.String(250), unique=False, nullable=False)
    status = db.Column(db.String(20), unique=False, nullable=False)
    created_at = db.Column(db.DateTime(timezone=True), default=date.today())
    updated_at = db.Column(db.DateTime(timezone=True), default=date.today(), onupdate=date.today())
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))

    def __init__(self, **kwargs):
        self.task = kwargs['task']
        self.status = kwargs['status']
        self.user_id = kwargs['user_id']

    @classmethod
    def create(cls, **kwargs):
        new_task = cls(**kwargs)
        db.session.add(new_task)
        try:
            db.session.commit()
            return new_task
        except Exception as error:
            raise Exception(error.args[0], 400)
        

    def serialize(self):
        return {
            "id": self.id,
            "task": self.task,
            "status": self.status,
            "user_id": self.user_id,
            "created_at": self.created_at,
            "updated_at": self.updated_at,
        }

# ------ TABLA DE REGISTRO DE ACTIVIDADES DE INTERACCIONES CON CLIENTES ------ #
class Client_Activity(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.String(10), nullable=False)
    contact_type = db.Column(db.Enum(TipoDeContacto), nullable=False)
    comment = db.Column(db.String(250), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    client_id = db.Column(db.Integer, db.ForeignKey('cliente.id'), nullable=False)
    # created_at = db.Column(db.DateTime(timezone=True), default = date.today())

    def __init__(self, **kwargs):
        self.date = kwargs['date']
        self.contact_type = kwargs['contact_type']
        self.comment = kwargs['comment']
        self.user_id = kwargs['user_id']
        self.client_id = kwargs['client_id']

    @classmethod
    def create(cls, **kwargs):
        new_activity = cls(**kwargs)
        db.session.add(new_activity)
        try:
            db.session.commit()
            return jsonify({"msg":"Actividad creada"})
        except Exception as error:
            raise Exception(error.args[0], 400)

    def serialize(self):
        return {
            "id": self.id,
            "date": self.date,
            "contact_type": self.contact_type.value,
            "comment": self.comment,
            "user_id": self.user_id,
            "client_id": self.client_id,
            # "created_at": self.created_at
        }

# --------------------- TABLA PARA INFORMACION DE VIDEOS --------------------- #
class Courses(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), unique=False, nullable=False)
    description = db.Column(db.String(1000), unique=False, nullable=False)
    img_url = db.Column(db.String(250), unique=False, nullable=False)
    link_url = db.Column(db.String(250), unique=False, nullable=False)
    category = db.Column(db.String(50), unique=False, nullable=True)
    tag = db.Column(db.Enum(Color), default=Color.white)
    created_at = db.Column(db.DateTime(timezone=True), default=date.today())
    updated_at = db.Column(db.DateTime(timezone=True), default=date.today(), onupdate=date.today())
    manager_id = db.Column(db.Integer,unique=False, nullable=False)

    def __init__(self, **kwargs):
        self.title = kwargs['title']
        self.description = kwargs['description']
        self.img_url = kwargs['img_url']
        self.link_url = kwargs['link_url']
        self.manager_id = kwargs['manager_id']
        self.tag = kwargs['tag'] if 'sales_goal' in kwargs else None
        self.category = kwargs['category'] if 'category' in kwargs else None

    @classmethod
    def create(cls, **kwargs):
        new_course_data = cls(**kwargs)
        db.session.add(new_course_data)
        try:
            db.session.commit()
            return new_course_data
        except Exception as error:
            raise Exception(error.args[0], 400)
        

    def serialize(self):
        return {
            "id": self.id,
            "title": self.title,
            "description": self.description,
            "img_url": self.img_url,
            "link_url": self.link_url,
            "manager_id": self.manager_id,
            "created_at": self.created_at,
            "updated_at": self.updated_at,
            "tag": self.tag.value,
            "category":self.category
        }


# ----------------------- TABLA DE REGISTROS DE PAGOS ----------------------- #
class Payment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    payment_date = db.Column(db.DateTime(timezone=True))
    notes = db.Column(db.String(500), unique=False, nullable=False)
    reference = db.Column(db.String(100), unique=False, nullable=False)
    amount = db.Column(db.Float)
    status = db.Column(db.Enum(PaymentStatus), default=PaymentStatus.not_approved)
    payment_method = db.Column(db.String(100), unique=False, nullable=False)
    created_at = db.Column(db.DateTime(timezone=True), default=date.today())
    updated_at = db.Column(db.DateTime(timezone=True), default=date.today(), onupdate=date.today())
    user = db.relationship("User", backref = "payment")
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    

    def __init__(self, **kwargs):
        self.payment_date = kwargs['payment_date']
        self.notes = kwargs['notes']
        self.reference = kwargs['reference']
        self.amount = kwargs['amount']
        self.status =  kwargs['status'] if 'status' in kwargs else PaymentStatus.not_approved
        self.payment_method = kwargs['payment_method']
        self.user_id = kwargs['user_id']

    @classmethod
    def create(cls, **kwargs):
        new_payment = cls(**kwargs)
        db.session.add(new_payment)
        try:
            db.session.commit()
            return new_payment
        except Exception as error:
            raise Exception(error.args[0], 400)
        

    def serialize(self):
        return {
            "id": self.id,
            "payment_date": self.payment_date,
            "notes": self.notes,
            "reference": self.reference,
            "amount":  self.amount,
            "status": self.status.value,
            "payment_method": self.payment_method,
            "user": self.user.name,
            "created_at": self.created_at,
            "updated_at": self.updated_at
        }

# --------------------- TABLA DE INFORMACIÓN DE LA CUENTA -------------------- #
class Account_Information(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    plan_name = db.Column(db.String(100), unique=False, nullable=False)
    created_at = db.Column(db.DateTime(timezone=True), default=date.today())
    updated_at = db.Column(db.DateTime(timezone=True), default=date.today(), onupdate=date.today())
    expires_at = db.Column(db.DateTime(timezone=True), default=date.today())
    user = db.relationship("User", backref = "account_information")
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    payment = db.relationship("Payment", backref = "account_information")
    payment_id = db.Column(db.Integer, db.ForeignKey('payment.id'))
    

    def __init__(self, **kwargs):
        self.plan_name = kwargs['plan_name']
        self.user_id = kwargs['user_id']
        self.payment_id = kwargs['payment_id']

    @classmethod
    def create(cls, **kwargs):
        new_account_information = cls(**kwargs)
        db.session.add(new_account_information)
        try:
            db.session.commit()
            return new_account_information
        except Exception as error:
            raise Exception(error.args[0], 400)
        

    def serialize(self):
        return {
            "id": self.id,
            "plan_name": self.plan_name,
            "created_at": self.created_at,
            "updated_at": self.updated_at,
            "expires_at": self.expires_at,
            "user": self.user.name,
            "payment": self.payment.id,
        }

# --------------- TABLA PARA GUARDAR LOS NOMBRES DE LAS PÓLIZAS -------------- #
class Products(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    company = db.Column(db.String(50), nullable=False)
    product_name = db.Column(db.String(50), nullable=False)
    product_type = db.Column(db.String(50), nullable=False)
    product_description = db.Column(db.String(1000), nullable=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

    def __init__(self, **kwargs):
        
        self.company = kwargs['company']
        self.product_name = kwargs['product_name']
        self.product_type = kwargs['product_type']
        self.product_description = kwargs['product_description'] if 'product_description' in kwargs else None
        self.user_id = kwargs['user_id']

    @classmethod
    def create(cls, **kwargs):
        new_product = cls(**kwargs)
        db.session.add(new_product)
        try:
            db.session.commit()
            return new_product
        except Exception as error:
            raise Exception(error.args[0], 400)

    def serialize(self):
        return {
            "id": self.id,
            "company": self.company,
            "product_name": self.product_name,
            "product_type": self.product_type,
            "product_description": self.product_description,
            "user_id": self.user_id,
        }

# ---- TABLA PARA GUARDAR INFORMACIÓN DE LA PÓLIZAS COMPRADAS POR CLIENTES --- #
class Client_Products(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    product_id =  db.Column(db.Integer, db.ForeignKey('products.id'), nullable=False)
    client_id = db.Column(db.Integer, db.ForeignKey('cliente.id'), nullable=False)
    amount = db.Column(db.String(30), nullable=False)
    date_of_closing = db.Column(db.String(10), nullable=False)
    notes = db.Column(db.String(500), nullable=True)
    payment_recurrence = db.Column(db.String(20), nullable=False)
    product = db.relationship("Products", backref = "client_products")
    created_at = db.Column(db.DateTime(timezone=True), default=date.today())
    updated_at = db.Column(db.DateTime(timezone=True), default=date.today(), onupdate=date.today())

    def __init__(self, **kwargs):
        self.amount = kwargs['amount']
        self.date_of_closing = kwargs['date_of_closing']
        self.notes = kwargs['notes']
        self.payment_recurrence = kwargs['payment_recurrence']
        self.product_id = kwargs['product_id']
        self.client_id = kwargs['client_id']

    @classmethod
    def create(cls, **kwargs):
        new_client_product = cls(**kwargs)
        db.session.add(new_client_product)
        try:
            db.session.commit()
            return new_client_product
        except Exception as error:
            raise Exception(error.args[0], 400)

    def serialize(self):
        return {
            "id": self.id,
            "product_id": self.product_id,
            "client_id": self.client_id,
            "amount": self.amount,
            "date_of_closing": self.date_of_closing,
            "notes": self.notes,
            "payment_recurrence": self.payment_recurrence,
            "company": self.product.company,
            "product_name": self.product.product_name,
            "product_type": self.product.product_type,
            "created_at": self.created_at,
            "updated_at": self.updated_at,
        }


# ---------------------- TABLAS DE COMENTARIOS A VIDEOS ---------------------- #
# class Exam(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     grade = db.Column(db.String(10), nullable=False)
#     created_at = db.Column(db.DateTime(timezone=True), default=datetime.datetime.now)
#     video_id = db.Column(db.Integer, nullable=False)
#     user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=True)
#     user = db.relationship('User')
    
#     def __repr__(self):
#         return '<Comment %r>' % self.id
    
#     def __init__(self, **kwargs):
#         self.grade = kwargs['grade']
#         self.video_id = kwargs['video_id']
#         self.user_id = kwargs['user_id']

    
#     @classmethod
#     def create(cls, **kwargs):
#         new_comment = cls(**kwargs)
#         db.session.add(new_comment)
#         try:
#             db.session.commit()
#             return jsonify({"msg":"Comentario creado"})
#         except Exception as error:
#             raise Exception(error.args[0], 400)

#     def serialize(self):
#         return {
#             "id": self.id,
#             "grade": self.grade,
#             "name": self.user.name,
#             "lastname": self.user.lastname,
#             "created_at": self.created_at,

#         }

# --------------------- TABLA DE RESPUESTAS A COMENTARIOS -------------------- #
# class Grades(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     content = db.Column(db.String(240), nullable=False)
#     created_at = db.Column(db.DateTime(timezone=True), default=datetime.datetime.now)
#     user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
#     user = db.relationship('User')
#     comment_id = db.Column(db.Integer, db.ForeignKey('comment.id'))
#     comment = db.relationship('Comment')
    
#     def __repr__(self):
#         return '<Comment %r>' % self.id
    
#     def __init__(self, **kwargs):
#         self.content = kwargs['content']
#         self.comment_id = kwargs['comment_id']
#         self.user_id = kwargs['user_id']
    
#     @classmethod
#     def create(cls, **kwargs):
#         new_response = cls(**kwargs)
#         db.session.add(new_response)
#         try:
#             db.session.commit()
#             return jsonify({"msg":"Respuesta creada"})
#         except Exception as error:
#             raise Exception(error.args[0], 400)

#     def serialize(self):
#         return {
#             "id": self.id,
#             "content": self.content,
#             "name": self.user.name,
#             "lastname": self.user.lastname,
#             "comment_id": self.comment_id,
#             "created_at": self.created_at,

#         }