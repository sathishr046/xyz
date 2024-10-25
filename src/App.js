// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navigation/Navbar';
import Home from './components/Home/Home';
import PlantIdentifier from './components/Analysis/PlantIdentifier';
import History from './components/History/History';
import About from './components/About/About';
import PlantEncyclopedia from './components/Encyclopedia/PlantEncyclopedia';
import WeatherIntegration from './components/Weather/WeatherIntegration';
import CommunityHub from './components/Community/CommunityHub';
import { HistoryProvider } from './context/HistoryContext';
import { SettingsProvider } from './context/SettingsContext';
import './App.css';

function App() {
  return (
    <Router>
      <SettingsProvider>
        <HistoryProvider>
          <div className="App">
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/analyze" element={<PlantIdentifier />} />
              <Route path="/history" element={<History />} />
              <Route path="/about" element={<About />} />
              <Route path="/encyclopedia" element={<PlantEncyclopedia />} />
              <Route path="/weather" element={<WeatherIntegration />} />
              <Route path="/community" element={<CommunityHub />} />
            </Routes>
          </div>
        </HistoryProvider>
      </SettingsProvider>
    </Router>
  );
}

export default App;
