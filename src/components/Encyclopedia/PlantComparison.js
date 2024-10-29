import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './PlantComparison.css';

const PlantComparison = ({ plants, onClose }) => {
  if (!plants || plants.length < 2) return null;

  return (
    <motion.div 
      className="comparison-modal"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="comparison-content">
        <button className="close-button" onClick={onClose}>&times;</button>
        <h2>Plant Comparison</h2>
        
        <div className="comparison-grid">
          <div className="comparison-header">
            <div className="empty-cell"></div>
            {plants.map(plant => (
              <div key={plant.name} className="plant-header">
                <img src={plant.image} alt={plant.name} />
                <h3>{plant.name}</h3>
              </div>
            ))}
          </div>

          <div className="comparison-rows">
            {getComparisonCategories().map(category => (
              <div key={category.name} className="comparison-row">
                <div className="category-name">{category.name}</div>
                {plants.map(plant => (
                  <div key={plant.name} className="comparison-cell">
                    {category.getValue(plant)}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const getComparisonCategories = () => [
  {
    name: "Water Needs",
    getValue: (plant) => plant.careGuide.water
  },
  {
    name: "Sunlight",
    getValue: (plant) => plant.careGuide.sunlight
  },
  {
    name: "Temperature",
    getValue: (plant) => plant.careGuide.temperature
  },
  {
    name: "Soil Type",
    getValue: (plant) => plant.careGuide.soil
  },
  {
    name: "Growing Season",
    getValue: (plant) => plant.seasonality.plantingTime
  }
];

export default PlantComparison;