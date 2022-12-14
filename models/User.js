const mongoose = require("mongoose");

const User = mongoose.Schema({
    email: String,
    password: String,
    firstName: String,
    lastName: String,
    gender: String,
    isAdmin: Boolean,
});

const userModel = mongoose.model("User", User);
module.exports = userModel;
