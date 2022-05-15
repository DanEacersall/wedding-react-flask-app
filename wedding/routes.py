from unicodedata import name
from requests import request
from wedding.models import User, Comment
from wedding import app
from flask import jsonify

from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt
from flask_jwt_extended import jwt_required

def db_serializer(user):
	return {
		'id': user.id,
		'name': user.username,
		'response': user.response

	}

@app.route('/time/<id>')
def get_current_time(id):
	user = User.query.get(id)
	serialized_user = db_serializer(user)
	return serialized_user

@app.route("/home")
def home():
	return {"members": ["member"]}

@app.route('/token', methods=['POST'])
def create_token():
	username = request.json.get("name", None)
	
	if username != "Harry":
		return jsonify({"msg": "No good mate"}), 401
	
	access_token = create_access_token(identity=name)
	return jsonify(access_token=access_token)
