const pool = require("../config/db");

const getAllPeople = async () => {
  const result = await pool.query("SELECT * FROM person");
  return result.rows;
};

module.exports = { getAllPeople };
