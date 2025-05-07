const pool = require('../db');

async function seedDatabase() {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');

        await client.query(`
            INSERT INTO workout_log (workout_id, exercise_id, set_number, target_reps, exercise_order, performed_reps, weight_used)
            VALUES
              (1, 28, 1, 8, 1, 8, 100.0),
              (1, 28, 2, 8, 1, 8, 110.0),
              (1, 28, 3, 8, 1, 7, 115.0),
              (1, 37, 1, 10, 2, 10, 50.0),
              (1, 37, 2, 10, 2, 9, 55.0),
              (1, 37, 3, 10, 2, 8, 60.0),
              (2, 20, 1, 10, 1, 10, 0),
              (2, 20, 2, 10, 1, 8, 0),
              (2, 21, 1, 10, 2, 10, 60.0),
              (2, 21, 2, 10, 2, 9, 65.0),
              (2, 24, 1, 10, 3, 10, 40.0),
              (2, 24, 2, 10, 3, 9, 42.5),
              (3, 2, 1, 8, 1, 0, NULL),
              (3, 2, 2, 8, 1, 0, NULL),
              (3, 12, 1, 10, 2, 0, NULL),
              (3, 12, 2, 10, 2, 0, NULL),
              (3, 16, 1, 12, 3, 0, NULL),
              (3, 16, 2, 12, 3, 0, NULL)
            ON CONFLICT DO NOTHING;
          `);

        await client.query('COMMIT');
        console.log("✅ Seed data inserted successfully!");

    } catch (err) {
        await client.query('ROLLBACK');
        console.error("❌ Error inserting seed data:", err);

    } finally {
        client.release();
        pool.end();
    }
}

seedDatabase();