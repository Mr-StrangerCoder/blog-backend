const express = require('express');
const router = express.Router();
const {
    createPoem,
    getPoems,
    getSinglePoem,
    updatePoem,
    deletePoem,
    likePoem
} = require('../controllers/poemController');
const { protect } = require('../middleware/authMiddleware');

// Public routes
router.get('/poems', getPoems);
router.get('/poem/:id', getSinglePoem);

// Protected routes - must be logged in
router.post('/create-poem', protect, createPoem);
router.put('/update-poem/:id', protect, updatePoem);
router.delete('/delete-poem/:id', protect, deletePoem);
router.put('/like-poem/:id', protect, likePoem);

module.exports = router;