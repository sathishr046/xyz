import React from 'react';
import './AirQuality.css';

const AirQuality = ({ aqi }) => {
  const getAQIStatus = (aqi) => {
    if (aqi <= 50) return { status: 'Good', color: '#00b894' };
    if (aqi <= 100) return { status: 'Moderate', color: '#fdcb6e' };
    if (aqi <= 150) return { status: 'Unhealthy for Sensitive Groups', color: '#e17055' };
    if (aqi <= 200) return { status: 'Unhealthy', color: '#d63031' };
    if (aqi <= 300) return { status: 'Very Unhealthy', color: '#6c5ce7' };
    return { status: 'Hazardous', color: '#2d3436' };
  };

  const { status, color } = getAQIStatus(aqi);

  return (
    <div className="aqi-container">
      <h3>Air Quality Index</h3>
      <div className="aqi-display" style={{ backgroundColor: color }}>
        <div className="aqi-value">{aqi}</div>
        <div className="aqi-status">{status}</div>
      </div>
    </div>
  );
};

export default AirQuality; 