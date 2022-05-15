from wedding import db
from datetime import datetime

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

