const mongoose = require('mongoose');


const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    enum: ["active", 'inactive'],
    date: { type: Date, default: Date.now }
});
module.exports = userSchema;

