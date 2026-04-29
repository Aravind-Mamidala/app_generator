const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "app_generator",
  password: "MAMI2005", // your correct one
  port: 5432,
});

module.exports = pool;