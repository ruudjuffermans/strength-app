const pool = require('../db');

async function clearUsers() {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    // Truncate in a dependency-aware way
    await client.query(`
      TRUNCATE TABLE 
        user_account
      RESTART IDENTITY CASCADE;
    `);

    await client.query('COMMIT');
    console.log('🧹 All users cleared from user table.');
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('❌ Error clearing user data:', error);
  } finally {
    client.release();
    pool.end()
  }
}

clearUsers();
