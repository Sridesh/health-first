const router = require("express").Router({ mergeParams: true });

const personRoutes = require("./routes/person");
const patientRoutes = require("./routes/patient");
const doctorRouter = require("./routes/doctor");

router.use("/person", personRoutes);
router.use("/patient", patientRoutes);
router.use("/doctor", doctorRouter);

module.exports = router;
