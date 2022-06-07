from unicodedata import name

from sqlalchemy import null, true
from wedding.models import User
from wedding import app, db
from flask import jsonify, request
from flask_cors import cross_origin


from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt
from flask_jwt_extended import jwt_required

def db_serializer(user):
	return {
		'id': user.id,
		'name': user.username,
		'response': user.response,
		'dietary': user.dietary

	}
def going(user):
	if user.response:
		return "You are Going"
	else:
		return "Sorry you can't make it"




#gets the users name from the database, serializes and returns to client
@app.route('/time/<id>')
@cross_origin(origin='*', headers=['Content-Type','Authorization'])
def get_current_time(id):
	user = User.query.get(id)
	serialized_user = db_serializer(user)
	return serialized_user

@app.route("/home")
def home():
	return {"members": ["member"]}

#receives password from client, checks if password hash is correct by user id obtained in /time/<id> 
#returns access token and user response as boolean value
@app.route('/token', methods=['POST'])
@cross_origin(origin='*', headers=['Content-Type','Authorization'])
def create_token():
	json_password = request.json.get("password", None)
	json_id = request.json.get("id", None)
	user = User.query.get(json_id)
	if user.verify_password(json_password) != True:
		return {'response': 'incorrect password'}, 401
	if user.verify_password(json_password) == True:
		access_token = create_access_token(identity=json_password)
		user_data = user.response
		return jsonify(access_token=access_token, response= 'success', user_data=user_data, json_id=json_id)  

@app.route('/verify', methods=['POST'])
@cross_origin(origin='*', headers=['Content-Type','Authorization'])
@jwt_required()
def verify():
	rsvp = request.json.get("response", None)
	json_id = request.json.get("id", None)
	diet = request.json.get("dietary", None)
	user = User.query.get(json_id)
	user.response = rsvp
	if diet == None:
		diet = 'None' 
	user.dietary = diet
	db.session.commit()
	text = going(user)

	return jsonify(rsvp, text, diet)
