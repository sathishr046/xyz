// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SettingsProvider } from './context/SettingsContext';
import Navbar from './components/Navigation/Navbar';
import Home from './components/Home/Home';
import PlantIdentifier from './components/Analysis/PlantIdentifier';
import History from './components/History/History';
import About from './components/About/About';
import PlantEncyclopedia from './components/Encyclopedia/PlantEncyclopedia';
import WeatherIntegration from './components/Weather/WeatherIntegration';
import CommunityHub from './components/Community/CommunityHub';
import { HistoryProvider } from './context/HistoryContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LanguagePrompt from './components/LanguageDetection/LanguagePrompt';
import './App.css';
import CropPlanning from './components/CropPlanning/CropPlanning';
import CropInsights from './components/CropInsights/CropInsights';

function App() {
  return (
    <HistoryProvider>
      <Router>
        <SettingsProvider>
          <div className="app">
            <Navbar />
            <main className="main-content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/analyze" element={<PlantIdentifier />} />
                <Route path="/weather" element={<WeatherIntegration />} />
                <Route path="/history" element={<History />} />
                <Route path="/encyclopedia" element={<PlantEncyclopedia />} />
                <Route path="/community" element={<CommunityHub />} />
                <Route path="/about" element={<About />} />
                <Route path="/crop-planning" element={<CropPlanning />} />
                <Route path="/crop-insights" element={<CropInsights />} />
              </Routes>
            </main>
            <div className="content-wrapper">
              <LanguagePrompt />
              <ToastContainer />
            </div>
          </div>
        </SettingsProvider>
      </Router>
    </HistoryProvider>
  );
}

export default App;
