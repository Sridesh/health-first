const express = require("express");
const router = express.Router({ mergeParams: true });
const personController = require("../../controllers/personController");

router.get("/", personController.listPersons);

module.exports = router;
