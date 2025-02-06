const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const { patientLogin, patientRegister } = require("../models/patientAuthModel");

const userRegister = async (req, res) => {
  try {
    const user = await req.body.data;

    const salt = await bcrypt.genSalt(12);
    const hashed_password = await bcrypt.hash(user.password, salt);

    const newUser = {
      ...user,
      first_name: user.first_name.toLowerCase(),
      last_name: user.last_name.toLowerCase(),
      email: user.email.toLowerCase(),
      hashed_password: hashed_password,
    };

    const response = await patientRegister(newUser);
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
