const config = require('../utils/config'); 
const { Pool } = require('pg');

const pool = new Pool({
  user: config.PG_USER,
  password: config.PG_PASSWORD,
  database: config.PG_DATABASE,
  port: config.PG_PORT,
  host: config.PG_HOST,
});



module.exports = pool;
