const router = require("express").Router({ mergeParams: true });

const personRoutes = require("./routes/person");

router.use("/person", personRoutes);

module.exports = router;
