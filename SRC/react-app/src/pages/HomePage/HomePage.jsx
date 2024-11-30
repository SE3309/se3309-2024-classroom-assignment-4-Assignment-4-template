import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importing useNavigate from react-router-dom
import './HomePage.css'; // Optional for styling

const HomePage = () => {
    // Simulating a logged-in user for demo purposes
    const [user] = useState({ email: 'student@example.com' }); // Replace with actual user data
    const navigate = useNavigate(); // Hook for navigating to different pages

    const handleActionClick = (action) => {
        alert(`Action: ${action}`);
    };

    const handleViewCalendar = () => {
        navigate('/view-calendar'); // Navigate to the calendar page
    };

    const handleViewTranscript = () => {
        navigate('/transcript');
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
                <button className="action-button" onClick={handleViewTranscript}>View Transcript</button>

                {/* Calendar Group for Students */}
                <button className="action-button" onClick={handleViewCalendar}>View Calendar</button>
                <button className="action-button" onClick={() => handleActionClick('Add/Remove Item to/from Calendar')}>Manage Calendar (Add/Remove)</button>
            </div>
        </div>
    );
};

export default HomePage;
