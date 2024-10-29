import { GoogleGenerativeAI } from '@google/generative-ai';
import { plantsData } from '../data/plantsData';

const genAI = new GoogleGenerativeAI('AIzaSyAJX0A1MUJ0DuOMzG2SIOKm0yJ-N8kScDI');

export const fetchPlantInfo = async (plantName, settings = { language: 'en' }) => {
  console.log(`Starting API request for ${plantName}`);
  
  try {
    // First check if we have local data
    const localData = plantsData.find(p => 
      p.name.toLowerCase() === plantName.toLowerCase()
    );

    if (localData) {
      console.log('Found local data for', plantName);
      return localData;
    }

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    
    const prompt = `
      Analyze this ${plantName} plant and provide information in ${settings.language} language. 
      Return ONLY a JSON object (no markdown, no explanation) with this structure:
      {
        "name": "${plantName}",
        "scientificName": "scientific name",
        "description": "brief description",
        "careGuide": {
          "water": "watering needs",
          "sunlight": "sunlight requirements",
          "temperature": "ideal temperature range"
        }
      }`;

    console.log('Sending prompt to API...');
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    console.log('Raw API response:', text);

    let jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('No JSON found in response');
    }

    const jsonStr = jsonMatch[0];
    console.log('Extracted JSON:', jsonStr);

    const parsedData = JSON.parse(jsonStr);
    
    if (!parsedData.name || !parsedData.scientificName || !parsedData.careGuide) {
      throw new Error('Invalid data structure');
    }

    return {
      ...parsedData,
      image: `/images/plants/${plantName.toLowerCase()}.jpg`,
      emoji: '🌱'
    };

  } catch (error) {
    console.error('API Error:', error);
    throw new Error(`Failed to fetch plant data: ${error.message}`);
  }
};
