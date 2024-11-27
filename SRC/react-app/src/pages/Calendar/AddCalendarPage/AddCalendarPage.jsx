import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddCalendarPage.css';

const AddCalendarPage = () => {
    const [eventName, setEventName] = useState('');
    const [eventDescription, setEventDescription] = useState('');
    const [eventStart, setEventStart] = useState('');
    const [eventDuration, setEventDuration] = useState('');

    const navigate = useNavigate();

    const handleAddEvent = () => {
        // Here you can implement the logic to add the event
        console.log('Event Added:', { eventName, eventDescription, eventStart, eventDuration });

        // Redirect back to the calendar page
        navigate('/');
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

            {/* Back Button */}
            <div className="back-button">
                <button onClick={() => navigate('/view-calendar')}>Back to Calendar</button>
            </div>
        </div>
    );
};

export default AddCalendarPage;
