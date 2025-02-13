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
const csrfRouter = require("./routes/csrfRouter");
const centersRouter = require("./routes/centers");
const ordersRouter = require("./routes/orders");
const adminRouter = require("./routes/admin");
const { roleCheck } = require("./middleware/auth");

//rateLimiter instance initialization
const rateLimiter = createRateLimiter(redisService.client);

//generate routes
router.use("/auth-patient", registerRouter);
router.use("/auth-admin", adminRouter);
router.use("/verification", rateLimiter, emailOTPRouter);

// patient routers
router.use("/patient", roleCheck(["patient"]), patientRoutes);
router.use("/doctor", roleCheck(["patient"]), doctorRouter);
router.use("/test", roleCheck(["patient"]), testRouter);
router.use("/checkups", roleCheck(["patient"]), checkupRouter);
router.use("/products", roleCheck(["patient"]), productRouter);
router.use("/dev", roleCheck(["patient"]), imageRouter);
router.use("/centers", roleCheck(["patient"]), centersRouter);
router.use("/orders", roleCheck(["patient"]), ordersRouter);

//admin routes
router.use("/admin/patients", roleCheck(["admin"]), patientRoutes);
router.use("/admin/patient", roleCheck(["admin"]), patientRoutes);

module.exports = router;
