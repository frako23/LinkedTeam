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
        self.birthdate = kwargs['birthdate'] if 'sales_goal' in kwargs else None
        self.email = kwargs['email'] if 'sales_goal' in kwargs else None
        self.cellphone = kwargs['cellphone'] if 'sales_goal' in kwargs else None
        self.amount = kwargs['amount'] if 'sales_goal' in kwargs else None 
        self.trust = kwargs['trust']
        self.notes = kwargs['notes'] if 'sales_goal' in kwargs else None
        self.status = kwargs['status']
        self.tag = kwargs['tag'] if 'sales_goal' in kwargs else None
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

# ---------------------- TABLAS DE COMENTARIOS A VIDEOS ---------------------- #
class Comment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String(240), nullable=False)
    created_at = db.Column(db.DateTime(timezone=True), default=datetime.datetime.now)
    video_id = db.Column(db.Integer, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=True)
    user = db.relationship('User')
    
    def __repr__(self):
        return '<Comment %r>' % self.id
    
    def __init__(self, **kwargs):
        self.content = kwargs['content']
        self.video_id = kwargs['video_id']
        self.user_id = kwargs['user_id']

    
    @classmethod
    def create(cls, **kwargs):
        new_comment = cls(**kwargs)
        db.session.add(new_comment)
        try:
            db.session.commit()
            return jsonify({"msg":"Comentario creado"})
        except Exception as error:
            raise Exception(error.args[0], 400)

    def serialize(self):
        return {
            "id": self.id,
            "content": self.content,
            "name": self.user.name,
            "lastname": self.user.lastname,
            "created_at": self.created_at,

        }

# --------------------- TABLA DE RESPUESTAS A COMENTARIOS -------------------- #
class Response(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String(240), nullable=False)
    created_at = db.Column(db.DateTime(timezone=True), default=datetime.datetime.now)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    user = db.relationship('User')
    comment_id = db.Column(db.Integer, db.ForeignKey('comment.id'))
    comment = db.relationship('Comment')
    
    def __repr__(self):
        return '<Comment %r>' % self.id
    
    def __init__(self, **kwargs):
        self.content = kwargs['content']
        self.comment_id = kwargs['comment_id']
        self.user_id = kwargs['user_id']
    
    @classmethod
    def create(cls, **kwargs):
        new_response = cls(**kwargs)
        db.session.add(new_response)
        try:
            db.session.commit()
            return jsonify({"msg":"Respuesta creada"})
        except Exception as error:
            raise Exception(error.args[0], 400)

    def serialize(self):
        return {
            "id": self.id,
            "content": self.content,
            "name": self.user.name,
            "lastname": self.user.lastname,
            "comment_id": self.comment_id,
            "created_at": self.created_at,

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
    created_at = db.Column(db.DateTime(timezone=True), default=date.today())
    updated_at = db.Column(db.DateTime(timezone=True), default=date.today(), onupdate=date.today())
    manager_id = db.Column(db.Integer,unique=True, nullable=False)

    def __init__(self, **kwargs):
        self.title = kwargs['title']
        self.description = kwargs['description']
        self.img_url = kwargs['img_url']
        self.link_url = kwargs['link_url']
        self.manager_id = kwargs['manager_id']

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
class Policies_names(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    policy_name = db.Column(db.String(50), nullable=False)
    policy_type = db.Column(db.String(50), nullable=False)
    company = db.Column(db.String(50), nullable=False)
    manager_id = db.Column(db.Integer, nullable=False)

    def __init__(self, **kwargs):
        self.policy_name = kwargs['policy_name']
        self.policy_type = kwargs['policy_type']
        self.company = kwargs['company']
        self.manager_id = kwargs['manager_id']

    @classmethod
    def create(cls, **kwargs):
        new_policy_name = cls(**kwargs)
        db.session.add(new_policy_name)
        try:
            db.session.commit()
            return jsonify({"msg":"Nombre de póliza creada"})
        except Exception as error:
            raise Exception(error.args[0], 400)

    def serialize(self):
        return {
            "id": self.id,
            "policy_name": self.policy_name,
            "policy_type": self.policy_type,
            "company": self.company,
            "manager_id": self.manager_id,
        }

# ---- TABLA PARA GUARDAR INFORMACIÓN DE LA PÓLIZAS COMPRADAS POR CLIENTES --- #
class Client_Policies(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    policy_name =  db.Column(db.String(50), nullable=False)
    policy_type =  db.Column(db.String(50), nullable=False)
    policy_number = db.Column(db.String(50), nullable=False)
    date_of_issue = db.Column(db.String(10), nullable=False)
    payment_method = db.Column(db.String(250), nullable=False)
    notes = db.Column(db.String(250), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    client_id = db.Column(db.Integer, db.ForeignKey('cliente.id'), nullable=False)
    created_at = db.Column(db.DateTime(timezone=True), default=date.today())
    updated_at = db.Column(db.DateTime(timezone=True), default=date.today(), onupdate=date.today())

    def __init__(self, **kwargs):
        self.policy_name = kwargs['policy_name']
        self.policy_type = kwargs['policy_type']
        self.policy_number = kwargs['policy_number']
        self.date_of_issue = kwargs['date_of_issue']
        self.payment_method = kwargs['payment_method']
        self.notes = kwargs['notes']
        self.user_id = kwargs['user_id']
        self.client_id = kwargs['client_id']


    @classmethod
    def create(cls, **kwargs):
        new_activity = cls(**kwargs)
        db.session.add(new_activity)
        try:
            db.session.commit()
            return jsonify({"msg":"Póliza de cliente creada"})
        except Exception as error:
            raise Exception(error.args[0], 400)

    def serialize(self):
        return {
            "id": self.id,
            "policy_name": self.policy_name,
            "policy_type": self.policy_type,
            "policy_number": self.policy_number,
            "date_of_issue": self.date_of_issue,
            "payment_method": self.payment_method,
            "notes": self.notes,
            "user_id": self.user_id,
            "client_id": self.client_id,
            "created_at": self.created_at,
            "updated_at": self.updated_at
        }

