const pool = require("../config/db");

const getAllDoctors = async () => {
  const results = await pool.query(
    "SELECT doctor.doctor_uuid, doctor.first_name, doctor.last_name, doctor.image_url, doctor.phone, doctor.description, doctor_category.category_name FROM doctor INNER JOIN doctor_category ON doctor.category = doctor_category.cat_id;"
  );

  return results.rows;
};

module.exports = { getAllDoctors };
