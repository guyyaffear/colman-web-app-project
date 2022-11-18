const userModel = require("../models/User");
const hashService = require("./hash");

const login = async (email, password) => {
    if (!email.match(/\S+@\S+\.\S+/)) {
        throw { status: "error", code: 401, message: "Invalid Email Address" };
    }

    const user = await userModel.findOne({ email });

    if (user) {
        const compare = await hashService.compareHash(password, user.password);
        if (compare) {
            return user;
        }
    }
    return null;
}

const registerUser = async (
    email,
    password,
    firstName,
    lastName,
    gender,
    isAdmin = false
) => {
    const isAlreadyRegistered = await login(email, password);
    if (!isAlreadyRegistered) {
        const hashedPass = await hashService.genHash(password);
        const newUser = new userModel({
            email,
            password: hashedPass,
            firstName,
            lastName,
            gender,
            isAdmin,
        });

        try {
            return newUser.save();
        } catch (error) {
            throw {
                code: 400,
                message: "Couldn't register user. Please try again later",
            };
        }
    } else {
        throw { code: 401, message: "Username already exists" };
    }
}

const getUser = async (email) => {
    return userModel.findOne({ email });
}

const updateUser = async (
    email,
    password,
    firstName,
    lastName,
    gender,
    age,
    isRoleAdmin
) => {
    const currentUser = await userModel.findOne({ email });
    if (currentUser) {
        const hashPass = password
            ? await hashService.genHash(password)
            : currentUser.password;
        const user = await userModel.updateOne(
            { email: currentUser.email },
            {
                password: hashPass,
                firstName: firstName || currentUser.firstName,
                lastName: lastName || currentUser.lastName,
                gender: gender || currentUser.gender,
                age: age ? parseInt(age) : currentUser.age,
                isRoleAdmin,
            }
        );
        return user;
    }
    return null;
}
module.exports = { login, registerUser, getUser, updateUser };
