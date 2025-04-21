const pool = require("../db");

async function getAllExercises() {
  const result = await pool.query(
    `SELECT * FROM exercise`
  );
  return result.rows;
}

async function getExerciseById(id) {
  const result = await pool.query(
    `SELECT * FROM exercise WHERE id = $1`,
    [id]
  );
  return result.rows[0];
}

async function createExercise(name, description, muscle_group, equipment_type) {
  const result = await pool.query(
    `INSERT INTO exercise (name, description, muscle_group, equipment_type)
     VALUES ($1, $2, $3, $4) RETURNING *`,
    [name, description, muscle_group, equipment_type]
  );
  return result.rows[0];
}

async function updateExercise(id, name, description) {
  const result = await pool.query(
    `UPDATE exercise SET name = $2, description = $3 WHERE id = $1 RETURNING *`,
    [id, name, description]
  );
  return result.rows[0];
}

async function deleteExercise(id) {
  const result = await pool.query(
    `DELETE FROM exercise
     WHERE id = $1
     RETURNING *`,
    [id]
  );
  return result.rows[0];
}


module.exports = {
  getAllExercises,
  getExerciseById,
  updateExercise,
  createExercise,
  deleteExercise
};
