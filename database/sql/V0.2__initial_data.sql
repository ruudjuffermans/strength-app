SET SEARCH_PATH = 'fitness';
SET client_min_messages = warning;

INSERT INTO program (name, description)
VALUES
    ('MAIN PROGRAM', 'Main program.');

INSERT INTO exercise (name, description, muscle_group, equipment_type)
VALUES
    -- 🔥 Chest & Triceps
    ('Bench Press', 'Barbell chest press for building chest strength.', 'Chest', 'Barbell'),
    ('Incline Bench Press', 'Dumbbell chest press on an incline bench.', 'Chest', 'Dumbbell'),
    ('Decline Barbell Press', 'Lower chest activation with a barbell press.', 'Chest', 'Barbell'),
    ('Chest Dips', 'Bodyweight dips focusing on chest and triceps.', 'Chest', 'Bodyweight'),
    ('Machine Chest Press', 'Controlled resistance machine press for chest.', 'Chest', 'Machine'),
    ('Dumbbell Flyes', 'Chest isolation movement for stretch and contraction.', 'Chest', 'Dumbbell'),
    ('Cable Crossover', 'Cable chest flyes for muscle definition.', 'Chest', 'Cable'),
    ('Close-Grip Bench Press', 'Narrow grip bench press targeting triceps.', 'Triceps', 'Barbell'),
    ('Skull Crushers', 'EZ bar triceps extension for long head activation.', 'Triceps', 'Barbell'),
    ('Overhead Triceps Extension', 'Dumbbell or cable movement for triceps.', 'Triceps', 'Dumbbell'),
    ('Triceps Dips', 'Bodyweight dips targeting triceps and chest.', 'Triceps', 'Bodyweight'),
    ('Cable Triceps Pushdown', 'Pulley triceps pushdown for controlled resistance.', 'Triceps', 'Cable'),
    
    ('Deadlift', 'Barbell deadlift for back and leg strength.', 'Back', 'Barbell'),
    ('Pull-Up', 'Bodyweight pull-up for back and biceps.', 'Back', 'Bodyweight'),
    ('Barbell Rows', 'Overhand or underhand row for mid-back development.', 'Back', 'Barbell'),
    ('Lat Pulldown', 'Pulley-based lat pulldown for width.', 'Back', 'Cable'),
    ('Face Pulls', 'Cable exercise targeting rear delts and upper back.', 'Back', 'Cable'),
    ('Barbell Curl', 'Classic barbell curl for biceps mass.', 'Biceps', 'Barbell'),
    ('Dumbbell Alternating Curl', 'Unilateral curl for better activation.', 'Biceps', 'Dumbbell'),
    ('Hammer Curl', 'Dumbbell or rope curl targeting brachialis.', 'Biceps', 'Dumbbell'),
    
    ('Squat', 'Barbell squat for leg development.', 'Quads', 'Barbell'),
    ('Romanian Deadlifts', 'Dumbbell or barbell movement for hamstrings and glutes.', 'Hamstrings', 'Dumbbell'),
    ('Leg Press', 'Machine press for quad and glute strength.', 'Quads', 'Machine'),
    ('Bulgarian Split Squats', 'Single-leg squat variation for balance and strength.', 'Quads', 'Dumbbell'),
    ('Hamstring Curls', 'Seated or lying curls for hamstring isolation.', 'Hamstrings', 'Machine'),
    ('Calf Raises', 'Standing or seated raises for calf development.', 'Calves', 'Machine'),
    ('Overhead Shoulder Press', 'Barbell or dumbbell press for shoulders.', 'Shoulders', 'Barbell'),
    ('Lateral Raises', 'Side deltoid isolation for width.', 'Shoulders', 'Dumbbell'),
    ('Shrugs', 'Dumbbell or barbell shrugs for upper traps.', 'Shoulders', 'Dumbbell');


INSERT INTO split (program_id, name, description)
VALUES
    (1, 'LEGS & SHOULDERS', 'description LEGS & SHOULDERS'),
    (1, 'BACK & BICEPS', 'description BACK & BICEPS'),
    (1, 'CHEST & TRICPES', 'description CHEST & TRICPES');

INSERT INTO split_exercise (split_id, exercise_id, sets, reps, exercise_order)
VALUES 
    (1, 6, 4, 8, 1),  -- e.g., Squat: 4 sets of 8 reps
    (1, 9, 3, 10, 2); -- e.g., Shoulder Press: 3 sets of 10 reps


