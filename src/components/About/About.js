import React from 'react';
import './About.css';

// Import images
import mithunImage from '../../assets/images/mithun.jpg';
import manojImage from '../../assets/images/manoj.jpg';
import swaroopImage from '../../assets/images/swaroop.jpg';
import shamanthImage from '../../assets/images/shamanth.jpg';

const About = () => {
  const experts = [
    {
      name: "Mithun R",
      phone: "8792048404",
      role: "Technical Queries",
      image: mithunImage,
      expertise: "AI & Machine Learning"
    },
    {
      name: "Manoj MV",
      phone: "8073708237",
      role: "Plant Expert - Vegetables",
      image: manojImage,
      expertise: "Vegetable Diseases & Treatment"
    },
    {
      name: "Swaroop Patil",
      phone: "7892926970",
      role: "Plant Expert - Fruits",
      image: swaroopImage,
      expertise: "Fruit Crop Management"
    },
    {
      name: "Shamanth Krishna",
      phone: "8073655712",
      role: "Plant Expert - Commercial Crops",
      image: shamanthImage,
      expertise: "Commercial Crop Solutions"
    }
  ];

  return (
    <div className="about-container">
      <div className="about-header">
        <h1>Our Expert Team</h1>
        <div className="header-underline"></div>
        <p>Get professional guidance from our agricultural specialists</p>
      </div>

      <div className="experts-grid">
        {experts.map((expert, index) => (
          <div className="expert-card" key={index}>
            <div className="expert-card-inner">
              <div className="expert-image-container">
                <img 
                  src={expert.image} 
                  alt={expert.name}
                  onError={(e) => {
                    e.target.src = '/images/default-profile.jpg';
                  }}
                />
                <div className="expert-overlay">
                  <p>{expert.expertise}</p>
                </div>
              </div>
              <div className="expert-info">
                <h3>{expert.name}</h3>
                <span className="role-badge">{expert.role}</span>
                <div className="expert-contact">
                  <a href={`tel:${expert.phone}`} className="phone-button">
                    <i className="phone-icon">📞</i>
                    {expert.phone}
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="contact-section">
        <div className="contact-content">
          <h2>Need Expert Advice?</h2>
          <p>Our team is available to help you with any plant-related queries</p>
          <a href="tel:8792048404" className="contact-button">
            Contact Now
          </a>
        </div>
      </div>
    </div>
  );
};

export default About;
