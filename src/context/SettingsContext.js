import React, { createContext, useState, useEffect } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI('AIzaSyAJX0A1MUJ0DuOMzG2SIOKm0yJ-N8kScDI');

export const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState({
    theme: 'light',
    fontSize: 'medium',
    language: 'en',
    notifications: true,
    screenReader: false,
  });

  // Apply theme
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', settings.theme);
    
    // Apply font size
    const fontSizes = {
      small: '14px',
      medium: '16px',
      large: '18px',
      xl: '20px'
    };
    document.documentElement.style.fontSize = fontSizes[settings.fontSize];
  }, [settings.theme, settings.fontSize]);

  const translateContent = async (text, targetLang) => {
    if (targetLang === 'en') return text;
    
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const prompt = `Translate this text to ${targetLang}:\n${text}`;
      const result = await model.generateContent(prompt);
      return result.response.text();
    } catch (error) {
      console.error('Translation error:', error);
      return text;
    }
  };

  const updateSettings = async (newSettings) => {
    const updatedSettings = { ...settings, ...newSettings };
    setSettings(updatedSettings);
    localStorage.setItem('plantcare-settings', JSON.stringify(updatedSettings));

    // Handle language change
    if (newSettings.language && newSettings.language !== settings.language) {
      const elements = document.querySelectorAll('[data-translate]');
      for (const element of elements) {
        const originalText = element.getAttribute('data-translate');
        if (originalText) {
          const translatedText = await translateContent(originalText, newSettings.language);
          element.textContent = translatedText;
        }
      }
    }
  };

  useEffect(() => {
    const savedSettings = localStorage.getItem('plantcare-settings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  return (
    <SettingsContext.Provider value={{ settings, updateSettings, translateContent }}>
      {children}
    </SettingsContext.Provider>
  );
};
