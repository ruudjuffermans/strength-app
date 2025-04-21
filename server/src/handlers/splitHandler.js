const pool = require("../db");

async function getSplitById(id) {
  try {
    // Fetch split details and associated exercises
    const result = await pool.query(
      `
            SELECT 
                s.id AS split_id,
                s.name AS split_name,
                s.description AS split_description,
                se.id AS split_exercise_id,
                se.exercise_id,
                se.sets,
                se.reps,
                se.exercise_order,
                e.name AS exercise_name
            FROM split s
            LEFT JOIN split_exercise se ON s.id = se.split_id
            LEFT JOIN exercise e ON se.exercise_id = e.id
            WHERE s.id = $1
            ORDER BY se.exercise_order;
            `,
      [id]
    );

    if (result.rows.length === 0) {
      return null; // Return null if no split found
    }

    // Extract split details
    const split = {
      id: result.rows[0].split_id,
      name: result.rows[0].split_name,
      description: result.rows[0].split_description,
      exercises: [],
    };

    // Extract exercises
    split.exercises = result.rows
      .filter(row => row.split_exercise_id !== null) // Ignore rows without exercises
      .map(row => ({
        id: row.split_exercise_id,
        exerciseId: row.exercise_id,
        name: row.exercise_name,
        sets: row.sets,
        reps: row.reps,
        order: row.exercise_order,
      }));

    return split;
  } catch (error) {
    console.error("Error fetching split by ID:", error);
    throw new Error("Failed to fetch split data");
  }
}

async function createSplit(programId, name) {
  const result = await pool.query(
    `INSERT INTO split (program_id, name)
     VALUES ($1, $2) RETURNING *`,
    [programId, name]
  );
  return result.rows[0];
}

async function updateSplit(id, name) {
  const result = await pool.query(
    `UPDATE split SET name = $2 WHERE id = $1 RETURNING *`,
    [id, name]
  );
  return result.rows[0];
}

async function deleteSplit(id) {
  const result = await pool.query(
    `DELETE FROM split
     WHERE id = '$1'
     RETURNING *`,
    [id]
  );
  return result.rows[0];
}

async function addExercise(splitId, exerciseId, sets, reps) {
    // Get the next order number
    const { rows } = await pool.query(
      `SELECT COALESCE(MAX(exercise_order), 0) + 1 AS next_order FROM split_exercise WHERE split_id = $1`,
      [splitId]
    );
    const nextOrder = rows[0].next_order;

    // Insert the new exercise with the next order value
    const result = await pool.query(
      `INSERT INTO split_exercise (split_id, exercise_id, sets, reps, exercise_order)
         VALUES ($1, $2, $3, $4, $5)
         RETURNING *`,
      [splitId, exerciseId, sets, reps, nextOrder]
    );

    return result.rows[0];
}

async function editExercise(id, reps, sets) {
  const result = await pool.query(
    `UPDATE split_exercise SET reps = $2, sets = $3 WHERE id = $1 RETURNING *`,
    [id, reps, sets]
  );
  return result.rows[0];
}

async function removeExercise(id) {
  const result = await pool.query(
    `DELETE FROM split_exercise
     WHERE id = $1
     RETURNING *`,
    [id]
  );
  return result.rows[0];
}

async function reorderExercises(splitId, reorderedList) {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    for (const { id, order } of reorderedList) {
      await client.query(
        `UPDATE split_exercise
         SET exercise_order = $1
         WHERE id = $2 AND split_id = $3`,
        [order, id, splitId]
      );
    }

    await client.query("COMMIT");
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Error reordering split exercises:", error);
    throw new Error("Failed to reorder exercises");
  } finally {
    client.release();
  }
}

module.exports = {
  getSplitById,
  updateSplit,
  deleteSplit,
  addExercise,
  editExercise,
  removeExercise,
  reorderExercises
};
