import React, { useState } from 'react';
import { GeminiService } from '../../services/geminiService';
import { FaSeedling, FaChartLine, FaExclamationTriangle, 
         FaList, FaCheckSquare, FaBug, FaTint, FaLeaf } from 'react-icons/fa';
import './WeatherAnalysis.css';

const WeatherAnalysis = ({ weatherData }) => {
  const [cropType, setCropType] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAnalysis = async (e) => {
    e.preventDefault();
    if (!cropType.trim()) return;

    try {
      setLoading(true);
      setError(null);
      const analysisData = await GeminiService.getPlantAnalysis(cropType, weatherData);
      setAnalysis(analysisData);
    } catch (err) {
      setError(err.message);
      console.error('Analysis error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="weather-analysis">
      <h2>Crop Weather Analysis</h2>
      
      <form onSubmit={handleAnalysis} className="analysis-form">
        <div className="input-group">
          <input
            type="text"
            value={cropType}
            onChange={(e) => setCropType(e.target.value)}
            placeholder="Enter crop or plant name (e.g., Tomato)"
            className="crop-input"
          />
          <button type="submit" className="analyze-btn" disabled={loading}>
            {loading ? 'Analyzing...' : 'Analyze'}
          </button>
        </div>
      </form>

      {loading && (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Analyzing growing conditions...</p>
        </div>
      )}

      {error && (
        <div className="error-message">
          <p>{error}</p>
        </div>
      )}

      {analysis && (
        <div className="analysis-grid">
          <div className="analysis-card suitability">
            <h3><FaSeedling /> Suitability</h3>
            <p>{analysis.suitability}</p>
          </div>
          
          <div className="analysis-card growth-stage">
            <h3><FaChartLine /> Growth Stage</h3>
            <p>{analysis.growthStage}</p>
          </div>
          
          <div className="analysis-card risks">
            <h3><FaExclamationTriangle /> Risks</h3>
            <p>{analysis.risks}</p>
          </div>
          
          <div className="analysis-card care">
            <h3><FaList /> Care Instructions</h3>
            <p>{analysis.care}</p>
          </div>
          
          <div className="analysis-card milestones">
            <h3><FaCheckSquare /> Milestones</h3>
            <p>{analysis.milestones}</p>
          </div>
          
          <div className="analysis-card pest-management">
            <h3><FaBug /> Pest Management</h3>
            <p>{analysis.pestManagement}</p>
          </div>
          
          <div className="analysis-card irrigation">
            <h3><FaTint /> Irrigation</h3>
            <p>{analysis.irrigation}</p>
          </div>
          
          <div className="analysis-card soil">
            <h3><FaLeaf /> Soil Management</h3>
            <p>{analysis.soilManagement}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherAnalysis; 