const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');
const poemRoutes = require('./routes/poemRoutes');
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();

// MongoDB Connection
connectDB();

// Middleware
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));
app.use(express.json());

// Routes
app.use('/', poemRoutes);
app.use('/auth', authRoutes);
app.use('/admin', adminRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});