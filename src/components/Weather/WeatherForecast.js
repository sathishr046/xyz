import React from 'react';
import './WeatherForecast.css';

const WeatherForecast = ({ forecast }) => {
  return (
    <div className="forecast-container">
      <h3>5-Day Forecast</h3>
      <div className="forecast-grid">
        {forecast.map((day, index) => (
          <div key={index} className="forecast-card">
            <div className="forecast-date">
              {new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })}
            </div>
            <img 
              src={day.day.condition.icon} 
              alt={day.day.condition.text}
              className="forecast-icon"
            />
            <div className="forecast-temps">
              <span className="max-temp">{Math.round(day.day.maxtemp_c)}°</span>
              <span className="min-temp">{Math.round(day.day.mintemp_c)}°</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherForecast; 