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

const getPatientByIdCtrl = async (req, res) => {
  const { id } = req.params;

  try {
    const patient = await patientModel.getPatientById(id);
    res.status(200).json(patient);
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "Server Error. Could not fetch patient" });
  }
};

module.exports = { getPatientList, getPatientByIdCtrl };
