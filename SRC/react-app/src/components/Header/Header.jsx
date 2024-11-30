import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import './Header.css';
import AuthService from '../../services/AuthService';

const Header = () => {
    const navigate = useNavigate();
    const { logout } = useContext(UserContext);

    const handleLogout = () => {
        AuthService.logout();
        logout();
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
