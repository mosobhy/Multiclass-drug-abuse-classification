from flask import Flask, jsonify, make_response, request
from .database import Users, Images
from .middlewares import token_required
from .api import login_user, signup_user, detect_drug
from werkzeug.security import generate_password_hash,check_password_hash
from flask_sqlalchemy import SQLAlchemy
import jwt
import os
import cv2
import time

app = Flask(__name__)

app.config['SECRET_KEY']='004f2af45d3a4e161a7dd2d17fdae47f'
app.config['SQLALCHEMY_DATABASE_URI']='sqlite:///database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True

db = SQLAlchemy(app)



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

    
    file = request.files["image"]

    # git dir of folder image and save the image 
    dir_path = os.path.dirname(os.path.realpath(__file__))
    full_dir = os.path.join(dir_path , "Images")
    file.filename = str(time.time()) + file.filename
    file.save(os.path.join(full_dir , file.filename))
    #load image
    img = cv2.imread(os.path.join(full_dir , file.filename))

    token = request.headers['x-access-tokens']
    data = jwt.decode(token, app.config['SECRET_KEY'], algorithms=["HS256"])
    current_user = Users.query.filter_by(userName=data['userName']).first()

    new_image = Images(user_id=current_user.id, path=file.filename, description="null", location="null")
    db.session.add(new_image)
    db.session.commit()
    
    return "result"

if __name__=='__main__':
    app.run()
