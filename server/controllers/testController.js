const { getAllTests } = require("../models/testsModel");

const getTestList = async (req, res) => {
  try {
    const testList = await getAllTests();
    res.status(200).json(testList);
  } catch (error) {
    res.status(500).json({ message: "Could not fetch tests list" });
  }
};

module.exports = { getTestList };
