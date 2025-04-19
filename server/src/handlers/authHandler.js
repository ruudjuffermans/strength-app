const pool = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// You can store this in an .env file
const JWT_SECRET = process.env.JWT_SECRET || "your_default_secret_key";

// REGISTER: Adds a pending user
async function register({ email, full_name }) {
  const result = await pool.query(
    `INSERT INTO user_account (email, full_name)
     VALUES ($1, $2)
     RETURNING id, email, full_name, status`,
    [email, full_name]
  );
  return result.rows[0];
}

// LOGIN: Checks credentials and returns token
async function login({ email, password }) {
  const result = await pool.query(
    `SELECT * FROM user_account WHERE email = $1 AND status = 'Approved'`,
    [email]
  );
  const user = result.rows[0];
  if (!user) return null;

  const valid = await bcrypt.compare(password, user.password_hash);
  if (!valid) return null;

  const token = jwt.sign(
    { userId: user.id, email: user.email, role: user.role },
    JWT_SECRET,
    { expiresIn: "7d" }
  );

  return {
    token,
    user: {
      ...user
    },
  };
}

// APPROVE: Admin approves a user and sets password
async function approveUser(userId, password, approvedByAdminId) {
  const passwordHash = await bcrypt.hash(password, 10);

  const result = await pool.query(
    `UPDATE user_account
     SET status = 'Approved',
         password_hash = $1,
         approved_by = $2,
         approved_at = NOW()
     WHERE id = $3
     RETURNING id, email, full_name, status`,
    [passwordHash, approvedByAdminId, userId]
  );

  return result.rows[0];
}

async function getUserFromCookie(req) {
  const token = req.cookies?.token;
  if (!token) return null;

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    const result = await pool.query(
      `SELECT id, email, full_name, role FROM user_account WHERE id = $1`,
      [decoded.userId]
    );

    return result.rows[0] || null;
  } catch (err) {
    console.error("Invalid token:", err);
    return null;
  }
}

module.exports = {
  register,
  login,
  approveUser,
  getUserFromCookie
};
