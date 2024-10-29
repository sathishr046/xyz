const express = require('express');
const cors = require('cors');
const puppeteer = require('puppeteer');

const app = express();
app.use(cors());
app.use(express.json());

// Debug middleware
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

app.get('/api/medicine-images', async (req, res) => {
    const { disease } = req.query;
    console.log('Received request for disease:', disease);

    try {
        // Fallback images in case of scraping failure
        const fallbackImages = [
            {
                url: 'https://m.media-amazon.com/images/I/71mJ5yNX7qL.jpg',
                name: 'General Fungicide',
                description: 'Multi-purpose plant disease treatment'
            },
            {
                url: 'https://m.media-amazon.com/images/I/81zqwW0nOPL.jpg',
                name: 'Alternative Treatment',
                description: 'Broad-spectrum plant disease control'
            }
        ];

        // Return fallback images immediately for testing
        res.json(fallbackImages);

    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({
            error: 'Failed to fetch images',
            message: error.message
        });
    }
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
