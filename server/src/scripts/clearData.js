const pool = require('../db');

async function clearAllData() {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    await client.query(`
      TRUNCATE TABLE 
        workout_log,
        workout,
        split_exercise,
        split,
        base_exercise,
        user_exercise,
        base_program,
        user_program
      RESTART IDENTITY CASCADE;
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
