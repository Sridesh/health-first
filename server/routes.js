const router = require("express").Router({ mergeParams: true });
const redisService = require("./config/redis");
const createRateLimiter = require("./middleware/rateLimiter");

const patientRoutes = require("./routes/patient");
const doctorRouter = require("./routes/doctor");
const testRouter = require("./routes/mediTests");
const checkupRouter = require("./routes/checkups");
const productRouter = require("./routes/products");
const imageRouter = require("./controllers/imageUpload");
const registerRouter = require("./routes/register/patientRegister");
const emailOTPRouter = require("./routes/verification/EmailOTPRouter");

//rateLimiter instance initialization
const rateLimiter = createRateLimiter(redisService.client);

console.log(rateLimiter);

router.use("/patient", patientRoutes);
router.use("/doctor", doctorRouter);
router.use("/test", testRouter);
router.use("/checkups", checkupRouter);
router.use("/products", productRouter);
router.use("/dev", imageRouter);
router.use("/auth-patient", registerRouter);
router.use("/verification", rateLimiter, emailOTPRouter);

module.exports = router;
