import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from "../../context/UserContext"; 
import "./CourseRegistrationPage.css";

const CourseRegistrationPage = () => {
  const { user } = useContext(UserContext);
  console.log("User from context in COurseRegistrationPage:", user);
  const [courses, setCourses] = useState([]);
  const [registeredCourses, setRegisteredCourses] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 10;

  
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get("http://127.0.0.1:5000/api/courses");
        setCourses(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching courses:", error);
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const handleRegister = async (courseCode) => {
    if (!user || !user.id) {
      alert("User not logged in. Please log in to register for courses.");
      return;
    }

    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/api/student/register-course",
        {
          studentID: user.id,
          courseCode,
          cyear: 2025,
        }
      );
      alert(response.data.message || "Course registered successfully!");
      setRegisteredCourses([...registeredCourses, courseCode]);
    } catch (error) {
      console.error("Error registering course:", error);
      alert(error.response?.data?.error || "Failed to register course.");
    }
  };

  const handleUnregister = async (courseCode) => {
    if (!user || !user.id) {
      alert("User not logged in. Please log in to unregister courses.");
      return;
    }

    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/api/student/unregister-course",
        { studentID: user.id, courseCode }
      );
      alert(response.data.message || "Course unregistered successfully!");
      setRegisteredCourses(registeredCourses.filter((id) => id !== courseCode));
    } catch (error) {
      console.error("Error unregistering course:", error);
      alert(error.response?.data?.error || "Failed to unregister course.");
    }
  };

  const filteredCourses = searchQuery.trim()
    ? courses.filter((course) =>
        course.courseCode.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : courses;

  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = filteredCourses.slice(
    indexOfFirstCourse,
    indexOfLastCourse
  );

  const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);

  return (
    <div className="course-registration-container">
      <h1 className="page-title">Course Registration</h1>
      <div className="columns">
        
        <div className="column">
          <h2>Available Courses</h2>
          <input
            type="text"
            placeholder="Search courses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-bar"
          />
          {isLoading ? (
            <p>Loading courses...</p>
          ) : (
            <ul className="course-list">
              {currentCourses.length > 0 ? (
                currentCourses.map((course) => (
                  <li key={course.courseCode} className="course-item">
                    <div className="course-details">
                      {Object.entries(course).map(([key, value]) => (
                        <p key={key}>
                          <strong>{key}:</strong> {value}
                        </p>
                      ))}
                    </div>
                    <button
                      className="register-button"
                      onClick={() => handleRegister(course.courseCode)}
                      disabled={registeredCourses.includes(course.courseCode)}
                    >
                      Register
                    </button>
                  </li>
                ))
              ) : (
                <p className="no-results">No courses found.</p>
              )}
            </ul>
          )}
          <div className="pagination">
            <button
              className="pagination-button"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span className="pagination-info">
              Page {currentPage} of {totalPages}
            </span>
            <button
              className="pagination-button"
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>

        {/* Right Column: Registered Courses */}
        <div className="column">
          <h2>Registered Courses</h2>
          {registeredCourses.length > 0 ? (
            <div className="registered-course-list">
              {registeredCourses.map((courseCode) => {
                const course = courses.find((c) => c.courseCode === courseCode);
                return (
                  <div key={courseCode} className="registered-course-item">
                    <h3>{course?.courseName}</h3>
                    <button
                      className="unregister-button"
                      onClick={() => handleUnregister(courseCode)}
                    >
                      Unregister
                    </button>
                  </div>
                );
              })}
            </div>
          ) : (
            <p>No registered courses.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseRegistrationPage;
