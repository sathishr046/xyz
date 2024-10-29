import React from 'react';
import { languages } from '../../constants/languages';
import './LanguageSelector.css';

const LanguageSelector = ({ selectedLanguage, onLanguageChange }) => {
    return (
        <div className="language-selector">
            <select 
                value={selectedLanguage} 
                onChange={(e) => onLanguageChange(e.target.value)}
                className="language-select"
            >
                {languages.map((lang) => (
                    <option key={lang.code} value={lang.code}>
                        {lang.nativeName} ({lang.name})
                    </option>
                ))}
            </select>
        </div>
    );
};

export default LanguageSelector;