const pool = require("../db");
const AppError = require("../utils/appError");


async function getAllPrograms(userId) {
  const result = await pool.query(`
    SELECT * FROM program
    WHERE creator = $1 OR creator IS NULL
  `, [userId]);

  return result.rows;
}

async function getProgramById(userId, programId) {
  console.log(userId, programId)
  const result = await pool.query(`
    SELECT * FROM program
    WHERE id = $1 AND (creator = $2 OR creator IS NULL)
  `, [programId, userId]);

  if (result.rows.length === 0) {
    throw new AppError("Program not found", 404);
  }

  return result.rows[0];
}


async function createProgram(userId, name, description) {
  const result = await pool.query(
    `INSERT INTO program (creator, name, description)
     VALUES ($1, $2, $3) RETURNING *`,
    [userId, name, description]
  );
  return result.rows[0];
}

async function updateUserProgram(userId, programId, name, description) {
  const result = await pool.query(
    `UPDATE program 
     SET name = $3, description = $4
     WHERE id = $2
       AND creator = $1 
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
    `DELETE FROM program
     WHERE id = $2
     AND creator = $1 
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
};
