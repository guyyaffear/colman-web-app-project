const User = require('../models/user');


async function login(email,password) {
    return User.findOne({
        email:email,
        password:password
    });
}

async function register(email,password,firstName,lastName,gender) {
    const user = new User({
        email:email,
        password:password,
        firstName:firstName,
        lastName:lastName,
        gender:gender,
        isAdmin:'false'
    });

    return user.save();
}

module.exports = {login,register};