const pool = require("../db");

async function getAllUsers() {
  const result = await pool.query(
    `SELECT id, email, firstname, lastname, role, status, created_at, approved_at
     FROM user_account
     ORDER BY created_at DESC`
  );
  return result.rows;
}

async function setRolePremium(userId) {
  const result = await pool.query(`
      UPDATE user_account
      SET role = 'Premium'
      WHERE id = $1
      RETURNING id, email, firstname, lastname, status
    `, [userId]);
  return result.rows[0];
}

async function setRoleUser(userId) {
  const result = await pool.query(`
      UPDATE user_account
      SET role = 'User'
      WHERE id = $1
      RETURNING id, email, firstname, lastname, status
    `, [userId]);
  return result.rows[0];
}

async function approveUser(userId, approvedByAdminId) {
  const result = await pool.query(`
      UPDATE user_account
      SET status = 'Approved',
          approved_by = $1,
          approved_at = NOW()
      WHERE id = $2
      RETURNING id, email, firstname, lastname, status
    `, [approvedByAdminId, userId]);
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

module.exports = {
  getAllUsers,
  approveUser,
  disableUser,
  removeUser,
  setRolePremium,
  setRoleUser
};
