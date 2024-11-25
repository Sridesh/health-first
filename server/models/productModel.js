const pool = require("../config/db");

const getAllProducts = async () => {
  try {
    const response =
      await pool.query(`SELECT  pi.item_id, pi.item_name, pi.description, pi.price, pi.quantity, pi.image, pc.category
            FROM pharma_item pi 
            LEFT JOIN pharma_category pc 
            ON pi.category = pc.cat_id 
            ORDER BY item_name ASC;
            `);

    return response.rows;
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getAllProducts };
