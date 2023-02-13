import os
import sys
from datetime import datetime
from sqlalchemy import Column, ForeignKey, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from sqlalchemy import create_engine
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), unique=False, nullable=False)
    lastname = db.Column(db.String(50), unique=False, nullable=False)
    phone = db.Column(db.String(50), unique=False, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    agency = db.Column(db.String(150), unique=False, nullable=False)

    def __init__(self, **kwargs):
        self.name = kwargs['name']
        self.lastname = kwargs['lastname']
        self.phone = kwargs['phone']
        self.email = kwargs['email']
        self.password = kwargs['password']
        self.agency = kwargs['agency']

    @classmethod
    def create(cls, **kwargs):
        new_user = cls(**kwargs)
        db.session.add(new_user)
        try:
            db.session.commit()
            return new_user
        except Exception as error:
            raise Exception(error.args[0], 400)
        print(new_user.id)
        return new_user

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "name": self.name,
            "lastname": self.lastname,
            "phone": self.phone,
            "agency": self.agency,
            # do not serialize the password, its a security breach
        }
class Cliente(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(50), unique=False, nullable=False)
    fecha = db.Column(db.String(50), unique=False, nullable=True)
    email = db.Column(db.String(50), unique=False, nullable=False)
    celular = db.Column(db.String(50), unique=True, nullable=False)
    monto = db.Column(db.String(20), unique=False, nullable=False)
    confianza = db.Column(db.String(20), unique=False, nullable=False)
    notas = db.Column(db.String(1000), unique=False, nullable=False)

    def __init__(self, **kwargs):
        self.nombre = kwargs['nombre']
        self.fecha = kwargs['fecha']
        self.email = kwargs['email']
        self.celular = kwargs['celular']
        self.monto = kwargs['monto']
        self.confianza = kwargs['confianza']
        self.notas = kwargs['notas']

    @classmethod
    def create(cls, **kwargs):
        new_cliente = cls(**kwargs)
        db.session.add(new_cliente)
        try:
            db.session.commit()
            return new_cliente
        except Exception as error:
            raise Exception(error.args[0], 400)
        print(new_cliente.id)
        return new_cliente

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
            # do not serialize the password, its a security breach
        }