const mongoose = require('mongoose');

const dataSchema = mongoose.Schema({
    title: {
        type: String, required: true,
    },
    description: {
        type: String, required: true,
    },
    enum: ["completed", "incompleted"],
    date: {
        type: Date,
        default: Date.now,
    }
});

module.exports = dataSchema;