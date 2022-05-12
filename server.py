from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS, cross_origin
from datetime import datetime
import time





app = Flask(__name__)
db = SQLAlchemy(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///site.db'

CORS(app)

class User(db.Model):
	id = db.Column(db.Integer, primary_key=True)
	username = db.Column(db.String(20), unique=True, nullable=False)
	response = db.Column(db.Boolean, unique=True, nullable=False, default=False)
	comments = db.relationship('Comment', backref='author')

	def __repr__(self):
		return f"User('{self.username}', {self.response}')"

class Comment(db.Model):
	id = db.Column(db.Integer, primary_key=True)
	date_posted = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
	content = db.Column(db.Text, nullable=False)
	user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

	def __repr__(self):
		return f"Comment('{self.date_posted}', '{self.content}')"

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
	return jsonify(serialized_user)

if __name__ == "__main__":


	app.run(debug=True)

