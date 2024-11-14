const patientModel = require("../models/patientModel");

const getPatientList = async (req, res, next) => {
  try {
    const patientList = await patientModel.getAllPatients();
    res.status(200).json(patientList);
  } catch (error) {
    res.status(500).json({ message: "Error fetching patients" });
    console.log(error);
  }
};

module.exports = { getPatientList };
