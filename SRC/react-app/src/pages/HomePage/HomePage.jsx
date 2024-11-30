import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importing useNavigate from react-router-dom
import './HomePage.css'; // Optional for styling

const HomePage = () => {
    // Simulating a logged-in user for demo purposes
    const [user] = useState({ email: 'student@example.com' }); // Replace with actual user data
    const navigate = useNavigate(); // Hook for navigating to different pages

    const handleCourseSearch = () => {
        navigate('/course-search'); // Navigate to the course search page
    };

    const handleViewCouse = () => {
        navigate('/view-course')
    }

    const handleRegisterUnregister = () => {
        nagivate('/registration')
    }

    const handleViewCalendar = () => {
        navigate('/view-calendar'); // Navigate to the calendar page
    };

    return (
        <div className="home-container">
            <h2 className="welcome-message">Welcome, {user.email}</h2>
            <p className="status-message">You are logged in as a Student!</p>
            <div className="home-content">
                {/* Student-specific Actions */}
                <button className="action-button" onClick={() => handleCourseSearch('Course Search')}>Search for Courses</button>
                <button className="action-button" onClick={() => handleViewCouse('View Courses')}>View Courses</button>
                <button className="action-button" onClick={() => handleRegisterUnregister('Register/Unregister for Courses')}>Register/Unregister for Courses</button>
                <button className="action-button" onClick={() => handleActionClick('View Transcript')}>View Transcript</button>

                {/* Calendar Group for Students */}
                <button className="action-button" onClick={handleViewCalendar}>View Calendar</button>
                <button className="action-button" onClick={() => handleActionClick('Add/Remove Item to/from Calendar')}>Manage Calendar (Add/Remove)</button>
            </div>
        </div>
    );
};

export default HomePage;
