const pool = require('../db');

async function seedPrograms() {
    const client = await pool.connect();
    try {

        await client.query(`
            INSERT INTO workout (program, split, workout_state, created_at, completed_at, notes, user_id)
            VALUES
            ('Main Program', 'Legs & Shoulders', 'Completed', NOW() - INTERVAL '3 days', NOW() - INTERVAL '3 days', 'Felt strong, increased squat weight.', 3),
            ('Main Program', 'Back & Biceps', 'Completed', NOW() - INTERVAL '2 days', NOW() - INTERVAL '2 days', 'Good lat engagement.', 3),
            ('Main Program', 'Chest & Triceps', 'Active', NOW(), NULL, 'Plan to go heavier next session.', 3)
            ON CONFLICT DO NOTHING;
        `);

        console.log("✅ Seed workout data inserted successfully!");

    } catch (err) {
        console.error("❌ Error inserting workout data:", err);

    } finally {
        client.release();
        pool.end();
    }
}

seedPrograms();