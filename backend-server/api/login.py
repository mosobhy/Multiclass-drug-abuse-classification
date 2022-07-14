from flask import jsonify, make_response, request
from ..database import Users 
from ..server import app
import jwt
from werkzeug.security import check_password_hash

def login_user():

    data = request.get_json()
    user = Users.query.filter_by(userName=data['userName']).first()
    
    if not user:
        return make_response({'User' : "user not found"},  400)

    if check_password_hash(user.password, data['password']):
        token = jwt.encode({'userName' : user.userName}, app.config['SECRET_KEY'], "HS256")

        return jsonify({'token' : token})

    return make_response({'password' : 'password is wrong'}, 401)
