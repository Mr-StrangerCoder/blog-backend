const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');
const poemRoutes = require('./routes/poemRoutes'); 

const app = express();


connectDB();


app.use(cors({
  origin: 'http://localhost:5173', //
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));
app.use(express.json());

app.use('/', poemRoutes); 


app.get('/', (req, res) => {
    res.send('Poem API is running...');
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});