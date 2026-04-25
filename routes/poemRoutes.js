const express = require('express');
const router = express.Router();
const { createPoem, getPoems, getSinglePoem, updatePoem, deletePoem } = require('../controllers/poemController');

// Create Poem
router.post('/create-poem', createPoem);

// Get All Poems
router.get('/poems', getPoems);

// Get Single Poem
router.get('/poem/:id', getSinglePoem);

// Update Poem
router.put('/update-poem/:id', updatePoem);

// Delete Poem
router.delete('/delete-poem/:id', deletePoem);

module.exports = router;