import React from 'react';
import { languages } from '../../constants/languages';
import './LanguageSelector.css';

const LanguageSelector = ({ onLanguageSelect }) => {
  return (
    <div className="language-selector-overlay">
      <div className="language-selector-modal">
        <h2>Select Your Preferred Language</h2>
        <p>Choose the language for analysis results</p>
        
        <div className="languages-grid">
          {languages.map((lang) => (
            <button
              key={lang.code}
              className="language-button"
              onClick={() => onLanguageSelect(lang.code)}
            >
              <span className="lang-name">{lang.nativeName}</span>
              <span className="lang-name-en">{lang.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LanguageSelector;