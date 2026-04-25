const Poem = require('../models/poemModel');

// Create Poem
const createPoem = async (req, res) => {
    try {
        const { title, content, author, dedicate } = req.body;
        const poem = await Poem.create({ title, content, author, dedicate });
        res.status(201).json({
            success: true,
            message: 'Poem created successfully',
            data: poem
        });
    } catch (err) {
        console.log(err, "create1111111111111111111111111111")
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

// Get All Poems
const getPoems = async (req, res) => {
    try {
        const poems = await Poem.find();
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
        const poem = await Poem.findById(req.params.id);
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
        const poem = await Poem.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!poem) {
            return res.status(404).json({
                success: false,
                message: 'Poem not found'
            });
        }
        res.status(200).json({
            success: true,
            message: 'Poem updated successfully',
            data: poem
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
        const poem = await Poem.findByIdAndDelete(req.params.id);
        if (!poem) {
            return res.status(404).json({
                success: false,
                message: 'Poem not found'
            });
        }
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

module.exports = { createPoem, getPoems, getSinglePoem, updatePoem, deletePoem };