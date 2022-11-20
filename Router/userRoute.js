const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Jwt = require('jsonwebtoken');
const userSchema = require('../schema/userSchema');

const User = new mongoose.model('User', userSchema);
const userRouter = express.Router();

userRouter.post('/signup', async (req, res) => {
    try {
        const hashPass = await bcrypt.hash(req.body.password, 10);
        const user = new User({
            name: req.body.name,
            username: req.body.username,
            password: hashPass,
            status: req.body.status,
        });
        await user.save();
        res.status(201).json({ message: "user created" })
    } catch (err) {
        res.status(500).json({ message: err.message });

    }
});

userRouter.post('/login', async (req, res) => {
    try {
        const userlog = await User.find({ username: req.body.username });
        if (userlog && userlog.length > 0) {
            const validPassword = await bcrypt.compare(req.body.password, userlog[0].password);
            if (validPassword) {
                //generate token
                const token = Jwt.sign({
                    username: userlog[0].username,
                    userId: userlog[0]._id,
                }, process.env.jwt_secret, { expiresIn: '1h' });
                res.status(200).json({ "accessToken": token, message: "login succesfull" });
            } else {
                res.status(400).json({ message: "authentication faild1" });
            }
        } else {
            res.status(400).json({ message: "authentication faild2" });
        }
    } catch {
        res.status(400).json({ message: "authentication faild3" });
    }
});



module.exports = userRouter;