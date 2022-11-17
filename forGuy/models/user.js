const mongoose  = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
    email:String,
    password:String,
    firstName:String,
    lastName:String,
    gender:String,
    isAdmin:Boolean
});

module.exports = mongoose.model('User',User);