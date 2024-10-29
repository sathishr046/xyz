const WEATHER_API_KEY = '8a2609e1b933496781c115153242910';
const WEATHER_API_BASE = 'https://api.weatherapi.com/v1';

export const WeatherService = {
  async getWeatherByCity(city) {
    try {
      const response = await fetch(
        `${WEATHER_API_BASE}/current.json?key=${WEATHER_API_KEY}&q=${city}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );

      if (!response.ok) {
        throw new Error(`Weather API error: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error('Unable to fetch weather data');
    }
  },

  async getForecast(city, days = 5) {
    try {
      const response = await fetch(
        `${WEATHER_API_BASE}/forecast.json?key=${WEATHER_API_KEY}&q=${city}&days=${days}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );

      if (!response.ok) {
        throw new Error(`Weather API error: ${response.status}`);
      }

      const data = await response.json();
      return data.forecast.forecastday;
    } catch (error) {
      throw new Error('Unable to fetch forecast data');
    }
  }
};
