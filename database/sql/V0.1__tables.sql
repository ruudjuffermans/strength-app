SET SEARCH_PATH = 'fitness';
SET client_min_messages = warning;

CREATE TYPE muscle_group_enum AS ENUM (
    'Chest', 'Triceps', 'Back', 'Biceps', 'Calves', 'Quads', 'Forearms', 'Hamstrings', 'Shoulders', 'Abs'
);

CREATE TYPE equipment_type_enum AS ENUM (
    'Bodyweight', 'Barbell', 'Machine', 'Dumbbell', 'Cable', 'Smith Machine'
);

CREATE TYPE workout_state_enum AS ENUM (
    'Draft', 'Completed'
);


CREATE TABLE program (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT
);

CREATE TABLE exercise (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    muscle_group muscle_group_enum NOT NULL,
    equipment_type equipment_type_enum NOT NULL,
    description TEXT
);

CREATE TABLE split (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    program_id INT NOT NULL,
    FOREIGN KEY (program_id) REFERENCES program(id) ON DELETE CASCADE
);

CREATE TABLE split_exercise (
    id         SERIAL PRIMARY KEY,
    split_id   INTEGER NOT NULL,
    exercise_id INTEGER NOT NULL,
    sets       INTEGER NOT NULL,
    reps       INTEGER NOT NULL,
    exercise_order INTEGER,
    FOREIGN KEY (split_id) REFERENCES split(id) ON DELETE CASCADE,
    FOREIGN KEY (exercise_id) REFERENCES exercise(id)
);


CREATE TABLE workout (
    id SERIAL PRIMARY KEY,
    program VARCHAR(255) NOT NULL,
    split VARCHAR(255) NOT NULL,
    workout_state workout_state_enum DEFAULT 'Draft',
    created_at TIMESTAMP DEFAULT now(),
    completed_at TIMESTAMP DEFAULT NULL,
    notes TEXT
);

CREATE TABLE workout_log (
    id SERIAL PRIMARY KEY,
    workout_id INTEGER NOT NULL,
    exercise_id INTEGER NOT NULL,
    exercise_name VARCHAR(255) NOT NULL,
    set_number INTEGER NOT NULL,
    target_reps INTEGER NOT NULL,
    exercise_order INTEGER NOT NULL,
    performed_reps INTEGER NOT NULL,
    weight_used DECIMAL(5,2) DEFAULT NULL,
    FOREIGN KEY (workout_id) REFERENCES workout(id) ON DELETE CASCADE,
    FOREIGN KEY (exercise_id) REFERENCES exercise(id) ON DELETE SET NULL
);

CREATE OR REPLACE FUNCTION set_exercise_order()
RETURNS TRIGGER AS $$
BEGIN
    NEW.exercise_order := (
        SELECT COALESCE(MAX(exercise_order), 0) + 1
        FROM split_exercise
        WHERE split_id = NEW.split_id
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_set_exercise_order
BEFORE INSERT ON split_exercise
FOR EACH ROW
EXECUTE FUNCTION set_exercise_order();


CREATE OR REPLACE FUNCTION generate_workout_sets_for_split(p_split_id INTEGER)
RETURNS VOID AS $$
DECLARE
    exercise_row RECORD;
    i INTEGER;
    new_workout_id INTEGER;
BEGIN
    -- Get split name and program name (needed for the workout table)
    SELECT s.name AS split_name, p.name AS program_name 
    INTO exercise_row
    FROM split s
    JOIN program p ON s.program_id = p.id
    WHERE s.id = p_split_id;

    -- Ensure the split exists
    IF exercise_row.split_name IS NULL THEN
        RAISE EXCEPTION 'Invalid split_id: %', p_split_id;
    END IF;

    -- Create a new workout entry
    INSERT INTO workout (program, split, workout_state, created_at)
    VALUES (exercise_row.program_name, exercise_row.split_name, 'Draft', NOW())
    RETURNING id INTO new_workout_id;

    -- Loop through each exercise in the split
    FOR exercise_row IN 
        SELECT se.id AS split_exercise_id, se.exercise_id, se.sets, se.reps, e.name AS exercise_name
        FROM split_exercise se
        JOIN exercise e ON se.exercise_id = e.id
        WHERE se.split_id = p_split_id
    LOOP
        -- Insert 'sets' number of rows for this exercise into workout_log
        FOR i IN 1..exercise_row.sets LOOP
            INSERT INTO workout_log (workout_id, exercise_id, exercise_name, set_number, target_reps, performed_reps, weight_used)
            VALUES (new_workout_id, exercise_row.exercise_id, exercise_row.exercise_name, i, exercise_row.reps, 0, NULL);
        END LOOP;
    END LOOP;
END;
$$ LANGUAGE plpgsql;
