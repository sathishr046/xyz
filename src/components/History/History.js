import React, { useContext } from 'react';
import { HistoryContext } from '../../context/HistoryContext';
import './History.css';

const History = () => {
    const { history } = useContext(HistoryContext);

    return (
        <div className="history-container">
            <h1>Analysis History</h1>
            <div className="history-list">
                {history.map((item) => (
                    <div key={item.id} className="history-card">
                        <div className="history-image">
                            <img src={item.image} alt="Plant" />
                        </div>
                        <div className="history-details">
                            <h3>{item.plantName}</h3>
                            <p className="timestamp">{new Date(item.date).toLocaleString()}</p>
                            <div className="analysis-result">
                                <pre>{item.result}</pre>
                            </div>
                        </div>
                    </div>
                ))}
                {history.length === 0 && (
                    <div className="no-history">
                        <p>No analysis history yet</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default History;

