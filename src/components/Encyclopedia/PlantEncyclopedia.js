import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { fetchPlantInfo } from '../../services/plantService';
import { plantsData } from '../../data/plantsData';
import PlantCard from './PlantCard';
import './PlantEncyclopedia.css';

const PlantEncyclopedia = () => {
  const [plants, setPlants] = useState([]);

  useEffect(() => {
    setPlants(plantsData);
  }, []);

  return (
    <div className="encyclopedia-container">
      <h1 className="encyclopedia-title">Plant Encyclopedia</h1>
      <motion.div 
        className="plants-grid"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {plants.map((plant) => (
          <PlantCard key={plant.name} plant={plant} />
        ))}
      </motion.div>
    </div>
  );
};

export default PlantEncyclopedia;
