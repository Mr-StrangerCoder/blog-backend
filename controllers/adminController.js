const User = require('../models/userModel');
const Poem = require('../models/poemModel');
const bcrypt = require('bcryptjs');

// Get All Users
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password');
        
        // Get poem count for each user
        const usersWithCount = await Promise.all(
            users.map(async (user) => {
                const poemCount = await Poem.countDocuments({ user: user._id });
                return { ...user.toObject(), poemCount };
            })
        );

        res.status(200).json({
            success: true,
            data: usersWithCount
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

// Reset User Password
const resetUserPassword = async (req, res) => {
    try {
        const { newPassword } = req.body;

        if (!newPassword || newPassword.length < 6) {
            return res.status(400).json({
                success: false,
                message: 'Password must be at least 6 characters'
            });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        await User.findByIdAndUpdate(req.params.id, {
            password: hashedPassword
        });

        res.status(200).json({
            success: true,
            message: 'Password reset successfully'
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

// Get All Poems
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

module.exports = { getAllUsers, deleteUser, getAllPoems, resetUserPassword };