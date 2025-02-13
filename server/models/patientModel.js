const pool = require("../config/db");

const getAllPatients = async () => {
  try {
    const results = await pool.query(
      "SELECT * FROM users WHERE role = 'patient'"
    );

    return results.rows;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getPatientById = async (id) => {
  try {
    const results = await pool.query(
      `SELECT 
    u.user_uuid,
    u.first_name,
    u.last_name,
    u.email,
    u.phone_number,
    u.gender,
    u.nic,
    ARRAY_AGG(
        json_build_object(
            'order_number', o.order_number,
            'status', o.status,
            'total', o.total,
            'order_date', o.order_date
        )
    ) as orders
FROM users u 
LEFT JOIN orders o ON o.patient_id = u.user_uuid 
WHERE user_uuid = $1 
GROUP BY 
    u.user_uuid,
    u.first_name,
    u.last_name,
    u.email,
    u.phone_number,
    u.gender,
    u.nic;`,
      [id]
    );

    console.log("res", results);

    return results.rows[0];
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = { getAllPatients, getPatientById };
