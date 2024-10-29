import React, { useState } from 'react';
import './WeatherAnalysis.css';

const WeatherAnalysis = ({ weatherData }) => {
  const [cropType, setCropType] = useState('');
  const [analysis, setAnalysis] = useState(null);

  const handleAnalysis = (e) => {
    e.preventDefault();
    if (!cropType.trim()) return;

    // Simple analysis based on weather conditions
    const temp = weatherData.current.temp_c;
    const humidity = weatherData.current.humidity;
    const windSpeed = weatherData.current.wind_kph;

    let suitability = 'Suitable';
    const risks = [];
    const actions = [];

    if (temp > 30) {
      risks.push('High temperature may affect crop growth');
      actions.push('Consider providing shade');
    }

    if (humidity < 40) {
      risks.push('Low humidity might stress plants');
      actions.push('Increase irrigation frequency');
    }

    if (windSpeed > 20) {
      risks.push('Strong winds could damage crops');
      actions.push('Install wind barriers');
    }

    setAnalysis({ suitability, risks, actions });
  };

  return (
    <div className="weather-analysis">
      <h3>Crop Weather Analysis</h3>
      <form onSubmit={handleAnalysis} className="crop-input">
        <input
          type="text"
          value={cropType}
          onChange={(e) => setCropType(e.target.value)}
          placeholder="Enter crop type (e.g., Tomato)"
        />
        <button type="submit">Analyze</button>
      </form>

      {analysis && (
        <div className="analysis-results">
          <div className="analysis-card">
            <div className="suitability">
              Weather Suitability: {analysis.suitability}
            </div>
            <div className="risks">
              <h4>Potential Risks:</h4>
              <ul>
                {analysis.risks.map((risk, index) => (
                  <li key={index}>{risk}</li>
                ))}
              </ul>
            </div>
            <div className="actions">
              <h4>Recommended Actions:</h4>
              <ul>
                {analysis.actions.map((action, index) => (
                  <li key={index}>{action}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherAnalysis; 