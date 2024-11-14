const doctorModel = require("../models/doctorModel");

const getDoctorList = async (req, res) => {
  const { order, sort, filter } = req.query;
  try {
    const doctorList = await doctorModel.getAllDoctors(order, sort, filter);
    res.status(200).send(doctorList);
  } catch (error) {
    res.status(500).json({ message: "Could not fetch doctors list" });
  }
};

const getDoctorFilters = async (req, res) => {
  try {
    const filterList = await doctorModel.getDoctorTypes();
    res.status(200).json(filterList.map((item) => item.type));
  } catch (error) {
    res.status(500).json({ message: "Could not fetch filters" });
  }
};

module.exports = { getDoctorList, getDoctorFilters };
