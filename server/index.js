const express = require('express');
const cors = require('cors');
const db = require('./utils/database');
const studentRoutes = require('./routes/studentRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

db.loadDatabases();

app.use('/api', studentRoutes);
app.use('/api', userRoutes);

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
