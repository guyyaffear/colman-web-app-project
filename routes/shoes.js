const express = require("express");
const router = express.Router();
const { isAdmin, isLoggedIn } = require("../controllers/userController");
const shoesController = require("../controllers/shoesController");

router.get("/shop", isLoggedIn, shoesController.allShoesPage);

router.get("/add/:id", isAdmin, shoesController.getShoesById);

router.get("/:company", isLoggedIn,shoesController.getShoesByCompany);

router.post("/add", isAdmin, shoesController.addShoes);

router.put("/update/:shoesId", isAdmin, shoesController.updateShoes);

router.delete("/remove/:shoesId", isAdmin, shoesController.removeShoes);

module.exports = router;
