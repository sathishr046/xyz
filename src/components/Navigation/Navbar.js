import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SettingsModal from '../Settings/SettingsModal';
import './Navbar.css';

const Navbar = () => {
  const [showSettings, setShowSettings] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">
          <span className="brand-emoji">🌿</span>
          PlantCare AI
        </Link>
      </div>
      <div className="navbar-links">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/analyze" className="nav-link">Analyze Plant</Link>
        <Link to="/history" className="nav-link">History</Link>
        <Link to="/encyclopedia" className="nav-link">Encyclopedia</Link>
        <Link to="/weather" className="nav-link">Weather</Link>
        <Link to="/community" className="nav-link">Community</Link>
        <Link to="/about" className="nav-link">About</Link>
        <button 
          className="settings-button" 
          onClick={() => setShowSettings(true)}
        >
          ⚙️
        </button>
      </div>
      {showSettings && (
        <SettingsModal onClose={() => setShowSettings(false)} />
      )}
    </nav>
  );
};

export default Navbar;
