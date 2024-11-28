const jwt = require("jsonwebtoken");

const { patientRegister, patientLogin } = require("../models/patientAuthModel");

const userRegister = async (req, res) => {
  try {
    const response = await patientRegister(req.body);
    res.status(200).json(response);
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "Unsuccessful" });
  }
};

const patientUserLogin = async (req, res) => {
  try {
    const response = await patientLogin(req.body);
    if (response === 1) {
      res
        .status(200)
        .json({ message: "Successfully Logged In", response: response });
    } else {
      res.status(200).json({
        message: "Invalid Email or Password. Try Again",
        response: response,
      });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = { userRegister, patientUserLogin };
