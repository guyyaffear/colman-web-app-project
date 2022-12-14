const userHelper = require("../helpers/userHelper");

function isLoggedIn(req, res, next) {
    req.session.email ? next() :
     res.render("errorPage", {userName:null,errorMessage:"User not logged in"});
}

const  isAdmin = (req, res, next) => {
    const useName = req.req.session.email || null;
    if(req.session.email && req.session.isAdmin){
        next()
    } else{
        res.redirect("/errorPage?code=403",useName);
    }
    }
const login = async (req, res) => {

    const { email, password } = req.body;
    if (!email || !password) {
        return res.render("login",{ userName: null });
    }
    try {
        const user = await userHelper.login(email, password);
        if (user) {
            req.session.email = email;
            req.session.isAdmin = user.isAdmin;
            res.render("dashboard",{userName: email});
                } else {
                    res.render("/errorPage",{userName: email,errorMessage: user.message})        }
    } catch (error) {
        res.render("errorPage",{userName:email || null,errorMessage: error.message})
    }
}

const registerDefaultGetReq = (req, res) => {
    return res.render("register",{userName:null});
    
}

const register = async (req, res) => {
    try {
        const { email, password, firstName, lastName, gender, isAdmin } =
        req.body;
        const register = await userHelper.registerUser(
            email,
            password,
            firstName,
            lastName,
            gender,
            isAdmin
        );
        if (register) {
            req.session.email = email;
            req.session.iaAdmin = register.isAdmin;
            res.render("dashboard",{userName:email});
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
    res.redirect("/login",{userName:null});
}

const getUser = async (req, res) => {
    const email = req.session.email;
    if (email) {
        const user = await userHelper.getUser(email);
        res.render("addUser", { user });
    } else {
        res.redirect("/user/register",{email:null});
    }
}

const updateUser = async (req, res) => {
    const email = req.session.email;
    const { password, firstName, lastName, gender, age } = req.body;
    if (email) {
        const user = await userHelper.updateUser(
            email,
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
    res.redirect("/errorPage?code=400")

}

module.exports = {
    login,
    register,
    isLoggedIn,
    isAdmin,
    getUser,
    updateUser,
    logout,
    registerDefaultGetReq
};
