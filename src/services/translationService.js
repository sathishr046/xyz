import { languages } from '../constants/languages';

const languageMapping = {
  'hi': 'hindi',
  'te': 'telugu',
  'ta': 'tamil',
  'kn': 'kannada',
  'ml': 'malayalam',
  'bn': 'bengali',
  'gu': 'gujarati',
  'mr': 'marathi',
  'pa': 'punjabi',
  'ur': 'urdu',
  'or': 'odia',
  'as': 'assamese',
  'ks': 'kashmiri',
  'sd': 'sindhi',
  'sa': 'sanskrit',
  'ne': 'nepali'
};

const translateContent = async (text, targetLanguage) => {
  if (!text || targetLanguage === 'en') return text;
  
  const mappedLanguage = languageMapping[targetLanguage] || targetLanguage;
  
  try {
    // First attempt: LibreTranslate
    const response = await fetch('https://libretranslate.de/translate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        q: text,
        source: 'en',
        target: mappedLanguage,
      })
    });
    
    if (!response.ok) {
      throw new Error('LibreTranslate failed');
    }
    
    const data = await response.json();
    return data.translatedText || text;
    
  } catch (error) {
    console.error('LibreTranslate error:', error);
    
    // Fallback: MyMemory Translation API with mapped language
    try {
      const myMemoryResponse = await fetch(
        `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|${mappedLanguage}`
      );
      const myMemoryData = await myMemoryResponse.json();
      return myMemoryData.responseData.translatedText || text;
    } catch (fallbackError) {
      console.error('Fallback translation error:', fallbackError);
      return text;
    }
  }
};

export { translateContent };