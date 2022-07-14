
from . import db, app

class Images(db.Model):
   id = db.Column(db.Integer, primary_key=True)
   user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
   path = db.Column(db.String(1000), nullable=False)
   description = db.Column(db.String(500), nullable=False)
   location = db.Column(db.String(200))
