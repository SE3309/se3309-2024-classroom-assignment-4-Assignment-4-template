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

# Get students matching query
@routes.route('/api/students', methods=['GET'])
def get_all_students():
    conn = db.get_connection()
    if conn is None:
        return jsonify({"error": "Database connection failed"}), 500

    try:
        cursor = conn.cursor(dictionary=True)

        # Get the 'student' query parameter
        student_query = request.args.get('student')  # Capture the query parameter 'student'
        
        if student_query:
            # Filter by studentID if the 'student' query parameter is provided
            query = """
            SELECT studentID, email, fullName, yearInProgram, graduationYear, program
            FROM Student
            WHERE fullName LIKE %s OR studentID = %s
            """
            cursor.execute(query, (f"{student_query}%", student_query,))
        else:
            # Return all students if no filter is applied
            query = """
            SELECT studentID, email, fullName, yearInProgram, graduationYear, program
            FROM Student
            """
            cursor.execute(query)

        result = cursor.fetchall()
    except Exception as e:
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500
    finally:
        cursor.close()
        db.close_connection()

    if not result:
        return jsonify({"error": "No students found"}), 404

    return jsonify(result)

@routes.route('/api/students', methods=['POST'])
def create_student():
    data = request.get_json()
    full_name = data.get('fullName')
    email = data.get('email')
    year_in_program = data.get('yearInProgram')
    graduation_year = data.get('graduationYear')
    program = data.get('program')

    if not all([full_name, email, year_in_program, graduation_year, program]):
        return jsonify({"error": "All fields are required"}), 400

    conn = db.get_connection()
    if conn is None:
        return jsonify({"error": "Database connection failed"}), 500

    try:
        cursor = conn.cursor()
        query = """
        INSERT INTO Student (fullName, email, yearInProgram, graduationYear, program)
        VALUES (%s, %s, %s, %s, %s)
        """
        cursor.execute(query, (full_name, email, year_in_program, graduation_year, program))
        conn.commit()
        return jsonify({"message": "Student created successfully!"}), 201
    except Exception as e:
        conn.rollback()
        return jsonify({"error": f"Failed to create student: {str(e)}"}), 500
    finally:
        cursor.close()
        db.close_connection()

@routes.route('/api/students/<int:student_id>', methods=['PUT'])
def edit_student(student_id):
    print(f"Route matched for student ID: {student_id}")
    data = request.get_json()
    full_name = data.get('fullName')
    email = data.get('email')
    year_in_program = data.get('yearInProgram')
    graduation_year = data.get('graduationYear')
    program = data.get('program')

    if not all([full_name, email, year_in_program, graduation_year, program]):
        return jsonify({"error": "All fields are required"}), 400

    conn = db.get_connection()
    if conn is None:
        return jsonify({"error": "Database connection failed"}), 500

    try:
        cursor = conn.cursor(dictionary=True)
        # Check if student exists
        cursor.execute("SELECT * FROM Student WHERE studentID = %s", (student_id,))
        existing_student = cursor.fetchone()

        if not existing_student:
            return jsonify({"error": "Student not found"}), 404

        # Debug: Print values and types
        print("Existing student data:")
        for key, value in existing_student.items():
            print(f"{key}: {value} (type: {type(value)})")

        print("New data from request:")
        print(f"fullName: {full_name} (type: {type(full_name)})")
        print(f"email: {email} (type: {type(email)})")
        print(f"yearInProgram: {year_in_program} (type: {type(year_in_program)})")
        print(f"graduationYear: {graduation_year} (type: {type(graduation_year)})")
        print(f"program: {program} (type: {type(program)}) \n")

        # Convert data types if necessary
        year_in_program = int(year_in_program)
        graduation_year = int(graduation_year)

        # Check for identical data
        if (existing_student['fullName'] == full_name and
            existing_student['email'] == email and
            existing_student['yearInProgram'] == year_in_program and
            existing_student['graduationYear'] == graduation_year and
            existing_student['program'] == program):
            return jsonify({"message": "No changes were made to the student."}), 200

        # Update the student
        query = """
        UPDATE Student
        SET fullName = %s, email = %s, yearInProgram = %s, graduationYear = %s, program = %s
        WHERE studentID = %s
        """
        cursor.execute(query, (full_name, email, year_in_program, graduation_year, program, student_id))
        conn.commit()

        print(f"Rows affected: {cursor.rowcount}")
        return jsonify({"message": "Student updated successfully!"}), 200
    except Exception as e:
        conn.rollback()
        print(f"Exception occurred: {e}")
        return jsonify({"error": f"Failed to update student: {str(e)}"}), 500
    finally:
        cursor.close()
        db.close_connection()




@routes.route('/api/students/<int:student_id>', methods=['DELETE'])
def delete_student(student_id):
    conn = db.get_connection()
    if conn is None:
        return jsonify({"error": "Database connection failed"}), 500

    try:
        cursor = conn.cursor()
        query = "DELETE FROM Student WHERE studentID = %s"
        cursor.execute(query, (student_id,))
        conn.commit()
        if cursor.rowcount == 0:
            return jsonify({"error": "Student not found"}), 404
        return jsonify({"message": "Student deleted successfully!"}), 200
    except Exception as e:
        conn.rollback()
        return jsonify({"error": f"Failed to delete student: {str(e)}"}), 500
    finally:
        cursor.close()
        db.close_connection()
