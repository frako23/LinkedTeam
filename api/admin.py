  
import os
from flask_admin import Admin
from api.models import db, User, Cliente, Tarea, Client_Activity, Courses, Payment, Account_Information, Products, Client_Products
from flask_admin.contrib.sqla import ModelView

def setup_admin(app):
    app.secret_key = os.environ.get('FLASK_APP_KEY', 'sample key')
    app.config['FLASK_ADMIN_SWATCH'] = 'cerulean'
    admin = Admin(app, name='4Geeks Admin', template_mode='bootstrap3')

    
    # Add your models here, for example this is how we add a the User model to the admin
    admin.add_view(ModelView(User, db.session))
    admin.add_view(ModelView(Cliente, db.session))
    admin.add_view(ModelView(Tarea, db.session))
    admin.add_view(ModelView(Client_Activity, db.session))
    admin.add_view(ModelView(Courses, db.session))
    admin.add_view(ModelView(Payment, db.session))
    admin.add_view(ModelView(Products, db.session))
    admin.add_view(ModelView(Account_Information, db.session))
    admin.add_view(ModelView(Client_Products, db.session))
    
    # You can duplicate that line to add mew models
    # admin.add_view(ModelView(YourModelName, db.session))