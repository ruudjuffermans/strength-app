const pool = require("../db");

// ─── Registration ──────────────────────────────────────────
async function register({ email, firstname, lastname }) {
  const result = await pool.query(
    `INSERT INTO user_account (email, firstname, lastname)
     VALUES ($1, $2, $3)
     RETURNING id, email, firstname, lastname, status`,
    [email, firstname, lastname]
  );
  return result.rows[0];
}

// ─── Authentication / Password ─────────────────────────────
async function setVerified(id) {
  const result = await pool.query(
    `UPDATE user_account
     SET status = 'Verifed'
     WHERE id = $1
     RETURNING id, email, firstname, lastname, status`,
    [id]
  );
  return result.rows[0];
}

async function setResetToken(userId, hashedToken, expires) {
  await pool.query(
    `UPDATE user_account
     SET reset_password_token = $1,
         reset_password_expires = $2
     WHERE id = $3`,
    [hashedToken, expires, userId]
  );
}

async function getUserByResetToken(hashedToken) {
  const result = await pool.query(
    `SELECT * FROM user_account WHERE reset_password_token = $1`,
    [hashedToken]
  );
  return result.rows[0];
}

async function updatePassword(userId, newPasswordHash) {
  await pool.query(
    `UPDATE user_account
     SET password_hash = $1
     WHERE id = $2`,
    [newPasswordHash, userId]
  );
}

// ─── Admin Actions ─────────────────────────────────────────
async function approveUser(userId, password, approvedByAdminId) {
  const result = await pool.query(
    `UPDATE user_account
     SET status = 'Approved',
         approved_by = $1,
         approved_at = NOW(),
         password_hash = $3
     WHERE id = $2
     RETURNING id, email, firstname, lastname, status`,
    [approvedByAdminId, userId, password]
  );
  return result.rows[0];
}

async function disableUser(userId) {
  const result = await pool.query(
    `UPDATE user_account
     SET status = 'Rejected'
     WHERE id = $1
     RETURNING id, email, firstname, lastname, status`,
    [userId]
  );
  return result.rows[0];
}

async function removeUser(userId) {
  const result = await pool.query(
    `DELETE FROM user_account
     WHERE id = $1
     RETURNING id`,
    [userId]
  );
  return result.rows[0];
}

async function setRoleUser(userId) {
  const result = await pool.query(
    `UPDATE user_account
     SET role = 'User'
     WHERE id = $1
     RETURNING id, email, firstname, lastname, status`,
    [userId]
  );
  return result.rows[0];
}

async function setRolePremium(userId) {
  const result = await pool.query(
    `UPDATE user_account
     SET role = 'Premium'
     WHERE id = $1
     RETURNING id, email, firstname, lastname, status`,
    [userId]
  );
  return result.rows[0];
}

async function setActiveProgram(userId, programId) {
  const result = await pool.query(
    `UPDATE user_account
     SET active_program = $1
     WHERE id = $2
     RETURNING id, email, firstname, lastname, status, active_program`,
    [programId, userId]
  );
  return result.rows[0];
}

// ─── Getters ───────────────────────────────────────────────
async function getAllUsers() {
  const result = await pool.query(
    `SELECT id, email, firstname, lastname, role, status, created_at, approved_at
     FROM user_account
     ORDER BY created_at DESC`
  );
  return result.rows;
}

async function getUserById(userId) {
  const result = await pool.query(
    `SELECT * FROM user_account WHERE id = $1`,
    [userId]
  );
  return result.rows[0];
}

async function getUserProfile(userId) {

    const userResult = await pool.query(
      `
      SELECT 
        ua.id,
        ua.email,
        ua.firstname,
        ua.lastname,
        ua.role,
        ua.status,
        ua.created_at,
        ua.approved_at,
        ua.active_program,
        ua.active_workout,
        us.theme,
        us.preferred_units,
        us.newsletter_subscribed,
        us.cookie_consent
      FROM user_account ua
      LEFT JOIN user_settings us ON ua.id = us.user_id
      WHERE ua.id = $1
      `,
      [userId]
    );

    const user = userResult.rows[0];

    const weightResult = await pool.query(
      `
      SELECT weight, created_at
      FROM user_weight_log
      WHERE user_id = $1
      ORDER BY created_at DESC
      LIMIT 1
      `,
      [userId]
    );
    user.latest_weight = weightResult.rows[0] || null;
  return user;
}


async function getUserByEmail(email) {
  const result = await pool.query(
    `SELECT * FROM user_account WHERE email = $1`,
    [email]
  );
  return result.rows[0];
}

async function getPendingUserById(userId) {
  const result = await pool.query(
    `SELECT * FROM user_account
     WHERE id = $1 AND status = 'Pending'`,
    [userId]
  );
  return result.rows;
}

// ─── User Settings ─────────────────────────────────────────
async function createDefaultUserSettings(userId) {
  await pool.query(
    `INSERT INTO user_settings (user_id) VALUES ($1)`,
    [userId]
  );
}

async function addUserWeight(userId, weight) {
  const result = await pool.query(
    `
    INSERT INTO user_weight_log (user_id, weight)
    VALUES ($1, $2)
    RETURNING id, weight, created_at
    `,
    [userId, weight]
  );

  return result.rows[0];
}

async function setUnitsTo(userId, unitValue) {
  const result = await pool.query(
    `
    INSERT INTO user_settings (user_id, preferred_units)
    VALUES ($1, $2)
    ON CONFLICT (user_id)
    DO UPDATE SET preferred_units = EXCLUDED.preferred_units
    RETURNING user_id, preferred_units
    `,
    [userId, unitValue]
  );

  return result.rows[0];
}

async function setNewsletterSubscribed(userId, isSubscribed) {
  const result = await pool.query(
    `
    INSERT INTO user_settings (user_id, newsletter_subscribed)
    VALUES ($1, $2)
    ON CONFLICT (user_id)
    DO UPDATE SET newsletter_subscribed = EXCLUDED.newsletter_subscribed
    RETURNING user_id, newsletter_subscribed
    `,
    [userId, isSubscribed]
  );

  return result.rows[0];
}

// ─── Export All ────────────────────────────────────────────
module.exports = {
  // Registration
  register,

  // Authentication
  setVerified,
  setResetToken,
  getUserByResetToken,
  updatePassword,

  // Admin actions
  approveUser,
  disableUser,
  removeUser,
  setRoleUser,
  setRolePremium,
  setActiveProgram,

  // Getters
  getAllUsers,
  getUserById,
  getUserByEmail,
  getPendingUserById,
  getUserProfile,

  // Settings
  createDefaultUserSettings,
  addUserWeight,
  setUnitsTo,
  setNewsletterSubscribed
};
