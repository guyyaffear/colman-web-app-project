const userService = require('../services/user');


function register(req,res){
    res.render("register.ejs",{});
    const result = userService.register(req.body.email,req.body.password,req.body.firstName,req.body.lastName,reqc.body.gender);
    result.then(r=> {
        res.end();
    });
}

function login(req,res){
    res.render("login.ejs",{});
    const result = userService.login(req.body.email,req.body.password);
    result.then(r=> {
        res.end();
    });    
}

module.exports = {register,login};