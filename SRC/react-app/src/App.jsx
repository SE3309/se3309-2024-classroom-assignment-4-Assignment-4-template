import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import StudentLoginPage from './pages/StudentLoginPage/StudentLoginPage';
import ViewCalendarPage from './pages/Calendar/ViewCalendarPage/ViewCalendarPage';
import AddCalendarPage from './pages/Calendar/AddCalendarPage/AddCalendarPage';
import LaunchPage from './pages/LaunchPage/LaunchPage';
import ProtectedRoute from './components/ProtectedRoute';
import Header from './components/Header/Header';
import FacultyLoginPage from './pages/FacultyLoginPage.jsx/FacultyLoginPage';
import ManageStudentsPage from './pages/ManageStudents/ManageStudentsPage';



const App = () => {
    return (
        <Router>
            <Routes>
                {/* Public Routes */}
                <Route path="/" element={<LaunchPage />} />
                <Route path="/student-login" element={<StudentLoginPage />} />
                <Route path="/faculty-login" element={<FacultyLoginPage />} />

                {/* Protected Routes */}
                <Route
                    path="/home"
                    element={
                        <ProtectedRoute>
                            <>
                                <Header />
                                <HomePage />
                            </>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/view-calendar"
                    element={
                        <ProtectedRoute>
                            <>
                                <Header />
                                <ViewCalendarPage />
                            </>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/add-event"
                    element={
                        <ProtectedRoute>
                            <>
                                <Header />
                                <AddCalendarPage />
                            </>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/manage-students"
                    element={
                        <ProtectedRoute>
                            <>
                                <ManageStudentsPage />
                            </>
                        </ProtectedRoute>
                    }
                />

                {/* Catch-all Route */}
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </Router>
    );
};

export default App;
