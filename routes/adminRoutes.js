const express = require('express');
const router = express.Router();
const { getAllUsers, deleteUser, getAllPoems } = require('../controllers/adminController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

// All admin routes are protected
router.get('/users', protect, adminOnly, getAllUsers);
router.delete('/user/:id', protect, adminOnly, deleteUser);
router.get('/poems', protect, adminOnly, getAllPoems);

module.exports = router;