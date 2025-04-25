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

        // await client.query(`
        //     INSERT INTO split_exercise (split_id, exercise_id, sets, reps, exercise_order)
        //     VALUES 
        //       (1, 28, 4, 8, 1),
        //       (1, 37, 3, 10, 2)
        //     ON CONFLICT DO NOTHING;
        // `);

        await client.query(`
            INSERT INTO workout (program, split, workout_state, created_at, completed_at, notes, created_by)
            VALUES
            ('Main Program', 'Legs & Shoulders', 'Completed', NOW() - INTERVAL '3 days', NOW() - INTERVAL '3 days', 'Felt strong, increased squat weight.', 3),
            ('Main Program', 'Back & Biceps', 'Completed', NOW() - INTERVAL '2 days', NOW() - INTERVAL '2 days', 'Good lat engagement.', 3),
            ('Main Program', 'Chest & Triceps', 'Draft', NOW(), NULL, 'Plan to go heavier next session.', 3)
            ON CONFLICT DO NOTHING;
        `);

        await client.query('COMMIT');
        console.log("✅ Seed split data inserted successfully!");

    } catch (err) {
        await client.query('ROLLBACK');
        console.error("❌ Error inserting seed data:", err);

    } finally {
        client.release();
        pool.end();
    }
}

seedPrograms();