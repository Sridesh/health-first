const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const { patientLogin, patientRegister } = require("../models/patientAuthModel");
const { getUserByEmail, getUserById } = require("../models/patientModel");

const userRegister = async (req, res) => {
  try {
    const user = req.body.data;

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
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);

    return res.status(500).json({ message: "Unsuccessful" });
  }
};

const patientUserLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await getUserByEmail(email);

    if (!user) {
      return res.status(401).json({
        message: "A user for this email does not exist.",
      });
    }

    const isValid = await bcrypt.compare(password, user.hashed_password);

    if (!isValid) {
      return res.status(401).json({
        message: "Incorrect Password",
      });
    }

    req.session.userId = user.patient_uuid;
    req.session.userRole = user.role;

    // await new Promise((resolve, reject) => {
    //   req.session.save((err) => {
    //     if (err) {
    //       console.error("Session save error:", err);
    //       reject(err);
    //     }
    //     resolve();
    //   });
    // });

    await new Promise((resolve, reject) => {
      req.session.save((err) => {
        if (err) {
          console.error("Session save error:", err);
          reject(err);
        }
        resolve();
      });
    });

    // Log Set-Cookie header
    res.setHeader("Set-Cookie", req.session.cookie);

    const { hashed_password, ...loggedUser } = user;

    return res.status(200).json({
      message: "Logged in successfully",
      user: loggedUser,
    });
  } catch (error) {
    console.log("login", error);
    return res.status(500).json({ message: "Server Error" });
  }
};

const getCurrentUser = async (req, res) => {
  try {
    const id = req.session.userId;

    if (!id) {
      return res.status(401).json({ message: "Not Authenticated" });
    }

    const userData = await getUserById(id);

    if (!userData) {
      return res.status(404).json({
        message: "User Not Found",
      });
    }

    const { hashed_password, ...user } = userData;

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({
      message: "Server Error",
    });
  }
};

const userLogout = async (req, res) => {};

module.exports = { userRegister, patientUserLogin, getCurrentUser, userLogout };
