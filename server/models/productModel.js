const pool = require("../config/db");
const isValidSort = require("../helpers/isValidSort");

const getAvailability = (item) => {
  switch (item) {
    case "Currently%20%Available":
      return "WHERE quantity > 0";

    case "Limited%20%Stocks":
      return "WHERE quantity > 0 AND quantity < 10";

    default:
      return "";
  }
};

const getAllProducts = async (availability, category, sort, order) => {
  try {
    const query = `SELECT  pi.item_id, pi.item_name, pi.description, pi.price, pi.quantity, pi.image, pc.category
            FROM pharma_item pi 
            JOIN pharma_category pc 
            ON pi.category = pc.cat_id 
            ${getAvailability(availability)}
            ${category !== "null" ? `AND pc.category = '${category}'` : ""}
            ORDER BY ${order} ${isValidSort(sort) ? sort : "asc"};
            `;

    console.log(query);
    const response = await pool.query(query);

    return response.rows;
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getAllProducts };
