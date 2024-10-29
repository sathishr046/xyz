import React from 'react';
import LanguageSelector from '../LanguageSelector/LanguageSelector';
import { useContext } from 'react';
import { SettingsContext } from '../../context/SettingsContext';
import './SettingsModal.css';

const SettingsModal = ({ onClose }) => {
  const { settings, updateSettings } = useContext(SettingsContext);

  const handleLanguageChange = (langCode) => {
    updateSettings({ language: langCode });
    localStorage.setItem('preferred-language', langCode);
  };

  return (
    <div className="settings-modal">
      <div className="settings-content">
        <div className="settings-header">
          <h2>Settings</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>

        <div className="settings-body">
          <div className="settings-section">
            <div className="setting-row">
              <span>Select Language</span>
              <LanguageSelector 
                selectedLanguage={settings.language}
                onLanguageChange={handleLanguageChange}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
