
from . import db, app

class Users(db.Model):
   id = db.Column(db.Integer, primary_key=True,)
   public_id = db.Column(db.String(50), unique = True)
   userName = db.Column(db.String(100), unique=True, nullable=False)
   firstName = db.Column(db.String(50), nullable=False)
   lastName = db.Column(db.String(50), nullable=False)
   password = db.Column(db.String(50), nullable=False)
   email = db.Column(db.String(100), unique=True, nullable=False)
