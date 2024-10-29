import React from 'react';
import './LocationFavorites.css';

const LocationFavorites = ({ favorites, onSelectLocation, onRemoveFavorite }) => {
  return (
    <div className="favorites-container">
      <h3>Favorite Locations</h3>
      <div className="favorites-list">
        {favorites.map((location, index) => (
          <div key={index} className="favorite-item">
            <button 
              className="favorite-button"
              onClick={() => onSelectLocation(location)}
            >
              {location}
            </button>
            <button 
              className="remove-favorite"
              onClick={() => onRemoveFavorite(location)}
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LocationFavorites; 