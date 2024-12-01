/* eslint-disable react/prop-types */
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import "./HomePage.css";

const HomePage = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

    const handleCourseSearch = () => {
        navigate('/course-search'); // Navigate to the course search page
    };

    const handleViewCouse = () => {
        navigate('/course-view')
    }

    const handleRegisterUnregister = () => {
        nagivate('/registration')
    }

    const handleViewCalendar = () => {
        navigate('/view-calendar');
    };

  const handleViewTranscript = () => {
    navigate("/transcript");
  };

  return (
    <div className="home-container">
      <div className="welcome-header">
        <h1 className="welcome-message">Welcome Back!</h1>
        <h2 className="user-email">{user?.fullName}</h2>
        <p className="status-message">{user?.role} Portal</p>
      </div>

      <div className="home-content">
        <div className="action-section">
          <h3 className="section-title">Course Management</h3>
          <button
            className="action-button"
            onClick={() => handleCourseSearch("Course Search")}
          >
            Search Courses
          </button>
          <button
            className="action-button"
            onClick={() => handleViewCouse("View Courses")}
          >
            View My Courses
          </button>
          <button
            className="action-button"
            onClick={() => handleRegisterUnregister("Register/Unregister for Courses")}
          >
            Course Registration
          </button>
          <button className="action-button" onClick={handleViewTranscript}>
            Academic Transcript
          </button>
        </div>

      <div className="action-section">
        <h3 className="section-title">Calendar</h3>
        <button className="action-button" onClick={() => navigate('/view-calendar')}>
          View Calendar
        </button>
        <button className="action-button" onClick={() => navigate('/add-event')}>
          Add Calendar Event
        </button>
      </div>
    </div>
  </>
);

const FacultyDashboard = ({ user }) => (
  <>
    <div className="welcome-header">
      <h1 className="welcome-message">Welcome Back!</h1>
      <h2 className="user-email">{user?.fullName}</h2>
      <p className="status-message">{user?.role} Portal</p>
    </div>
    
    <div className="home-content">
      <div className="action-section">
        <h3 className="section-title">Faculty Dashboard</h3>
        <p className="coming-soon-message">Faculty features coming soon...</p>
      </div>
    </div>
  </>
);

const HomePage = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  return (
    <div className="home-container">
      {user?.role === 'Student' ? (
        <StudentDashboard user={user} navigate={navigate} />
      ) : (
        <FacultyDashboard user={user} />
      )}
    </div>
  );
};

export default HomePage;
