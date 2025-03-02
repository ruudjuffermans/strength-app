const dotenv = require('dotenv');

dotenv.config();

console.log(process.env)

const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.PG_HOST,
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE,
  port: process.env.PG_PORT,
});

pool.connect(error => {
  if (error) {
    console.error('Database connection failed:', error);
    return;
  }
  console.log("Successfully connected to the database.");
});

module.exports = pool;
