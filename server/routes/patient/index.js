const express = require("express");
const router = express.Router({ mergeParams: true });
const patientController = require("../../controllers/patientController");

router.get("/", patientController.getPatientList);
router.post("/add-patient");

module.exports = router;
