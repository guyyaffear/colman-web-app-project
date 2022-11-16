const express = require('express');
const {registerView, loginView } = require('../controllers/userController');
const userController = require("../controllers/userController");
const router = express.Router();
router.get("/", userController.getUser);
router.put("/", userController.updateUser);
router.post("/login", userController.login);
router.get("/login", userController.login);
router.get("/register", userController.register);
router.post("/register", userController.register);
router.get("/logout", userController.isLoggedIn, userController.logout);
router.get("/add-user", async (req, res) => {
    res.render("addUser", { user: null });
});
module.exports = router;
