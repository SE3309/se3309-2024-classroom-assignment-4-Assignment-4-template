from flask import Blueprint, jsonify
from db_connection import DBConnection
import os

# Create a Blueprint for your routes
routes = Blueprint('routes', __name__)

# Initialize the DB connection with environment variables
db = DBConnection(
    host=os.getenv("HOST"),
    user=os.getenv("USER"),
    password=os.getenv("PASSWORD"),
    database=os.getenv("DATABASE")
)

#Example
@routes.route('/example')
def get_data():
    conn = db.get_connection()  # Get the database connection

    if conn is None:
        return jsonify({"error": "Database connection failed"}), 500

    cursor = conn.cursor(dictionary=True)  # Use dictionary cursor for better readability
    cursor.execute("SELECT * FROM Student "+
                   "WHERE studentId = 10")
                     # Replace with your table name
    result = cursor.fetchall()  # Fetch all rows of the query result

    cursor.close()
    db.close_connection()  # Close the connection after use

    return jsonify(result)  # Return data as JSON
