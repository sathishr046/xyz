// src/PlantIdentifier.js
import React, { useState, useEffect } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import './PlantIdentifier.css'; // We'll create this next

const genAI = new GoogleGenerativeAI('AIzaSyAJX0A1MUJ0DuOMzG2SIOKm0yJ-N8kScDI'); // Replace with your actual API key

function PlantIdentifier() {
    const [selectedPlant, setSelectedPlant] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [image, setImage] = useState(null);
    const [result, setResult] = useState('');
    const [loading, setLoading] = useState(false);
    const [showCamera, setShowCamera] = useState(false);
    const [stream, setStream] = useState(null);
    const [error, setError] = useState('');
    const videoRef = React.useRef(null);

    // Add "Other" category
    const categories = [
        { id: 'all', name: 'All Plants', emoji: '🌱' },
        { id: 'cereals', name: 'Cereals & Millets', emoji: '🌾' },
        { id: 'pulses', name: 'Pulses', emoji: '🫘' },
        { id: 'vegetables', name: 'Vegetables', emoji: '🥬' },
        { id: 'fruits', name: 'Fruits', emoji: '🍎' },
        { id: 'spices', name: 'Spices', emoji: '🌶️' },
        { id: 'commercial', name: 'Commercial Crops', emoji: '🌿' },
        { id: 'other', name: 'Other Plants', emoji: '🔍' }
    ];

    // Plants database with categories, emojis, and scientific names
    const plants = [
        // Cereals & Millets
        {
            id: 1,
            name: 'Rice',
            scientificName: 'Oryza sativa',
            category: 'cereals',
            emoji: '🌾',
            description: 'Staple food crop'
        },
        {
            id: 2,
            name: 'Wheat',
            scientificName: 'Triticum aestivum',
            category: 'cereals',
            emoji: '🌾',
            description: 'Major cereal grain'
        },
        {
            id: 3,
            name: 'Corn/Maize',
            scientificName: 'Zea mays',
            category: 'cereals',
            emoji: '🌽',
            description: 'Versatile cereal crop'
        },
        {
            id: 4,
            name: 'Barley',
            scientificName: 'Hordeum vulgare',
            category: 'cereals',
            emoji: '🌾',
            description: 'Ancient cereal grain'
        },
        {
            id: 5,
            name: 'Sorghum',
            scientificName: 'Sorghum bicolor',
            category: 'cereals',
            emoji: '🌾',
            description: 'Drought-resistant grain'
        },

        // Pulses
        {
            id: 6,
            name: 'Black Gram',
            scientificName: 'Vigna mungo',
            category: 'pulses',
            emoji: '🫘',
            description: 'Important pulse crop'
        },
        {
            id: 7,
            name: 'Green Gram',
            scientificName: 'Vigna radiata',
            category: 'pulses',
            emoji: '🫘',
            description: 'Nutritious pulse'
        },
        {
            id: 8,
            name: 'Chickpea',
            scientificName: 'Cicer arietinum',
            category: 'pulses',
            emoji: '🫘',
            description: 'Popular legume'
        },
        {
            id: 9,
            name: 'Pigeon Pea',
            scientificName: 'Cajanus cajan',
            category: 'pulses',
            emoji: '🫘',
            description: 'Tropical grain legume'
        },

        // Vegetables
        {
            id: 10,
            name: 'Tomato',
            scientificName: 'Solanum lycopersicum',
            category: 'vegetables',
            emoji: '🍅',
            description: 'Common vegetable'
        },
        {
            id: 11,
            name: 'Potato',
            scientificName: 'Solanum tuberosum',
            category: 'vegetables',
            emoji: '🥔',
            description: 'Root vegetable'
        },
        {
            id: 12,
            name: 'Onion',
            scientificName: 'Allium cepa',
            category: 'vegetables',
            emoji: '🧅',
            description: 'Bulb vegetable'
        },
        {
            id: 13,
            name: 'Carrot',
            scientificName: 'Daucus carota',
            category: 'vegetables',
            emoji: '🥕',
            description: 'Root vegetable'
        },
        {
            id: 14,
            name: 'Cabbage',
            scientificName: 'Brassica oleracea var. capitata',
            category: 'vegetables',
            emoji: '🥬',
            description: 'Leafy vegetable'
        },
        {
            id: 15,
            name: 'Cauliflower',
            scientificName: 'Brassica oleracea var. botrytis',
            category: 'vegetables',
            emoji: '🥦',
            description: 'Cruciferous vegetable'
        },

        // Fruits
        {
            id: 16,
            name: 'Mango',
            scientificName: 'Mangifera indica',
            category: 'fruits',
            emoji: '🥭',
            description: 'Tropical fruit'
        },
        {
            id: 17,
            name: 'Banana',
            scientificName: 'Musa',
            category: 'fruits',
            emoji: '🍌',
            description: 'Tropical fruit'
        },
        {
            id: 18,
            name: 'Apple',
            scientificName: 'Malus domestica',
            category: 'fruits',
            emoji: '🍎',
            description: 'Pomaceous fruit'
        },
        {
            id: 19,
            name: 'Grapes',
            scientificName: 'Vitis vinifera',
            category: 'fruits',
            emoji: '🍇',
            description: 'Berry fruit'
        },
        {
            id: 20,
            name: 'Orange',
            scientificName: 'Citrus × sinensis',
            category: 'fruits',
            emoji: '🍊',
            description: 'Citrus fruit'
        },

        // Spices
        {
            id: 21,
            name: 'Chili',
            scientificName: 'Capsicum annuum',
            category: 'spices',
            emoji: '🌶️',
            description: 'Hot spice'
        },
        {
            id: 22,
            name: 'Turmeric',
            scientificName: 'Curcuma longa',
            category: 'spices',
            emoji: '🌱',
            description: 'Yellow spice'
        },
        {
            id: 23,
            name: 'Ginger',
            scientificName: 'Zingiber officinale',
            category: 'spices',
            emoji: '🌱',
            description: 'Root spice'
        },

        // Commercial Crops
        {
            id: 24,
            name: 'Cotton',
            scientificName: 'Gossypium',
            category: 'commercial',
            emoji: '🌿',
            description: 'Fiber crop'
        },
        {
            id: 25,
            name: 'Sugarcane',
            scientificName: 'Saccharum officinarum',
            category: 'commercial',
            emoji: '🌿',
            description: 'Sugar crop'
        },
        {
            id: 26,
            name: 'Tea',
            scientificName: 'Camellia sinensis',
            category: 'commercial',
            emoji: '🌿',
            description: 'Beverage crop'
        },
        {
            id: 27,
            name: 'Coffee',
            scientificName: 'Coffea',
            category: 'commercial',
            emoji: '☕',
            description: 'Beverage crop'
        },
        {
            id: 28,
            name: 'Coconut',
            scientificName: 'Cocos nucifera',
            category: 'commercial',
            emoji: '🥥',
            description: 'Multi-use palm'
        },

        // Additional Vegetables
        {
            id: 29,
            name: 'Brinjal/Eggplant',
            scientificName: 'Solanum melongena',
            category: 'vegetables',
            emoji: '🍆',
            description: 'Fruit vegetable'
        },
        {
            id: 30,
            name: 'Okra/Lady Finger',
            scientificName: 'Abelmoschus esculentus',
            category: 'vegetables',
            emoji: '🌿',
            description: 'Pod vegetable'
        }
    ];

    // Handle image upload
    const handleImageUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        // Check file size (max 4MB)
        if (file.size > 4 * 1024 * 1024) {
            setError('Image size too large. Please upload an image smaller than 4MB.');
            return;
        }

        // Reset states
        setError('');
        setResult('');
        setLoading(true);

        try {
            // Create URL for preview
            setImage(URL.createObjectURL(file));
            
            // Convert to base64
            const reader = new FileReader();
            reader.onloadend = async () => {
                const base64data = reader.result.split(',')[1]; // Get only the base64 data part
                await analyzePlant(base64data, file.type);
            };
            reader.onerror = () => {
                setError('Failed to read image file. Please try again.');
            };
            reader.readAsDataURL(file);
        } catch (error) {
            console.error('Upload error:', error);
            setError('Failed to upload image. Please try again.');
            setLoading(false);
        }
    };

    // Handle camera
    const startCamera = async () => {
        try {
            const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
            setStream(mediaStream);
            setShowCamera(true);
            if (videoRef.current) {
                videoRef.current.srcObject = mediaStream;
            }
        } catch (error) {
            console.error('Camera error:', error);
            alert('Unable to access camera. Please make sure you have granted permission.');
        }
    };

    const capturePhoto = async () => {
        if (videoRef.current) {
            const canvas = document.createElement('canvas');
            canvas.width = videoRef.current.videoWidth;
            canvas.height = videoRef.current.videoHeight;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(videoRef.current, 0, 0);
            
            try {
                const dataUrl = canvas.toDataURL('image/jpeg');
                const base64data = dataUrl.split(',')[1];
                setImage(dataUrl);
                await analyzePlant(base64data, 'image/jpeg');
                stopCamera();
            } catch (error) {
                console.error('Capture error:', error);
                setError('Failed to capture photo. Please try again.');
            }
        }
    };

    const stopCamera = () => {
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
            setStream(null);
        }
        setShowCamera(false);
    };

    // Modified analyze function with plant verification
    const analyzePlant = async (base64Image, mimeType) => {
        try {
            setLoading(true);
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

            const prompt = `Analyze this ${selectedPlant?.name || 'plant'} image and provide the following information:
                1. Verify if this is a ${selectedPlant?.name || 'plant'}.
                2. If it matches ${selectedPlant?.name || 'the plant'}:
                   - Provide plant health analysis
                   - Identify any diseases
                   - Suggest treatments if needed
                   - Give growth stage
                3. If it doesn't match ${selectedPlant?.name || 'the expected plant'}:
                   - Explain why it's different
                   - Identify what plant it might be instead`;

            // Format the request according to gemini-1.5-flash specifications
            const result = await model.generateContent({
                contents: [{
                    role: "user",
                    parts: [
                        { text: prompt },
                        {
                            inline_data: {
                                mime_type: mimeType || 'image/jpeg',
                                data: base64Image
                            }
                        }
                    ]
                }]
            });

            const response = await result.response;
            setResult(response.text());
            setError('');
        } catch (error) {
            console.error("Analysis error:", error);
            setError("Failed to analyze image. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    // Filter plants based on search and category
    const filteredPlants = plants.filter(plant => {
        const matchesSearch = plant.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || plant.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    // Add this handler function
    const handlePlantSelection = (plantId) => {
        setSelectedPlant(prev => {
            if (prev && prev.id === plantId) {
                // If already selected, remove it
                return null;
            }
            // Find the plant with the given ID
            const plant = plants.find(p => p.id === plantId);
            return plant;
        });
    };

    // Update the selected count in header
    const selectedCount = selectedPlant ? 1 : 0;

    return (
        <div className="plant-identifier-container">
            <header className="header">
                <h1>Plant Identifier</h1>
                <p>Select a plant or choose 'Other' for unknown plants</p>
            </header>

            <div className="search-section">
                <input
                    type="text"
                    placeholder="🔍 Search plants..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                />
            </div>

            <div className="categories-section">
                {categories.map(category => (
                    <div
                        key={category.id}
                        className={`category-tile ${selectedCategory === category.id ? 'active' : ''}`}
                        onClick={() => setSelectedCategory(category.id)}
                    >
                        <span className="category-emoji">{category.emoji}</span>
                        <span className="category-name">{category.name}</span>
                    </div>
                ))}
            </div>

            <div className="plants-section">
                {filteredPlants.map(plant => (
                    <div
                        key={plant.id}
                        className={`plant-tile ${
                            selectedPlant && selectedPlant.id === plant.id ? 'selected' : ''
                        } ${
                            selectedPlant && selectedPlant.id !== plant.id ? 'disabled' : ''
                        }`}
                        onClick={() => handlePlantSelection(plant.id)}
                    >
                        <span className="plant-emoji">{plant.emoji}</span>
                        <span className="plant-name">{plant.name}</span>
                    </div>
                ))}
            </div>

            {selectedPlant && (
                <div className="analysis-modal">
                    <div className="modal-content">
                        <h2>{selectedPlant?.name || 'Plant'} Analysis</h2>
                        
                        <div className="upload-options">
                            <label className="upload-button">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    hidden
                                />
                                📁 Upload Image
                            </label>
                            <button 
                                className="camera-button"
                                onClick={startCamera}
                            >
                                📸 Take Photo
                            </button>
                        </div>

                        {error && (
                            <div className="error-message">
                                <span className="error-icon">⚠️</span>
                                <div className="error-content">
                                    <strong>Error:</strong> {error}
                                    <p className="error-hint">
                                        {error.includes('Failed to analyze') 
                                            ? 'Make sure the image is clear and try again.' 
                                            : 'Please try uploading a different image.'}
                                    </p>
                                </div>
                            </div>
                        )}

                        {image && (
                            <div className="image-preview">
                                <img src={image} alt="Plant" />
                            </div>
                        )}

                        {loading && (
                            <div className="loading-spinner">
                                <div className="spinner"></div>
                                <p>Analyzing image...</p>
                            </div>
                        )}

                        {result && (
                            <div className="analysis-result">
                                <pre>{result}</pre>
                            </div>
                        )}

                        <button 
                            className="close-button"
                            onClick={() => {
                                setSelectedPlant(null);
                                setImage(null);
                                setResult('');
                                setError('');
                                stopCamera();
                            }}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default PlantIdentifier;
