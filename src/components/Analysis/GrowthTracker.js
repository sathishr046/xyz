import React from 'react';
import { Line } from 'react-chartjs-2';

const GrowthTracker = ({ plantHistory }) => {
    const data = {
        labels: plantHistory.map(h => h.date),
        datasets: [{
            label: 'Plant Growth Progress',
            data: plantHistory.map(h => h.height),
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
        }]
    };

    return (
        <div className="growth-tracker">
            <h3>Growth Progress</h3>
            <Line data={data} />
        </div>
    );
};