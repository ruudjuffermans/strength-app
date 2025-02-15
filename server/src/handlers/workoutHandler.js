const pool = require("../db");

async function createWorkoutFromSplit(splitId) {
    const existingDraftWorkout = await pool.query(
        `SELECT id FROM workout WHERE split = 
            (SELECT name FROM split WHERE id = $1) 
            AND workout_state = 'Draft'`,
        [splitId]
    );

    if (existingDraftWorkout.rows.length > 0) {
        throw new Error("You already have a workout in Draft state. Complete or delete it before creating a new one.");
    }

    // ✅ 2️⃣ Fetch Split & Program Name
    const splitResult = await pool.query(
        `SELECT s.name AS split_name, p.name AS program_name
         FROM split s
         JOIN program p ON s.program_id = p.id
         WHERE s.id = $1`,
        [splitId]
    );

    if (splitResult.rows.length === 0) {
        throw new Error("Split not found");
    }

    const { split_name, program_name } = splitResult.rows[0];

    // ✅ 3️⃣ Create new workout entry
    const workoutResult = await pool.query(
        `INSERT INTO workout (program, split, workout_state, created_at)
         VALUES ($1, $2, 'Draft', NOW())
         RETURNING *`,
        [program_name, split_name]
    );

    const workoutId = workoutResult.rows[0].id;

    // ✅ 4️⃣ Fetch exercises for the split
    const exercises = await pool.query(
        `SELECT se.id AS split_exercise_id, se.exercise_order, se.exercise_id, se.sets, se.reps, e.name AS exercise_name
         FROM split_exercise se
         JOIN exercise e ON se.exercise_id = e.id
         WHERE se.split_id = $1`,
        [splitId]
    );

    // ✅ 5️⃣ Insert sets into workout_log
    for (const exercise of exercises.rows) {
        for (let i = 1; i <= exercise.sets; i++) {
            await pool.query(
                `INSERT INTO workout_log (workout_id, exercise_id, exercise_name, exercise_order, set_number, target_reps, performed_reps, weight_used)
                 VALUES ($1, $2, $3, $4, $5, $6, 0, NULL)`,
                [workoutId, exercise.exercise_id, exercise.exercise_name, exercise.exercise_order, i, exercise.reps]
            );
        }
    }

    return workoutResult.rows[0];
}


async function getDraftWorkout() {
    console.log("hit")
    const workoutResult = await pool.query(`SELECT * FROM workout WHERE workout_state = 'Draft'`);

    if (workoutResult.rows.length === 0) {
      return null;
    }

    const workout = workoutResult.rows[0];

    const workoutLog = await pool.query(
      `SELECT * FROM workout_log WHERE workout_id = $1`,
      [workout.id]
    );

    return { ...workout, logs: workoutLog.rows };
}

async function completeWorkout() {
    const result = await pool.query(`UPDATE workout SET workout_state = 'Completed', completed_at =  NOW() WHERE workout_state = 'Draft' RETURNING *`);
    return result.rows[0];
}

async function deleteWorkout(workoutId) {
    const result = await pool.query(
      `DELETE FROM workout WHERE id = $1 RETURNING *`,
      [workoutId]
    );
    return result.rows[0];
}

async function logSet(id, performedReps, weightUsed) {
    const result = await pool.query(
      `UPDATE workout_log 
       SET performed_reps = $2, weight_used = $3
       WHERE id = $1
       RETURNING *`,
      [id, performedReps, weightUsed]
    );
    return result.rows[0];
}

async function updateLoggedSet(id, performedReps, weightUsed) {
    const result = await pool.query(
      `UPDATE workout_log 
       SET performed_reps = $2, weight_used = $3
       WHERE id = $1
       RETURNING *`,
      [id, performedReps, weightUsed]
    );
    return result.rows[0];
}

module.exports = {
  createWorkoutFromSplit,
  getDraftWorkout,
  completeWorkout,
  deleteWorkout,
  logSet,
  updateLoggedSet
};
