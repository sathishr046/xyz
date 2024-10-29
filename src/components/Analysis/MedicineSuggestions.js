import React, { useState, useEffect } from 'react';
import './MedicineSuggestions.css';

const MedicineSuggestions = ({ disease }) => {
    const [medicines, setMedicines] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchMedicineImages = async (diseaseName) => {
        try {
            const model = window.genAI.getGenerativeModel({ model: "gemini-pro" });
            const prompt = `Given the plant disease "${diseaseName}", suggest 3 common treatments or medicines in this JSON format:
            [
                {
                    "name": "Medicine name",
                    "description": "Brief description",
                    "usage": "How to use",
                    "imageUrl": "A generic medicine or treatment image URL"
                }
            ]`;

            const result = await model.generateContent(prompt);
            const response = await result.response;
            const suggestions = JSON.parse(response.text());
            
            return suggestions.map(medicine => ({
                ...medicine,
                imageUrl: medicine.imageUrl || 'https://via.placeholder.com/200?text=Medicine+Image'
            }));
        } catch (error) {
            console.error('Error fetching medicine suggestions:', error);
            throw error;
        }
    };

    useEffect(() => {
        const getMedicines = async () => {
            if (!disease) return;
            
            try {
                setLoading(true);
                const medicineData = await fetchMedicineImages(disease);
                setMedicines(medicineData);
                setError(null);
            } catch (err) {
                setError('Failed to load medicine suggestions');
                setMedicines([]);
            } finally {
                setLoading(false);
            }
        };

        getMedicines();
    }, [disease]);

    if (loading) {
        return (
            <div className="medicine-loading">
                <div className="loading-spinner" />
                <p>Loading treatment suggestions...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="error-message">
                <span className="error-icon">⚠️</span>
                <p>{error}</p>
                <button className="retry-button" onClick={() => window.location.reload()}>
                    Retry
                </button>
            </div>
        );
    }

    return (
        <div className="medicine-suggestions">
            <h3 className="suggestions-title">
                <span className="icon">💊</span>
                Recommended Treatments
            </h3>
            <div className="medicines-grid">
                {medicines.map((medicine, index) => (
                    <div key={index} className="medicine-card">
                        <div className="medicine-image-container">
                            <img 
                                src={medicine.imageUrl} 
                                alt={medicine.name}
                                className="medicine-image"
                                onError={(e) => {
                                    e.target.src = 'https://via.placeholder.com/200?text=Medicine+Image';
                                }}
                            />
                        </div>
                        <div className="medicine-info">
                            <h4>{medicine.name}</h4>
                            <p>{medicine.description}</p>
                            <div className="usage-info">
                                <strong>Usage:</strong>
                                <p>{medicine.usage}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MedicineSuggestions;
