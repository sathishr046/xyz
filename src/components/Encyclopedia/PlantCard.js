import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './PlantCard.css';

const PlantCard = ({ plant }) => {
  const [showCareGuide, setShowCareGuide] = useState(false);

  return (
    <div className="plant-card-container">
      <div className="plant-card">
        <div className="plant-image">
          <img src={plant.image} alt={plant.name} />
          <span className="plant-emoji">{plant.emoji}</span>
        </div>
        <div className="plant-info">
          <h2>{plant.name}</h2>
          <p className="scientific-name">{plant.scientificName}</p>
          <button 
            className="care-guide-button"
            onClick={() => setShowCareGuide(true)}
          >
            View Care Guide
          </button>
        </div>
      </div>

      {showCareGuide && (
        <motion.div 
          className="modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div 
            className="modal-content"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <div className="modal-header">
              <div className="modal-title">
                <h2>{plant.name}</h2>
                <p className="scientific-name">{plant.scientificName}</p>
              </div>
              <button onClick={() => setShowCareGuide(false)}>×</button>
            </div>

            <div className="modal-body">
              <div className="care-guide-hero">
                <img src={plant.image} alt={plant.name} />
                <div className="quick-facts">
                  <h3>Quick Facts</h3>
                  <ul>
                    <li>Growth Rate: {plant.growthRate}</li>
                    <li>Mature Size: {plant.matureSize}</li>
                    <li>Toxicity: {plant.toxicity}</li>
                    <li>Native Region: {plant.nativeRegion}</li>
                  </ul>
                </div>
              </div>

              <section className="plant-description">
                <h3>About {plant.name}</h3>
                <p>{plant.description}</p>
                {plant.benefits && (
                  <div className="benefits">
                    <h4>Benefits</h4>
                    <ul>
                      {plant.benefits.map((benefit, index) => (
                        <li key={index}>{benefit}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </section>

              <section className="detailed-care">
                <h3>Detailed Care Guide</h3>
                <div className="care-grid">
                  <div className="care-item">
                    <div className="care-icon">💧</div>
                    <h4>Watering</h4>
                    <p>{plant.careGuide.water}</p>
                    <ul className="care-tips">
                      {plant.wateringTips?.map((tip, index) => (
                        <li key={index}>{tip}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="care-item">
                    <div className="care-icon">☀️</div>
                    <h4>Light Requirements</h4>
                    <p>{plant.careGuide.sunlight}</p>
                    <ul className="care-tips">
                      {plant.lightingTips?.map((tip, index) => (
                        <li key={index}>{tip}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="care-item">
                    <div className="care-icon">🌡️</div>
                    <h4>Temperature & Humidity</h4>
                    <p>Temperature: {plant.careGuide.temperature}</p>
                    <p>Humidity: {plant.careGuide.humidity}</p>
                  </div>

                  <div className="care-item">
                    <div className="care-icon">🌱</div>
                    <h4>Soil & Fertilizer</h4>
                    <p>{plant.careGuide.soil}</p>
                    <p>{plant.careGuide.fertilizer}</p>
                  </div>
                </div>
              </section>

              {plant.commonProblems && (
                <section className="troubleshooting">
                  <h3>Common Problems & Solutions</h3>
                  <div className="problems-grid">
                    {plant.commonProblems.map((problem, index) => (
                      <div key={index} className="problem-item">
                        <h4>{problem.issue}</h4>
                        <p>{problem.solution}</p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {plant.propagation && (
                <section className="propagation">
                  <h3>Propagation Methods</h3>
                  <ul>
                    {plant.propagation.map((method, index) => (
                      <li key={index}>{method}</li>
                    ))}
                  </ul>
                </section>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default PlantCard;
