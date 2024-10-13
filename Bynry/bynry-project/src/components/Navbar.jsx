import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './navbar.css'; // Navbar specific styles

// Import the image from src/assets
import logo from '../assets/resume.png';

const Navbar = ({ isAdmin, handleLogin, handleLogout }) => {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin') {
      handleLogin(username, password);
      setShowLoginForm(false);
      navigate('/admin-panel');
    } else {
      setErrorMessage('Invalid credentials!');
    }
  };

  const handleLogoutClick = () => {
    handleLogout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">
          {/* Use the imported logo */}
          <img src={logo} alt="Logo" className="logo-image" />
        </Link>
      </div>
      <div className="navbar-links">
        {!isAdmin ? (
          <>
            <button className="login-button" onClick={() => setShowLoginForm(!showLoginForm)}>
              Admin Login
            </button>
            {showLoginForm && (
              <div className="login-form-container">
                <form onSubmit={handleSubmit} className="login-form">
                  <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button type="submit">Login</button>
                </form>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
              </div>
            )}
          </>
        ) : (
          <>
            <Link to="/admin-panel" className="admin-link">Admin Panel</Link>
            <button className="logout-button" onClick={handleLogoutClick}>
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
