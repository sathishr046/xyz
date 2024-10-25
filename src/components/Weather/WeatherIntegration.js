import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WeatherService } from '../../services/weatherService';
import { handleAPIError } from '../../utils/errorHandler';
import './WeatherIntegration.css';

const WeatherIntegration = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [location, setLocation] = useState(null);

  useEffect(() => {
    fetchWeatherData();
  }, []);

  const fetchWeatherData = async () => {
    try {
      setLoading(true);
      const coords = await WeatherService.getCurrentLocation();
      const [weatherData, forecastData] = await Promise.all([
        WeatherService.getWeatherData(coords.latitude, coords.longitude),
        WeatherService.getWeatherForecast(coords.latitude, coords.longitude)
      ]);

      const locationName = await WeatherService.getLocationName(
        coords.latitude,
        coords.longitude
      );

      setWeatherData(weatherData);
      setForecast(forecastData);
      setLocation(locationName);
      setError(null);
    } catch (err) {
      setError(handleAPIError(err));
    } finally {
      setLoading(false);
    }
  };

  const getPlantCareAdvice = (weather) => {
    const advice = [];
    const temp = weather.main.temp;
    const humidity = weather.main.humidity;
    const windSpeed = weather.wind.speed;

    if (temp > 30) {
      advice.push({
        type: 'warning',
        icon: '🌡️',
        text: 'High temperature alert! Water plants more frequently and provide shade.'
      });
    }

    if (humidity < 40) {
      advice.push({
        type: 'info',
        icon: '💧',
        text: 'Low humidity! Consider misting your plants or using a humidity tray.'
      });
    }

    if (windSpeed > 20) {
      advice.push({
        type: 'warning',
        icon: '💨',
        text: 'Strong winds! Move sensitive plants indoors or provide wind protection.'
      });
    }

    return advice;
  };

  return (
    <motion.div 
      className="weather-dashboard"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {loading && (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Fetching weather data...</p>
        </div>
      )}

      {error && (
        <div className="error-container">
          <span className="error-icon">⚠️</span>
          <p>{error}</p>
          <button onClick={fetchWeatherData}>Try Again</button>
        </div>
      )}

      {weatherData && (
        <AnimatePresence>
          <motion.div 
            className="weather-content"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="location-info">
              <h2>{location?.formatted_address || 'Your Location'}</h2>
              <p className="coordinates">
                {weatherData.coord.lat.toFixed(2)}°N, {weatherData.coord.lon.toFixed(2)}°E
              </p>
            </div>

            <div className="current-weather">
              <div className="temperature">
                {Math.round(weatherData.main.temp)}°C
              </div>
              <div className="weather-description">
                <img 
                  src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                  alt={weatherData.weather[0].description}
                />
                <p>{weatherData.weather[0].description}</p>
              </div>
            </div>

            <div className="weather-details">
              <div className="detail-item">
                <span className="detail-icon">💧</span>
                <span className="detail-label">Humidity</span>
                <span className="detail-value">{weatherData.main.humidity}%</span>
              </div>
              <div className="detail-item">
                <span className="detail-icon">💨</span>
                <span className="detail-label">Wind</span>
                <span className="detail-value">{weatherData.wind.speed} m/s</span>
              </div>
              <div className="detail-item">
                <span className="detail-icon">☁️</span>
                <span className="detail-label">Clouds</span>
                <span className="detail-value">{weatherData.clouds.all}%</span>
              </div>
            </div>

            <div className="plant-care-advice">
              <h3>Plant Care Recommendations</h3>
              <div className="advice-grid">
                {getPlantCareAdvice(weatherData).map((advice, index) => (
                  <motion.div 
                    key={index}
                    className={`advice-card ${advice.type}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <span className="advice-icon">{advice.icon}</span>
                    <p>{advice.text}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {forecast && (
              <div className="forecast-section">
                <h3>5-Day Forecast</h3>
                <div className="forecast-grid">
                  {forecast.list
                    .filter((item, index) => index % 8 === 0)
                    .map((item, index) => (
                      <motion.div 
                        key={index}
                        className="forecast-card"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <p className="forecast-date">
                          {new Date(item.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' })}
                        </p>
                        <img 
                          src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                          alt={item.weather[0].description}
                        />
                        <p className="forecast-temp">{Math.round(item.main.temp)}°C</p>
                      </motion.div>
                    ))}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      )}
    </motion.div>
  );
};

export default WeatherIntegration;
