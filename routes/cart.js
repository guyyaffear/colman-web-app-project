const express = require("express");
const router = express.Router();
const { isLoggedIn } = require("../controllers/userController");
const cartController = require("../controllers/cartController");

router.get("/", cartController.getCart);

router.delete("/", isLoggedIn, cartController.clearCart);

router.post("/add", isLoggedIn, cartController.addShoeToCart);

router.put("/update-quantity", cartController.updateShoeQuantity);

router.delete("/remove", isLoggedIn, cartController.removeShoeFromCart);

module.exports = router;
