const pool = require("../config/db");

const patientRegister = async (patient) => {
  try {
    const response = await pool.query(
      `INSERT INTO patient(patient_uuid, first_name, last_name, email, phone_number, gender, nic, hashed_password) 
      VALUES (uuid_generate_v4(), $1, $2, $3, $4, $5, $6, $7);`,
      [
        patient.first_name,
        patient.last_name,
        patient.email,
        patient.phone_number,
        patient.gender,
        patient.nic,
        patient.hashed_password,
      ]
    );

    return { message: "Account created successfully" };
  } catch (error) {
    throw error;
  }
};

//login for patients
const patientLogin = async (patient) => {
  try {
    const response = await pool.query(
      "SELECT * FROM patient WHERE email = $1;",
      [patient.email]
    );

    return response.rowCount;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = { patientRegister, patientLogin };
