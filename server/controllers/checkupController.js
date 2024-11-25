const {
  getAllCheckups,
  getAllCheckupCategories,
} = require("../models/checkupModel");

const getCheckupList = async (req, res) => {
  try {
    const checkupList = await getAllCheckups();

    res.status(200).json(checkupList);
  } catch (error) {
    res.status(500).json({ message: "Could not fetch checkup list" });
  }
};

const getCategoriesList = async (req, res) => {
  try {
    const categoryList = await getAllCheckupCategories();

    res.status(200).json(categoryList);
  } catch (error) {
    res.status(500).json({ message: "Could not fetch categories" });
  }
};

module.exports = { getCheckupList, getCategoriesList };
