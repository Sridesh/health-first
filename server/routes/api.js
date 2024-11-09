const express = require("express");
const router = express.Router();

const pool = require("../db");

router.get("/", function (req, res, next) {
  res.send({ message: "Hello" });
});

router.post("/person", async function (req, res) {
  try {
    data = req.body;

    const newPerson = await pool.query(
      "INSERT INTO person(person_uuid, first_name, last_name, email, date_of_birth, country_of_birth,gender) VALUES(uuid_generate_v4(),$1, $2, $3, $4, $5, $6)",
      [
        data.first_name,
        data.last_name,
        data.email,
        data.dob,
        data.country_of_birth,
        data.gender,
      ]
    );

    res.json(newPerson);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
