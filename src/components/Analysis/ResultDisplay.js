import React, { useContext } from 'react';
import { SettingsContext } from '../../context/SettingsContext';
import './ResultDisplay.css';

const ResultDisplay = ({ result }) => {
  const { settings, translateContent } = useContext(SettingsContext);

  const parseAndStructureResult = (rawResult) => {
    const sections = {
      diagnosis: [],
      treatment: [],
      prevention: [],
      growthStage: ''
    };

    // Parse the raw result and organize it
    const lines = rawResult.split('\n');
    let currentSection = '';

    lines.forEach(line => {
      if (line.includes('Plant health analysis:')) {
        currentSection = 'diagnosis';
      } else if (line.includes('Treatment:')) {
        currentSection = 'treatment';
      } else if (line.includes('Prevention:')) {
        currentSection = 'prevention';
      } else if (line.includes('Growth stage:')) {
        sections.growthStage = line.split('Growth stage:')[1].trim();
      } else if (line.trim() && currentSection) {
        sections[currentSection].push(line.trim());
      }
    });

    return sections;
  };

  const renderSection = async (title, items) => {
    const translatedTitle = await translateContent(title, settings.language);
    const translatedItems = await Promise.all(
      items.map(item => translateContent(item, settings.language))
    );

    return (
      <div className="result-section">
        <h3>{translatedTitle}</h3>
        <ul>
          {translatedItems.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    );
  };

  const structuredResult = parseAndStructureResult(result);

  return (
    <div className="result-container">
      <div className="result-header">
        <h2>Analysis Results</h2>
        <span className="language-badge">{settings.language.toUpperCase()}</span>
      </div>

      <div className="result-content">
        {renderSection('Diagnosis', structuredResult.diagnosis)}
        {renderSection('Treatment Recommendations', structuredResult.treatment)}
        {renderSection('Preventive Measures', structuredResult.prevention)}
        
        {structuredResult.growthStage && (
          <div className="growth-stage">
            <h3>Growth Stage</h3>
            <p>{structuredResult.growthStage}</p>
          </div>
        )}
      </div>

      <div className="additional-resources">
        <h3>Additional Resources</h3>
        <button className="resource-button">
          Find Treatment Products
        </button>
        <button className="resource-button">
          View Similar Cases
        </button>
        <button className="resource-button">
          Contact Expert
        </button>
      </div>
    </div>
  );
};

export default ResultDisplay;