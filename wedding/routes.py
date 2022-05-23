from unicodedata import name
from wedding.models import User, Comment
from wedding import app
from flask import jsonify, request
from flask_cors import cross_origin


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
@cross_origin(origin='*', headers=['Content-Type','Authorization'])
def get_current_time(id):
	user = User.query.get(id)
	serialized_user = db_serializer(user)
	return serialized_user

@app.route("/home")
def home():
	return {"members": ["member"]}

@app.route('/token', methods=['POST', 'GET'])
@cross_origin(origin='*', headers=['Content-Type','Authorization'])
def create_token():
	json_password = request.json.get("name", None)
	json_id = request.json.get("id", None)
	user = User.query.get(json_id)
	if json_password != user.username:
		return jsonify({"msg": "No good mate"}), 401
	
	access_token = create_access_token(identity=json_password)
	return jsonify(access_token=access_token)   
