import React from 'react';
import './LoadingOverlay.css';

const LoadingOverlay = ({ message }) => (
  <div className="loading-overlay">
    <div className="loading-content">
      <div className="loading-spinner"></div>
      <p>{message}</p>
    </div>
  </div>
);

export default LoadingOverlay;