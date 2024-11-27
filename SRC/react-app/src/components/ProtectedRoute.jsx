import React from 'react';
import { Navigate } from 'react-router-dom';
import AuthService from '../services/AuthService';

const ProtectedRoute = ({ children }) => {
    if (!AuthService.isAuthenticated()) {
        alert("You are not authenticated")
        return <Navigate to="/" replace />;
    }
    return children;
};

export default ProtectedRoute;
