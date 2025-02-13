const express = require("express");
const { authMiddleware } = require("../../middleware/auth");
const {
  userLoginCtrl,
  getCurrentUserCtrl,
} = require("../../controllers/userAuthController");
const router = express.Router();

router.post("/login", userLoginCtrl);
router.get("/me", authMiddleware, getCurrentUserCtrl);

module.exports = router;
