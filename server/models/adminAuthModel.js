const pool = require("../config/db");
const validator = require("validator");

const getAdminByEmail = async (email) => {
  try {
    if (validator.isEmail(email)) {
      const results = await pool.query("SELECT * FROM admin WHERE email = $1", [
        email,
      ]);

      const { rows } = results;

      return rows[0] || null;
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

const getAdminById = async (id) => {
  try {
    if (!validator.isUUID(id, [4])) {
      return null;
    }
    const results = await pool.query(
      `SELECT * FROM admin WHERE admin_uuid = $1 LIMIT 1;`,
      [id]
    );

    const { rows } = results;

    return rows[0] || null;
  } catch (error) {
    throw error;
  }
};

module.exports = { getAdminByEmail, getAdminById };
