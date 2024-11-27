import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddCalendarPage.css';

const AddCalendarPage = () => {
    const [eventName, setEventName] = useState('');
    const [eventDescription, setEventDescription] = useState('');
    const [eventStart, setEventStart] = useState('');
    const [eventDuration, setEventDuration] = useState('');
    const [error, setError] = useState(null); // To handle errors

    const navigate = useNavigate();

    const handleAddEvent = async () => {
        try {
            // Construct the event object
            const newEvent = {
                eventName,
                eventDescription,
                eventStart,
                eventDuration,
                studentId:1,
                cyear:null,
                courseCode:null,

            };

            // Call the backend API to insert the event
            const response = await fetch('http://localhost:5000/events', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newEvent),
            });

            // Check for errors in the response
            if (!response.ok) {
                throw new Error('Failed to add the event');
            }

            console.log('Event successfully added:', newEvent);

            // Redirect back to the calendar page
            navigate('/view-calendar');
        } catch (error) {
            console.error('Error adding event:', error);
            setError('Failed to add the event. Please try again.');
        }
    };

    return (
        <div className="add-event-container">
            <h2>Add New Event</h2>
            <form onSubmit={(e) => e.preventDefault()}>
                <div>
                    <label>Event Name</label>
                    <input
                        type="text"
                        value={eventName}
                        onChange={(e) => setEventName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Description</label>
                    <textarea
                        value={eventDescription}
                        onChange={(e) => setEventDescription(e.target.value)}
                    />
                </div>
                <div>
                    <label>Start Date and Time</label>
                    <input
                        type="datetime-local"
                        value={eventStart}
                        onChange={(e) => setEventStart(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Duration (HH:mm:ss)</label>
                    <input
                        type="text"
                        value={eventDuration}
                        onChange={(e) => setEventDuration(e.target.value)}
                        required
                    />
                </div>
                <button type="button" onClick={handleAddEvent}>Add Event</button>
            </form>

            {/* Display error message if any */}
            {error && <div className="error-message">{error}</div>}

            {/* Back Button */}
            <div className="back-button">
                <button onClick={() => navigate('/view-calendar')}>Back to Calendar</button>
            </div>
        </div>
    );
};

export default AddCalendarPage;
