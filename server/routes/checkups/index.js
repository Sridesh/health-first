const express = require("express");
const {
  getCheckupList,
  getCategoriesList,
} = require("../../controllers/checkupController");
const router = express.Router();

router.get("/", getCheckupList);
router.get("/categories", getCategoriesList);

module.exports = router;
