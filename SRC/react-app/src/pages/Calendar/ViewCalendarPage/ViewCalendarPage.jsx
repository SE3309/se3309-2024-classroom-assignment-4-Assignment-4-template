import React, { useState, useEffect } from 'react';
import moment from 'moment-timezone'; // For date manipulation with time zone
import { Link } from 'react-router-dom'; // For navigation
import './ViewCalendarPage.css';

const ViewCalendarPage = () => {
    const [currentWeek, setCurrentWeek] = useState(moment());
    const [weekEvents, setWeekEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch events for the given student ID (set to 1 for now)
    const fetchEvents = async () => {
        const studentId = 1;  // Set to 1 for now

        try {
            const response = await fetch(`http://localhost:5000/api/events/${studentId}`);
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

    const goToNextWeek = () => {
        setCurrentWeek(prev => moment(prev).add(1, 'week'));
    };

    const goToPrevWeek = () => {
        setCurrentWeek(prev => moment(prev).subtract(1, 'week'));
    };

    // Helper function to format event duration (in seconds)
    const eventDuration = (duration) => {
        if (typeof duration === 'number') {
            const hours = Math.floor(duration / 3600);  // Convert seconds to hours
            const minutes = Math.floor((duration % 3600) / 60);  // Get minutes
            const seconds = duration % 60;  // Get remaining seconds

            return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }
        return 'Invalid Duration';  // Fallback for invalid duration data
    };

    // Handle event deletion with confirmation and lecture check
    const handleDeleteEvent = async (eventId, isLecture) => {
        if (isLecture) {
            // Block deletion of lecture events
            alert('Weekly lectures cannot be deleted.');
            return;
        }

        const confirmDelete = window.confirm('Are you sure you want to delete this event?');

        if (confirmDelete) {
            try {
                const response = await fetch(`http://localhost:5000/api/events/${eventId}`, {
                    method: 'DELETE',
                });

                if (!response.ok) {
                    throw new Error('Failed to delete the event');
                }

                console.log('Event successfully deleted');
                fetchEvents();  // Refresh the events after deletion
            } catch (error) {
                console.error('Error deleting event:', error);
                setError('Failed to delete the event. Please try again.');
            }
        }
    };

    // Group events by day
    const eventsByDay = {};
    weekEvents.forEach(event => {
        const eventDate = moment(event.eventStart).format('YYYY-MM-DD'); // Format date as YYYY-MM-DD
        if (!eventsByDay[eventDate]) {
            eventsByDay[eventDate] = [];
        }
        eventsByDay[eventDate].push(event);
    });

    // Get the list of days in the current week (from Sunday to Saturday)
    const weekDays = Array.from({ length: 7 }, (_, i) => moment(currentWeek).startOf('week').add(i, 'days'));

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
                ) : (
                    weekDays.map(day => {
                        const formattedDay = day.format('YYYY-MM-DD');
                        const dayEvents = eventsByDay[formattedDay] || [];

                        return (
                            <div key={formattedDay} className="calendar-day">
                                <h3>{day.format('dddd, MMMM Do YYYY')}</h3>
                                {dayEvents.length === 0 ? (
                                    <p>No events</p>
                                ) : (
                                    dayEvents.map(event => (
                                        <div key={event.eventID} className="calendar-event">
                                            <span className="event-name">{event.eventName}</span>
                                            <span className="event-time">
                                                {moment(event.eventStart).tz('America/Toronto').format('YYYY-MM-DD HH:mm')}  {/* Converts to Eastern Time Zone */}
                                            </span>
                                            <span className="event-duration">
                                                Duration: {eventDuration(event.eventDuration)}
                                            </span>
                                            <p className="event-description">{event.eventDescription}</p>
                                            <button
                                                className="delete-button"
                                                onClick={() => handleDeleteEvent(event.eventID, !!event.courseCode)}  
                                            >
                                                X
                                            </button>
                                        </div>
                                    ))
                                )}
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
};

export default ViewCalendarPage;
