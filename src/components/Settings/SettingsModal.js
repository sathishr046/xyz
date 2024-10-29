import React, { useState, useContext } from 'react';
import { SettingsContext } from '../../context/SettingsContext';
import './SettingsModal.css';

const SettingsModal = ({ onClose }) => {
  const { settings, updateSettings } = useContext(SettingsContext);
  const [showFonts, setShowFonts] = useState(false);

  const fonts = [
    { id: 'inter', name: 'Inter', class: 'font-family-inter' },
    { id: 'roboto', name: 'Roboto', class: 'font-family-roboto' },
    { id: 'poppins', name: 'Poppins', class: 'font-family-poppins' },
    { id: 'playfair', name: 'Playfair Display', class: 'font-family-playfair' },
    { id: 'montserrat', name: 'Montserrat', class: 'font-family-montserrat' }
  ];

  const fontSizes = [
    { id: 'sm', name: 'Small', class: 'font-size-sm' },
    { id: 'md', name: 'Medium', class: 'font-size-md' },
    { id: 'lg', name: 'Large', class: 'font-size-lg' },
    { id: 'xl', name: 'Extra Large', class: 'font-size-xl' },
    { id: '2xl', name: '2X Large', class: 'font-size-2xl' }
  ];

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Español' },
    { code: 'fr', name: 'Français' },
    { code: 'de', name: 'Deutsch' },
    { code: 'it', name: 'Italiano' },
    { code: 'pt', name: 'Português' },
    { code: 'ru', name: 'Русский' },
    { code: 'zh', name: '中文' },
    { code: 'ja', name: '日本語' },
    { code: 'ko', name: '한국어' }
  ];

  return (
    <div className="settings-modal">
      <div className="settings-content">
        <div className="settings-header">
          <h2>Settings</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>

        <div className="settings-body">
          {/* Font Settings */}
          <div className="settings-section">
            <div className="setting-row">
              <span>Font Style</span>
              <button 
                className="font-toggle"
                onClick={() => setShowFonts(!showFonts)}
              >
                Change Font
              </button>
            </div>
            
            {showFonts && (
              <div className="font-options">
                {fonts.map(font => (
                  <button
                    key={font.id}
                    className={`font-button ${settings.font === font.id ? 'active' : ''}`}
                    onClick={() => {
                      updateSettings({ font: font.id });
                      setShowFonts(false);
                    }}
                    style={{ fontFamily: font.name }}
                  >
                    {font.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Notification Settings */}
          <div className="settings-section">
            <div className="setting-row">
              <span>Push Notifications</span>
              <label className="toggle">
                <input
                  type="checkbox"
                  checked={settings.notifications}
                  onChange={(e) => updateSettings({ notifications: e.target.checked })}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>
          </div>

          {/* Language Settings */}
          <div className="settings-section">
            <div className="setting-row">
              <span data-translate="true">Language</span>
              <select
                value={settings.language}
                onChange={(e) => updateSettings({ language: e.target.value })}
              >
                {languages.map(lang => (
                  <option key={lang.code} value={lang.code}>
                    {lang.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Accessibility Settings */}
          <div className="settings-section">
            <div className="setting-row">
              <span>Screen Reader Support</span>
              <label className="toggle">
                <input
                  type="checkbox"
                  checked={settings.screenReader}
                  onChange={(e) => updateSettings({ screenReader: e.target.checked })}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>
          </div>

          {/* Data Settings */}
          <div className="settings-section">
            <div className="setting-row">
              <span>Save Analysis History</span>
              <label className="toggle">
                <input
                  type="checkbox"
                  checked={settings.saveHistory}
                  onChange={(e) => updateSettings({ saveHistory: e.target.checked })}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
