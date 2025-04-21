const pool = require('../db');

async function seedDatabase() {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    await client.query(`
      INSERT INTO exercise (id, name, description, muscle_group, equipment_type)
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
    

    await client.query('COMMIT');
    console.log("✅ Seed exercises inserted successfully!");

  } catch (err) {
    await client.query('ROLLBACK');
    console.error("❌ Error inserting seed exercises:", err);

  } finally {
    client.release();
    
  }
}

seedDatabase();
