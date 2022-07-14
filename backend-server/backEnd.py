import sqlite3
from flask import Flask, jsonify, make_response, request
from sqlalchemy import null
from werkzeug.security import generate_password_hash,check_password_hash
from flask_sqlalchemy import SQLAlchemy
from functools import wraps
import uuid
import jwt
import datetime
import jwt
import os
import cv2
import numpy as np
import joblib
import sys
sys.modules['sklearn.externals.joblib'] = joblib
import traceback


app = Flask(__name__)

app.config['SECRET_KEY']='004f2af45d3a4e161a7dd2d17fdae47f'
app.config['SQLALCHEMY_DATABASE_URI']='sqlite:///database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True

db = SQLAlchemy(app)

class Users(db.Model):
   id = db.Column(db.Integer, primary_key=True,)
   public_id = db.Column(db.String(50), unique = True)
   userName = db.Column(db.String(100), unique=True, nullable=False)
   firstName = db.Column(db.String(50), nullable=False)
   lastName = db.Column(db.String(50), nullable=False)
   password = db.Column(db.String(50), nullable=False)
   email = db.Column(db.String(100), unique=True, nullable=False)



class Images(db.Model):
   id = db.Column(db.Integer, primary_key=True)
   user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
   path = db.Column(db.String(1000), nullable=False)
   description = db.Column(db.String(500), nullable=False)
   location = db.Column(db.String(200))

#db.create_all()

def token_required(f):
   @wraps(f)
   def decorator(*args, **kwargs):
       token = None
       if 'x-access-tokens' in request.headers:
           token = request.headers['x-access-tokens']

       if not token:
           return jsonify({'message': 'a valid token is missing'})
       try:
           data = jwt.decode(token, app.config['SECRET_KEY'], algorithms=["HS256"])
           current_user = Users.query.filter_by(userName=data['userName']).first()
       except:
           return jsonify({'message': 'token is invalid'})

       return f(current_user, *args, **kwargs)
   return decorator


@app.route('/register', methods=['POST'])
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



@app.route('/login', methods=['POST'])
def login_user():
    '''
   
'''
    data = request.get_json()
    user = Users.query.filter_by(userName=data['userName']).first()
    
    if not user:
        return make_response({'User' : "user not found"},  400)

    if check_password_hash(user.password, data['password']):
        token = jwt.encode({'userName' : user.userName}, app.config['SECRET_KEY'], "HS256")

        return jsonify({'token' : token})

    return make_response({'password' : 'password is wrong'}, 401)


@app.route("/image", methods=['Post'])
@token_required
def image(res):

    lables_enum = {
        0: "normal",
        1: "alcohol", 
        2: "bdz", 
        3: "ecastasy",
        4: "organic_solvents"
    }
    
    data = request.get_json()

    #Load the model
    rnd_clf = joblib.load('./model/rnd_classifier.pkl')
    features = data['image'].split(',')[:-1]
    predictions = rnd_clf.predict(np.array(features))

    return lables_enum[predictions.index(max(predictions))]


if __name__=='__main__':
    app.run()
