import React, { useState } from 'react';

const ImageLoader = ({ src, alt, className }) => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleError = () => {
    setError(true);
    setLoading(false);
  };

  const handleLoad = () => {
    setLoading(false);
  };

  return (
    <div className={`image-container ${loading ? 'loading' : ''}`}>
      {loading && <div className="image-skeleton"></div>}
      {error ? (
        <div className="image-fallback">
          <span role="img" aria-label="plant">🌿</span>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          className={className}
          onError={handleError}
          onLoad={handleLoad}
        />
      )}
    </div>
  );
};

export default ImageLoader;
