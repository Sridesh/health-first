const express = require("express");
const { addNewOrder } = require("../../controllers/ordersController");
const router = express.Router();

router.post("/new-order", addNewOrder);

module.exports = router;
