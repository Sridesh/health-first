// const bcrypt = require("bcrypt");
// const { getAdminByEmail, getAdminById } = require("../models/adminAuthModel");

// const addAdminUser = async (req, res) => {
//   const { email, password } = req.body;

//   const user = await getAdminByEmail(email);

//   if (!user) {
//     return res.status(401).json({
//       message: "Could not find user with this email",
//     });
//   }

//   const isValid = await bcrypt.compare(password, user.hashed_password);

//   if (!isValid) {
//     return res.status(401).json({ message: "Invalid login info" });
//   }

//   try {
//     req.session.userId = user.admin_uuid;
//     req.session.role = user.role;

//     await req.session.save();

//     const { hashed_password, ...loggedUser } = user;

//     return res
//       .status(200)
//       .json({ message: "Logged in successfully", user: loggedUser });
//   } catch (error) {
//     console.error("Session Error: ", error);
//     return res.status(500).json({ message: "Server Error" });
//   }
// };

// const getCurrentAdmin = async (req, res) => {
//   try {
//     const id = req.session.userId;

//     if (!id) {
//       return res.status(401).json({ message: "Not Authenticated" });
//     }

//     const userData = await getAdminById(id);

//     if (!userData) {
//       return res.status(404).json({
//         message: "User Not Found",
//       });
//     }

//     const { hashed_password, ...user } = userData;

//     return res.status(200).json(user);
//   } catch (error) {
//     return res.status(500).json({
//       message: "Server Error",
//     });
//   }
// };

// module.exports = { addAdminUser, getCurrentAdmin };
