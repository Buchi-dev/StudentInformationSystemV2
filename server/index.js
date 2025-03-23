// Import dependencies
const express = require('express');
const cors = require('cors');
const db = require('./utils/database');
const studentRoutes = require('./routes/studentRoutes');
const userRoutes = require('./routes/userRoutes');

// Initialize express app
const app = express();
const PORT = 3000;

// Middleware setup
app.use(cors());
app.use(express.json());

// Initialize database
db.loadDatabases();

// Routes
app.use('/api', studentRoutes);
app.use('/api', userRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
