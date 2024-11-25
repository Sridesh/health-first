const express = require("express");
const router = express.Router();
const { getProductsList } = require("../../controllers/productsController");

router.get("/", getProductsList);

module.exports = router;
