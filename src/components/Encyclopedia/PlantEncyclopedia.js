import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { plantsData } from '../../data/plantsData';
import './PlantEncyclopedia.css';

const PlantEncyclopedia = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPlant, setSelectedPlant] = useState(null);
  const [filteredPlants, setFilteredPlants] = useState(plantsData);

  const categories = [
    { id: 'all', name: 'All Plants', icon: '🌱' },
    { id: 'vegetables', name: 'Vegetables', icon: '🥬' },
    { id: 'fruits', name: 'Fruits', icon: '🍎' },
    { id: 'flowers', name: 'Flowers', icon: '🌸' },
    { id: 'herbs', name: 'Herbs', icon: '🌿' },
    { id: 'trees', name: 'Trees', icon: '🌳' }
  ];

  useEffect(() => {
    const filtered = plantsData.filter(plant => {
      const matchesSearch = plant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          plant.scientificName.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || plant.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
    setFilteredPlants(filtered);
  }, [searchTerm, selectedCategory]);

  return (
    <div className="encyclopedia-container">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="encyclopedia-header"
      >
        <h1>Plant Encyclopedia</h1>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search plants by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
      </motion.div>

      <motion.div 
        className="category-filters"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {categories.map((category, index) => (
          <motion.button
            key={category.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`category-button ${selectedCategory === category.id ? 'active' : ''}`}
            onClick={() => setSelectedCategory(category.id)}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <span className="category-icon">{category.icon}</span>
            {category.name}
          </motion.button>
        ))}
      </motion.div>

      <motion.div 
        className="plants-grid"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        {filteredPlants.map((plant, index) => (
          <motion.div
            key={plant.id}
            className="plant-card"
            whileHover={{ scale: 1.02 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => setSelectedPlant(plant)}
          >
            <div className="plant-image-container">
              <img src={plant.image} alt={plant.name} className="plant-image" />
              <div className="plant-overlay">
                <h3>{plant.name}</h3>
                <p className="scientific-name">{plant.scientificName}</p>
              </div>
            </div>
            
            <div className="plant-details">
              <div className="care-indicators">
                <span title="Water needs">💧</span>
                <span title="Sunlight needs">☀️</span>
                <span title="Temperature range">🌡️</span>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {selectedPlant && (
        <PlantModal 
          plant={selectedPlant} 
          onClose={() => setSelectedPlant(null)} 
        />
      )}
    </div>
  );
};

const PlantModal = ({ plant, onClose }) => {
  return (
    <motion.div 
      className="plant-modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div 
        className="plant-modal-content"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
      >
        <button className="close-button" onClick={onClose}>×</button>
        
        <div className="modal-grid">
          <div className="modal-image">
            <img src={plant.image} alt={plant.name} />
          </div>
          
          <div className="modal-info">
            <h2>{plant.name}</h2>
            <p className="scientific-name">{plant.scientificName}</p>
            <p className="description">{plant.description}</p>

            <div className="care-guide-section">
              <h3>Care Guide</h3>
              <div className="care-grid">
                <div className="care-item">
                  <span className="care-icon">💧</span>
                  <h4>Water</h4>
                  <p>{plant.careGuide.water}</p>
                </div>
                {/* Add more care items */}
              </div>
            </div>

            <div className="diseases-section">
              <h3>Common Diseases</h3>
              {plant.diseases.map(disease => (
                <div key={disease.name} className="disease-item">
                  <h4>{disease.name}</h4>
                  <p>{disease.symptoms}</p>
                  <p className="treatment">{disease.treatment}</p>
                </div>
              ))}
            </div>

            <div className="tips-section">
              <h3>Growing Tips</h3>
              <ul>
                {plant.tips.map((tip, index) => (
                  <li key={index}>{tip}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default PlantEncyclopedia;
