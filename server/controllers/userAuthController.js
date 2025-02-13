const bcrypt = require("bcrypt");

const {
  userRegister,
  getUserValidity,
  getUserById,
} = require("../models/userAuthModel");

const userRegisterCtrl = async (req, res) => {
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

    const response = await userRegister(newUser);
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);

    return res.status(500).json({ message: "Unsuccessful" });
  }
};

const userLoginCtrl = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    const user = await getUserValidity(email, role);

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

    try {
      req.session.userId = user.user_uuid;
      req.session.role = user.role;

      await req.session.save();

      const { hashed_password, ...loggedUser } = user;

      return res
        .status(200)
        .json({ message: "Logged in successfully", user: loggedUser });
    } catch (error) {
      console.error("Session Error: ", error);
      return res.status(500).json({ message: "Server Error" });
    }
  } catch (error) {
    console.log("login", error);
    return res.status(500).json({ message: "Server Error" });
  }
};

const getCurrentUserCtrl = async (req, res) => {
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

const userLogoutCtrl = async (req, res) => {};

module.exports = {
  userRegisterCtrl,
  userLoginCtrl,
  getCurrentUserCtrl,
  userLogoutCtrl,
};
