import React, { useState } from 'react';
import { WeatherService } from '../../services/weatherService';
import WeatherDisplay from './WeatherDisplay';
import WeatherForecast from './WeatherForecast';
import WeatherAnalysis from './WeatherAnalysis';
import './WeatherIntegration.css';

const WeatherIntegration = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    try {
      setLoading(true);
      setError(null);
      const data = await WeatherService.getWeatherByCity(searchQuery.trim());
      setWeatherData(data);
    } catch (err) {
      console.error('Weather error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="weather-page">
      <div className="weather-container">
        <div className="search-container">
          <form onSubmit={handleSearch}>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Enter city name (e.g., Bangalore)"
              className="search-input"
            />
            <button type="submit" className="search-button">
              🔍 Search
            </button>
          </form>
        </div>

        {loading && (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Fetching weather data... 🌤️</p>
          </div>
        )}

        {error && (
          <div className="error-container">
            <h3>⚠️ Oops!</h3>
            <p>{error}</p>
          </div>
        )}

        {weatherData && (
          <>
            <WeatherDisplay data={weatherData} />
            <WeatherAnalysis weatherData={weatherData} />
          </>
        )}
      </div>
    </div>
  );
};

export default WeatherIntegration;
