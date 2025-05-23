const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Serve all static files from the "public" folder
app.use(express.static(path.join(__dirname, 'public')));

// Optional: Redirect root to index.html (not strictly necessary, but explicit)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`ABC Delights website is running at http://localhost:${PORT}`);
});
