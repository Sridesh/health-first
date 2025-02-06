const express = require("express");
const emailOTPController = require("../../controllers/verifications/emailOTPController");

const router = express.Router();
router.post("/set-otp", emailOTPController.setOTP);
router.post("/verify-otp", emailOTPController.verifyOTP);
module.exports = router;
