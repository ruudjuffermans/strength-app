const pool = require("../db");
const AppError = require("../utils/appError");


async function getAllPrograms(userId) {
  const result = await pool.query(`
    SELECT * FROM program
    WHERE source = 'base' OR (source = 'user' AND user_id = $1)
  `, [userId]);

  return result.rows;
}

async function getProgramById(userId, source, programId) {
  const result = await pool.query(`
    SELECT * FROM program
    WHERE program_id = $1
      AND source = $2
      AND (
        source = 'base'
        OR (source = 'user' AND user_id = $3)
      )
  `, [programId, source, userId]);

  if (result.rows.length === 0) {
    throw new AppError("Program not found", 404);
  }

  return result.rows[0];
}

async function createProgram(userId, name, description) {
  const result = await pool.query(
    `INSERT INTO user_program (user_id, name, description)
     VALUES ($1, $2, $3) RETURNING *`,
    [userId, name, description]
  );
  return result.rows[0];
}

async function updateUserProgram(userId, programId, name, description) {
  const result = await pool.query(
    `UPDATE user_prograsm 
     SET name = $3, description = $4
     WHERE id = $2
       AND user_id = $1 
     RETURNING *`,
    [userId, programId, name, description]
  );

  if (result.rows.length === 0) {
    throw new AppError("Program not found", 404);
  }

  return result.rows[0];
}

async function deleteUserProgram(userId, programId) {
  const result = await pool.query(
    `DELETE FROM user_program
     WHERE id = $2
     AND user_id = $1 
     RETURNING *`,
    [userId, programId]
  );

  if (result.rows.length === 0) {
    throw new AppError("Program not found", 404);
  }

  return result.rows[0];
}

async function activateProgram(userId, programId) {
  const result = await pool.query(
    `UPDATE user_program 
     SET program_state = 'Active'
     WHERE id = $2
       AND user_id = $1 
     RETURNING *`,
    [userId, programId]
  );

  if (result.rows.length === 0) {
    throw new AppError("Program not found", 404);
  }

  return result.rows[0];
}


module.exports = {
  createProgram,
  getProgramById,
  updateUserProgram,
  deleteUserProgram,
  getAllPrograms,
  activateProgram,
};
