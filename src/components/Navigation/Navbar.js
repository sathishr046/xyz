import React, { useState, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { SettingsContext } from '../../context/SettingsContext';
import SettingsModal from '../Settings/SettingsModal';
import './Navbar.css';

const Navbar = () => {
  const [showSettings, setShowSettings] = useState(false);
  const { translate } = useContext(SettingsContext);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        <div className="brand-logo">
          <span className="brand-emoji">🌿</span>
          <span>PlantCare AI</span>
        </div>
      </Link>

      <div className="navbar-links">
        <Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`}>
          🏠
          <span>{translate('home')}</span>
        </Link>
        <Link to="/analyze" className={`nav-link ${isActive('/analyze') ? 'active' : ''}`}>
          🔍
          <span>{translate('analyze')}</span>
        </Link>
        <Link to="/history" className={`nav-link ${isActive('/history') ? 'active' : ''}`}>
          📋
          <span>{translate('history')}</span>
        </Link>
        <Link to="/encyclopedia" className={`nav-link ${isActive('/encyclopedia') ? 'active' : ''}`}>
          📚
          <span>{translate('encyclopedia')}</span>
        </Link>
        <Link to="/community" className={`nav-link ${isActive('/community') ? 'active' : ''}`}>
          👥
          <span>{translate('community')}</span>
        </Link>
        <Link to="/about" className={`nav-link ${isActive('/about') ? 'active' : ''}`}>
          ℹ️
          <span>{translate('about')}</span>
        </Link>
        <button 
          className="settings-button" 
          onClick={() => setShowSettings(true)}
          aria-label="Settings"
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
