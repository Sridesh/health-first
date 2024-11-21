const express = require("express");
const { getTestList } = require("../../controllers/testController");
const router = express.Router({ mergeParams: true });

router.get("/get-medi-tests", getTestList);

module.exports = router;
