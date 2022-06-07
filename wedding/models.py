from wedding import db
from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash

class User(db.Model):
	id = db.Column(db.Integer, primary_key=True)
	username = db.Column(db.String(20), unique=True, nullable=False)
	password = db.Column(db.String(10), nullable=False)
	response = db.Column(db.Boolean, nullable=False, default=False)
	password_hash = db.Column(db.String(128))
	dietary = db.Column(db.String(200))

	@property
	def password(self):
		raise AttributeError('password is not a readable attribute')

	@password.setter
	def password(self, password):
		self.password_hash = generate_password_hash(password)

	def verify_password(self, password):
		return check_password_hash(self.password_hash, password)




	def __repr__(self):
		return f"User('{self.username}', {self.response}')"





