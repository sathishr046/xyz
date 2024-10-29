import React, { createContext, useState, useEffect } from 'react';

export const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState({
    language: localStorage.getItem('language') || 'en',
    font: 'inter',
    notifications: true,
    screenReader: false,
    saveHistory: true
  });

  // Simple translation object for common texts
  const translations = {
    en: {
      home: 'Home',
      analyze: 'Analyze Plant',
      history: 'History',
      encyclopedia: 'Encyclopedia',
      weather: 'Weather',
      community: 'Community',
      about: 'About',
      welcome: 'Welcome to PlantCare AI',
      subtitle: 'Advanced Plant Disease Detection & Treatment Recommendations',
      startAnalysis: 'Start Analysis'
    },
    kn: {
      home: 'ಮುಖಪುಟ',
      analyze: 'ಸಸ್ಯ ವಿಶ್ಲೇಷಣೆ',
      history: 'ಇತಿಹಾಸ',
      encyclopedia: 'ವಿಶ್ವಕೋಶ',
      weather: 'ಹವಾಮಾನ',
      community: 'ಸಮುದಾಯ',
      about: 'ನಮ್ಮ ಬಗ್ಗೆ',
      welcome: 'ಪ್ಲಾಂಟ್‌ಕೇರ್ AI ಗೆ ಸ್ವಾಗತ',
      subtitle: 'ಸುಧಾರಿತ ಸಸ್ಯ ರೋಗ ಪತ್ತೆ ಮತ್ತು ಚಿಕಿತ್ಸಾ ಶಿಫಾರಸುಗಳು',
      startAnalysis: 'ವಿಶ್ಲೇಷಣೆ ಪ್ರಾರಂಭಿಸಿ'
    }
  };

  const translate = (key) => {
    return translations[settings.language]?.[key] || translations.en[key] || key;
  };

  const updateSettings = (newSettings) => {
    const updatedSettings = { ...settings, ...newSettings };
    setSettings(updatedSettings);
    localStorage.setItem('settings', JSON.stringify(updatedSettings));
    
    if (newSettings.language) {
      localStorage.setItem('language', newSettings.language);
    }
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSettings, translate }}>
      {children}
    </SettingsContext.Provider>
  );
};
