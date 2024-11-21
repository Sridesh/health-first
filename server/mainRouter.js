const router = require("express").Router({ mergeParams: true });

const patientRoutes = require("./routes/patient");
const doctorRouter = require("./routes/doctor");
const testRouter = require("./routes/mediTests");

router.use("/patient", patientRoutes);
router.use("/doctor", doctorRouter);
router.use("/test", testRouter);

module.exports = router;
