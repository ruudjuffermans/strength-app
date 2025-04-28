const pool = require("../db");

async function register({ email, firstname, lastname, password }) {
  const result = await pool.query(
    `INSERT INTO user_account (email, firstname, lastname, password_hash)
     VALUES ($1, $2, $3, $4)
     RETURNING id, email, firstname, lastname, status`,
    [email, firstname, lastname, password]
  );
  return result.rows[0];
}

async function createDefaultUserSettings(userId) {
  await pool.query(
    `INSERT INTO user_settings (user_id) VALUES ($1)`,
    [userId]
  );
}

async function setVerified(id) {
  const result = await pool.query(`
    UPDATE user_account
    SET status = 'Verifed'
    WHERE id = $1
    RETURNING id, email, firstname, lastname, status`,
    [id]
  );
  return result.rows[0];
}

async function getUserById(userId) {
  const result = await pool.query(
    `SELECT * FROM user_account WHERE id = $1`,
    [userId]
  );
  return result.rows[0];
}

async function getUserByEmail(email) {
  const result = await pool.query(
    `SELECT * FROM user_account WHERE email = $1`,
    [email]
  );
  return result.rows[0];
}

async function setResetToken(userId, hashedToken, expires) {
  await pool.query(`
    UPDATE user_account
    SET reset_password_token = $1,
        reset_password_expires = $2
    WHERE id = $3
  `, [hashedToken, expires, userId]);
}

// 🆕 Get user by reset token
async function getUserByResetToken(hashedToken) {
  const result = await pool.query(
    `SELECT * FROM user_account WHERE reset_password_token = $1`,
    [hashedToken]
  );
  return result.rows[0];
}

// 🆕 Update user password
async function updatePassword(userId, newPasswordHash) {
  await pool.query(`
    UPDATE user_account
    SET password_hash = $1
    WHERE id = $2
  `, [newPasswordHash, userId]);
}

module.exports = {
  register,
  setVerified,
  getUserById,
  getUserByEmail,
  setResetToken,
  getUserByResetToken,
  updatePassword,
  createDefaultUserSettings
};