import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for routing
import './HomePage.css';

const HomePage = ({ user }) => {
  const navigate = useNavigate(); // Initialize navigate

  const handleActionClick = (action) => {
    // Placeholder function to handle button clicks
    console.log(`Clicked: ${action}`);
    // Implement the actual functionality here
  };

  const handleViewCalendar = () => {
    // Navigate to the calendar page when "View Calendar" is clicked
    navigate('/calendar');
  };

  return (
    <div className="home-container">
      <h2 className="welcome-message">Welcome, {user.email}</h2>
      <p className="status-message">You are logged in as a Student!</p>
      <div className="home-content">
        {/* Student-specific Actions */}
        <button className="action-button" onClick={() => handleActionClick('Course Search')}>Search for Courses</button>
        
        <button className="action-button" onClick={() => handleActionClick('View Courses')}>View Courses</button>
        
        <button className="action-button" onClick={() => handleActionClick('Register/Unregister for Courses')}>Register/Unregister for Courses</button>

        <button className="action-button" onClick={() => handleActionClick('View Transcript')}>View Transcript</button>

        {/* Calendar Group for Students */}
        <button className="action-button" onClick={handleViewCalendar}>View Calendar</button>
        <button className="action-button" onClick={() => handleActionClick('Add/Remove Item to/from Calendar')}>Manage Calendar (Add/Remove)</button>
      </div>
    </div>
  );
};

export default HomePage;
