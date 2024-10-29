import React from 'react';
import './PlantModal.css';

const PlantModal = ({ plant, onClose }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>&times;</button>
        
        <h2>{plant.name}</h2>
        <p className="scientific-name">{plant.scientificName}</p>
        
        <div className="plant-info">
          <p>{plant.description}</p>
          
          <h3>Care Guide</h3>
          <div className="care-guide">
            <div>
              <strong>Water:</strong> {plant.careGuide.water}
            </div>
            <div>
              <strong>Sunlight:</strong> {plant.careGuide.sunlight}
            </div>
            <div>
              <strong>Temperature:</strong> {plant.careGuide.temperature}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlantModal;