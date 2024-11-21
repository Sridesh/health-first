const pool = require("../config/db");

const getAllTests = async () => {
  try {
    const response =
      await pool.query(`SELECT t.test_id, t.test_name, t.description, t.price, tt.name AS type, ARRAY_AGG(c.center_name) AS centers FROM  test t 
JOIN test_type tt ON t.type = tt.type_id
JOIN test_center_mapping tcm ON tcm.test_id = t.test_id 
JOIN medical_center c ON tcm.center_id = c.center_id 
GROUP BY t.test_id, t.test_name, t.description, t.price, tt.name ORDER BY t.test_id ASC;`);

    return response.rows;
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getAllTests };
