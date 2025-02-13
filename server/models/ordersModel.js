const pool = require("../config/db");
const validator = require("validator");

const addOrder = async (userId, total) => {
  try {
    if (validator.isUUID(userId)) {
      await pool.query(
        "INSERT INTO orders(order_number, status, order_date, patient_id, total) VALUES(uuid_generate_v4(), 'placed', NOW(), $1, $2)",
        [userId, parseFloat(total)]
      );
    } else {
      console.log("Invalid User ID");
    }
  } catch (error) {
    console.log(error);

    throw error;
  }
};

module.exports = { addOrder };
