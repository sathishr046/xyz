import React, { useState } from 'react';

const OptimizedImage = ({ src, alt, className }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  return (
    <div className={`image-container ${isLoading ? 'loading' : ''}`}>
      {isLoading && <div className="image-skeleton"></div>}
      <img
        src={src}
        alt={alt}
        className={`${className} ${isLoading ? 'hidden' : ''}`}
        onLoad={() => setIsLoading(false)}
        onError={(e) => {
          setError(true);
          setIsLoading(false);
          e.target.src = '/images/plants/placeholder.jpg';
        }}
      />
    </div>
  );
};

export default OptimizedImage;
