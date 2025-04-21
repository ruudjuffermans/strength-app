const pool = require('../db');

async function seedPrograms() {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');

        await client.query(`
            INSERT INTO program (id, name, description)
            VALUES (1, 'Main Program', 'This is the Main Program')
            ON CONFLICT DO NOTHING;
        `);

        // await client.query(`
        //     INSERT INTO split (program_id, name, description)
        //     VALUES
        //     (1, 'Legs & Shoulders', 'A full lower body workout combined with shoulder isolation exercises.'),
        //     (1, 'Back & Biceps', 'Focused on pulling movements to strengthen the back and build biceps.'),
        //     (1, 'Chest & Triceps', 'A classic push day routine targeting the chest and triceps muscles.')
        //     ON CONFLICT DO NOTHING;
        // `);

        // await client.query(`
        //     INSERT INTO split_exercise (split_id, exercise_id, sets, reps, exercise_order)
        //     VALUES 
        //       (1, 28, 4, 8, 1),
        //       (1, 37, 3, 10, 2)
        //     ON CONFLICT DO NOTHING;
        // `);

        // await client.query(`
        //     INSERT INTO workout (program, split, workout_state, created_at, completed_at, notes)
        //     VALUES
        //     ('Main Program', 'Legs & Shoulders', 'Completed', NOW() - INTERVAL '3 days', NOW() - INTERVAL '3 days', 'Felt strong, increased squat weight.'),
        //     ('Main Program', 'Back & Biceps', 'Completed', NOW() - INTERVAL '2 days', NOW() - INTERVAL '2 days', 'Good lat engagement.'),
        //     ('Main Program', 'Chest & Triceps', 'Draft', NOW(), NULL, 'Plan to go heavier next session.')
        //     ON CONFLICT DO NOTHING;
        // `);

        await client.query('COMMIT');
        console.log("✅ Seed data inserted successfully!");

    } catch (err) {
        await client.query('ROLLBACK');
        console.error("❌ Error inserting seed data:", err);

    } finally {
        client.release();

    }
}

seedPrograms();