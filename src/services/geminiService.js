import { GoogleGenerativeAI } from "@google/generative-ai";

// Define the API key as a string constant
const GEMINI_API_KEY = "AIzaSyAJX0A1MUJ0DuOMzG2SIOKm0yJ-N8kScDI";
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

export const GeminiService = {
  async getPlantAnalysis(plantName, weatherData) {
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      
      const prompt = `
        Analyze growing conditions for ${plantName} with the following weather:
        Temperature: ${weatherData.current.temp_c}°C
        Humidity: ${weatherData.current.humidity}%
        Wind Speed: ${weatherData.current.wind_kph} km/h
        
        Return a JSON object with the following structure (no additional text, just pure JSON):
        {
          "suitability": "Overall suitability assessment",
          "growthStage": "Growth stage recommendations for current season",
          "risks": "Potential risks and challenges",
          "care": "Detailed care instructions",
          "milestones": "Key milestones in growing cycle",
          "pestManagement": "Pest and disease considerations",
          "irrigation": "Irrigation recommendations",
          "soilManagement": "Soil management tips"
        }
      `;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      // Extract JSON from response
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('Invalid response format');
      }
      
      return JSON.parse(jsonMatch[0]);
    } catch (error) {
      console.error('Gemini API Error:', error);
      throw new Error('Unable to generate plant analysis');
    }
  }
};