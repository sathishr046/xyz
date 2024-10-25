import React, { createContext, useState, useEffect } from 'react';

export const HistoryContext = createContext();

export const HistoryProvider = ({ children }) => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const savedHistory = localStorage.getItem('plantAnalysisHistory');
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  const addToHistory = (analysis) => {
    const newAnalysis = {
      id: Date.now(),
      date: new Date().toISOString(),
      ...analysis
    };

    const updatedHistory = [newAnalysis, ...history];
    setHistory(updatedHistory);
    localStorage.setItem('plantAnalysisHistory', JSON.stringify(updatedHistory));
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem('plantAnalysisHistory');
  };

  const deleteHistoryItem = (id) => {
    const updatedHistory = history.filter(item => item.id !== id);
    setHistory(updatedHistory);
    localStorage.setItem('plantAnalysisHistory', JSON.stringify(updatedHistory));
  };

  return (
    <HistoryContext.Provider value={{ 
      history, 
      addToHistory, 
      clearHistory, 
      deleteHistoryItem 
    }}>
      {children}
    </HistoryContext.Provider>
  );
};
