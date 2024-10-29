import React, { useContext } from 'react';
import { SettingsContext } from '../../context/SettingsContext';
import './LanguagePrompt.css';

const LanguagePrompt = () => {
  const { updateSettings } = useContext(SettingsContext);

  const commonLanguages = [
    { code: 'kn', name: 'ಕನ್ನಡ', flag: '🇮🇳' },
    { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
    { code: 'te', name: 'తెలుగు', flag: '🇮🇳' },
    { code: 'en', name: 'English', flag: '🇬🇧' }
  ];

  const selectLanguage = (langCode) => {
    updateSettings({ language: langCode });
    localStorage.setItem('preferred-language', langCode);
    localStorage.setItem('language-selected', 'true');
  };

  // Only show if language hasn't been selected before
  if (localStorage.getItem('language-selected')) {
    return null;
  }

  return (
    <div className="language-prompt-overlay">
      <div className="language-prompt-card">
        <h2>Select Your Language • ನಿಮ್ಮ ಭಾಷೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ</h2>
        <div className="language-buttons">
          {commonLanguages.map(lang => (
            <button
              key={lang.code}
              className="language-button"
              onClick={() => selectLanguage(lang.code)}
            >
              <span className="lang-flag">{lang.flag}</span>
              <span className="lang-name">{lang.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LanguagePrompt;
