INSERT INTO base_exercise (id, name, description, muscle_group, equipment_type)
VALUES
  (1, 'Bench Press', 'Barbell chest press for building chest strength.', 'Chest', 'Barbell'),
  (2, 'Incline Smith Press', 'Smith Machine chest press on an incline bench.', 'Chest', 'Smith Machine'),
  (3, 'Incline Dumbbell Press', 'Dumbbell chest press on an incline bench.', 'Chest', 'Dumbbell'),
  (4, 'Incline Dumbbell Flyes', 'Dumbbell chest press on an incline bench.', 'Chest', 'Dumbbell'),
  (5, 'Dumbbell Flyes', 'Chest isolation movement for stretch and contraction.', 'Chest', 'Dumbbell'),
  (6, 'Chest Fly Machine', 'Machine chest fly for isolation.', 'Chest', 'Machine'),
  (7, 'Decline Bench Press', 'Lower chest activation with a barbell press.', 'Chest', 'Barbell'),
  (8, 'Chest Dips', 'Bodyweight dips focusing on chest and triceps.', 'Chest', 'Bodyweight'),
  (9, 'Machine Chest Press', 'Controlled resistance machine press for chest.', 'Chest', 'Machine'),
  (10, 'Cable Crossover', 'Cable chest flyes for muscle definition.', 'Chest', 'Cable'),
  (11, 'Close-Grip Bench Press', 'Narrow grip bench press targeting triceps.', 'Triceps', 'Barbell'),
  (12, 'Skull Crushers', 'EZ bar triceps extension for long head activation.', 'Triceps', 'Barbell'),
  (13, 'Overhead Triceps Extension', 'Dumbbell or cable movement for triceps.', 'Triceps', 'Dumbbell'),
  (14, 'Triceps Dips', 'Bodyweight dips targeting triceps and chest.', 'Triceps', 'Bodyweight'),
  (15, 'Cable Triceps Pulldown', 'Pulley triceps pulldown for controlled resistance.', 'Triceps', 'Cable'),
  (16, 'Single Arm Cable Pulldown', 'Pulley triceps pulldown for controlled resistance.', 'Triceps', 'Cable'),
  (17, 'Single Arm Overhead Tricep Extension', 'One-arm overhead extension.', 'Triceps', 'Dumbbell'),
  (18, 'Deadlift', 'Barbell deadlift for back and leg strength.', 'Back', 'Barbell'),
  (19, 'Pull-Ups', 'Bodyweight pull-up for back and biceps.', 'Back', 'Bodyweight'),
  (20, 'Barbell Rows', 'Row movement for mid-back.', 'Back', 'Barbell'),
  (21, 'Single Arm Dumbbell Rows', 'Unilateral row movement.', 'Back', 'Dumbbell'),
  (22, 'Lat Pulldown', 'Cable lat pulldown.', 'Back', 'Cable'),
  (23, 'Face Pulls', 'Cable movement for rear delts and traps.', 'Back', 'Cable'),
  (24, 'Barbell Curl', 'Classic biceps mass builder.', 'Biceps', 'Barbell'),
  (25, 'Chin-Ups', 'Bodyweight chin-up.', 'Biceps', 'Bodyweight'),
  (26, 'Preacher Curl', 'Curl on preacher bench.', 'Biceps', 'Dumbbell'),
  (27, 'Hammer Curl', 'Neutral grip dumbbell curl.', 'Biceps', 'Dumbbell'),
  (28, 'Squat', 'Barbell squat for legs.', 'Quads', 'Barbell'),
  (29, 'Smith Machine Lunges', 'Smith machine lunge.', 'Quads', 'Smith Machine'),
  (30, 'RDL', 'Romanian Deadlift.', 'Hamstrings', 'Dumbbell'),
  (31, 'Leg Press', 'Machine pressing movement.', 'Quads', 'Machine'),
  (32, 'Leg Extension', 'Machine quad isolation.', 'Quads', 'Machine'),
  (33, 'Bulgarian Split Squat', 'Single-leg squat.', 'Quads', 'Dumbbell'),
  (34, 'Stiff Legged Deadlift', 'Deadlift with less knee bend.', 'Hamstrings', 'Machine'),
  (35, 'Leg Curl', 'Hamstring isolation.', 'Hamstrings', 'Machine'),
  (36, 'Calf Raise', 'Standing/seated calf raises.', 'Calves', 'Machine'),
  (37, 'Barbell Shoulder Press', 'Overhead press.', 'Shoulders', 'Barbell'),
  (38, 'Machine Shoulder Press', 'Overhead machine press.', 'Shoulders', 'Machine'),
  (39, 'Lateral Raise', 'Side shoulder raise.', 'Shoulders', 'Dumbbell'),
  (40, 'Cable Lateral Raise', 'Side shoulder raise with cable.', 'Shoulders', 'Cable'),
  (41, 'Cable Front Raise', 'Front shoulder raise with cable.', 'Shoulders', 'Cable'),
  (42, 'Shrug', 'Trap isolation.', 'Shoulders', 'Dumbbell')
ON CONFLICT DO NOTHING;

INSERT INTO base_program (id, name, description)
VALUES
  (1, 'Main Program', 'This is the Main Program'),
  (2, 'Second Program', 'This is the Second Program'),
  (3, 'Third Program', 'This is the Third Program')
ON CONFLICT DO NOTHING;

INSERT INTO split (id, program_source, program_ref_id, name, description)
VALUES
  (1, 'user', 1, 'Legs & Shoulders', 'Lower body with shoulder isolation.'),
  (2, 'user', 1, 'Back & Biceps', 'Pull day focus.'),
  (3, 'user', 1, 'Chest & Triceps', 'Push day focus.'),
  (4, 'user', 2, 'Legs & Shoulders', 'Lower body with shoulder isolation.'),
  (5, 'user', 2, 'Back & Biceps', 'Pull day focus.'),
  (6, 'user', 2, 'Chest & Triceps', 'Push day focus.'),
  (7, 'user', 3, 'Legs & Shoulders', 'Lower body with shoulder isolation.'),
  (8, 'user', 3, 'Back & Biceps', 'Pull day focus.'),
  (9, 'user', 3, 'Chest & Triceps', 'Push day focus.')
ON CONFLICT DO NOTHING;

INSERT INTO split_exercise (split_id, exercise_source, exercise_ref_id, sets, reps, exercise_order)
VALUES 
(1, 'base', 28, 5, 5, 1),
(1, 'base', 37, 5, 5, 2),
(1, 'base', 18, 3, 4, 3),
(1, 'base', 39, 3, 10, 4),
(1, 'base', 41, 3, 10, 5),
(1, 'base', 31, 3, 12, 6),
(1, 'base', 29, 3, 12, 7),
(1, 'base', 35, 1, 6, 8),
(1, 'base', 32, 1, 6, 9),
(1, 'base', 36, 3, 12, 10),
(2, 'base', 20, 5, 5, 1),
(2, 'base', 19, 3, 12, 2),
(2, 'base', 23, 3, 10, 3),
(2, 'base', 26, 3, 10, 4),
(2, 'base', 27, 3, 10, 5),
(3, 'base', 1, 5, 5, 1),
(3, 'base', 3, 3, 12, 2),
(3, 'base', 6, 3, 10, 3),
(3, 'base', 14, 3, 12, 4),
(3, 'base', 15, 3, 10, 5)
ON CONFLICT DO NOTHING;
