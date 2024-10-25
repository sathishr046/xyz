
// src/constants/plants.js

export const plantCategories = {
    CEREALS: 'Cereals & Millets',
    PULSES: 'Pulses',
    VEGETABLES: 'Vegetables',
    FRUITS: 'Fruits',
    SPICES: 'Spices & Condiments',
    COMMERCIAL: 'Commercial Crops',
    OILSEEDS: 'Oilseeds',
    MEDICINAL: 'Medicinal Plants'
};

export const plants = [
    // Cereals & Millets
    {
        id: 1,
        name: 'Rice',
        scientificName: 'Oryza sativa',
        emoji: '🌾',
        category: plantCategories.CEREALS,
        localNames: {
            hi: 'चावल',
            te: 'వరి',
            ta: 'நெல்',
            ka: 'ಭತ್ತ'
        },
        icon: '/icons/rice.png'
    },
    {
        id: 2,
        name: 'Wheat',
        scientificName: 'Triticum aestivum',
        emoji: '🌾',
        category: plantCategories.CEREALS,
        localNames: {
            hi: 'गेहूं',
            te: 'గోధుమ',
            ta: 'கோதுமை',
            ka: 'ಗೋಧಿ'
        }
    },
    {
        id: 3,
        name: 'Corn',
        scientificName: 'Zea mays',
        emoji: '🌽',
        category: plantCategories.CEREALS,
        localNames: {
            hi: 'मक्का',
            te: 'మొక్కజొన్న',
            ta: 'மக்காச்சோளம்',
            ka: 'ಮೆಕ್ಕೆ ಜೋಳ'
        }
    },

    // Pulses
    {
        id: 4,
        name: 'Black Gram',
        scientificName: 'Vigna mungo',
        emoji: '🫘',
        category: plantCategories.PULSES,
        localNames: {
            hi: 'उड़द दाल',
            te: 'మినుములు',
            ta: 'உளுந்து',
            ka: 'ಉದ್ದು'
        }
    },

    // Vegetables
    {
        id: 5,
        name: 'Tomato',
        scientificName: 'Solanum lycopersicum',
        emoji: '🍅',
        category: plantCategories.VEGETABLES,
        localNames: {
            hi: 'टमाटर',
            te: 'టమాటో',
            ta: 'தக்காளி',
            ka: 'ಟೊಮ್ಯಾಟೊ'
        }
    },
    {
        id: 6,
        name: 'Potato',
        scientificName: 'Solanum tuberosum',
        emoji: '🥔',
        category: plantCategories.VEGETABLES,
        localNames: {
            hi: 'आलू',
            te: 'బంగాళాదుంప',
            ta: 'உருளைக்கிழங்கு',
            ka: 'ಆಲೂಗಡ್ಡೆ'
        }
    },

    // Fruits
    {
        id: 7,
        name: 'Mango',
        scientificName: 'Mangifera indica',
        emoji: '🥭',
        category: plantCategories.FRUITS,
        localNames: {
            hi: 'आम',
            te: 'మామిడి',
            ta: 'மாம்பழம்',
            ka: 'ಮಾವು'
        }
    },
    {
        id: 8,
        name: 'Banana',
        scientificName: 'Musa',
        emoji: '🍌',
        category: plantCategories.FRUITS,
        localNames: {
            hi: 'केला',
            te: 'అరటి',
            ta: 'வாழைப்பழம்',
            ka: 'ಬಾಳೆ'
        }
    }
    // ... Add more plants following the same structure
];

export const analyzePlant = async (plantName, imageData, location) => {
    const prompt = `
    Analyze this ${plantName} plant image and provide the following information:
    1. Scientific Name
    2. Is the plant diseased? (Yes/No)
    3. If diseased:
       - Disease identification
       - Recommended treatments
       - Preventive measures
    4. General health assessment
    5. Growth stage
    6. Considering the location: ${location}
       - Is this suitable for cultivation?
       - Local climate compatibility
    
    Please provide practical advice for farmers.
    `;

    // Your Gemini API implementation here
    // Return structured data
};

export const getLocationName = async (latitude, longitude) => {
    try {
        const response = await fetch(
            `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=YOUR_OPENCAGE_API_KEY`
        );
        const data = await response.json();
        return data.results[0].formatted;
    } catch (error) {
        return 'Location not available';
    }
};