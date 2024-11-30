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
    user='root',
    password=os.getenv("PASSWORD"),
    database=os.getenv("DATABASE")
)

# Secret key for JWT (kept for potential future use)
SECRET_KEY = os.getenv("SECRET_KEY", "your_secret_key")

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

# Faculty Member Login route
# TESTING ID: 6, PASSWORD LBp9F7jQ, EMAIL: faculty6@example.com
@routes.route('/api/faculty/login', methods=['POST'])
def faculty_login():
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
    query = "SELECT * FROM FacultyMember WHERE email = %s AND password = %s"
    cursor.execute(query, (email, password))
    user = cursor.fetchone()

    cursor.close()
    db.close_connection()

    if not user:
        return jsonify({"error": "Invalid email or password"}), 401

    # Generate token
    token = jwt.encode(
        {
            "user_id": user["facultyID"],
            "role": "Faculty",
            "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=6)
        },
        SECRET_KEY,
        algorithm="HS256"
    )
    return jsonify({"token": token, "message": "Faculty Login successful!"}), 200

# Get a course for the student
@routes.route('/api/student/search', methods=['GET'])
def get_student_search(): 
    search = request.args.get('search')  # Capture 'search' from query parameters
    if not search:
        return jsonify({"error": "Missing 'search' parameter"}), 400
    
    conn = db.get_connection()
    if conn is None: 
        return jsonify({"error": "Database connection failed"}), 500
    
    try:
        cursor = conn.cursor(dictionary=True)
        query = """
        SELECT * 
        FROM CourseDetails
        WHERE courseName like %s OR courseCode like %s
        """
        cursor.execute(query, (search, search))
        result = cursor.fetchall()
    except Exception as e:
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500
    finally:
        cursor.close()
        db.close_connection()

    if not result:
        return jsonify({"error": "Could not find any course."}), 404

    return jsonify(result)

# Get a course for the student
@routes.route('/api/student/view-course', methods=['GET'])
def get_courses(): 
    studentID = request.args.get('studentID')
    if not studentID:
        return jsonify({"error": "Missing 'search' parameter"}), 400
    
    conn = db.get_connection()
    if conn is None: 
        return jsonify({"error": "Database connection failed"}), 500
    
    try:
        cursor = conn.cursor(dictionary=True)
        query = """
        SELECT sc.courseCode, sc.cyear, sc.grade, c.courseName, c.courseDescription, c.credits
        FROM StudentCourse sc
        JOIN CourseDetails c ON sc.courseCode = c.courseCode
        WHERE sc.studentID = %s;
        """
        cursor.execute(query, (studentID,))
        result = cursor.fetchall()
    except Exception as e:
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500
    finally:
        cursor.close()
        db.close_connection()

    if not result:
        return jsonify({"error": "Could not find any course."}), 404

    return jsonify(result)

@routes.route('/api/student/register', methods=['POST'])
def course_register():
    return


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

@routes.route('/api/transcript/<int:student_id>', methods=['GET'])
def get_transcript(student_id):
    print("\n=== Starting Transcript Request ===")
    print(f"Requesting transcript for student ID: {student_id}")
    
    conn = db.get_connection()
    if conn is None:
        print("Error: Database connection failed")
        return jsonify({"error": "Database connection failed"}), 500

    try:
        cursor = conn.cursor(dictionary=True)
        query = """
        SELECT sc.courseCode, sc.cyear, sc.grade, 
               cd.courseName, cd.courseDescription, cd.credits
        FROM StudentCourse sc
        JOIN CourseDetails cd ON sc.courseCode = cd.courseCode
        WHERE sc.studentID = %s
        ORDER BY sc.cyear DESC, sc.courseCode
        """
        print(f"Executing query for student courses...")
        cursor.execute(query, (student_id,))
        courses = cursor.fetchall()
        print(f"Found {len(courses)} courses for student")

        # Calculate GPA and total credits
        total_credits = 0
        total_grade_points = 0
        grade_points = {'A+': 4.0, 'A': 4.0, 'A-': 3.7,
                       'B+': 3.3, 'B': 3.0, 'B-': 2.7,
                       'C+': 2.3, 'C': 2.0, 'C-': 1.7,
                       'D+': 1.3, 'D': 1.0, 'F': 0.0}

        print("\nCalculating GPA...")
        for course in courses:
            print(f"Processing course: {course['courseCode']} - Grade: {course['grade']}")
            if course['grade'] in grade_points:
                credits = float(course['credits'])
                total_credits += credits
                grade_point = grade_points[course['grade']]
                course_points = credits * grade_point
                total_grade_points += course_points
                print(f"  Credits: {credits}, Grade Points: {grade_point}, Course Points: {course_points}")

        gpa = round(total_grade_points / total_credits, 2) if total_credits > 0 else 0.0
        print(f"\nFinal calculations:")
        print(f"Total Credits: {total_credits}")
        print(f"Total Grade Points: {total_grade_points}")
        print(f"GPA: {gpa}")

        response_data = {
            "courses": courses,
            "gpa": gpa,
            "totalCredits": total_credits
        }
        print("\n=== Completing Transcript Request Successfully ===")
        return jsonify(response_data)

    except Exception as e:
        print(f"\nError in transcript processing:")
        print(f"Exception type: {type(e).__name__}")
        print(f"Exception message: {str(e)}")
        print(f"=== Transcript Request Failed ===")
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500
    finally:
        cursor.close()
        db.close_connection()
        print("Database connection closed")
