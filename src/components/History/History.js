import React, { useContext } from 'react';
import { HistoryContext } from '../../context/HistoryContext';
import './History.css';

const History = () => {
    const { history, clearHistory } = useContext(HistoryContext);

    const formatAnalysisText = (text) => {
        // Remove asterisks and clean up the text
        return text.replace(/\*\*/g, '').replace(/\s+/g, ' ').trim();
    };

    const parseAnalysisContent = (content) => {
        const sections = content.split('-').filter(Boolean);
        return sections.map(section => {
            const [title, ...contentParts] = section.split(':');
            return {
                title: formatAnalysisText(title),
                content: formatAnalysisText(contentParts.join(':'))
            };
        });
    };

    return (
        <div className="history-container">
            <div className="history-header">
                <h1>Analysis History</h1>
                {history.length > 0 && (
                    <button className="clear-history-btn" onClick={clearHistory}>
                        Clear History
                    </button>
                )}
            </div>
            
            <div className="history-list">
                {history.map((item) => (
                    <div key={item.id} className="history-card">
                        <div className="history-meta">
                            <span className="history-date">
                                📅 {new Date(item.timestamp).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </span>
                            <span className="history-time">
                                ⏰ {new Date(item.timestamp).toLocaleTimeString('en-US', {
                                    hour: '2-digit',
                                    minute: '2-digit'
                                })}
                            </span>
                        </div>
                        <div className="history-content">
                            {parseAnalysisContent(item.result).map((section, index) => (
                                <div key={index} className="analysis-item">
                                    <div className="analysis-title">
                                        {section.title}
                                    </div>
                                    <p className="analysis-text">
                                        {section.content}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
                
                {history.length === 0 && (
                    <div className="no-history">
                        <span className="no-history-icon">📋</span>
                        <h3>No Analysis History</h3>
                        <p>Your analysis history will appear here</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default History;

