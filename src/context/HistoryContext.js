import React, { createContext, useState, useEffect } from 'react';

export const HistoryContext = createContext();

export const HistoryProvider = ({ children }) => {
    const [history, setHistory] = useState(() => {
        const savedHistory = localStorage.getItem('plantAnalysisHistory');
        return savedHistory ? JSON.parse(savedHistory) : [];
    });

    useEffect(() => {
        // Limit history to the most recent 20 items
        const limitedHistory = history.slice(0, 20);
        try {
            localStorage.setItem('plantAnalysisHistory', JSON.stringify(limitedHistory));
        } catch (e) {
            if (e.name === 'QuotaExceededError') {
                alert('History storage is full. Oldest entries will be removed.');
                // Try to save only the most recent 10 items if still over quota
                localStorage.setItem('plantAnalysisHistory', JSON.stringify(limitedHistory.slice(0, 10)));
            }
        }
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
