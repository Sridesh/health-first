const pool = require("../config/db");

const getAllPeople = async () => {
  const result = await pool.query("SELECT * FROM person");
  return result.rows;
};

const createPerson = async (first_name, last_name, email, dob, cob, gender) => {
  // console.log(first_name, last_name, email, dob, cob, gender);

  const result = await pool.query(
    "INSERT INTO person (person_uuid,first_name,last_name, email, date_of_birth, country_of_birth, gender) VALUES (uuid_generate_v4(),$1,$2,$3,$4,$5,$6)",
    [first_name, last_name, email, dob, cob, gender]
  );

  return result.rows[0];
};

module.exports = { getAllPeople, createPerson };
