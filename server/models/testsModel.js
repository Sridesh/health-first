const pool = require("../config/db");
const isValidOrder = require("../helpers/isValidOrder");
const isValidSort = require("../helpers/isValidSort");
const validOrder = "test_name";

const getAllTests = async (filter, sort, order) => {
  try {
    const query = `SELECT t.test_id, t.test_name, t.description, t.price, tt.name AS type, ARRAY_AGG(c.center_name) AS centers FROM  test t 
                        JOIN test_type tt ON t.type = tt.type_id
                        JOIN test_center_mapping tcm ON tcm.test_id = t.test_id 
                        JOIN medical_center c ON tcm.center_id = c.center_id 
                         ${
                           filter !== "null"
                             ? `WHERE tt.name = '${filter.replace(
                                 "%20%",
                                 " "
                               )}'`
                             : ""
                         }
                        GROUP BY t.test_id, t.test_name, t.description, t.price, tt.name
                        ORDER BY ${
                          isValidOrder(["test_name"], order)
                            ? "t." + order
                            : "t.test_id"
                        } ${isValidSort(sort) ? sort : "ASC"};`;

    const response = await pool.query(query);

    return response.rows;
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getAllTests };
