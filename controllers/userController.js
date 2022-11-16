const userService = require("../helpers/userHelper");

function isLoggedIn(req, res, next) {
    req.session.username ? next() : res.redirect("/error?code=401");
}

const  isAdmin = (req, res, next) => {
    req.session.username && req.session.isAdmin
        ? next()
        : res.redirect("/error?code=403");
}

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        if(!email || !password){
            res.render("login.ejs",{});
        }
        const user = await userService.login(email, password);
        console.log("user",user)
        if (user) {
            req.session.username = email;
            req.session.isAdmin = user.isAdmin;
            res.json({ status: "success", code: 200, user });
        } else {
            res.json({ status: "error", code: 401, message: "No User Found" });
        }
    } catch (error) {
        res.json({ status: "error", code: error.code, message: error.message });
    }
}

const register = async (req, res) => {
    const { email, password, firstName, lastName, gender, age, isAdmin } =
        req.body;

    try {
        const register = await userService.registerUser(
            email,
            password,
            firstName,
            lastName,
            gender,
            age,
            isAdmin
        );
        if (register) {
            req.session.username = email;
            req.session.iaAdmin = register.isAdmin;
            res.json({ status: "success", code: 200, register });
        } else {
            throw Error();
        }
    } catch (error) {
        res.json({
            status: "error",
            code: error.code,
            error: error.message,
        });
    }
}

const logout = async (req, res) => {
    req.session.destroy();
    res.redirect("/");
}

const getUser = (req, res) => {
    const username = req.session.username;
    if (username) {
        const user = await userService.getUser(username);
        res.render("addUser", { user });
    } else {
        res.redirect("/user/add-user");
    }
}

const updateUser = (req, res) => {
    const username = req.session.username;
    const { password, firstName, lastName, gender, age } = req.body;
    if (username) {
        const user = await userService.updateUser(
            username,
            password,
            firstName,
            lastName,
            gender,
            age
        );
        if (user) {
            res.json({ status: "success", code: 200, user });
        }
    }
    res.json({
        status: "error",
        code: 400,
        message: "Couldn't update user info",
    });
}

module.exports = {
    login,
    register,
    isLoggedIn,
    isAdmin,
    getUser,
    updateUser,
    logout,
};
