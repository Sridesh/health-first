const pool = require("../config/db");
const validator = require("validator");

const getAllPatients = async () => {
  const results = await pool.query("SELECT * FROM patient");
  console.log(results);

  return results.rows;
};

const getUserByEmail = async (email) => {
  try {
    if (!validator.isEmail(email)) {
      return null;
    }

    const results = await pool.query(
      `SELECT * FROM patient WHERE email = $1 LIMIT 1;`,
      [email]
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
      `SELECT * FROM patient WHERE patient_uuid = $1 LIMIT 1;`,
      [id]
    );

    const { rows } = results;

    return rows[0] || null;
  } catch (error) {
    throw error;
  }
};

module.exports = { getAllPatients, getUserByEmail, getUserById };
