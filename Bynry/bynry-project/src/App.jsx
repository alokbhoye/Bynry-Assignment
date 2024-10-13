import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SummaryPage from './pages/SummaryPage';
import AdminPanel from './components/AdminPanel';
import Navbar from './components/Navbar';
import { LoadScript } from '@react-google-maps/api';

function App() {
  const [isAdmin, setIsAdmin] = useState(false); // Admin login state

  // Handle admin login
  const handleLogin = (username, password) => {
    if (username === 'admin' && password === 'admin') {
      setIsAdmin(true); // Set admin state to true when logged in
    }
  };

  // Handle admin logout
  const handleLogout = () => {
    setIsAdmin(false); // Reset admin state to false when logged out
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyCaFdDyirXdl-zcNnLbp5k-9yBadGAQu8g">
      <Router>
        <Navbar isAdmin={isAdmin} handleLogin={handleLogin} handleLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<HomePage isAdmin={isAdmin} />} />
          <Route path="/profile/:id" element={<SummaryPage />} />
          {isAdmin && <Route path="/admin-panel" element={<AdminPanel />} />} {/* Admin panel route */}
        </Routes>
      </Router>
    </LoadScript>
  );
}

export default App;
