import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './loginPage';
import HomePage from './HomePage/homePage';
import ViewCalendar from './CalendarPages/View/ViewCalendar.js'; // import the Calendar Page component
import AddCalendar from './CalendarPages/Add/AddCalendar';

function App() {
  const [user, setUser] = useState(null); // State to keep track of logged-in user

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<LoginPage setUser={setUser} />} />
          <Route
            path="/home"
            element={user ? <HomePage user={user} /> : <Navigate to="/login" />}
          />
          <Route path="/calendar" element={<ViewCalendar />} /> {/* Added Calendar Page Route */}
          <Route path="/add-calendar" element={<AddCalendar />} />
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
