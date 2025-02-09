const express = require("express");
const { getCentersList } = require("../../controllers/centersController");
const router = express.Router();

router.get("/", getCentersList);

module.exports = router;
