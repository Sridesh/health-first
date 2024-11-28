const express = require("express");
const {
  userRegister,
  patientUserLogin,
} = require("../../controllers/userAuthController");
const router = express.Router();

router.post("/register", userRegister);
router.post("/login", patientUserLogin);

module.exports = router;
