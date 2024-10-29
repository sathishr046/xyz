import React from 'react';
import './WeatherAlerts.css';

const WeatherAlerts = ({ alerts }) => {
  if (!alerts || alerts.length === 0) return null;

  return (
    <div className="alerts-container">
      <h3>⚠️ Weather Alerts</h3>
      <div className="alerts-list">
        {alerts.map((alert, index) => (
          <div key={index} className="alert-item">
            <div className="alert-title">{alert.event}</div>
            <div className="alert-description">{alert.desc}</div>
            <div className="alert-time">
              Effective until: {new Date(alert.effective).toLocaleString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherAlerts; 