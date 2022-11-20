const express = require("express");
const mongoose = require('mongoose');
const env = require('dotenv');
const userRoute = require('./Router/userRoute');
const dataRoute = require('./Router/dataRoute');

const app = express();
app.use(express.json());
env.config();

mongoose
    .connect('mongodb://localhost/User', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('connection succesfull'))
    .catch(err => console.log(err));


app.use('/user', userRoute);
app.use('/data', dataRoute);


app.listen(5000, () => {
    console.log('listen port 5000');
});
