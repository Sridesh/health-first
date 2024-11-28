const pool = require("../config/db");

const patientRegister = async (patient) => {
  try {
    const response = await pool.query(
      `INSERT INTO patient (patient_uuid, first_name, last_name, email, gender, phone_number, nic, password)
             VALUES (uuid_generate_v4(), $1, $2, $3, $4, $5, $6, $7)`,
      [
        patient.first_name,
        patient.last_name,
        patient.email,
        patient.gender,
        patient.phone_number,
        patient.nic,
        patient.password,
      ]
    );

    console.log(response);
  } catch (error) {
    console.log(error);
  }
};

//login for patients
const patientLogin = async (patient) => {
  try {
    const response = await pool.query(
      "SELECT * FROM patient WHERE email = $1 AND password = $2",
      [patient.email, patient.password]
    );

    return response.rowCount;
  } catch (error) {
    console.log(error);
  }
};

module.exports = { patientRegister, patientLogin };
