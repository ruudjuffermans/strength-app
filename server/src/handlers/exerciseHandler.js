const pool = require("../db");
const AppError = require("../utils/appError");

async function getAllExercises(userId) {
  const result = await pool.query(`
    SELECT * FROM exercise
    WHERE source = 'base' OR (source = 'user' AND user_id = $1)
  `, [userId]);

  return result.rows;
}

async function getExerciseById(userId, source, exerciseId) {
  const result = await pool.query(`
    SELECT * FROM exercise
    WHERE exercise_id = $1
      AND source  = $2
      AND (
        source = 'base' 
        OR (source = 'user' AND user_id = $3))
  `, [exerciseId, source, userId]);

  if (result.rows.length === 0) {
    throw new AppError("Exercise not found", 404);
  }

  return result.rows[0];
}

async function createExercise(userId, name, description, muscle_group, equipment_type) {
  const result = await pool.query(
    `INSERT INTO user_exercise (user_id, name, description, muscle_group, equipment_type)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
    [userId, name, description, muscle_group, equipment_type]
  );
  return result.rows[0];
}

async function updateUserExercise(userId, exerciseId, name, description) {
  const result = await pool.query(
    `UPDATE user_exercise
     SET name = $2, description = $3
     WHERE id = $1 AND user_id = $4
     RETURNING *`,
    [exerciseId, name, description, userId]
  );

  if (result.rows.length === 0) {
    throw new AppError("Exercise not found", 404);
  }

  return result.rows[0];
}

async function deleteUserExercise(userId, exerciseId) {
  const result = await pool.query(
    `DELETE FROM user_exercise
     WHERE id = $1 AND user_id = $2
     RETURNING *`,
    [exerciseId, userId]
  );

  if (result.rows.length === 0) {
    throw new AppError("Exercise not found", 404);
  }

  return result.rows[0];
}


module.exports = {
  getAllExercises,
  getExerciseById,
  updateUserExercise,
  createExercise,
  deleteUserExercise
};
