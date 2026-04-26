const Poem = require('../models/poemModel');

// Create Poem
const createPoem = async (req, res) => {
    try {
        const { title, content, author, dedicate } = req.body;
        const poem = await Poem.create({
            title,
            content,
            author,
            dedicate,
            user: req.user.id
        });
        res.status(201).json({
            success: true,
            message: 'Poem created successfully',
            data: poem
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

// Get All Poems
const getPoems = async (req, res) => {
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

// Get My Poems
const getMyPoems = async (req, res) => {
    try {
        const poems = await Poem.find({ user: req.user.id })
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

// Get Single Poem
const getSinglePoem = async (req, res) => {
    try {
        const poem = await Poem.findById(req.params.id)
            .populate('user', 'name email');
        if (!poem) {
            return res.status(404).json({
                success: false,
                message: 'Poem not found'
            });
        }
        res.status(200).json({
            success: true,
            data: poem
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

// Update Poem
const updatePoem = async (req, res) => {
    try {
        const poem = await Poem.findById(req.params.id);
        if (!poem) {
            return res.status(404).json({
                success: false,
                message: 'Poem not found'
            });
        }
        if (poem.user.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to update this poem'
            });
        }
        const updatedPoem = await Poem.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.status(200).json({
            success: true,
            message: 'Poem updated successfully',
            data: updatedPoem
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

// Delete Poem
const deletePoem = async (req, res) => {
    try {
        const poem = await Poem.findById(req.params.id);
        if (!poem) {
            return res.status(404).json({
                success: false,
                message: 'Poem not found'
            });
        }
        if (poem.user.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to delete this poem'
            });
        }
        await Poem.findByIdAndDelete(req.params.id);
        res.status(200).json({
            success: true,
            message: 'Poem deleted successfully'
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

// Like / Unlike Poem
const likePoem = async (req, res) => {
    try {
        const poem = await Poem.findById(req.params.id);
        if (!poem) {
            return res.status(404).json({
                success: false,
                message: 'Poem not found'
            });
        }
        const alreadyLiked = poem.likedBy.includes(req.user.id);
        if (alreadyLiked) {
            poem.likedBy = poem.likedBy.filter(
                id => id.toString() !== req.user.id
            );
            poem.likes = poem.likes - 1;
        } else {
            poem.likedBy.push(req.user.id);
            poem.likes = poem.likes + 1;
        }
        await poem.save();
        res.status(200).json({
            success: true,
            message: alreadyLiked ? 'Poem unliked' : 'Poem liked',
            likes: poem.likes
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

module.exports = {
    createPoem,
    getPoems,
    getMyPoems,
    getSinglePoem,
    updatePoem,
    deletePoem,
    likePoem
};