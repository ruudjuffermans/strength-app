const pool = require('../db');

async function seedData() {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    await client.query(`
      INSERT INTO base_exercise (id, name, description, muscle_group, equipment_type)
      VALUES
        (1, 'Bench Press', 'Barbell chest press for building chest strength.', 'Chest', 'Barbell'),
        (2, 'Incline Smith Press', 'Smith Machine chest press on an incline bench.', 'Chest', 'Smith Machine'),
        (3, 'Incline Dumbbell Press', 'Dumbbell chest press on an incline bench.', 'Chest', 'Dumbbell'),
        (4, 'Incline Dumbbell Flyes', 'Dumbbell chest press on an incline bench.', 'Chest', 'Dumbbell'),
        (5, 'Dumbbell Flyes', 'Dumbbell chest press on an incline bench.', 'Chest', 'Dumbbell'),
        (6, 'Chest Fly Machine', 'Dumbbell chest press on an incline bench.', 'Chest', 'Machine'),
        (7, 'Decline Bench Press', 'Lower chest activation with a barbell press.', 'Chest', 'Barbell'),
        (8, 'Chest Dips', 'Bodyweight dips focusing on chest and triceps.', 'Chest', 'Bodyweight'),
        (9, 'Machine Chest Press', 'Controlled resistance machine press for chest.', 'Chest', 'Machine'),
        (10, 'Dumbbell Flyes', 'Chest isolation movement for stretch and contraction.', 'Chest', 'Dumbbell'),
        (11, 'Cable Crossover', 'Cable chest flyes for muscle definition.', 'Chest', 'Cable'),
        (12, 'Close-Grip Bench Press', 'Narrow grip bench press targeting triceps.', 'Triceps', 'Barbell'),
        (13, 'Skull Crushers', 'EZ bar triceps extension for long head activation.', 'Triceps', 'Barbell'),
        (14, 'Overhead Triceps Extension', 'Dumbbell or cable movement for triceps.', 'Triceps', 'Dumbbell'),
        (15, 'Triceps Dips', 'Bodyweight dips targeting triceps and chest.', 'Triceps', 'Bodyweight'),
        (16, 'Cable Triceps Pulldown', 'Pulley triceps pulldown for controlled resistance.', 'Triceps', 'Cable'),
        (17, 'Single Arm Cable Pulldown', 'Pulley triceps pulldown for controlled resistance.', 'Triceps', 'Cable'),
        (18, 'Single Arm Overhead Tricep Extension', 'Pulley triceps pulldown for controlled resistance.', 'Triceps', 'Dumbbell'),
        (19, 'Deadlift', 'Barbell deadlift for back and leg strength.', 'Back', 'Barbell'),
        (20, 'Pull-Ups', 'Bodyweight pull-up for back and biceps.', 'Back', 'Bodyweight'),
        (21, 'Barbell Rows', 'Overhand or underhand row for mid-back development.', 'Back', 'Barbell'),
        (22, 'Single Arm Dumbbell Rows', 'Overhand or underhand row for mid-back development.', 'Back', 'Dumbbell'),
        (23, 'Lat Pulldown', 'Pulley-based lat pulldown for width.', 'Back', 'Cable'),
        (24, 'Face Pulls', 'Cable exercise targeting rear delts and upper back.', 'Back', 'Cable'),
        (25, 'Barbell Curl', 'Classic barbell curl for biceps mass.', 'Biceps', 'Barbell'),
        (26, 'Chin-Ups', 'Bodyweight chin-up for back and biceps.', 'Biceps', 'Bodyweight'),
        (27, 'Preacher Curl', 'Unilateral curl for better activation.', 'Biceps', 'Dumbbell'),
        (28, 'Hammer Curl', 'Dumbbell or rope curl targeting brachialis.', 'Biceps', 'Dumbbell'),
        (29, 'Squat', 'Barbell squat for leg development.', 'Quads', 'Barbell'),
        (30, 'Smith Machine Lunges', 'Barbell squat for leg development.', 'Quads', 'Smith Machine'),
        (31, 'RDL', 'Dumbbell or barbell movement for hamstrings and glutes.', 'Hamstrings', 'Dumbbell'),
        (32, 'Leg Press', 'Machine press for quad and glute strength.', 'Quads', 'Machine'),
        (33, 'Leg Extension', 'Machine press for quad and glute strength.', 'Quads', 'Machine'),
        (34, 'Bulgarian Split Squat', 'Single-leg squat variation for balance and strength.', 'Quads', 'Dumbbell'),
        (35, 'Stiff Legged Deadlift', 'Seated or lying curls for hamstring isolation.', 'Hamstrings', 'Machine'),
        (36, 'Leg Curl', 'Seated or lying curls for hamstring isolation.', 'Hamstrings', 'Machine'),
        (37, 'Calf Raise', 'Standing or seated raises for calf development.', 'Calves', 'Machine'),
        (38, 'Barbell Shoulder Press', 'Barbell or dumbbell press for shoulders.', 'Shoulders', 'Barbell'),
        (39, 'Machine Shoulder Press', 'Barbell or dumbbell press for shoulders.', 'Shoulders', 'Barbell'),
        (40, 'Lateral Raise', 'Side deltoid isolation for width.', 'Shoulders', 'Dumbbell'),
        (41, 'Cable Lateral Raise', 'Side deltoid isolation for width.', 'Shoulders', 'Cable'),
        (42, 'Cable Front Raise', 'Side deltoid isolation for width.', 'Shoulders', 'Cable'),
        (43, 'Shrug', 'Dumbbell or barbell shrugs for upper traps.', 'Shoulders', 'Dumbbell')
      ON CONFLICT DO NOTHING;
    `);

    await client.query(`
      INSERT INTO base_program (id, name, description)
      VALUES (1, 'Main Program', 'This is the Main Program');
  `);

    await client.query(`
      INSERT INTO base_program (id, name, description)
      VALUES (2, 'Second Program', 'This is the Second Program');
  `);

    await client.query(`
      INSERT INTO base_program (id, name, description)
      VALUES (3, 'Third Program', 'This is the Second Program');
  `);


    await client.query('COMMIT');
    await client.query('BEGIN');

    await client.query(`
      INSERT INTO split (id, program_source, program_ref_id, name, description)
      VALUES
      (1, 'base', 1, 'Legs & Shoulders', 'A full lower body workout combined with shoulder isolation exercises.'),
      (2, 'base', 1, 'Back & Biceps', 'Focused on pulling movements to strengthen the back and build biceps.'),
      (3, 'base', 1, 'Chest & Triceps', 'A classic push day routine targeting the chest and triceps muscles.')
      ON CONFLICT DO NOTHING;
  `);

    await client.query(`
      INSERT INTO split (id, program_source, program_ref_id, name, description)
      VALUES
      (4, 'base', 2, 'Legs & Shoulders', 'A full lower body workout combined with shoulder isolation exercises.'),
      (5, 'base', 2, 'Back & Biceps', 'Focused on pulling movements to strengthen the back and build biceps.'),
      (6, 'base', 2, 'Chest & Triceps', 'A classic push day routine targeting the chest and triceps muscles.')
      ON CONFLICT DO NOTHING;
  `);

    await client.query(`
      INSERT INTO split (id, program_source, program_ref_id, name, description)
      VALUES
      (7, 'base', 3, 'Legs & Shoulders', 'A full lower body workout combined with shoulder isolation exercises.'),
      (8, 'base', 3, 'Back & Biceps', 'Focused on pulling movements to strengthen the back and build biceps.'),
      (9, 'base', 3, 'Chest & Triceps', 'A classic push day routine targeting the chest and triceps muscles.')
      ON CONFLICT DO NOTHING;
  `);

    await client.query('COMMIT');
    await client.query('BEGIN');

    await client.query(`
      INSERT INTO split_exercise (split_id, exercise_source, exercise_ref_id, sets, reps, exercise_order)
      VALUES 
        (1, 'base', 29, 5, 5, 1),
        (1, 'base', 38, 5, 5, 2),
        (1, 'base', 19, 3, 4, 3),
        (1, 'base', 40, 3, 10, 4),
        (1, 'base', 42, 3, 10, 5),
        (1, 'base', 32, 3, 12, 6),
        (1, 'base', 30, 3, 12, 7),
        (1, 'base', 36, 1, 6, 8),
        (1, 'base', 33, 1, 6, 9),
        (1, 'base', 37, 3, 12, 10),
        (2, 'base', 21, 5, 5, 1),
        (2, 'base', 20, 3, 12, 2),
        (2, 'base', 24, 3, 10, 3),
        (2, 'base', 27, 3, 10, 4),
        (2, 'base', 28, 3, 10, 5),
        (3, 'base', 1, 5, 5, 1),
        (3, 'base', 3, 3, 12, 2),
        (3, 'base', 6, 3, 10, 3),
        (3, 'base', 15, 3, 12, 4),
        (3, 'base', 16, 3, 10, 5)
      ON CONFLICT DO NOTHING;
  `);

    await client.query(`
      INSERT INTO split_exercise (split_id, exercise_source, exercise_ref_id, sets, reps, exercise_order)
      VALUES 
        (4, 'base', 29, 5, 5, 1),
        (4, 'base', 38, 5, 5, 2),
        (4, 'base', 19, 3, 4, 3),
        (4, 'base', 40, 3, 10, 4),
        (4, 'base', 42, 3, 10, 5),
        (4, 'base', 32, 3, 12, 6),
        (4, 'base', 30, 3, 12, 7),
        (4, 'base', 36, 1, 6, 8),
        (4, 'base', 33, 1, 6, 9),
        (4, 'base', 37, 3, 12, 10),
        (5, 'base', 21, 5, 5, 1),
        (5, 'base', 20, 3, 12, 2),
        (5, 'base', 24, 3, 10, 3),
        (5, 'base', 27, 3, 10, 4),
        (5, 'base', 28, 3, 10, 5),
        (6, 'base', 1, 5, 5, 1),
        (6, 'base', 3, 3, 12, 2),
        (6, 'base', 6, 3, 10, 3),
        (6, 'base', 15, 3, 12, 4),
        (6, 'base', 16, 3, 10, 5)
      ON CONFLICT DO NOTHING;
  `);


    await client.query(`
      INSERT INTO split_exercise (split_id, exercise_source, exercise_ref_id, sets, reps, exercise_order)
      VALUES 
        (7, 'base', 29, 5, 5, 1),
        (7, 'base', 38, 5, 5, 2),
        (7, 'base', 19, 3, 4, 3),
        (7, 'base', 40, 3, 10, 4),
        (7, 'base', 42, 3, 10, 5),
        (7, 'base', 32, 3, 12, 6),
        (7, 'base', 30, 3, 12, 7),
        (7, 'base', 36, 1, 6, 8),
        (7, 'base', 33, 1, 6, 9),
        (7, 'base', 37, 3, 12, 10),
        (8, 'base', 21, 5, 5, 1),
        (8, 'base', 20, 3, 12, 2),
        (8, 'base', 24, 3, 10, 3),
        (8, 'base', 27, 3, 10, 4),
        (8, 'base', 28, 3, 10, 5),
        (9, 'base', 1, 5, 5, 1),
        (9, 'base', 3, 3, 12, 2),
        (9, 'base', 6, 3, 10, 3),
        (9, 'base', 15, 3, 12, 4),
        (9, 'base', 16, 3, 10, 5)
      ON CONFLICT DO NOTHING;
  `);

    await client.query('COMMIT');

    console.log("✅ Seeded exercises, programs, splits and split-exercises successfully!");

  } catch (err) {
    await client.query('ROLLBACK');
    console.error("❌ Error inserting seed exercises:", err);

  } finally {
    client.release();
    pool.end()

  }
}

seedData();
