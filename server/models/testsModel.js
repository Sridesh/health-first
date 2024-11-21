const pool = require("../config/db");

const getAllTests = async () => {
  try {
    const response =
      await pool.query(`SELECT test.test_id, test.test_name, test.description, test.price, test_type.name AS category
            FROM test JOIN test_type ON test.test_id = test_type.type_id 
            ORDER BY test_id ASC;`);

    return response.rows;
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getAllTests };
