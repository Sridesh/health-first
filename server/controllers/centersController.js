const { getAllCenters } = require("../models/centersModel");

const getCentersList = async (req, res) => {
  try {
    const centerList = await getAllCenters();
    res.status(200).json(centerList);
  } catch (error) {
    res.status(500).json({ message: "Could not fetch centers details" });
  }
};

module.exports = { getCentersList };
