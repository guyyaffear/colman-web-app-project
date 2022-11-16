
const home = async (req, res) => {
    res.render("dashboard",{user:{name:"HELLO",location:"BLABLA"}});
}

module.exports = {
    home
}
