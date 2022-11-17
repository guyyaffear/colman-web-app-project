const express = require('express');
const server = express();
const view_path = __dirname + "/views";
const mongoose = require('mongoose');


mongoose.connect('mongodb://127.0.0.1:27017/CS');

const user = require('./routes/user');


server.set("view engine", "ejs");
server.set("views", view_path);
server.use(express.static('public'));
//user.use('');
server.use('/register',require('./routes/user'));


server.get('/',user);


server.listen(8080);







