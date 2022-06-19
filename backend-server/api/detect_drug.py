from flask import jsonify, request
from ..database import Users, Images, db 
from ..server import app
import jwt
from werkzeug.security import generate_password_hash
import os
import time 
import cv2



def detect_drug(res):

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
