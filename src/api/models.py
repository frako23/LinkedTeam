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
    agency_ybt = db.Column(db.String(50), unique=False, default = None)
    own_agency = db.Column(db.String(50), unique=False, default = None)
    status = db.Column(db.Enum(Status), default = Status.active)


    def __init__(self, **kwargs):
        self.name = kwargs['name']
        self.lastname = kwargs['lastname']
        self.email = kwargs['email']
        self.password = kwargs['password']
        self.salt = kwargs['salt']
        self.role =  kwargs['role'] if 'role' in kwargs else Role.associated

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
            "agency_ybt": self.agency_ybt,
            "own_agency": self.own_agency,
            "status": self.status.value
            # do not serialize the password, its a security breach
        }

# tabla de registro de clientes

class Cliente(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(50), unique=False, nullable=False)
    fecha = db.Column(db.String(50), unique=False, nullable=True)
    email = db.Column(db.String(50), unique=False, nullable=False)
    celular = db.Column(db.String(50), unique=True, nullable=False)
    monto = db.Column(db.String(20), unique=False, nullable=False)
    confianza = db.Column(db.String(20), unique=False, nullable=False)
    notas = db.Column(db.String(1000), unique=False, nullable=False)
    estatus = db.Column(db.String(50), unique=False, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))

    def __init__(self, **kwargs):
        self.nombre = kwargs['nombre']
        self.fecha = kwargs['fecha']
        self.email = kwargs['email']
        self.celular = kwargs['celular']
        self.monto = kwargs['monto']
        self.confianza = kwargs['confianza']
        self.notas = kwargs['notas']
        self.estatus = kwargs['estatus']
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
            "nombre": self.nombre,
            "fecha": self.fecha,
            "email": self.email,
            "celular": self.celular,
            "monto": self.monto,
            "confianza": self.confianza,
            "notas": self.notas,
            "estatus": self.estatus,
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
            "created_at": self.created_at,

        }

# Tabla de tareas para la sección TAREAS PENDIENTES

class Tarea(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    tarea = db.Column(db.String(250), unique=False, nullable=False)
    estatus = db.Column(db.String(20), unique=False, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))

    def __init__(self, **kwargs):
        self.tarea = kwargs['tarea']
        self.estatus = kwargs['estatus']
        self.user_id = kwargs['user_id']

    @classmethod
    def create(cls, **kwargs):
        new_tarea = cls(**kwargs)
        db.session.add(new_tarea)
        try:
            db.session.commit()
            return new_tarea
        except Exception as error:
            raise Exception(error.args[0], 400)
        

    def serialize(self):
        return {
            "id": self.id,
            "tarea": self.tarea,
            "estatus": self.estatus,
            "user_id": self.user_id
        }

# tabla de registro de actividades de interacciones con clientes

class Client_Activity(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    fecha = db.Column(db.String(10), nullable=False)
    tipo_de_contacto = db.Column(db.Enum(TipoDeContacto), nullable=False)
    comentario = db.Column(db.String(250), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    client_id = db.Column(db.Integer, db.ForeignKey('cliente.id'), nullable=False)

    def __init__(self, **kwargs):
        self.fecha = kwargs['fecha']
        self.tipo_de_contacto = kwargs['tipo_de_contacto']
        self.comentario = kwargs['comentario']
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
            "fecha": self.fecha,
            "tipo_de_contacto": self.tipo_de_contacto.value,
            "comentario": self.comentario,
            "user_id": self.user_id,
            "client_id": self.client_id
        }

# TABLA PARA INFOMRACION DE VIDEOS

class Courses_Data(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), unique=False, nullable=False)
    description = db.Column(db.String(500), unique=False, nullable=False)
    img_url = db.Column(db.String(250), unique=False, nullable=False)
    link_url = db.Column(db.String(250), unique=False, nullable=False)

    def __init__(self, **kwargs):
        self.title = kwargs['title']
        self.description = kwargs['description']
        self.img_url = kwargs['img_url']
        self.link_url = kwargs['link_url']

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
            "link_url": self.link_url
        }

# TABLA PARA GUARDAR LAS AGENCIAS

class Agencies(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(100), unique=False, nullable=False)
    

    def __init__(self, **kwargs):
        self.nombre = kwargs['nombre']
        

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
            "nombre": self.nombre
        }