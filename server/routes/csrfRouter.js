const express = require("express");
const { getCsrfToken } = require("../controllers/csrfController");

const router = express.Router();

router.get("/", getCsrfToken);

module.exports = router;
