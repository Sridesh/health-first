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

const createPerson = async (req, res) => {
  const {
    first_name,
    last_name,
    email,
    date_of_birth,
    country_of_birth,
    gender,
  } = req.body;
  console.log(date_of_birth, country_of_birth);

  try {
    const newPerson = await personModel.createPerson(
      first_name,
      last_name,
      email,
      date_of_birth,
      country_of_birth,
      gender
    );
    res.status(200).json(newPerson);
  } catch (error) {
    console.log(error);

    res.status(500).json({ error: "Error creating person" });
  }
};

module.exports = { listPersons, createPerson };
