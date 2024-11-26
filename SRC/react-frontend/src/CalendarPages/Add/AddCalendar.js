import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddCalendar.css';

function AddCalendar() {
  const [eventID, setEventID] = useState('');
  const [eventName, setEventName] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [eventStart, setEventStart] = useState('');
  const [eventDuration, setEventDuration] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Create an event object to mimic inserting data
    const newEvent = {
      eventID,
      eventName,
      eventDescription,
      eventStart,
      eventDuration,
    };
    console.log('New Event Added:', newEvent);
    // Navigate back to the calendar page after submission
    navigate('/view-calendar');
  };

  return (
    <div className="add-calendar-container">
      <h1>Add New Event</h1>
      <form onSubmit={handleSubmit} className="event-form">
        <div className="form-group">
          <label htmlFor="eventID">Event ID</label>
          <input
            type="number"
            id="eventID"
            value={eventID}
            onChange={(e) => setEventID(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="eventName">Event Name</label>
          <input
            type="text"
            id="eventName"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="eventDescription">Event Description</label>
          <textarea
            id="eventDescription"
            value={eventDescription}
            onChange={(e) => setEventDescription(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="eventStart">Event Start</label>
          <input
            type="datetime-local"
            id="eventStart"
            value={eventStart}
            onChange={(e) => setEventStart(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="eventDuration">Event Duration</label>
          <input
            type="time"
            id="eventDuration"
            value={eventDuration}
            onChange={(e) => setEventDuration(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="submit-button">Add Event</button>
      </form>
    </div>
  );
}

export default AddCalendar;
