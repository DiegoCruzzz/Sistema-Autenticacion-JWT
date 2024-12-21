from flask import Flask, request, jsonify, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required, JWTManager

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)

@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():
    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }
    return jsonify(response_body), 200

@api.route('/usuario', methods=['POST'])
def create_usuario():
    body = request.form
    usuario = User.query.filter_by(email=body["email"]).first()
    if usuario is None:
        new_usuario = User(
            email=request.form["email"],
            password=request.form["password"]
        )
        db.session.add(new_usuario)
        db.session.commit()
        return jsonify({"msg": "Usuario creado exitosamente"}), 201
    else:
        return jsonify({"msg": "Ya existe un usuario con ese email"}), 409

@api.route('/usuario', methods=['GET'])
def get_usuarios():
    all_usuarios = User.query.all()
    results = [usuario.serialize() for usuario in all_usuarios]
    return jsonify(results), 200

@api.route('/usuario/<int:usuario_id>', methods=['GET'])
def get_usuario(usuario_id):
    usuario = User.query.filter_by(id=usuario_id).first()
    if usuario is None:
        return jsonify({"error": "Usuario no encontrado"}), 404
    return jsonify(usuario.serialize()), 200

@api.route('/usuario/<int:usuario_id>', methods=['DELETE'])
def delete_usuario(usuario_id):
    usuario = User.query.filter_by(id=usuario_id).first()
    if usuario is None:
        return jsonify({"error": "Usuario no encontrado"}), 404
    db.session.delete(usuario)
    db.session.commit()
    return jsonify({"msg": "Usuario eliminado exitosamente"}), 200

@api.route('/usuario/login', methods=['POST'])
def login_user():
    body = request.get_json()
    email = body.get("email")
    password = body.get("password")
    user = User.query.filter_by(email=email).first()
    if user and user.password == password:
        access_token = create_access_token(identity=user.id)
        return jsonify('Se logueo correctamente!', access_token), 200
    else:
        return jsonify('Hubo un error en las credenciales'), 401
