import React, { useState, useContext } from 'react';
import { SettingsContext } from '../../context/SettingsContext';
import './SettingsModal.css';

const SettingsModal = ({ onClose }) => {
  const { settings, updateSettings } = useContext(SettingsContext);
  const [activeTab, setActiveTab] = useState('general');

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'hi', name: 'हिंदी (Hindi)' },
    { code: 'kn', name: 'ಕನ್ನಡ (Kannada)' },
    { code: 'te', name: 'తెలుగు (Telugu)' },
    { code: 'ta', name: 'தமிழ் (Tamil)' },
    { code: 'ml', name: 'മലയാളം (Malayalam)' },
    { code: 'mr', name: 'मराठी (Marathi)' },
    { code: 'gu', name: 'ગુજરાતી (Gujarati)' },
    { code: 'bn', name: 'বাংলা (Bengali)' },
    { code: 'pa', name: 'ਪੰਜਾਬੀ (Punjabi)' }
  ];

  const themes = [
    { id: 'light', name: 'Light', icon: '☀️' },
    { id: 'dark', name: 'Dark', icon: '🌙' },
    { id: 'nature', name: 'Nature', icon: '🌿' },
    { id: 'contrast', name: 'High Contrast', icon: '👁️' }
  ];

  const fontSizes = [
    { id: 'small', name: 'Small', scale: 0.9 },
    { id: 'medium', name: 'Medium', scale: 1 },
    { id: 'large', name: 'Large', scale: 1.1 },
    { id: 'xl', name: 'Extra Large', scale: 1.2 }
  ];

  // Add these new settings options
  const accessibilityOptions = [
    { id: 'highContrast', name: 'High Contrast Mode' },
    { id: 'reducedMotion', name: 'Reduced Motion' },
    { id: 'largeText', name: 'Large Text' },
    { id: 'screenReader', name: 'Screen Reader Support' }
  ];

  const displayOptions = [
    { id: 'darkMode', name: 'Dark Mode' },
    { id: 'compactView', name: 'Compact View' },
    { id: 'rtlSupport', name: 'RTL Support' }
  ];

  return (
    <div className="settings-modal">
      <div className="settings-content">
        <div className="settings-header">
          <h2>Settings</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>

        <div className="settings-tabs">
          <button 
            className={`tab ${activeTab === 'general' ? 'active' : ''}`}
            onClick={() => setActiveTab('general')}
          >
            General
          </button>
          <button 
            className={`tab ${activeTab === 'appearance' ? 'active' : ''}`}
            onClick={() => setActiveTab('appearance')}
          >
            Appearance
          </button>
          <button 
            className={`tab ${activeTab === 'language' ? 'active' : ''}`}
            onClick={() => setActiveTab('language')}
          >
            Language
          </button>
          <button 
            className={`tab ${activeTab === 'accessibility' ? 'active' : ''}`}
            onClick={() => setActiveTab('accessibility')}
          >
            Accessibility
          </button>
        </div>

        <div className="settings-body">
          {activeTab === 'general' && (
            <div className="settings-section">
              <h3>Notifications</h3>
              <label className="setting-item">
                <input 
                  type="checkbox"
                  checked={settings.notifications}
                  onChange={(e) => updateSettings({ notifications: e.target.checked })}
                />
                Enable Notifications
              </label>

              <h3>Accessibility</h3>
              <label className="setting-item">
                <input 
                  type="checkbox"
                  checked={settings.screenReader}
                  onChange={(e) => updateSettings({ screenReader: e.target.checked })}
                />
                Screen Reader Support
              </label>
            </div>
          )}

          {activeTab === 'appearance' && (
            <div className="settings-section">
              <h3>Theme</h3>
              <div className="theme-options">
                {themes.map(theme => (
                  <button
                    key={theme.id}
                    className={`theme-button ${settings.theme === theme.id ? 'active' : ''}`}
                    onClick={() => updateSettings({ theme: theme.id })}
                  >
                    <span>{theme.icon}</span>
                    {theme.name}
                  </button>
                ))}
              </div>

              <h3>Font Size</h3>
              <div className="font-size-slider">
                {fontSizes.map(size => (
                  <button
                    key={size.id}
                    className={`font-size-button ${settings.fontSize === size.id ? 'active' : ''}`}
                    onClick={() => updateSettings({ fontSize: size.id })}
                    style={{ fontSize: `${size.scale}rem` }}
                  >
                    Aa
                  </button>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'language' && (
            <div className="settings-section">
              <h3>Select Language</h3>
              <div className="language-grid">
                {languages.map(lang => (
                  <button
                    key={lang.code}
                    className={`language-button ${settings.language === lang.code ? 'active' : ''}`}
                    onClick={() => updateSettings({ language: lang.code })}
                  >
                    {lang.name}
                  </button>
                ))}
              </div>
              <div className="ai-translation-info">
                <p>AI-powered translation enabled</p>
                <small>Content will be translated in real-time</small>
              </div>
            </div>
          )}

          {activeTab === 'accessibility' && (
            <div className="settings-section">
              <h3>Accessibility Options</h3>
              <div className="accessibility-options">
                {accessibilityOptions.map(option => (
                  <label key={option.id} className="setting-item">
                    <input
                      type="checkbox"
                      checked={settings[option.id]}
                      onChange={(e) => updateSettings({ [option.id]: e.target.checked })}
                    />
                    {option.name}
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
