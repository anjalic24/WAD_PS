const express = require('express');
const path = require('path');
const fs = require('fs').promises;

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.static(path.join(__dirname, 'public')));

// API Endpoint
app.get('/api/users', async (req, res) => {
    try {
        const data = await fs.readFile(path.join(__dirname, 'users.json'));
        const users = JSON.parse(data);
        res.json(users);
    } catch (err) {
        console.error('Error reading users:', err);
        res.status(500).json({ error: 'Failed to load user data' });
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`API available at http://localhost:${PORT}/api/users`);
});