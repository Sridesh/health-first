const doctorModel = require("../models/doctorModel");

const getDoctorList = async (req, res) => {
  try {
    const doctorList = await doctorModel.getAllDoctors();
    res.status(200).send(doctorList);
  } catch (error) {
    res.status(500).json({ message: "Could not fetch doctors list" });
  }
};

module.exports = { getDoctorList };
