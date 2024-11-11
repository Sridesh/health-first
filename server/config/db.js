require("dotenv").config();
const Pool = require("pg").Pool;

env = process.env;

const pool = new Pool({
  user: env.NAME,
  password: env.PASSWORD,
  host: env.HOST,
  port: env.DB_PORT,
  database: env.DATABASE,
});

module.exports = pool;
