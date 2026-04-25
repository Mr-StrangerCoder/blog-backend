const mongoose = require('mongoose');

const poemSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    content: {
        type: String,
        required: true,
        trim: true
    },
    author: {
        type: String,
        required: true,
        trim: true
    },
    dedicate: {
        type: String,
        trim: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Poem', poemSchema);