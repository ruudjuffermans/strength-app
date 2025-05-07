const pool = require('../db');
const { sendAccountApprovedMail } = require("./mailer");



async function clearAllData() {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    await sendAccountApprovedMail("jane@example.com", "Jane", "xYz9!tR");

    await client.query(`

    `);

    await client.query('COMMIT');
    console.log('All data cleared from program, exercise, split, and workout tables.');

  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error clearing data:', error);

  } finally {
    client.release();
    pool.end();
  }
}

clearAllData();
