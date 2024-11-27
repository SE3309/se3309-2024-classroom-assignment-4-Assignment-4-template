from flask import Blueprint, jsonify
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
    SELECT * FROM CalendarEvent 
    WHERE studentID = %s
    """
    cursor.execute(query, (student_id,))  # Execute the query with student_id as a parameter
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
