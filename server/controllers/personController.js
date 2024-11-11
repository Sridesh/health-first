const personModel = require("../models/personModel");

const listPersons = async (req, res) => {
  try {
    const personList = await personModel.getAllPeople();
    res.status(200).json(personList);
  } catch (error) {
    // res.status(500).json({ error: "Error fetching person data" });
    console.log(error);
  }
};

module.exports = { listPersons };
