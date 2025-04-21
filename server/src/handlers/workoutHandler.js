const pool = require("../db");

async function createWorkoutFromSplit(splitId) {

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

    const workoutResult = await pool.query(
        `INSERT INTO workout (program, split, created_at)
         VALUES ($1, $2, NOW())
         RETURNING *`,
        [program_name, split_name]
    );

    const workoutId = workoutResult.rows[0].id;

    const exercises = await pool.query(
        `SELECT se.id AS split_exercise_id, se.exercise_order, se.exercise_id, se.sets, se.reps, e.name AS exercise_name
         FROM split_exercise se
         JOIN exercise e ON se.exercise_id = e.id
         WHERE se.split_id = $1`,
        [splitId]
    );

    for (const exercise of exercises.rows) {
        for (let i = 1; i <= exercise.sets; i++) {
            await pool.query(
                `INSERT INTO workout_log (workout_id, exercise_id, exercise_name, target_reps, exercise_order, set_number, performed_reps, weight_used)
                 VALUES ($1, $2, $3, $4, $5, $6, 0, NULL)`,
                [workoutId, exercise.exercise_id, exercise.exercise_name, exercise.reps, exercise.exercise_order, i]
            );
        }
    }

    return workoutResult.rows[0];
}

async function getWorkoutById(workoutId) {
    const result = await pool.query(
        `SELECT 
            w.id AS workout_id, 
            w.program, 
            w.split, 
            w.workout_state, 
            w.created_at, 
            w.completed_at, 
            w.notes,
            w.body_weight,
            wl.id AS workout_log_id, 
            wl.set_number, 
            wl.target_reps, 
            wl.exercise_order, 
            wl.performed_reps, 
            wl.weight_used,
            wl.notes AS workout_log_notes,
            e.id AS exercise_id,
            e.name AS exercise_name,
            e.muscle_group,
            e.equipment_type,
            e.description AS exercise_description
        FROM workout w
        LEFT JOIN workout_log wl ON w.id = wl.workout_id
        LEFT JOIN exercise e ON wl.exercise_id = e.id
        WHERE w.id = $1`,
        [workoutId]
    );

    if (result.rows.length === 0) {
        return null;
    }

    // Restructure the data to group logs and exercises under the workout object
    const workout = {
        id: result.rows[0].workout_id,
        program: result.rows[0].program,
        split: result.rows[0].split,
        workout_state: result.rows[0].workout_state,
        created_at: result.rows[0].created_at,
        completed_at: result.rows[0].completed_at,
        notes: result.rows[0].notes,
        body_weight: result.rows[0].body_weight,
        logs: []
    };

    result.rows.forEach(row => {
        if (row.workout_log_id) {
            workout.logs.push({
                id: row.workout_log_id,
                set_number: row.set_number,
                target_reps: row.target_reps,
                exercise_order: row.exercise_order,
                performed_reps: row.performed_reps,
                weight_used: row.weight_used,
                notes: row.workout_log_notes,
                exercise: {
                    id: row.exercise_id,
                    name: row.exercise_name,
                    muscle_group: row.muscle_group,
                    equipment_type: row.equipment_type,
                    description: row.exercise_description
                }
            });
        }
    });

    return workout;
}

async function getAllWorkouts() {
    const result = await pool.query(`SELECT * FROM workout`);
    return result.rows;
}

async function completeWorkout(workoutId, notes) {
    const result = await pool.query(`UPDATE workout SET workout_state = 'Completed', completed_at =  NOW(), notes = $2 WHERE id = $1 RETURNING *`, [workoutId, notes]);
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
    getAllWorkouts,
    getWorkoutById,
    createWorkoutFromSplit,
    completeWorkout,
    deleteWorkout,
    logSet,
    updateLoggedSet
};
