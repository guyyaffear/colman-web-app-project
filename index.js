const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require("dotenv");
dotenv.config();
// Mongo DB conncetion
const database = process.env.MONGOLAB_URI;
mongoose.connect('mongodb://localhost:27017/farmStand', { useNewUrlParser: true })
    .then(() => {
        console.log("mongo connection open!!");
    }).catch(err => {
        console.log("no connection start");
    })

app.set('view engine', 'ejs');
//Routes
app.use('/', require('./routes/login'));
app.use(express.urlencoded({extended: false}));
const PORT = process.env.PORT || 4111;
app.listen(PORT, console.log("Server has started at port " + PORT))