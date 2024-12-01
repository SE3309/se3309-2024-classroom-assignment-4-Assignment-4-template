/* eslint-disable react/prop-types */
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import "./HomePage.css";

const StudentDashboard = ({ user, handleCourseSearch, handleViewCourse, handleRegisterUnregister, handleViewCalendar, handleViewTranscript }) => (
  <>
    <div className="welcome-header">
      <h1 className="welcome-message">Welcome Back!</h1>
      <h2 className="user-email">{user?.fullName}</h2>
      <p className="status-message">{user?.role} Portal</p>
    </div>
    
    <div className="home-content">
      <div className="action-section">
        <h3 className="section-title">Course Management</h3>
        <button className="action-button" onClick={handleCourseSearch}>
          Search Courses
        </button>
        <button className="action-button" onClick={handleViewCourse}>
          View My Courses
        </button>
        <button className="action-button" onClick={handleRegisterUnregister}>
          Course Registration
        </button>
        <button className="action-button" onClick={handleViewTranscript}>
          Academic Transcript
        </button>
      </div>

      <div className="action-section">
        <h3 className="section-title">Calendar</h3>
        <button className="action-button" onClick={handleViewCalendar}>
          View Calendar
        </button>
        <button className="action-button" onClick={() => handleViewCalendar()}>
          Add Calendar Event
        </button>
      </div>
    </div>
  </>
);

const FacultyDashboard = ({ user, handleModifyCourse }) => (
  <>
    <div className="welcome-header">
      <h1 className="welcome-message">Welcome Back!</h1>
      <h2 className="user-email">{user?.fullName}</h2>
      <p className="status-message">{user?.role} Portal</p>
    </div>
    
    <div className="home-content">
      <div className="action-section">
        <h3 className="section-title">Course Management</h3>
        <button className="action-button" onClick={handleModifyCourse}>
          Modify Courses
        </button>
      </div>
    </div>
  </>
);

const HomePage = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const handleCourseSearch = () => {
    navigate('/course-search');
  };

  const handleViewCourse = () => {
    navigate('/course-view');
  };

  const handleRegisterUnregister = () => {
    navigate('/registration');
  };

  const handleViewCalendar = () => {
    navigate('/view-calendar');
  };

  const handleViewTranscript = () => {
    navigate("/transcript");
  };

  const handleModifyCourse = () => {
    navigate('/modify-course');
  };

  return (
    <div className="home-container">
      {user?.role === 'Student' ? (
        <StudentDashboard 
          user={user}
          handleCourseSearch={handleCourseSearch}
          handleViewCourse={handleViewCourse}
          handleRegisterUnregister={handleRegisterUnregister}
          handleViewCalendar={handleViewCalendar}
          handleViewTranscript={handleViewTranscript}
        />
      ) : (
        <FacultyDashboard 
          user={user} 
          handleModifyCourse={handleModifyCourse}
        />
      )}
    </div>
  );
};

export default HomePage;
