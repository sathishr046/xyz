import React from 'react';
import './LanguagePromptModal.css';

const LanguagePromptModal = ({ onLanguageSelect, onClose }) => {
    const languages = [
        { code: 'kn', name: 'ಕನ್ನಡ', flag: '🇮🇳' },
        { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
        { code: 'te', name: 'తెలుగు', flag: '🇮🇳' },
        { code: 'ta', name: 'தமிழ்', flag: '🇮🇳' },
        { code: 'en', name: 'English', flag: '🇬🇧' }
    ];

    return (
        <div className="language-prompt-overlay">
            <div className="language-prompt-modal">
                <h2>Select Your Language • ನಿಮ್ಮ ಭಾಷೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ</h2>
                <div className="language-grid">
                    {languages.map(lang => (
                        <button
                            key={lang.code}
                            className="language-select-btn"
                            onClick={() => onLanguageSelect(lang.code)}
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

export default LanguagePromptModal;
