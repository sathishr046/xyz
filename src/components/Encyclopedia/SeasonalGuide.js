import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './SeasonalGuide.css';

const seasons = ['Spring', 'Summer', 'Fall', 'Winter'];

const SeasonalGuide = ({ plants }) => {
  const [selectedSeason, setSelectedSeason] = useState('Spring');

  const seasonalPlants = plants.filter(plant => 
    plant.seasonality.plantingTime.toLowerCase().includes(selectedSeason.toLowerCase())
  );

  return (
    <div className="seasonal-guide">
      <h2>Seasonal Planting Guide</h2>
      
      <div className="season-tabs">
        {seasons.map(season => (
          <motion.button
            key={season}
            className={`season-tab ${selectedSeason === season ? 'active' : ''}`}
            onClick={() => setSelectedSeason(season)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {season}
          </motion.button>
        ))}
      </div>

      <motion.div 
        className="seasonal-plants"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {seasonalPlants.map(plant => (
          <div key={plant.name} className="seasonal-plant-card">
            <img src={plant.image} alt={plant.name} />
            <div className="seasonal-plant-info">
              <h3>{plant.name}</h3>
              <p>{plant.seasonality.plantingTime}</p>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default SeasonalGuide;