const pool = require("../config/db");
const validator = require("validator");

const userRegister = async (user) => {
  try {
    await pool.query(
      `INSERT INTO users(user_uuid, first_name, last_name, email, phone_number, gender, nic, hashed_password, role) 
      VALUES (uuid_generate_v4(), $1, $2, $3, $4, $5, $6, $7);`,
      [
        user.first_name,
        user.last_name,
        user.email,
        user.phone_number,
        user.gender,
        user.nic,
        user.hashed_password,
        user.role,
      ]
    );

    return { message: "Account created successfully" };
  } catch (error) {
    throw error;
  }
};

// //login for users
// const userLogin = async (user) => {
//   try {
//     const response = await pool.query(
//       "SELECT * FROM users WHERE email = $1; AND role = $2",
//       [user.email, user.role]
//     );

//     return response.rowCount;
//   } catch (error) {
//     console.log(error);
//     throw error;
//   }
// };

const getUserValidity = async (email, role) => {
  try {
    if (!validator.isEmail(email)) {
      return null;
    }

    const results = await pool.query(
      `SELECT * FROM users WHERE email = $1 AND role = $2 LIMIT 1;`,
      [email, role]
    );

    const { rows } = results;

    return rows[0] || null;
  } catch (error) {
    throw error;
  }
};

const getUserById = async (id) => {
  try {
    if (!validator.isUUID(id, [4])) {
      return null;
    }
    const results = await pool.query(
      `SELECT * FROM users WHERE user_uuid = $1 LIMIT 1;`,
      [id]
    );

    const { rows } = results;

    return rows[0] || null;
  } catch (error) {
    throw error;
  }
};

module.exports = { userRegister, getUserById, getUserValidity };
