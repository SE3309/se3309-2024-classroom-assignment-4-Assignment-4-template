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
    print("\n=== Starting Login Request ===")
    conn = db.get_connection()
    if conn is None:
        print("Error: Database connection failed")
        return jsonify({"error": "Database connection failed"}), 500

    cursor = conn.cursor(dictionary=True)
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    print(f"Login attempt for email: {email}")

    if not email or not password:
        print("Error: Missing email or password")
        return jsonify({"error": "Email and password are required"}), 400

    query = """
        SELECT studentID, email, fullName, yearInProgram, 
               graduationYear, program, departmentID 
        FROM Student 
        WHERE email = %s AND password = %s
    """
    cursor.execute(query, (email, password))
    user = cursor.fetchone()

    cursor.close()
    db.close_connection()

    if user:
        print(f"Success: User found - {user['email']}")
        token = jwt.encode(
            {'user_id': user['studentID'], 'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=24)},
            SECRET_KEY,
            algorithm='HS256'
        )
        print("=== Login Request Completed Successfully ===\n")
        return jsonify({'token': token, 'user': user}), 200
    else:
        print("Error: Invalid credentials")
        print("=== Login Request Failed ===\n")
        return jsonify({"error": "Invalid credentials"}), 401

# Faculty Member Login route
# TESTING ID: 6, PASSWORD LBp9F7jQ, EMAIL: faculty6@example.com
@routes.route('/api/faculty/login', methods=['POST'])
def faculty_login():
    print("\n=== Starting Faculty Login Request ===")
    conn = db.get_connection()
    if conn is None:
        print("Error: Database connection failed")
        return jsonify({"error": "Database connection failed"}), 500

    cursor = conn.cursor(dictionary=True)
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    print(f"Faculty login attempt for email: {email}")

    if not email or not password:
        print("Error: Missing email or password")
        return jsonify({"error": "Email and password are required"}), 400

    query = """
        SELECT facultyID, email, fullName, role, 
               officeNo, contactInfo, departmentID 
        FROM FacultyMember 
        WHERE email = %s AND password = %s
    """
    cursor.execute(query, (email, password))
    user = cursor.fetchone()

    cursor.close()
    db.close_connection()

    if user:
        print(f"Success: Faculty user found - {user['email']}")
        token = jwt.encode(
            {'user_id': user['facultyID'], 'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=24)},
            SECRET_KEY,
            algorithm='HS256'
        )
        print("=== Faculty Login Request Completed Successfully ===\n")
        return jsonify({'token': token, 'user': user}), 200
    else:
        print("Error: Invalid credentials")
        print("=== Faculty Login Request Failed ===\n")
        return jsonify({"error": "Invalid credentials"}), 401

# Get a course for the student
@routes.route('/api/student/search', methods=['GET'])
def get_student_search(): 
    print("\n=== Starting Course Search Request ===")
    search = request.args.get('search')
    print(f"Search query: {search}")
    
    if not search:
        print("Error: Missing search parameter")
        return jsonify({"error": "Missing 'search' parameter"}), 400
    
    search = f"%{search.lower()}%"
    
    conn = db.get_connection()
    if conn is None: 
        print("Error: Database connection failed")
        return jsonify({"error": "Database connection failed"}), 500
    
    try:
        cursor = conn.cursor(dictionary=True)
        query = """
        SELECT * 
        FROM CourseDetails
        WHERE LOWER(courseName) like %s OR LOWER(courseCode) like %s
        """
        print(f"Executing search query...")
        cursor.execute(query, (search, search))
        result = cursor.fetchall()
        print(f"Found {len(result)} matching courses")
    except Exception as e:
        print(f"Error executing search: {str(e)}")
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500
    finally:
        cursor.close()
        db.close_connection()
        print("Database connection closed")

    if not result:
        print("No courses found")
        return jsonify({"error": "Could not find any course."}), 404

    print("=== Course Search Completed Successfully ===\n")
    return jsonify(result)

# Get a course for the student
@routes.route('/api/student/view-course', methods=['GET'])
def get_courses(): 
    print("\n=== Starting View Courses Request ===")
    studentID = request.args.get('studentID')
    print(f"Requesting courses for student ID: {studentID}")
    
    if not studentID:
        print("Error: Missing studentID parameter")
        return jsonify({"error": "Missing 'studentID' parameter"}), 400
    
    conn = db.get_connection()
    if conn is None: 
        print("Error: Database connection failed")
        return jsonify({"error": "Database connection failed"}), 500
    
    try:
        cursor = conn.cursor(dictionary=True)
        query = """
        SELECT sc.courseCode, sc.cyear, sc.grade, c.courseName, c.courseDescription, c.credits
        FROM StudentCourse sc
        JOIN CourseDetails c ON sc.courseCode = c.courseCode
        WHERE sc.studentID = %s;
        """
        print("Executing query for student courses...")
        cursor.execute(query, (studentID,))
        result = cursor.fetchall()
        print(f"Found {len(result)} courses for student")
    except Exception as e:
        print(f"Error retrieving courses: {str(e)}")
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500
    finally:
        cursor.close()
        db.close_connection()
        print("Database connection closed")

    if not result:
        print("No courses found for student")
        return jsonify({"error": "Could not find any course."}), 404

    print("=== View Courses Request Completed Successfully ===\n")
    return jsonify(result)

@routes.route('/api/student/prof-info', methods=['GET'])
def see_prof(): 
    print("\n=== Starting Prof Info Request ===")
    courseCode = request.args.get('courseCode')
    print(f"Requesting courses for Course Code: {courseCode}")
    
    if not courseCode:
        print("Error: Missing courseCode parameter")
        return jsonify({"error": "Missing 'courseCode' parameter"}), 400
    
    try:
        cyear = int(request.args.get('cyear'))
    except (TypeError, ValueError):
        print("Error: Invalid or missing 'cyear' parameter.")
        return jsonify({"error": "Invalid 'cyear' parameter. It must be a valid integer."}), 400
    
    conn = db.get_connection()
    if conn is None: 
        print("Error: Database connection failed")
        return jsonify({"error": "Database connection failed"}), 500
    
    try:
        cursor = conn.cursor(dictionary=True)
        query = """
        SELECT 
            f.fullName AS instructorName,
            f.officeNo AS instructorOffice,
            f.contactInfo AS instructorContact,
            d.departmentName AS departmentName
        FROM CourseDetails cd
        JOIN Course c ON cd.courseCode = c.courseCode
        JOIN FacultyMember f ON f.facultyID = c.instructor
        JOIN Department d ON f.departmentID = d.departmentID
        WHERE c.courseCode = %s and c.cyear = %s;
        """
        print("Executing query for prof info...")
        cursor.execute(query, (courseCode, cyear,))
        result = cursor.fetchall()
        print(f"Found {len(result)} profs for course")
    except Exception as e:
        print(f"Error retrieving courses: {str(e)}")
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500
    finally:
        cursor.close()
        db.close_connection()
        print("Database connection closed")

    if not result:
        print(f"No professor information found for courseCode: {courseCode} and cyear: {cyear}")
        return jsonify({"error": f"No professor information found for courseCode: {courseCode} and cyear: {cyear}"}), 404

    print("=== View Courses Request Completed Successfully ===\n")
    return jsonify(result)

@routes.route('/api/student/register', methods=['POST'])
def course_register():
    return

@routes.route('/api/student/unregister', methods=['DELETE'])
def course_unregister():
    return

# Get calendar events (now unprotected)
@routes.route('/api/events/<int:student_id>', methods=['GET'])
def get_calendar_events(student_id):
    print("\n=== Starting Calendar Events Request ===")
    print(f"Requesting events for student ID: {student_id}")
    
    conn = db.get_connection()
    if conn is None:
        print("Error: Database connection failed")
        return jsonify({"error": "Database connection failed"}), 500

    try:
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
        print("Executing query for calendar events...")
        cursor.execute(query, (student_id, student_id))
        result = cursor.fetchall()
        print(f"Found {len(result)} events")

        if not result:
            print("No events found for student")
            return jsonify({"error": "No events found for this student."}), 404

        # Serialize event duration if needed
        for event in result:
            if isinstance(event['eventDuration'], timedelta):
                event['eventDuration'] = event['eventDuration'].total_seconds()

        print("=== Calendar Events Request Completed Successfully ===\n")
        return jsonify(result)
    except Exception as e:
        print(f"Error retrieving events: {str(e)}")
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500
    finally:
        cursor.close()
        db.close_connection()
        print("Database connection closed")

# Add a calendar event (now unprotected)
@routes.route('/api/events', methods=['POST'])
def add_calendar_event():
    print("\n=== Starting Add Calendar Event Request ===")
    conn = db.get_connection()
    if conn is None:
        print("Error: Database connection failed")
        return jsonify({"error": "Database connection failed"}), 500

    try:
        cursor = conn.cursor(dictionary=True)
        event_data = request.get_json()
        print(f"Received event data: {event_data}")

        # Extract event details
        event_name = event_data.get('eventName')
        event_description = event_data.get('eventDescription')
        event_start = event_data.get('eventStart')
        event_duration = event_data.get('eventDuration')
        course_code = event_data.get('courseCode')
        cyear = event_data.get('cyear')
        student_id = event_data.get('studentId')

        if not all([event_name, event_start, event_duration]):
            print("Error: Missing required fields")
            return jsonify({"error": "Missing required fields"}), 400

        query = """
        INSERT INTO CalendarEvent (eventName, eventDescription, eventStart, eventDuration, courseCode, cyear, studentID)
        VALUES (%s, %s, %s, %s, %s, %s, %s)
        """
        print("Executing insert query...")
        cursor.execute(query, (event_name, event_description, event_start, event_duration, course_code, cyear, student_id))
        conn.commit()
        print("Event added successfully")

        print("=== Add Calendar Event Request Completed Successfully ===\n")
        return jsonify({"message": "Event added successfully!"}), 201
    except Exception as e:
        print(f"Error adding event: {str(e)}")
        conn.rollback()
        return jsonify({"error": f"Failed to add event: {str(e)}"}), 500
    finally:
        cursor.close()
        db.close_connection()
        print("Database connection closed")

# Delete a calendar event (now unprotected)
@routes.route('/api/events/<int:event_id>', methods=['DELETE'])
def delete_calendar_event(event_id):
    print("\n=== Starting Delete Calendar Event Request ===")
    print(f"Attempting to delete event ID: {event_id}")
    
    conn = db.get_connection()
    if conn is None:
        print("Error: Database connection failed")
        return jsonify({"error": "Database connection failed"}), 500

    try:
        cursor = conn.cursor(dictionary=True)
        query = "DELETE FROM CalendarEvent WHERE eventID = %s"
        print("Executing delete query...")
        cursor.execute(query, (event_id,))
        conn.commit()
        
        if cursor.rowcount == 0:
            print(f"No event found with ID: {event_id}")
            return jsonify({"error": "Event not found"}), 404
            
        print(f"Successfully deleted event ID: {event_id}")
        print("=== Delete Calendar Event Request Completed Successfully ===\n")
        return jsonify({"message": "Event deleted successfully!"}), 200
    except Exception as e:
        print(f"Error deleting event: {str(e)}")
        conn.rollback()
        return jsonify({"error": f"Failed to delete event: {str(e)}"}), 500
    finally:
        cursor.close()
        db.close_connection()
        print("Database connection closed")

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

@routes.route('/api/students', methods=['GET'])
def get_students_with_contacts():
    conn = db.get_connection()
    if conn is None:
        return jsonify({"error": "Database connection failed"}), 500

    search_query = request.args.get('student', '')

    try:
        cursor = conn.cursor(dictionary=True)

        # Search query
        query = """
        SELECT 
            s.studentID,
            s.email,
            s.fullName,
            s.yearInProgram,
            s.graduationYear,
            s.program,
            c.phoneNumber,
            c.cName AS contactName,
            c.address,
            c.postalCode
        FROM 
            Student s
        LEFT JOIN 
            EmergencyContact ec ON s.studentID = ec.studentID
        LEFT JOIN 
            Contact c ON ec.phoneNumber = c.phoneNumber
        WHERE 
            s.fullName LIKE %s OR s.studentID = %s
        """
        cursor.execute(query, (f"%{search_query}%", search_query))

        # Fetch and organize results
        rows = cursor.fetchall()
        students = {}

        # Organize data
        for row in rows:
            student_id = row['studentID']
            if student_id not in students:
                students[student_id] = {
                    "studentID": student_id,
                    "email": row["email"],
                    "fullName": row["fullName"],
                    "yearInProgram": row["yearInProgram"],
                    "graduationYear": row["graduationYear"],
                    "program": row["program"],
                    "emergencyContacts": []
                }
            if row["phoneNumber"]:  # Add contact info if available
                students[student_id]["emergencyContacts"].append({
                    "phoneNumber": row["phoneNumber"],
                    "contactName": row.get("contactName"),
                    "address": row.get("address"),
                    "postalCode": row.get("postalCode")
                })

        return jsonify(list(students.values())), 200

    except Exception as e:
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500
    finally:
        cursor.close()
        db.close_connection()



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

@routes.route('/api/contacts/<string:phone_number>', methods=['PUT'])
def update_contact(phone_number):
    conn = db.get_connection()
    if conn is None:
        return jsonify({"error": "Database connection failed"}), 500

    # Get the request JSON data
    data = request.get_json()
    if not data:
        return jsonify({"error": "Invalid or missing JSON data"}), 400

    # Extract fields to be updated
    contact_name = data.get('contactName')
    address = data.get('address')
    postal_code = data.get('postalCode')

    # Ensure at least one field is provided
    if not any([contact_name, address, postal_code]):
        return jsonify({"error": "No fields to update provided"}), 400

    try:
        cursor = conn.cursor()
        
        # Build the update query dynamically based on the provided fields
        update_fields = []
        params = []

        if contact_name is not None:
            update_fields.append("cName = %s")
            params.append(contact_name)
        if address is not None:
            update_fields.append("address = %s")
            params.append(address)
        if postal_code is not None:
            update_fields.append("postalCode = %s")
            params.append(postal_code)

        # Add the phone number as the final parameter
        params.append(phone_number)

        # Construct the SQL query
        query = f"""
        UPDATE Contact
        SET {', '.join(update_fields)}
        WHERE phoneNumber = %s
        """
        
        # Execute the query
        cursor.execute(query, params)
        conn.commit()

        if cursor.rowcount == 0:
            return jsonify({"error": "Contact not found or no changes made"}), 404

        return jsonify({"message": "Contact updated successfully"}), 200

    except Exception as e:
        conn.rollback()
        return jsonify({"error": f"Failed to update contact: {str(e)}"}), 500

    finally:
        cursor.close()
        db.close_connection()

@routes.route('/api/emergency-contacts', methods=['DELETE'])
def delete_emergency_contact():
    conn = db.get_connection()
    if conn is None:
        return jsonify({"error": "Database connection failed"}), 500

    # Get query parameters
    student_id = request.args.get('studentID')
    phone_number = request.args.get('phoneNumber')

    # Validate input
    if not student_id or not phone_number:
        return jsonify({"error": "Both studentID and phoneNumber are required"}), 400

    try:
        cursor = conn.cursor()

        # Construct the SQL query to delete the association
        query = """
        DELETE FROM EmergencyContact
        WHERE studentID = %s AND phoneNumber = %s
        """
        
        # Execute the query
        cursor.execute(query, (student_id, phone_number))
        conn.commit()

        if cursor.rowcount == 0:
            return jsonify({"error": "No matching EmergencyContact found"}), 404

        return jsonify({"message": "EmergencyContact entry deleted successfully"}), 200

    except Exception as e:
        conn.rollback()
        return jsonify({"error": f"Failed to delete EmergencyContact: {str(e)}"}), 500

    finally:
        cursor.close()
        db.close_connection()

