const express = require('express');
const mongoose = require('mongoose');
const dataSchema = require('../schema/dataSchema');
const Data = new mongoose.model('Data', dataSchema);
const AuthCheck = require('../middilewares/AuthChecker');
const dataRouter = express.Router();


dataRouter.get('/', AuthCheck, (req, res) => {
    Data.find((err, data) => {
        if (err) {
            res.status(500).json({ message: "bad request" });
        } else {
            res.status(200).json({ payload: data, message: "OK" });
        }
    });
});





dataRouter.post('/', async (req, res) => {
    const data = new Data(req.body);
    await data.save((err, todo) => {
        if (err) {
            res.status(500).json({ message: err.message });
        } else {
            res.status(201).json({ payload: todo, message: "OK" });
        }
    })
});

module.exports = dataRouter;