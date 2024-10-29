import React from 'react';
import './WeatherDisplay.css';

const WeatherDisplay = ({ data }) => {
  if (!data || !data.current) {
    return null;
  }

  return (
    <div className="weather-card">
      <div className="location-info">
        <h2>{data.location.name}</h2>
        <p>{data.location.region}, {data.location.country}</p>
      </div>

      <div className="main-temp">
        <div className="temperature">{Math.round(data.current.temp_c)}°C</div>
        <img 
          src={data.current.condition.icon}
          alt={data.current.condition.text}
          className="weather-icon"
        />
      </div>

      <div className="weather-details">
        <div className="detail-item">
          <span className="label">Wind</span>
          <span className="value">{data.current.wind_kph} km/h</span>
        </div>
        <div className="detail-item">
          <span className="label">Humidity</span>
          <span className="value">{data.current.humidity}%</span>
        </div>
        <div className="detail-item">
          <span className="label">Feels Like</span>
          <span className="value">{data.current.feelslike_c}°C</span>
        </div>
      </div>
    </div>
  );
};

export default WeatherDisplay; 