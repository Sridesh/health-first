const pool = require("../config/db");

//-------return All centers
const getAllCenters = async () => {
  try {
    const response = await pool.query("SELECT * FROM medical_center;");

    console.log(response.rows[0]);

    return response.rows;
  } catch (error) {
    console.log(error);

    throw error;
  }
};

module.exports = { getAllCenters };
