const express = require('express');
const path = require('path');
const fs = require('fs').promises;

const app = express();
const PORT = 3000; // Simplified port assignment

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// API endpoint
app.get('/api/products', async (req, res) => {
    try {
        const data = await fs.readFile(path.join(__dirname, 'products.json'));
        const products = JSON.parse(data);
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});