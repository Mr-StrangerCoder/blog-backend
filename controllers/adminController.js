const User = require('../models/userModel');
const Poem = require('../models/poemModel');

// Get All Users
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.status(200).json({
            success: true,
            data: users
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

// Delete User
const deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        // Delete all poems by this user
        await Poem.deleteMany({ user: req.params.id });

        await User.findByIdAndDelete(req.params.id);
        res.status(200).json({
            success: true,
            message: 'User and their poems deleted successfully'
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

// Get All Poems (Admin)
const getAllPoems = async (req, res) => {
    try {
        const poems = await Poem.find()
            .populate('user', 'name email')
            .sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            data: poems
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

module.exports = { getAllUsers, deleteUser, getAllPoems };