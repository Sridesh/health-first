const pool = require("../config/db");

const getAllPatients = async () => {
  const results = await pool.query("SELECT * FROM patient");
  console.log(results);

  return results.rows;
};

const isUserExist = async (email) => {
  const results = await pool.query(
    `SELECT * FROM patient WHERE email = $1 LIMIT 1;`,
    [email]
  );

  console.log(results.rowCount != 0);

  return results.rowCount != 0;
};

module.exports = { getAllPatients, isUserExist };
