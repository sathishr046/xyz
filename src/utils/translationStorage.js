const TRANSLATION_STORAGE_KEY = 'plantcare-translations';

export const TranslationStorage = {
  // Get all stored translations
  getAll: () => {
    try {
      return JSON.parse(localStorage.getItem(TRANSLATION_STORAGE_KEY)) || {};
    } catch {
      return {};
    }
  },

  // Get translation for specific text and language
  get: (text, language) => {
    const translations = TranslationStorage.getAll();
    return translations[`${text}_${language}`];
  },

  // Store new translation
  store: (text, language, translation) => {
    const translations = TranslationStorage.getAll();
    translations[`${text}_${language}`] = translation;
    localStorage.setItem(TRANSLATION_STORAGE_KEY, JSON.stringify(translations));
  }
};
