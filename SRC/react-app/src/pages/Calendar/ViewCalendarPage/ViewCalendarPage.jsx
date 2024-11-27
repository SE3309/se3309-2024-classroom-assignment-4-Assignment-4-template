import React, { useState, useEffect } from 'react';
import moment from 'moment'; // For date manipulation
import { Link } from 'react-router-dom'; // For navigation
import './ViewCalendarPage.css';

const ViewCalendarPage = () => {
    // Example events data
    const eventsData = [
        {
            eventID: 5272,
            eventName: 'Student Event',
            eventDescription: 'Event for Student 156',
            eventStart: '2024-12-31 17:00:00',
            eventDuration: '3:00:00',
            courseCode: null,
            cyear: null,
            studentID: 156,
        },
        {
            eventID: 5273,
            eventName: 'Course Registration Deadline',
            eventDescription: 'Final date for course registration',
            eventStart: '2025-01-20 09:00:00',
            eventDuration: '2:00:00',
            courseCode: 'CS101',
            cyear: '2025',
            studentID: 156,
        },
        // Add other events here...
    ];

    // State for current week and events in that week
    const [currentWeek, setCurrentWeek] = useState(moment());
    const [weekEvents, setWeekEvents] = useState([]);

    // Get events for the current week
    const getEventsForWeek = () => {
        const startOfWeek = currentWeek.clone().startOf('week').startOf('day'); 
        const endOfWeek = currentWeek.clone().endOf('week').endOf('day'); 

        // Filter events that fall within the current week
        const eventsInWeek = eventsData.filter(event => {
            const eventStart = moment(event.eventStart);
            return eventStart.isSameOrAfter(startOfWeek) && eventStart.isSameOrBefore(endOfWeek);
        });

        setWeekEvents(eventsInWeek);
    };

    useEffect(() => {
        getEventsForWeek();
    }, [currentWeek]);

    // Handle navigation to the next and previous weeks
    const goToNextWeek = () => {
        setCurrentWeek(prev => moment(prev).add(1, 'week'));
    };

    const goToPrevWeek = () => {
        setCurrentWeek(prev => moment(prev).subtract(1, 'week'));
    };

    // Helper function to format event duration
    const eventDuration = (duration) => {
        const [hours, minutes] = duration.split(':');
        return `${hours} hours ${minutes} minutes`;
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

            <div className="calendar-events">
                {weekEvents.length === 0 ? (
                    <p>No events this week</p>
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
