from flask import jsonify, request
from ..database import Users, db 
from ..server import app
import jwt
from werkzeug.security import generate_password_hash


def signup_user():
   data = request.get_json()
   hashed_password = generate_password_hash(data['password'], method='sha256')

   user = Users.query.filter_by(userName=data['userName']).first()
   email = Users.query.filter_by(email=data['email']).first()
   print(email)
   if user:
       return jsonify({'message': 'user name is exist'})

   if email:
       return jsonify({'message': 'email is exist'})

   new_user = Users(userName=data['userName'], firstName=data['firstName'], lastName=data['lastName'], password=hashed_password, email=data['email'])
   db.session.add(new_user)
   db.session.commit()

   encoded_jwt = jwt.encode({"userName": data['userName']}, app.config['SECRET_KEY'], algorithm="HS256")

   return jsonify({'token': encoded_jwt})
