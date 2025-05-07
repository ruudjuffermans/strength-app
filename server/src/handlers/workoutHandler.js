const pool = require("../db");

async function createWorkoutFromSplit(userId, splitId) {
    console.log(splitId, userId)

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
        `INSERT INTO workout (program, split, user_id, created_at)
         VALUES ($1, $2, $3, NOW())
         RETURNING *`,
        [program_name, split_name, userId]
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
                `INSERT INTO workout_log (workout_id, exercise_id, target_reps, exercise_order, set_number, performed_reps, weight_used, user_id)
                 VALUES ($1, $2, $3, $4, $5, 0, NULL, $6)`,
                [workoutId, exercise.exercise_id, exercise.reps, exercise.exercise_order, i, userId]
            );
        }
    }

    return workoutResult.rows[0];
}

async function getWorkoutById(userId, workoutId) {
    const result = await pool.query(
        `SELECT 
            w.id AS workout_id, 
            w.user_id, 
            w.program, 
            w.split, 
            w.workout_state, 
            w.created_at, 
            w.completed_at, 
            w.notes,
            wl.id AS workout_log_id, 
            wl.user_id AS workout_user_id, 
            wl.set_number, 
            wl.exercise_order, 
            wl.target_reps, 
            wl.performed_reps, 
            wl.weight_used,
            wl.logged,
            wl.locked,
            wl.notes AS workout_log_notes,
            e.id AS exercise_id,
            e.name AS exercise_name,
            e.description AS exercise_description,
            e.muscle_group,
            e.equipment_type,
            e.creator AS exercise_creator,
            e.is_overwriter AS exercise_is_overwriter,
            e.overwriter_ref AS exercise_overwriter_ref
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
        user_id: result.rows[0].user_id,
        program: result.rows[0].program,
        split: result.rows[0].split,
        workout_state: result.rows[0].workout_state,
        created_at: result.rows[0].created_at,
        completed_at: result.rows[0].completed_at,
        notes: result.rows[0].notes,
        logs: []
    };

    const groupedLogs = {};

    result.rows.forEach(row => {
      if (!row.workout_log_id) return;
    
      const key = row.exercise_order;
    
      if (!groupedLogs[key]) {
        groupedLogs[key] = {
          exercise_order: row.exercise_order,
          exercise: {
            id: row.exercise_id,
            name: row.exercise_name,
            muscle_group: row.muscle_group,
            equipment_type: row.equipment_type,
            description: row.exercise_description,
            is_overwriter: row.exercise_is_overwriter,
            overwriter_ref: row.exercise_overwriter_ref,
            creator: row.exercise_creator
          },
          sets: []
        };
      }
    
      groupedLogs[key].sets.push({
        id: row.workout_log_id,
        user_id: row.workout_user_id,
        set_number: row.set_number,
        target_reps: row.target_reps,
        performed_reps: row.performed_reps,
        weight_used: row.weight_used,
        logged: row.logged,
        locked: row.locked,
        notes: row.workout_log_notes
      });
    });
    
    workout.logs = Object.values(groupedLogs);
    



    return workout;
}

async function getAllWorkouts(userId) {
    const result = await pool.query(`SELECT * FROM workout WHERE user_id = $1 `, [userId]);
    return result.rows;
}

async function completeWorkout(userId, workoutId, notes) {
    const result = await pool.query(
        `UPDATE workout 
        SET workout_state = 'Completed', completed_at =  NOW(), notes = $3 
        WHERE user_id = $1 AND id = $2 RETURNING *`, [userId, workoutId, notes]);
    return result.rows[0];
}

async function deleteWorkout(userId, workoutId) {
    const result = await pool.query(
        `DELETE FROM workout WHERE id = $1 RETURNING *`,
        [workoutId]
    );
    return result.rows[0];
}

async function logSet(userId, logId, performedReps, weightUsed) {
    const result = await pool.query(
        `UPDATE workout_log 
       SET performed_reps = $3, weight_used = $4, logged = TRUE
       WHERE user_id = $1 AND id = $2
       RETURNING *`,
        [userId, logId, performedReps, weightUsed]
    );
    return result.rows[0];
}

async function updateLoggedSet(userId, logId, performedReps, weightUsed) {
    const result = await pool.query(
        `UPDATE workout_log 
           SET performed_reps = $2, weight_used = $3, logged = TRUE
           WHERE user_id = $1 AND id = $1
           RETURNING *`,
        [userId, logId, performedReps, weightUsed]
    );
    return result.rows[0];
}

async function completeExercise(userId, workoutId, exerciseOrder) {
    const result = await pool.query(
      `
      UPDATE workout_log
      SET locked = TRUE
      WHERE user_id = $1
        AND workout_id = $2
        AND exercise_order = $3
      RETURNING *
      `,
      [userId, workoutId, exerciseOrder]
    );
  
    if (result.rows.length === 0) {
      throw new AppError("No matching log entries found to lock.", 404);
    }
  
    return result.rows;
  }

module.exports = {
    getAllWorkouts,
    getWorkoutById,
    createWorkoutFromSplit,
    completeWorkout,
    deleteWorkout,
    logSet,
    updateLoggedSet,
    completeExercise
};
