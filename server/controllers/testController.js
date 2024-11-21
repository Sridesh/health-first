const { getAllTests } = require("../models/testsModel");

const getTestList = async (req, res) => {
  const { filter, sort, order } = req.query;
  try {
    const testList = await getAllTests(filter, sort, order);
    res.status(200).json(testList);
  } catch (error) {
    res.status(500).json({ message: "Could not fetch tests list" });
  }
};

module.exports = { getTestList };
