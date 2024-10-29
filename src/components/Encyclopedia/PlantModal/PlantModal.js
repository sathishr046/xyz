import React from 'react';
import { motion } from 'framer-motion';
import './PlantModal.css';

const PlantModal = ({ plant, onClose }) => {
  if (!plant) return null;

  return (
    <motion.div 
      className="modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div 
        className="modal-content"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
        onClick={e => e.stopPropagation()}
      >
        <button className="close-button" onClick={onClose}>&times;</button>
        
        <div className="modal-header">
          <img src={plant.image} alt={plant.name} className="modal-image" />
          <div className="modal-title">
            <h2>{plant.name}</h2>
            <p className="scientific-name">{plant.scientificName}</p>
          </div>
        </div>

        <div className="modal-body">
          <div className="care-guide">
            <h3>Care Guide</h3>
            <div className="care-details">
              <div className="care-item">
                <span>💧</span>
                <p>{plant.careGuide?.water || 'Regular watering'}</p>
              </div>
              <div className="care-item">
                <span>☀️</span>
                <p>{plant.careGuide?.sunlight || 'Full sun'}</p>
              </div>
              <div className="care-item">
                <span>🌡️</span>
                <p>{plant.careGuide?.temperature || 'Moderate temperature'}</p>
              </div>
            </div>
          </div>

          <div className="description">
            <h3>Description</h3>
            <p>{plant.description || 'No description available.'}</p>
          </div>

          {plant.diseases && plant.diseases.length > 0 && (
            <div className="diseases">
              <h3>Common Diseases</h3>
              {plant.diseases.map((disease, index) => (
                <div key={index} className="disease-item">
                  <h4>{disease.name}</h4>
                  <p>{disease.symptoms}</p>
                  <p className="treatment">{disease.treatment}</p>
                </div>
              ))}
            </div>
          )}

          {plant.tips && plant.tips.length > 0 && (
            <div className="growing-tips">
              <h3>Growing Tips</h3>
              <ul>
                {plant.tips.map((tip, index) => (
                  <li key={index}>{tip}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default PlantModal;

