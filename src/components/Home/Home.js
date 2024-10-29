import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { SettingsContext } from '../../context/SettingsContext';
import './Home.css';

const Home = () => {
  const { translate } = useContext(SettingsContext);

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="animate-title">
            {translate('welcome')}
          </h1>
          <p className="animate-subtitle">
            {translate('subtitle')}
          </p>
          <Link to="/analyze" className="cta-button">
            {translate('startAnalysis')}
            <span className="arrow">→</span>
          </Link>
        </div>
        <div className="hero-background"></div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2 className="section-title">Key Features</h2>
        <div className="features-grid">
          <div className="feature-card" data-aos="fade-up">
            <div className="feature-icon">🔍</div>
            <h3>Instant Analysis</h3>
            <p>Real-time plant disease detection using advanced AI technology</p>
          </div>
          <div className="feature-card" data-aos="fade-up" data-aos-delay="100">
            <div className="feature-icon">💊</div>
            <h3>Treatment Guide</h3>
            <p>Detailed treatment recommendations and preventive measures</p>
          </div>
          <div className="feature-card" data-aos="fade-up" data-aos-delay="200">
            <div className="feature-icon">📱</div>
            <h3>Easy to Use</h3>
            <p>Simple interface with camera and upload options</p>
          </div>
          <div className="feature-card" data-aos="fade-up" data-aos-delay="300">
            <div className="feature-icon">📊</div>
            <h3>Analysis History</h3>
            <p>Track all your previous plant analyses</p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works">
        <h2 className="section-title">How It Works</h2>
        <div className="steps-container">
          <div className="step" data-aos="fade-up">
            <div className="step-number">1</div>
            <h3>Upload Image</h3>
            <p>Take a photo or upload an image of your plant for instant analysis</p>
          </div>
          <div className="step" data-aos="fade-up" data-aos-delay="100">
            <div className="step-number">2</div>
            <h3>AI Analysis</h3>
            <p>Our advanced AI technology analyzes your plant for diseases and health issues</p>
          </div>
          <div className="step" data-aos="fade-up" data-aos-delay="200">
            <div className="step-number">3</div>
            <h3>Get Results</h3>
            <p>Receive detailed diagnosis and personalized treatment recommendations</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
