import React, { createContext, useState, useEffect } from 'react';

export const HistoryContext = createContext();

export const HistoryProvider = ({ children }) => {
    const [history, setHistory] = useState(() => {
        const savedHistory = localStorage.getItem('plantAnalysisHistory');
        return savedHistory ? JSON.parse(savedHistory) : [];
    });

    useEffect(() => {
        localStorage.setItem('plantAnalysisHistory', JSON.stringify(history));
    }, [history]);

    const addToHistory = (analysisData) => {
        setHistory(prevHistory => {
            const newHistory = [{
                id: Date.now(),
                ...analysisData
            }, ...prevHistory];
            return newHistory;
        });
    };

    const clearHistory = () => {
        setHistory([]);
        localStorage.removeItem('plantAnalysisHistory');
    };

    return (
        <HistoryContext.Provider value={{ history, addToHistory, clearHistory }}>
            {children}
        </HistoryContext.Provider>
    );
};
