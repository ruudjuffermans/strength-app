const pool = require('../db');

async function seedDatabase() {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');

        await client.query(`
            INSERT INTO workout_log (workout_id, exercise_id, exercise_name, set_number, target_reps, exercise_order, performed_reps, weight_used)
            VALUES
              (1, 28, 'Squat', 1, 8, 1, 8, 100.0),
              (1, 28, 'Squat', 2, 8, 1, 8, 110.0),
              (1, 28, 'Squat', 3, 8, 1, 7, 115.0),
              (1, 37, 'Barbell Shoulder Press', 1, 10, 2, 10, 50.0),
              (1, 37, 'Barbell Shoulder Press', 2, 10, 2, 9, 55.0),
              (1, 37, 'Barbell Shoulder Press', 3, 10, 2, 8, 60.0),
              (2, 20, 'Pull-Ups', 1, 10, 1, 10, 0),
              (2, 20, 'Pull-Ups', 2, 10, 1, 8, 0),
              (2, 21, 'Barbell Rows', 1, 10, 2, 10, 60.0),
              (2, 21, 'Barbell Rows', 2, 10, 2, 9, 65.0),
              (2, 24, 'Barbell Curl', 1, 10, 3, 10, 40.0),
              (2, 24, 'Barbell Curl', 2, 10, 3, 9, 42.5),
              (3, 1, 'Bench Press', 1, 8, 1, 0, NULL),
              (3, 1, 'Bench Press', 2, 8, 1, 0, NULL),
              (3, 12, 'Close-Grip Bench Press', 1, 10, 2, 0, NULL),
              (3, 12, 'Close-Grip Bench Press', 2, 10, 2, 0, NULL),
              (3, 16, 'Cable Triceps Pulldown', 1, 12, 3, 0, NULL),
              (3, 16, 'Cable Triceps Pulldown', 2, 12, 3, 0, NULL)
            ON CONFLICT DO NOTHING;
          `);

        await client.query('COMMIT');
        console.log("✅ Seed data inserted successfully!");

    } catch (err) {
        await client.query('ROLLBACK');
        console.error("❌ Error inserting seed data:", err);

    } finally {
        client.release();

    }
}

seedDatabase();