const pool = require('../db');

async function seedDatabase() {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    // Insert MAIN PROGRAM
    await client.query(`
      INSERT INTO program (name, description)
      VALUES ('MAIN PROGRAM', 'Main program.')
      ON CONFLICT DO NOTHING;
    `);

    // Insert Exercises
    await client.query(`
      INSERT INTO exercise (name, description, muscle_group, equipment_type)
      VALUES
        ('Bench Press', 'Barbell chest press for building chest strength.', 'Chest', 'Barbell'),
        ('Incline Smith Press', 'Smith Machine chest press on an incline bench.', 'Chest', 'Smith Machine'),
        ('Incline Dumbbell Press', 'Dumbbell chest press on an incline bench.', 'Chest', 'Dumbbell'),
        ('Incline Dumbbell Flyes', 'Dumbbell chest press on an incline bench.', 'Chest', 'Dumbbell'),
        ('Dumbbell Flyes', 'Dumbbell chest press on an incline bench.', 'Chest', 'Dumbbell'),
        ('Chest Fly Machine', 'Dumbbell chest press on an incline bench.', 'Chest', 'Machine'),
        ('Decline Bench Press', 'Lower chest activation with a barbell press.', 'Chest', 'Barbell'),
        ('Chest Dips', 'Bodyweight dips focusing on chest and triceps.', 'Chest', 'Bodyweight'),
        ('Machine Chest Press', 'Controlled resistance machine press for chest.', 'Chest', 'Machine'),
        ('Dumbbell Flyes', 'Chest isolation movement for stretch and contraction.', 'Chest', 'Dumbbell'),
        ('Cable Crossover', 'Cable chest flyes for muscle definition.', 'Chest', 'Cable'),
        ('Close-Grip Bench Press', 'Narrow grip bench press targeting triceps.', 'Triceps', 'Barbell'),
        ('Skull Crushers', 'EZ bar triceps extension for long head activation.', 'Triceps', 'Barbell'),
        ('Overhead Triceps Extension', 'Dumbbell or cable movement for triceps.', 'Triceps', 'Dumbbell'),
        ('Triceps Dips', 'Bodyweight dips targeting triceps and chest.', 'Triceps', 'Bodyweight'),
        ('Cable Triceps Pulldown', 'Pulley triceps pulldown for controlled resistance.', 'Triceps', 'Cable'),
        ('Single Arm Cable Pulldown', 'Pulley triceps pulldown for controlled resistance.', 'Triceps', 'Cable'),
        ('Single Arm Overhead Tricep Extension', 'Pulley triceps pulldown for controlled resistance.', 'Triceps', 'Dumbbell'),
        ('Deadlift', 'Barbell deadlift for back and leg strength.', 'Back', 'Barbell'),
        ('Pull-Ups', 'Bodyweight pull-up for back and biceps.', 'Back', 'Bodyweight'),
        ('Barbell Rows', 'Overhand or underhand row for mid-back development.', 'Back', 'Barbell'),
        ('Single Arm Dumbbell Rows', 'Overhand or underhand row for mid-back development.', 'Back', 'Dumbbell'),
        ('Lat Pulldown', 'Pulley-based lat pulldown for width.', 'Back', 'Cable'),
        ('Face Pulls', 'Cable exercise targeting rear delts and upper back.', 'Back', 'Cable'),
        ('Barbell Curl', 'Classic barbell curl for biceps mass.', 'Biceps', 'Barbell'),
        ('Chin-Ups', 'Bodyweight chin-up for back and biceps.', 'Biceps', 'Bodyweight'),
        ('Dumbbell Alternating Curl', 'Unilateral curl for better activation.', 'Biceps', 'Dumbbell'),
        ('Hammer Curl', 'Dumbbell or rope curl targeting brachialis.', 'Biceps', 'Dumbbell'),
        ('Squat', 'Barbell squat for leg development.', 'Quads', 'Barbell'),
        ('Split squat', 'Barbell squat for leg development.', 'Quads', 'Barbell'),
        ('RDL', 'Dumbbell or barbell movement for hamstrings and glutes.', 'Hamstrings', 'Dumbbell'),
        ('Leg Press', 'Machine press for quad and glute strength.', 'Quads', 'Machine'),
        ('Leg Extension', 'Machine press for quad and glute strength.', 'Quads', 'Machine'),
        ('Bulgarian Split Squat', 'Single-leg squat variation for balance and strength.', 'Quads', 'Dumbbell'),
        ('Stiff Legged Deadlift', 'Seated or lying curls for hamstring isolation.', 'Hamstrings', 'Machine'),
        ('Leg Curl', 'Seated or lying curls for hamstring isolation.', 'Hamstrings', 'Machine'),
        ('Calf Raise', 'Standing or seated raises for calf development.', 'Calves', 'Machine'),
        ('Barbell Shoulder Press', 'Barbell or dumbbell press for shoulders.', 'Shoulders', 'Barbell'),
        ('Machine Shoulder Press', 'Barbell or dumbbell press for shoulders.', 'Shoulders', 'Barbell'),
        ('Lateral Raise', 'Side deltoid isolation for width.', 'Shoulders', 'Dumbbell'),
        ('Cable Lateral Raise', 'Side deltoid isolation for width.', 'Shoulders', 'Cable'),
        ('Cable Front Raise', 'Side deltoid isolation for width.', 'Shoulders', 'Cable'),
        ('Shrug', 'Dumbbell or barbell shrugs for upper traps.', 'Shoulders', 'Dumbbell')
      ON CONFLICT DO NOTHING;
    `);

    // Insert Splits
    await client.query(`
      INSERT INTO split (program_id, name, description)
      VALUES
        (1, 'LEGS & SHOULDERS', 'description LEGS & SHOULDERS'),
        (1, 'BACK & BICEPS', 'description BACK & BICEPS'),
        (1, 'CHEST & TRICPES', 'description CHEST & TRICPES')
      ON CONFLICT DO NOTHING;
    `);

    // Insert Sample Split Exercises (Make sure exercise IDs match actual inserted ones)
    await client.query(`
      INSERT INTO split_exercise (split_id, exercise_id, sets, reps, exercise_order)
      VALUES 
        (1, 28, 4, 8, 1),
        (1, 37, 3, 10, 2)
      ON CONFLICT DO NOTHING;
    `);

    // Insert Sample Workouts
    await client.query(`
      INSERT INTO workout (program, split, workout_state, created_at, completed_at, notes)
      VALUES
        ('MAIN PROGRAM', 'LEGS & SHOULDERS', 'Completed', NOW() - INTERVAL '3 days', NOW() - INTERVAL '3 days', 'Felt strong, increased squat weight.'),
        ('MAIN PROGRAM', 'BACK & BICEPS', 'Completed', NOW() - INTERVAL '2 days', NOW() - INTERVAL '2 days', 'Good lat engagement.'),
        ('MAIN PROGRAM', 'CHEST & TRICPES', 'Draft', NOW(), NULL, 'Plan to go heavier next session.')
      ON CONFLICT DO NOTHING;
    `);

    // Insert Sample Workout Logs
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
