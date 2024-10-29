import React from 'react';
import { motion } from 'framer-motion';
import './WeatherCard.css';

const WeatherCard = ({ weather }) => {
  const getWeatherEmoji = (code) => {
    const weatherEmojis = {
      1000: '☀️',  // Sunny
      1003: '🌤️',  // Partly cloudy
      1006: '☁️',  // Cloudy
      1009: '🌫️',  // Overcast
      1030: '🌫️',  // Mist
      1063: '🌧️',  // Rain
      1066: '🌨️',  // Snow
      1087: '⛈️',  // Thunder
      // Add more weather codes as needed
    };
    return weatherEmojis[code] || '🌈';
  };

  return (
    <motion.div 
      className="weather-card"
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="weather-header">
        <h2>{weather.location.name}</h2>
        <p className="weather-location">{weather.location.region}, {weather.location.country}</p>
      </div>
      
      <div className="weather-body">
        <div className="temperature">
          <span className="temp-value">{Math.round(weather.current.temp_c)}°</span>
          <span className="weather-emoji">{getWeatherEmoji(weather.current.condition.code)}</span>
        </div>
        
        <div className="weather-info">
          <div className="info-item">
            <span className="info-icon">💨</span>
            <span className="info-label">Wind</span>
            <span className="info-value">{weather.current.wind_kph} km/h</span>
          </div>
          <div className="info-item">
            <span className="info-icon">💧</span>
            <span className="info-label">Humidity</span>
            <span className="info-value">{weather.current.humidity}%</span>
          </div>
          <div className="info-item">
            <span className="info-icon">🌡️</span>
            <span className="info-label">Feels Like</span>
            <span className="info-value">{weather.current.feelslike_c}°C</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default WeatherCard; 