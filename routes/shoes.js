const express = require("express");
const router = express.Router();
const { isAdmin } = require("../controllers/user");
const shoesController = require("../controllers/shoesController");

router.get("/shop", shoesController.allShoesPage);

router.get("/add/:id", isAdmin, shoesController.getShoesById);

router.get("/:company", shoesController.getShoesByCompany);

router.post("/add", isAdmin, shoesController.addShoes);

router.put("/update/:shoesId", isAdmin, shoesController.updateShoes);

router.delete("/remove/:shoesId", isAdmin, shoesController.removeShoes);

module.exports = router;
