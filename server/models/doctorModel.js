const pool = require("../config/db");

const validOrders = ["first_name", "last_name"];
const validSorts = ["ASC", "DESC", "asc", "desc"];

//--------return doctors
const getAllDoctors = async (order, sort, filter) => {
  if (!validOrders.includes(order)) order = "first_name";
  if (!validSorts.includes(sort)) sort = "ASC";

  if (filter != null) filters = `WHERE doctor_category.type = '${filter}'`;

  const string = `SELECT doctor.doctor_uuid, doctor.first_name, doctor.last_name, doctor.image_url, doctor.phone, doctor.description, doctor_category.category_name FROM doctor LEFT JOIN doctor_category ON doctor.category = doctor_category.cat_id ${
    filter !== "null" ? `WHERE doctor_category.type = '${filter}'` : ""
  } ORDER BY ${order} ${sort};`;

  const results = await pool.query(string);

  return results.rows;
};

//--------return doctor categories
const getDoctorTypes = async () => {
  const results = await pool.query(
    "SELECT DISTINCT type FROM doctor_category ORDER BY type ASC"
  );
  return results.rows;
};

module.exports = { getAllDoctors, getDoctorTypes };
