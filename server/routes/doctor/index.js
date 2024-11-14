const express = require("express");
const router = express.Router({ mergeParams: true });
const doctorController = require("../../controllers/doctorController");

router.get("/get-doctors", doctorController.getDoctorList);
router.get("/get-doctor-types", doctorController.getDoctorFilters);

module.exports = router;
