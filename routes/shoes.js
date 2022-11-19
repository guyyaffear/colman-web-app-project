const express = require("express");
const router = express.Router();
const { isAdmin, isLoggedIn } = require("../controllers/userController");
const shoesController = require("../controllers/shoesController");

router.get("/shop",shoesController.allShoesPage);

router.get("/add", shoesController.getShoesById);

router.get("/:company", isLoggedIn,shoesController.getShoesByCompany);

router.post("/add", shoesController.addShoes);

router.put("/update/:shoesId", isAdmin, shoesController.updateShoes);

router.get("/remove/:shoesId", shoesController.removeShoes);

module.exports = router;
