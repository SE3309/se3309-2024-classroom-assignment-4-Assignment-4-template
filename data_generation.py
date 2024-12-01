import random
import string
from datetime import datetime, timedelta

# Configuration for data generation
num_departments = 25 #making this more than 25 may break code!
num_students = 1000
num_faculty = 500
num_courses = 250
num_contacts = 3000

# Department declarations
departments = [
    "Mathematics",
    "Science",
    "English",
    "History",
    "Physical Education",
    "Art",
    "Music",
    "Social Studies",
    "Computer Science",
    "Foreign Languages",
    "Philosophy",
    "Psychology",
    "Economics",
    "Business Studies",
    "Chemistry",
    "Physics",
    "Biology",
    "Environmental Science",
    "Librarian Services",
    "Geography",
    "Political Science",
    "Engineering",
    "Anthropology",
    "Architecture",
    "Culinary Arts",
    "Journalism",
    "Theatre Arts",
    "Health Education",
    "Theology",
    "Sociology"
]

phone_numbers = set()

# Methods to generate insert statements for tables
def generate_department_insert_statements(num_departments):
    """Generate INSERT statements for the Department table."""
    insert_statements = []
    for department_id in range(1, num_departments + 1):
        department_name = departments[department_id]
        address = f"{random.randint(1, 999)} Main St, City {department_id}"
        postal_code = f"{random.randint(10000, 99999)}"
        insert_statement = (
            f"INSERT INTO Department (departmentID, departmentName, address, postalCode) "
            f"VALUES ({department_id}, '{department_name}', '{address}', '{postal_code}');"
        )
        insert_statements.append(insert_statement)
    return insert_statements

def generate_student_insert_statements(num_students, department_ids):
    """Generate INSERT statements for the Student table."""
    insert_statements = []
    for student_id in range(1, num_students + 1):
        email = f"student{student_id}@example.com"
        password = ''.join(random.choices(string.ascii_letters + string.digits, k=8))
        full_name = f"Student {student_id}"
        year = random.randint(1, 4)  # Random year between 1-4
        graduation_year = 2023 + 4
        program = f"Program_{random.randint(1, 10)}"
        department_id = random.choice(department_ids)  # Pick a valid department ID
        insert_statement = (
            f"INSERT INTO Student (studentID, email, password, fullName, yearInProgram, graduationYear, program, departmentID) "
            f"VALUES ({student_id}, '{email}', '{password}', '{full_name}', {year}, {graduation_year}, '{program}', {department_id});"
        )
        insert_statements.append(insert_statement)
    return insert_statements

def generate_faculty_insert_statements(num_faculty, department_ids):
    """Generate INSERT statements for the FacultyMember table."""
    insert_statements = []
    for faculty_id in range(1, num_faculty + 1):
        email = f"faculty{faculty_id}@example.com"
        password = ''.join(random.choices(string.ascii_letters + string.digits, k=8))
        full_name = f"Faculty {faculty_id}"
        role = random.choice(['Professor', 'Lecturer', 'Assistant Professor'])
        office_no = f"Office_{faculty_id}"
        contact_info = f"123-456-789{faculty_id % 10}"
        department_id = random.choice(department_ids)  # Pick a valid department ID
        insert_statement = (
            f"INSERT INTO FacultyMember (facultyID, email, password, fullName, role, officeNo, contactInfo, departmentID) "
            f"VALUES ({faculty_id}, '{email}', '{password}', '{full_name}', '{role}', '{office_no}', '{contact_info}', {department_id});"
        )
        insert_statements.append(insert_statement)
    return insert_statements

def generate_course_details_insert_statements(num_courses):
    """Generate INSERT statements for the CourseDetails table."""
    insert_statements = []
    for course_code in range(1, num_courses + 1):
        course_code_str = f"COURSE{course_code}"
        course_name = f"Course Name {course_code}"
        course_description = f"This is a description for {course_name}."
        credits = random.choice([0.5, 1.0])  # Only .5 or 1
        insert_statement = (
            f"INSERT INTO CourseDetails (courseCode, courseName, courseDescription, credits) "
            f"VALUES ('{course_code_str}', '{course_name}', '{course_description}', {credits});"
        )
        insert_statements.append(insert_statement)
    return insert_statements

def generate_course_insert_statements(course_details):
    """Generate INSERT statements for the Course table with entries for 2024, 2025, and 2026."""
    insert_statements = []
    for course_code in course_details:
        for year in range(2024, 2027):  # Years 2024, 2025, 2026
            instructor = random.choice(range(1, num_faculty + 1))  
            insert_statement = (
                f"INSERT INTO Course (courseCode, instructor, cyear) "
                f"VALUES ('{course_code}', {instructor}, {year});"
            )
            insert_statements.append(insert_statement)
    return insert_statements

def generate_student_course_insert_statements(num_students, course_details):
    """Generate INSERT statements for the StudentCourse table for each student taking 12 courses a year."""
    insert_statements = []

    for student_id in range(1, num_students + 1):  # Assuming student IDs are sequential from 1 to num_students
        for year in range(2024, 2027):  # For the years 2024, 2025, and 2026
            # Pick 12 unique course codes for the current year
            selected_courses = random.sample(course_details, 6)  # Randomly select 6 courses

            for course_code in selected_courses:
                grade = random.choice(['A', 'B', 'C', 'D', 'F'])  # Random grade
                insert_statement = (
                    f"INSERT INTO StudentCourse (courseCode, studentID, cyear, grade) "
                    f"VALUES ('{course_code}', {student_id}, {year}, '{grade}');"
                )
                insert_statements.append(insert_statement)

    return insert_statements



def generate_calendar_event_insert_statements(num_students, course_details):
    """Generate INSERT statements for the CalendarEvent table with consistent weekly lecture times."""
    insert_statements = []
    event_id = 1

    # Store existing student events to check for overlaps
    student_events = {student_id: [] for student_id in range(1, num_students + 1)}

    # Generate weekly course events from January to April 2025 (use 30th for end of month)
    start_date = datetime(2025, 1, 1)
    end_date = datetime(2025, 4, 30)
    fixed_duration_str = "03:00:00"  # Event duration is fixed to 3 hours
    weekdays = [0, 1, 2, 3, 4]  # Monday to Friday

    # Generate course events with consistent day and time for each course
    for course_code in course_details:
        # Select a fixed weekday and start time for this course's weekly lecture
        weekday = random.choice(weekdays)  # Choose a day between Monday and Friday
        start_hour = random.randint(9, 14)  # Ensure the 3-hour lecture ends by 5 PM

        # Generate events on the same weekday and time for each week
        current_date = start_date
        while current_date <= end_date:
            # Check if the current day matches the selected weekday for the course
            if current_date.weekday() == weekday:
                event_start = current_date.replace(hour=start_hour, minute=0, second=0)
                
                # Generate insert statement for the weekly lecture
                insert_statement = (
                    f"INSERT INTO CalendarEvent (eventID, eventName, eventDescription, eventStart, eventDuration, "
                    f"courseCode, cyear, studentID) "
                    f"VALUES ({event_id}, 'Weekly Lecture for {course_code}', 'Weekly lecture', "
                    f"'{event_start}', '{fixed_duration_str}', '{course_code}', 2024, NULL);"
                )
                insert_statements.append(insert_statement)
                event_id += 1
            
            current_date += timedelta(days=1)  # Move to the next day

    # Generate individual events for each student
    for student_id in range(1, num_students + 1):
        for _ in range(5):  # Each student has 5 events from Jan to Apr
            # Generate a random date within the range, ensuring it's not on a weekend
            random_date = datetime(2025, 1, 1) + timedelta(days=random.randint(0, 120))  # Random date in range
            while random_date.weekday() >= 5:  # Skip weekends (5 = Saturday, 6 = Sunday)
                random_date = datetime(2025, 1, 1) + timedelta(days=random.randint(0, 120))  # Retry if weekend
            
            # Set a random start time between 9 AM and 5 PM
            start_hour = random.randint(9, 17)
            event_start = random_date.replace(hour=start_hour, minute=0, second=0)
            duration_hours = random.randint(1, min(3, 20 - start_hour))  # Random duration 1 to 3 hours within limit
            duration_str = f"{duration_hours}:00:00"  # Format for SQL TIME
            
            # Check for overlapping events for the student
            overlap_found = False
            event_end = event_start + timedelta(hours=duration_hours)  # Calculate the end time of the new event
            
            # Loop through existing events for this student and check for overlaps
            for existing_event in student_events[student_id]:
                existing_start, existing_end = existing_event
                if not (event_end <= existing_start or event_start >= existing_end):  # Check if there is an overlap
                    overlap_found = True
                    break
            
            if not overlap_found:
                # If no overlap, generate insert statement for student event
                insert_statement = (
                    f"INSERT INTO CalendarEvent (eventID, eventName, eventDescription, eventStart, eventDuration, "
                    f"courseCode, cyear, studentID) "
                    f"VALUES ({event_id}, 'Student Event', 'Event for Student {student_id}', "
                    f"'{event_start}', '{duration_str}', NULL, NULL, {student_id});"
                )
                insert_statements.append(insert_statement)
                event_id += 1
                
                # Add this new event to the student's list of events
                student_events[student_id].append((event_start, event_end))

    return insert_statements


def generate_contact_insert_statements(num_contacts):
    """Generate INSERT statements for the Contact table."""
    insert_statements = []
    
    for contact_id in range(1, num_contacts + 1):
        phone_number = f"+1-800-{random.randint(1000000, 9999999)}"  # Random phone number
        while phone_number in phone_numbers:
            phone_number = f"+1-800-{random.randint(1000000, 9999999)}"
        phone_numbers.add(phone_number)
        c_name = f"Contact Name {contact_id}"
        address = f"{random.randint(1, 999)} Contact St, City {contact_id}"
        postal_code = f"{random.randint(10000, 99999)}"
        insert_statement = (
            f"INSERT INTO Contact (phoneNumber, cName, address, postalCode) "
            f"VALUES ('{phone_number}', '{c_name}', '{address}', '{postal_code}');"
        )
        insert_statements.append(insert_statement)
    return insert_statements

def generate_emergency_contact_insert_statements(num_students, num_contacts):
    """Generate INSERT statements for the EmergencyContact table."""
    insert_statements = []
    student_contact_map = {}
    phone_number_list = list(phone_numbers) 

    for student_id in range(1, num_students + 1):
        student_contact_map[student_id] = set()  # Initialize a set for unique contacts

    for student_id in range(1, num_students + 1):
        while len(student_contact_map[student_id]) < 3:  # Each student can have up to 3 contacts
            phone_number = random.choice(phone_number_list)  # Randomly select a contact ID
            if phone_number not in student_contact_map[student_id]:  # Ensure uniqueness
                insert_statement = (
                    f"INSERT INTO EmergencyContact (studentID, phoneNumber) "
                    f"VALUES ({student_id},'{phone_number}');"
                )
                insert_statements.append(insert_statement)
                student_contact_map[student_id].add(phone_number)  # Add to the set of contacts

    return insert_statements

# Method to save the sql file
def save_to_sql_file(filename, statements):
    """Save the generated SQL statements to a file."""
    with open(filename, 'w') as file:
        for statement in statements:
            file.write(statement + '\n')

# Generate data
department_statements = generate_department_insert_statements(num_departments)
student_statements = generate_student_insert_statements(num_students, range(1, num_departments + 1))
faculty_statements = generate_faculty_insert_statements(num_faculty, range(1, num_departments + 1))
course_details_statements = generate_course_details_insert_statements(num_courses)
course_details = [f'COURSE{course_code}' for course_code in range(1, num_courses + 1)]
course_statements = generate_course_insert_statements(course_details)
student_course_statements = generate_student_course_insert_statements(num_students, course_details)
calendar_event_statements = generate_calendar_event_insert_statements(num_students, course_details)
contact_statements = generate_contact_insert_statements(num_contacts)
emergency_contact_statements = generate_emergency_contact_insert_statements(num_students, num_contacts)




# Combine all statements into a single list
combined_statements = [
    "USE 3309Proj;"
    "-- Department Inserts",
] + department_statements + [
    "-- Student Inserts",
] + student_statements + [
    "-- Faculty Inserts",
] + faculty_statements + [
    "-- Course Details Inserts",
] + course_details_statements + [
    "-- Course Inserts",
] + course_statements + [
    "-- Student Course Inserts",
] + student_course_statements + [
    "-- Calendar Event Inserts",
] + calendar_event_statements + [
    "-- Contact Inserts",
] + contact_statements + [
    "-- Emergency Contact Inserts",
] + emergency_contact_statements


# Save to a single SQL file
save_to_sql_file('full_insert_script.sql', combined_statements)
print("Single SQL script generated successfully!")