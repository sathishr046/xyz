import React, { useState } from 'react';
import { Line, Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { GeminiService } from '../../services/geminiService';
import { karnatakaDistricts } from '../../data/karnatakaData';
import './CropInsights.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const CropInsights = () => {
  const [selectedCrop, setSelectedCrop] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);

  const analyzeMarket = async () => {
    if (!selectedCrop || !selectedDistrict) return;
    
    setLoading(true);
    try {
      const result = await GeminiService.getDistrictCropAnalysis(selectedCrop, selectedDistrict);
      setAnalysis(result);
    } catch (error) {
      console.error('Analysis error:', error);
    }
    setLoading(false);
  };

  return (
    <div className="crop-insights-container">
      <div className="insights-header">
        <h1>🌾 Agricultural Market Intelligence</h1>
        <p>District-wise crop analysis and market predictions for Karnataka</p>
      </div>

      <div className="analysis-form">
        <div className="input-group">
          <select
            value={selectedDistrict}
            onChange={(e) => setSelectedDistrict(e.target.value)}
            className="district-select"
          >
            <option value="">Select District</option>
            {karnatakaDistricts.map(district => (
              <option key={district.id} value={district.name}>
                {district.name}
              </option>
            ))}
          </select>

          <input
            type="text"
            value={selectedCrop}
            onChange={(e) => setSelectedCrop(e.target.value)}
            placeholder="Enter crop name (e.g., Ragi, Jowar)"
            className="crop-input"
          />

          <button 
            onClick={analyzeMarket}
            className="analyze-button"
            disabled={loading || !selectedCrop || !selectedDistrict}
          >
            {loading ? 'Analyzing...' : 'Analyze Market'}
          </button>
        </div>
      </div>

      {analysis && (
        <div className="insights-grid">
          <div className="chart-card market-trends">
            <h3>Market Price Trends - {selectedDistrict}</h3>
            <Line
              data={{
                labels: analysis.priceHistory.map(p => p.month),
                datasets: [{
                  label: 'Price per Quintal (₹)',
                  data: analysis.priceHistory.map(p => p.price),
                  borderColor: '#2ecc71',
                  backgroundColor: 'rgba(46, 204, 113, 0.1)',
                  fill: true,
                }]
              }}
            />
          </div>

          <div className="chart-card district-comparison">
            <h3>District-wise Production Comparison</h3>
            <Bar
              data={{
                labels: analysis.districtComparison.map(d => d.district),
                datasets: [{
                  label: 'Production (Tonnes)',
                  data: analysis.districtComparison.map(d => d.production),
                  backgroundColor: '#3498db',
                }]
              }}
            />
          </div>

          <div className="chart-card seasonal-analysis">
            <h3>Seasonal Success Rate</h3>
            <Pie
              data={{
                labels: ['Kharif', 'Rabi', 'Summer'],
                datasets: [{
                  data: [
                    analysis.seasonalAnalysis.kharif,
                    analysis.seasonalAnalysis.rabi,
                    analysis.seasonalAnalysis.summer
                  ],
                  backgroundColor: ['#2ecc71', '#e74c3c', '#f1c40f'],
                }]
              }}
            />
          </div>

          <div className="district-insights-card">
            <h3>District Insights</h3>
            <div className="insights-content">
              <div className="key-stats">
                <div className="stat-item">
                  <span className="stat-label">Major Growing Areas</span>
                  <span className="stat-value">{analysis.districtStats.majorAreas.join(', ')}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Soil Types</span>
                  <span className="stat-value">{analysis.districtStats.soilTypes.join(', ')}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Average Rainfall</span>
                  <span className="stat-value">{analysis.districtStats.avgRainfall} mm</span>
                </div>
              </div>
            </div>
          </div>

          <div className="recommendations-card">
            <h3>Market Intelligence Report</h3>
            <div className="recommendation-score">
              <div className={`score ${analysis.viabilityScore >= 70 ? 'high' : 
                             analysis.viabilityScore >= 40 ? 'medium' : 'low'}`}>
                {analysis.viabilityScore}/100
              </div>
              <p className="score-label">Crop Viability Score</p>
            </div>
            
            <div className="market-insights">
              <div className="insight-item">
                <h4>
                  <span className="market-icon">🎯</span>
                  Market Potential
                </h4>
                <p>{analysis.marketPotential}</p>
              </div>
              
              <div className="insight-item">
                <h4>
                  <span className="water-icon">💧</span>
                  Water Requirements
                </h4>
                <p>{analysis.waterRequirements}</p>
              </div>
              
              <div className="insight-item">
                <h4>
                  <span className="climate-icon">🌡️</span>
                  Climate Suitability
                </h4>
                <p>{analysis.climateSuitability}</p>
              </div>
            </div>

            <div className="recommendations-list">
              {analysis.recommendations.map((rec, index) => (
                <div key={index} className="recommendation-item">
                  <span 
                    className="recommendation-icon"
                    data-type={rec.type}
                  >
                    {rec.type === 'positive' ? '✅' : 
                     rec.type === 'warning' ? '⚠️' : '❌'}
                  </span>
                  <div className="recommendation-content">
                    <h4>{rec.title}</h4>
                    <p>{rec.message}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CropInsights;