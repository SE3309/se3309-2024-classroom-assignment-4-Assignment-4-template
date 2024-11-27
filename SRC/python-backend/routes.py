from flask import Flask, request, Blueprint, jsonify
from db_connection import DBConnection
import os
import jwt
import datetime
from models import CalendarEvent
from datetime import timedelta

# Create a Blueprint for your routes
routes = Blueprint('routes', __name__)

# Initialize the DB connection with environment variables
db = DBConnection(
    host=os.getenv("HOST"),
    user=os.getenv("USER"),
    password=os.getenv("PASSWORD"),
    database=os.getenv("DATABASE")
)

# Secret key for JWT (kept for potential future use)
SECRET_KEY = os.getenv("SECRET_KEY", "your_secret_key")

# Login route (unchanged)
@routes.route('/api/login', methods=['POST'])
def login():
    conn = db.get_connection()
    if conn is None:
        return jsonify({"error": "Database connection failed"}), 500

    cursor = conn.cursor(dictionary=True)
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"error": "Email and password are required"}), 400

    # Query to validate user credentials
    query = "SELECT * FROM Student WHERE email = %s AND password = %s"
    cursor.execute(query, (email, password))
    user = cursor.fetchone()

    cursor.close()
    db.close_connection()

    if not user:
        return jsonify({"error": "Invalid email or password"}), 401

    # Generate token
    token = jwt.encode(
        {
            "user_id": user["studentID"],
            "role": "Student",
            "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=6)
        },
        SECRET_KEY,
        algorithm="HS256"
    )
    return jsonify({"token": token, "message": "Login successful!"}), 200

# Example route (now unprotected)
@routes.route('/api/example', methods=['GET'])
def get_data():
    conn = db.get_connection()
    if conn is None:
        return jsonify({"error": "Database connection failed"}), 500

    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM Student WHERE studentId = 10")
    result = cursor.fetchall()

    cursor.close()
    db.close_connection()

    return jsonify(result)

# Get calendar events (now unprotected)
@routes.route('/api/events/<int:student_id>', methods=['GET'])
def get_calendar_events(student_id):
    conn = db.get_connection()
    if conn is None:
        return jsonify({"error": "Database connection failed"}), 500

    cursor = conn.cursor(dictionary=True)
    query = """
    SELECT * 
    FROM CalendarEvent
    WHERE studentId = %s 
       OR courseCode IN (
           SELECT courseCode
           FROM StudentCourse
           WHERE studentId = %s 
             AND cyear = 2024
       )
    """
    cursor.execute(query, (student_id, student_id))
    result = cursor.fetchall()

    cursor.close()
    db.close_connection()

    if not result:
        return jsonify({"error": "No events found for this student."}), 404

    # Serialize event duration if needed
    for event in result:
        if isinstance(event['eventDuration'], timedelta):
            event['eventDuration'] = event['eventDuration'].total_seconds()

    return jsonify(result)

# Add a calendar event (now unprotected)
@routes.route('/api/events', methods=['POST'])
def add_calendar_event():
    conn = db.get_connection()
    if conn is None:
        return jsonify({"error": "Database connection failed"}), 500

    cursor = conn.cursor(dictionary=True)
    event_data = request.get_json()
    event_name = event_data.get('eventName')
    event_description = event_data.get('eventDescription')
    event_start = event_data.get('eventStart')
    event_duration = event_data.get('eventDuration')
    course_code = event_data.get('courseCode')
    cyear = event_data.get('cyear')
    student_id = event_data.get('studentId')

    if not all([event_name, event_start, event_duration]):
        return jsonify({"error": "Missing required fields (eventName, eventStart, eventDuration)"}), 400

    query = """
    INSERT INTO CalendarEvent (eventName, eventDescription, eventStart, eventDuration, courseCode, cyear, studentID)
    VALUES (%s, %s, %s, %s, %s, %s, %s)
    """
    try:
        cursor.execute(query, (event_name, event_description, event_start, event_duration, course_code, cyear, student_id))
        conn.commit()
    except Exception as e:
        conn.rollback()
        return jsonify({"error": f"Failed to add event: {str(e)}"}), 500
    finally:
        cursor.close()
        db.close_connection()

    return jsonify({"message": "Event added successfully!"}), 201

# Delete a calendar event (now unprotected)
@routes.route('/api/events/<int:event_id>', methods=['DELETE'])
def delete_calendar_event(event_id):
    conn = db.get_connection()
    if conn is None:
        return jsonify({"error": "Database connection failed"}), 500

    cursor = conn.cursor(dictionary=True)
    query = "DELETE FROM CalendarEvent WHERE eventID = %s"

    try:
        cursor.execute(query, (event_id,))
        conn.commit()
        if cursor.rowcount == 0:
            return jsonify({"error": "Event not found"}), 404
    except Exception as e:
        conn.rollback()
        return jsonify({"error": f"Failed to delete event: {str(e)}"}), 500
    finally:
        cursor.close()
        db.close_connection()

    return jsonify({"message": "Event deleted successfully!"}), 200
