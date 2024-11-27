from flask import Blueprint, request, jsonify
from db_connection import MySQLConnection

# Define the Blueprint
routes = Blueprint("routes", __name__)
db = MySQLConnection(host='localhost', user='root', password='password', database='your_database')
db.connect()

@routes.route("/login", methods=["POST"])
def login_user(studentID, password):
    try:
        results = db.login(studentID=studentID, password=password)
        return jsonify({"results": results})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@routes.route("/register/<table_name>", methods=["GET"])
def get_all(table_name):
    try:
        results = db.get_all_from_table(table_name)
        return jsonify({"results": results})
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@routes.route("/get_all/<table_name>", methods=["GET"])
def get_all(table_name):
    try:
        results = db.get_all_from_table(table_name)
        return jsonify({"results": results})
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@routes.route("/get_all/<table_name>", methods=["GET"])
def get_all(table_name):
    try:
        results = db.get_all_from_table(table_name)
        return jsonify({"results": results})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@routes.route("/get_all/<table_name>", methods=["GET"])
def get_all(table_name):
    try:
        results = db.get_all_from_table(table_name)
        return jsonify({"results": results})
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@routes.route("/get_all/<table_name>", methods=["GET"])
def get_all(table_name):
    try:
        results = db.get_all_from_table(table_name)
        return jsonify({"results": results})
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@routes.route("/get_all/<table_name>", methods=["GET"])
def get_all(table_name):
    try:
        results = db.get_all_from_table(table_name)
        return jsonify({"results": results})
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@routes.route("/get_all/<table_name>", methods=["GET"])
def get_all(table_name):
    try:
        results = db.get_all_from_table(table_name)
        return jsonify({"results": results})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

