const pool = require('../db');

async function seedPrograms() {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');

        // await client.query(`
        //     INSERT INTO split (id, program_id, name, description)
        //     VALUES
        //     (1, 1, 'Legs & Shoulders', 'A full lower body workout combined with shoulder isolation exercises.'),
        //     (2, 1, 'Back & Biceps', 'Focused on pulling movements to strengthen the back and build biceps.'),
        //     (3, 1, 'Chest & Triceps', 'A classic push day routine targeting the chest and triceps muscles.')
        //     ON CONFLICT DO NOTHING;
        // `);

        await client.query(`
            INSERT INTO split_exercise (split_id, exercise_id, sets, reps, exercise_order)
            VALUES 
              (1, 29, 5, 5, 1),
              (1, 38, 5, 5, 2),
              (1, 19, 3, 4, 3),
              (1, 40, 3, 10, 4),
              (1, 42, 3, 10, 5),
              (1, 32, 3, 12, 6),
              (1, 30, 3, 12, 7),
              (1, 36, 1, 6, 8),
              (1, 33, 1, 6, 9),
              (1, 37, 3, 12, 10),
              (2, 21, 5, 5, 1),
              (2, 20, 3, 12, 2),
              (2, 24, 3, 10, 3),
              (2, 27, 3, 10, 4),
              (2, 28, 3, 10, 5),
              (3, 1, 5, 5, 1),
              (3, 3, 3, 12, 2),
              (3, 6, 3, 10, 3),
              (3, 15, 3, 12, 4),
              (3, 16, 3, 10, 5)
            ON CONFLICT DO NOTHING;
        `);

        // await client.query(`
        //     INSERT INTO workout (program, split, workout_state, created_at, completed_at, notes)
        //     VALUES
        //     ('Main Program', 'Legs & Shoulders', 'Completed', NOW() - INTERVAL '3 days', NOW() - INTERVAL '3 days', 'Felt strong, increased squat weight.'),
        //     ('Main Program', 'Back & Biceps', 'Completed', NOW() - INTERVAL '2 days', NOW() - INTERVAL '2 days', 'Good lat engagement.'),
        //     ('Main Program', 'Chest & Triceps', 'Draft', NOW(), NULL, 'Plan to go heavier next session.')
        //     ON CONFLICT DO NOTHING;
        // `);

        await client.query('COMMIT');
        console.log("✅ Seed split data inserted successfully!");

    } catch (err) {
        await client.query('ROLLBACK');
        console.error("❌ Error inserting seed data:", err);

    } finally {
        client.release();

    }
}

seedPrograms();