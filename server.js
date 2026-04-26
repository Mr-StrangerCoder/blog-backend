const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');
const poemRoutes = require('./routes/poemRoutes');
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();


connectDB();

app.use(cors({
    origin: ['http://localhost:5173', 
        'https://poem-frontend-two.vercel.app'
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
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