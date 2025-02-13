const express = require("express");
const {
  userLoginCtrl,
  getCurrentUserCtrl,
  userLogoutCtrl,
  userRegisterCtrl,
} = require("../../controllers/userAuthController");
const createRateLimiter = require("../../middleware/rateLimiter");
const redisService = require("../../config/redis");
const { authMiddleware } = require("../../middleware/auth");

const router = express.Router();

const loginLimiter = createRateLimiter(redisService.client);

router.post("/register", userRegisterCtrl);
router.post("/login", loginLimiter, userLoginCtrl);
router.post("/logout", authMiddleware, userLogoutCtrl);
router.get("/me", authMiddleware, getCurrentUserCtrl);

module.exports = router;
