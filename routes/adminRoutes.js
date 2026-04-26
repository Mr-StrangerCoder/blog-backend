const express = require('express');
const router = express.Router();
const { getAllUsers, deleteUser, getAllPoems, resetUserPassword } = require('../controllers/adminController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

router.get('/users', protect, adminOnly, getAllUsers);
router.delete('/user/:id', protect, adminOnly, deleteUser);
router.get('/poems', protect, adminOnly, getAllPoems);
router.put('/reset-password/:id', protect, adminOnly, resetUserPassword);

module.exports = router;