import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css'; // Optional for styles
import AuthService from '../../services/AuthService'; // AuthService for authentication

const Header = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Clear user session (localStorage or other storage)
       AuthService.logout()
        navigate('/'); 
    };

    return (
        <header className="header">
            <h1>G.R.A.D.E.S</h1>
            <button onClick={handleLogout} className="logout-button">
                Logout
            </button>
        </header>
    );
};

export default Header;
