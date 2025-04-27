const pool = require("../db");
const bcrypt = require("bcrypt");

// Get all users
async function getAllUsers() {
  const result = await pool.query(
    `SELECT id, email, firstname, lastname, role, status, created_at, approved_at
     FROM user_account
     ORDER BY created_at DESC`
  );
  return result.rows;
}

// Approve a user (set status to Approved, set password)
async function approveUser(userId, password = null, approvedByAdminId = null) {
  let query, values;

  if (password) {
    const passwordHash = await bcrypt.hash(password, 10);
    query = `
      UPDATE user_account
      SET status = 'Approved',
          password_hash = $1,
          approved_by = $2,
          approved_at = NOW()
      WHERE id = $3
      RETURNING id, email, firstname, lastname, status
    `;
    values = [passwordHash, approvedByAdminId, userId];
  } else {
    query = `
      UPDATE user_account
      SET status = 'Approved',
          approved_by = $1,
          approved_at = NOW()
      WHERE id = $2
      RETURNING id, email, firstname, lastname, status
    `;
    values = [approvedByAdminId, userId];
  }

  const result = await pool.query(query, values);
  return result.rows[0];
}

// Disable a user (set status to Disabled)
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

// Delete a user
async function removeUser(userId) {
  const result = await pool.query(
    `DELETE FROM user_account
     WHERE id = $1
     RETURNING id`,
    [userId]
  );
  return result.rows[0];
}

module.exports = {
  getAllUsers,
  approveUser,
  disableUser,
  removeUser,
};
