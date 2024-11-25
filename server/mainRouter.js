const router = require("express").Router({ mergeParams: true });

const patientRoutes = require("./routes/patient");
const doctorRouter = require("./routes/doctor");
const testRouter = require("./routes/mediTests");
const checkupRouter = require("./routes/checkups");
const productRouter = require("./routes/products");
const imageRouter = require("./controllers/imageUpload");

router.use("/patient", patientRoutes);
router.use("/doctor", doctorRouter);
router.use("/test", testRouter);
router.use("/checkups", checkupRouter);
router.use("/products", productRouter);
router.use("/dev", imageRouter);

module.exports = router;
