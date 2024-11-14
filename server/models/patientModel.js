const pool = require("../config/db");

const getAllPatients = async () => {
  const results = await pool.query("SELECT * FROM patient");
  console.log(results);

  return results.rows;
};

module.exports = { getAllPatients };
