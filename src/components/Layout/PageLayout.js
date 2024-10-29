import React from 'react';
import '../../styles/Layout.css';

const PageLayout = ({ title, subtitle, children }) => {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">{title}</h1>
        {subtitle && <p className="page-subtitle">{subtitle}</p>}
      </div>
      {children}
    </div>
  );
};

export default PageLayout;