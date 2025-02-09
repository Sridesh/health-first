const express = require("express");
const {
  userRegister,
  patientUserLogin,
  userLogout,
  getCurrentUser,
} = require("../../controllers/userAuthController");
const createRateLimiter = require("../../middleware/rateLimiter");
const redisService = require("../../config/redis");
const { authMiddleware } = require("../../middleware/auth");

const router = express.Router();

const loginLimiter = createRateLimiter(redisService.client);

router.post("/register", userRegister);
router.post("/login", patientUserLogin);
router.post("/logout", authMiddleware, userLogout);
router.get("/me", authMiddleware, getCurrentUser);

module.exports = router;
