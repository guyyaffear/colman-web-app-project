const { Router } = require('express');
const express = require('express');
const homeController = require("../controllers/homeController");
const router = express.Router();
router.post("/", homeController.home);

module.exports = router;


