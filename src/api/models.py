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
    
    
    own_agency_id = db.Column(db.Integer, db.ForeignKey('agencies.id'))
    own_agency = db.relationship("Agencies", backref = "users_own_agency", foreign_keys=[own_agency_id])

    agency_id = db.Column(db.Integer, db.ForeignKey('agencies.id'))
    agency = db.relationship("Agencies", backref = "users_agency", foreign_keys=[agency_id])
    
    company = db.relationship("Company", backref = "user")
    company_id = db.Column(db.Integer, db.ForeignKey('company.id'))


    def __init__(self, **kwargs):
        self.name = kwargs['name']
        self.lastname = kwargs['lastname']
        self.email = kwargs['email']
        self.password = kwargs['password']
        self.salt = kwargs['salt']
        self.role =  kwargs['role'] if 'role' in kwargs else Role.associated
        self.sales_goal = kwargs['sales_goal'] if 'sales_goal' in kwargs else None
        self.agency_id = kwargs['agency_id'] if 'agency_id' in kwargs else None
        self.own_agency_id = kwargs['own_agency_id'] if 'own_agency_id' in kwargs else None

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
            "agency": self.agency.name if self.agency else None,
            "own_agency": self.own_agency.name if self.own_agency else None,
            "company": self.company.name if self.company else None,
            "status": self.status.value,
            "sales_goal": self.sales_goal
            # do not serialize the password, its a security breach
        }

# tabla de registro de clientes

class Cliente(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), unique=False, nullable=False)
    birthdate = db.Column(db.String(50), unique=False, nullable=True)
    email = db.Column(db.String(50), unique=False, nullable=False)
    cellphone = db.Column(db.String(50), unique=True, nullable=False)
    amount = db.Column(db.String(20), unique=False, nullable=False)
    trust = db.Column(db.String(20), unique=False, nullable=False)
    notes = db.Column(db.String(1000), unique=False, nullable=False)
    status = db.Column(db.String(50), unique=False, nullable=False)
    created_at = db.Column(db.DateTime(timezone=True), default=date.today())
    updated_at = db.Column(db.DateTime(timezone=True), default=date.today(), onupdate=date.today())
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))

    def __init__(self, **kwargs):
        self.name = kwargs['name']
        self.birthdate = kwargs['birthdate']
        self.email = kwargs['email']
        self.cellphone = kwargs['cellphone']
        self.amount = kwargs['amount']
        self.trust = kwargs['trust']
        self.notes = kwargs['notes']
        self.status = kwargs['status']
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
            "created_at": self.created_at,
            "updated_at": self.updated_at,
            "user_id": self.user_id
            # do not serialize the password, its a security breach
        }

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

# Tabla de tareas para la sección TAREAS PENDIENTES

class Tarea(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    task = db.Column(db.String(250), unique=False, nullable=False)
    status = db.Column(db.String(20), unique=False, nullable=False)
    created_at = db.Column(db.DateTime(timezone=True), default=date.today())
    updated_at = db.Column(db.DateTime(timezone=True), default=date.today(), onupdate=date.today())
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))

    def __init__(self, **kwargs):
        self.tarea = kwargs['tarea']
        self.status = kwargs['estatus']
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
            "tarea": self.task,
            "status": self.estatus,
            "user_id": self.user_id,
            "created_at": self.created_at,
            "updated_at": self.updated_at,
        }

# tabla de registro de actividades de interacciones con clientes

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

# TABLA PARA INFOMRACION DE VIDEOS

class Courses(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), unique=False, nullable=False)
    description = db.Column(db.String(500), unique=False, nullable=False)
    img_url = db.Column(db.String(250), unique=False, nullable=False)
    link_url = db.Column(db.String(250), unique=False, nullable=False)
    created_at = db.Column(db.DateTime(timezone=True), default=date.today())
    updated_at = db.Column(db.DateTime(timezone=True), default=date.today(), onupdate=date.today())
    agencies_id = db.Column(db.Integer, db.ForeignKey('agencies.id'))
    company_id = db.Column(db.Integer, db.ForeignKey('company.id'))

    def __init__(self, **kwargs):
        self.title = kwargs['title']
        self.description = kwargs['description']
        self.img_url = kwargs['img_url']
        self.link_url = kwargs['link_url']
        self.agencies_id = kwargs['agencies_id']
        self.company_id = kwargs['company_id']

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
            "agencies_id": self.agencies_id,
            "company_id": self.company_id,
            "created_at": self.created_at,
            "updated_at": self.updated_at,
        }

# TABLA PARA GUARDAR COMPAÑIAS
class Company(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), unique=False, nullable=False)
    created_at = db.Column(db.DateTime(timezone=True), default=date.today())
    updated_at = db.Column(db.DateTime(timezone=True), default=date.today(), onupdate=date.today())

    def __init__(self, **kwargs):
        self.name = kwargs['name']

    @classmethod
    def create(cls, **kwargs):
        new_company = cls(**kwargs)
        db.session.add(new_company)
        try:
            db.session.commit()
            return new_company
        except Exception as error:
            raise Exception(error.args[0], 400)
        

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "created_at": self.created_at,
            "updated_at": self.updated_at
        }

# TABLA PARA GUARDAR LAS AGENCIAS
class Agencies(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), unique=False, nullable=False)
    agency_logo = db.Column(db.String(1000), unique=False, nullable=False)
    created_at = db.Column(db.DateTime(timezone=True), default=date.today())
    updated_at = db.Column(db.DateTime(timezone=True), default=date.today(), onupdate=date.today())


    company_id = db.Column(db.Integer, db.ForeignKey('company.id'))
    company = db.relationship("Company", backref = "agencies")

    def __init__(self, **kwargs):
        self.name = kwargs['name']
        self.agency_logo = kwargs['agency_logo']
        self.company_id = kwargs['company_id']

    @classmethod
    def create(cls, **kwargs):
        new_agency = cls(**kwargs)
        db.session.add(new_agency)
        try:
            db.session.commit()
            return new_agency
        except Exception as error:
            raise Exception(error.args[0], 400)
        

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "agency_logo": self.agency_logo,
            "company": self.company.name,
            "created_at": self.created_at,
            "updated_at": self.updated_at
        }

# TABLA DE REGISTROS DE PAGOS
class Payment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    img_url = db.Column(db.String(100), unique=False, nullable=False)
    referance = db.Column(db.String(100), unique=False, nullable=False)
    payment_method = db.Column(db.String(100), unique=False, nullable=False)
    created_at = db.Column(db.DateTime(timezone=True), default=date.today())
    user = db.relationship("User", backref = "payment")
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    

    def __init__(self, **kwargs):
        self.img_url = kwargs['img_url']
        self.referance = kwargs['referance']
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
            "img_url": self.img_url,
            "referance": self.referance,
            "payment_method": self.payment_method,
            "user": self.user.name,
            "created_at": self.created_at,
            "updated_at": self.updated_at
        }

# TABLA DE INFORMACIÓN DE LA CUENTA
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