const express = require("express");
const router = express.Router({ mergeParams: true });
const doctorController = require("../../controllers/doctorController");

router.get("/", doctorController.getDoctorList);

module.exports = router;
