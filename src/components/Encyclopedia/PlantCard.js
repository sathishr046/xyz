import React from 'react';
import ImageLoader from '../Common/ImageLoader';

const PlantCard = ({ plant }) => {
  return (
    <div className="plant-card">
      <div className="plant-image-container">
        <ImageLoader 
          src={plant.image}
          alt={plant.name}
          className="plant-image"
        />
      </div>
      <div className="plant-overlay">
        <h3>{plant.name}</h3>
        <p className="scientific-name">{plant.scientificName}</p>
      </div>
    </div>
  );
};

export default PlantCard;
