import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import './ViewCalendar.css';

const formatDate = (date) => {
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(date).toLocaleDateString(undefined, options);
};

// Mock event data
const events = [
  {
    id: 1,
    title: 'Course Registration Deadline',
    date: '2024-12-05',
    time: '11:59 PM',
    description: 'Last day to register for courses for the Spring semester.',
  },
  {
    id: 2,
    title: 'Final Exam Week',
    date: '2024-12-12',
    time: 'All Day',
    description: 'Final exams begin this week. Check your exam schedule.',
  },
  {
    id: 3,
    title: 'Faculty Office Hours',
    date: '2024-12-15',
    time: '2:00 PM - 4:00 PM',
    description: 'Drop in for any questions regarding your courses or grades.',
  },
  {
    id: 4,
    title: 'Holiday Break Begins',
    date: '2024-12-20',
    time: 'All Day',
    description: 'University closes for the winter holidays.',
  },
];

const groupEventsByWeek = (events) => {
  const weeks = [];
  events.forEach((event) => {
    const eventDate = new Date(event.date);
    const startOfWeek = new Date(eventDate);
    startOfWeek.setDate(eventDate.getDate() - eventDate.getDay()); // Get the start of the week (Sunday)

    const weekIndex = weeks.findIndex(
      (week) => week.startDate.toDateString() === startOfWeek.toDateString()
    );

    if (weekIndex === -1) {
      weeks.push({
        startDate: startOfWeek,
        events: [event],
      });
    } else {
      weeks[weekIndex].events.push(event);
    }
  });

  return weeks;
};

function ViewCalendar() {
  const navigate = useNavigate(); // Hook to navigate to another page

  const weeks = groupEventsByWeek(events);

  return (
    <div className="calendar-container">
      <h1 className="calendar-title">Your Calendar</h1>
      
      {/* Button to navigate to Add Calendar Event Page */}
      <button className="add-event-button" onClick={() => navigate('/add-calendar')}>
        + Add Event
      </button>

      <div className="calendar-weeks">
        {weeks.map((week, index) => (
          <div key={index} className="week">
            <h2 className="week-title">Week of {formatDate(week.startDate)}</h2>
            <div className="week-events">
              {week.events.map((event) => (
                <div key={event.id} className="event-card">
                  <h3 className="event-title">{event.title}</h3>
                  <p className="event-date">Date: {formatDate(event.date)}</p>
                  <p className="event-time">Time: {event.time}</p>
                  <p className="event-description">{event.description}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ViewCalendar;
