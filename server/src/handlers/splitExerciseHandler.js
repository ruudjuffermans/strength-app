const pool = require("../db");
const AppError = require("../utils/appError");

async function createExercise(splitId, exerciseId, sets, reps) {
  // Determine next exercise order in the split
  const orderResult = await pool.query(`
    SELECT COALESCE(MAX(exercise_order), 0) + 1 AS next_order
    FROM split_exercise
    WHERE split_id = $1
  `, [splitId]);

  const nextOrder = orderResult.rows[0].next_order;

  const insertResult = await pool.query(`
    INSERT INTO split_exercise (split_id, exercise_id, sets, reps, exercise_order)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *
  `, [splitId, exerciseId, sets, reps, nextOrder]);

  return insertResult.rows[0];
}

async function updateExercise(splitId, exerciseId, reps, sets) {
  const result = await pool.query(`
    UPDATE split_exercise
    SET sets = $1, reps = $2
    WHERE split_id = $3 AND exercise_id = $4
    RETURNING *
  `, [sets, reps, splitId, exerciseId]);

  if (result.rows.length === 0) {
    throw new AppError("Exercise not found in split.", 404);
  }

  return result.rows[0];
}

async function deleteExercise(splitId, exerciseId) {
  const result = await pool.query(`
    DELETE FROM split_exercise
    WHERE split_id = $1 AND exercise_id = $2
    RETURNING *
  `, [splitId, exerciseId]);

  if (result.rows.length === 0) {
    throw new AppError("Exercise not found in split.", 404);
  }

  return result.rows[0];
}

async function reorderExercises(splitId, exercises) {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    for (let i = 0; i < exercises.length; i++) {
      const { exercise_id } = exercises[i];
      await client.query(`
        UPDATE split_exercise
        SET exercise_order = $1
        WHERE split_id = $2 AND exercise_id = $3
      `, [i + 1, splitId, exercise_id]);
    }

    await client.query("COMMIT");
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}

module.exports = {
  createExercise,
  updateExercise,
  deleteExercise,
  reorderExercises,
};
