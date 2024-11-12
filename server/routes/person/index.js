const express = require("express");
const router = express.Router({ mergeParams: true });
const personController = require("../../controllers/personController");

router.get("/", personController.listPersons);
router.post("/", personController.createPerson);

module.exports = router;
