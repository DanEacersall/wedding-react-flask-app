import os
from flask import Flask
from datetime import timedelta
from dotenv import dotenv_values
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS, cross_origin
import time


from flask_jwt_extended import JWTManager





app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///C:\\Users\\danie\\Desktop\\Programming\\test_app\\site.db'
db = SQLAlchemy(app)


configure = dotenv_values(".env")
app.config['JWT_SECRET_KEY'] = configure['JWT_SECRET']
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(seconds=10)
app.config["JWT_REFRESH_TOKEN_EXPIRES"] = timedelta(days=30)


jwt = JWTManager(app)

CORS(app)
cors = CORS(app, resources={
    r"/*": {
        "origins": "*"
    }
})
app.config['CORS_HEADERS'] = 'Content-Type'

from wedding import routes

