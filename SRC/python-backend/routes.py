from flask import Flask, request, Blueprint, jsonify
from db_connection import DBConnection
import os
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


@routes.route('/events/<int:student_id>', methods=['GET'])
def get_calendar_events(student_id):
    conn = db.get_connection()  # Get the database connection

    if conn is None:
        return jsonify({"error": "Database connection failed"}), 500

    cursor = conn.cursor(dictionary=True)  # Use dictionary cursor for better readability

    # Query to select calendar events based on studentID
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
    cursor.execute(query, (student_id, student_id))  # Passing the same student_id for both placeholders

    
    result = cursor.fetchall()  # Fetch all rows of the query result

    cursor.close()
    db.close_connection()  # Close the connection after use

    # Check if no results were found
    if not result:
        return jsonify({"error": "No events found for this student."}), 404

    # Function to handle serialization of the result
    def serialize_event(event):
        # Convert timedelta to total seconds (or any preferred unit)
        if isinstance(event['eventDuration'], timedelta):
            event['eventDuration'] = event['eventDuration'].total_seconds()  # Convert to seconds

        

        return event

    # Serialize each event in the result
    serialized_result = [serialize_event(event) for event in result]

    return jsonify(serialized_result)  # Return data as JSON
@routes.route('/events', methods=['POST'])
def add_calendar_event():
    conn = db.get_connection()  # Get the database connection

    if conn is None:
        return jsonify({"error": "Database connection failed"}), 500

    cursor = conn.cursor(dictionary=True)

    # Extract event details from the request body
    event_data = request.get_json()
    event_name = event_data.get('eventName')
    event_description = event_data.get('eventDescription')
    event_start = event_data.get('eventStart')
    event_duration = event_data.get('eventDuration')
    course_code = event_data.get('courseCode')
    cyear = event_data.get('cyear')
    student_id = event_data.get('studentId')
    print(student_id)

    # Validate required fields
    if not all([event_name, event_start, event_duration]):
        return jsonify({"error": "Missing required fields (eventName, eventStart, eventDuration)"}), 400

    # Insert event into the database
    query = """
    INSERT INTO CalendarEvent (eventName, eventDescription, eventStart, eventDuration, courseCode, cyear, studentID)
    VALUES (%s, %s, %s, %s, %s, %s, %s)
    """
    try:
        cursor.execute(query, (event_name, event_description, event_start, event_duration, course_code, cyear, student_id))
        conn.commit()  # Commit the transaction
    except Exception as e:
        conn.rollback()  # Rollback in case of error
        return jsonify({"error": f"Failed to add event: {str(e)}"}), 500
    finally:
        cursor.close()
        db.close_connection()

    return jsonify({"message": "Event added successfully!"}), 201
@routes.route('/events/<int:event_id>', methods=['DELETE'])
def delete_calendar_event(event_id):
    conn = db.get_connection()  # Get the database connection

    if conn is None:
        return jsonify({"error": "Database connection failed"}), 500

    cursor = conn.cursor(dictionary=True)

    # Delete the event from the CalendarEvent table
    query = "DELETE FROM CalendarEvent WHERE eventID = %s"

    try:
        cursor.execute(query, (event_id,))
        conn.commit()  # Commit the transaction
        
        # Check if any row was deleted
        if cursor.rowcount == 0:
            return jsonify({"error": "Event not found"}), 404

    except Exception as e:
        conn.rollback()  # Rollback in case of error
        return jsonify({"error": f"Failed to delete event: {str(e)}"}), 500
    finally:
        cursor.close()
        db.close_connection()

    return jsonify({"message": "Event deleted successfully!"}), 200

