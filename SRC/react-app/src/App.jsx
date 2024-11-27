import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage'; // Adjust path if needed
import LoginPage from './pages/LoginPage/LoginPage'; // Adjust path if needed
import ViewCalendarPage from './pages/Calendar/ViewCalendarPage/ViewCalendarPage'; // Adjust path if needed
import AddCalendarPage from './pages/Calendar/AddCalendarPage/AddCalendarPage'; // Adjust path if needed


const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/home" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/view-calendar" element={<ViewCalendarPage />} />
                <Route path="/add-event" element={<AddCalendarPage />} />
            </Routes>
        </Router>
    );
};

export default App;
