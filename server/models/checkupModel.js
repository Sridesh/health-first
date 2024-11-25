const pool = require("../config/db");

const getAllCheckups = async () => {
  try {
    const response = await pool.query(
      `SELECT cu.checkup_id, cu.checkup_name, cu.description, cu.price, cc.category_name, cc.description AS cat_description, 
       ARRAY_AGG(DISTINCT ce.center_name) AS centers, ARRAY_AGG(DISTINCT t.test_name) AS tests
FROM health_checkup cu 
LEFT JOIN checkup_category cc ON cu.category = cc.cat_id 
LEFT JOIN checkup_center_mapping ccm ON cu.checkup_id = ccm.checkup_id 
LEFT JOIN medical_center ce ON ccm.center_id = ce.center_id 
LEFT JOIN test_checkup_mapping tcm ON cu.checkup_id = tcm.checkup_id
LEFT JOIN test t ON t.test_id = tcm.test_id
GROUP BY cu.checkup_id , cu.checkup_name, cu.description, cu.price, cc.category_name, cc.description;
`
    );

    return response.rows;
  } catch (error) {
    console.log(error);
  }
};

const getAllCheckupCategories = async () => {
  try {
    const response = await pool.query("SELECT * FROM checkup_category;");

    return response.rows;
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getAllCheckups, getAllCheckupCategories };
