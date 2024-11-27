import React, { useState, useEffect } from 'react';
import moment from 'moment'; // For date manipulation
import { Link } from 'react-router-dom'; // For navigation
import './ViewCalendarPage.css';

const ViewCalendarPage = () => {
    // State for current week, events in that week, and loading state
    const [currentWeek, setCurrentWeek] = useState(moment());
    const [weekEvents, setWeekEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch events for the given student ID (set to 1 for now)
    const fetchEvents = async () => {
        const studentId = 1;  // Set to 1 for now

        try {
            const response = await fetch(`http://localhost:5000/events/${studentId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch events');
            }
            const data = await response.json();

            // Filter events that fall within the current week
            const startOfWeek = currentWeek.clone().startOf('week').startOf('day');
            const endOfWeek = currentWeek.clone().endOf('week').endOf('day');

            const eventsInWeek = data.filter(event => {
                const eventStart = moment(event.eventStart);
                return eventStart.isSameOrAfter(startOfWeek) && eventStart.isSameOrBefore(endOfWeek);
            });

            setWeekEvents(eventsInWeek);
            setLoading(false);
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEvents();
    }, [currentWeek]); // Refetch events when currentWeek changes

    // Handle navigation to the next and previous weeks
    const goToNextWeek = () => {
        setCurrentWeek(prev => moment(prev).add(1, 'week'));
    };

    const goToPrevWeek = () => {
        setCurrentWeek(prev => moment(prev).subtract(1, 'week'));
    };

    // Helper function to format event duration (in seconds)
    const eventDuration = (duration) => {
        // Ensure the duration is a number (in seconds)
        if (typeof duration === 'number') {
            const hours = Math.floor(duration / 3600);  // Convert seconds to hours
            const minutes = Math.floor((duration % 3600) / 60);  // Get minutes
            const seconds = duration % 60;  // Get remaining seconds

            // Format the duration into HH:MM:SS
            return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }

        return 'Invalid Duration';  // Fallback for invalid duration data
    };

    return (
        <div className="calendar-container">
            <h2>Your Calendar</h2>
            
            {/* Back to Home Button */}
            <div className="back-home-button">
                <Link to="/home">
                    <button>Back to Home</button>
                </Link>
            </div>

            <div className="calendar-navigation">
                <button onClick={goToPrevWeek}>&lt; Prev Week</button>
                <span className="current-week">{currentWeek.format('MMMM Do YYYY')}</span>
                <button onClick={goToNextWeek}>Next Week &gt;</button>
            </div>
            
            {/* Add Event Button */}
            <div className="add-event-button">
                <Link to="/add-event">
                    <button>Add Event</button>
                </Link>
            </div>

            {/* Display Loading or Events */}
            <div className="calendar-events">
                {loading ? (
                    <p className="loading">Loading events...</p>
                ) : error ? (
                    <p className="error">Error: {error}</p>
                ) : weekEvents.length === 0 ? (
                    <p className="no-events">No events this week</p>
                ) : (
                    weekEvents.map(event => (
                        <div key={event.eventID} className="calendar-event">
                            <span className="event-name">{event.eventName}</span>
                            <span className="event-time">
                                {moment(event.eventStart).format('YYYY-MM-DD HH:mm')}
                            </span>
                            <span className="event-duration">
                                Duration: {eventDuration(event.eventDuration)}
                            </span>
                            <p className="event-description">{event.eventDescription}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default ViewCalendarPage;
