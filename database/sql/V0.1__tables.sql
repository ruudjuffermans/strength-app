

CREATE TYPE muscle_group_enum AS ENUM (
    'Chest', 'Triceps', 'Back', 'Biceps', 'Calves', 'Quads', 'Glutes', 'Forearms', 'Hamstrings', 'Shoulders', 'Abs'
);

CREATE TYPE equipment_type_enum AS ENUM (
    'Bodyweight', 'Barbell', 'Machine', 'Dumbbell', 'Cable', 'Smith Machine'
);

CREATE TYPE workout_state_enum AS ENUM (
    'Draft', 'Completed'
);

CREATE TYPE user_role_enum AS ENUM (
    'User', 'Admin'
);

CREATE TYPE user_status_enum AS ENUM (
    'Pending', 'Approved', 'Rejected'
);

CREATE TABLE user_account (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    firstname VARCHAR(255),
    lastname VARCHAR(255),
    password_hash TEXT,
    role user_role_enum DEFAULT 'User',
    status user_status_enum DEFAULT 'Pending',
    created_at TIMESTAMP DEFAULT NOW(),
    active_program INTEGER DEFAULT NULL,
    active_workout INTEGER DEFAULT NULL,
    approved_at TIMESTAMP,
    approved_by INTEGER DEFAULT NULL,
    FOREIGN KEY (approved_by) REFERENCES user_account(id) ON DELETE SET NULL
);


CREATE TABLE program (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    created_by INTEGER,
    FOREIGN KEY (created_by) REFERENCES user_account(id) ON DELETE CASCADE
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
    created_by INTEGER,
    notes TEXT,
    FOREIGN KEY (created_by) REFERENCES user_account(id) ON DELETE CASCADE
);

CREATE TABLE workout_log (
    id SERIAL PRIMARY KEY,
    workout_id INTEGER NOT NULL,
    exercise_id INTEGER NOT NULL,
    exercise_name VARCHAR(255) NOT NULL,
    set_number INTEGER NOT NULL,
    exercise_order INTEGER NOT NULL,
    target_reps INTEGER NOT NULL,
    performed_reps INTEGER NOT NULL,
    weight_used DECIMAL(5,2) DEFAULT NULL,
    updated BOOLEAN DEFAULT FALSE,
    notes TEXT,
    created_by INTEGER,
    FOREIGN KEY (created_by) REFERENCES user_account(id) ON DELETE CASCADE,
    FOREIGN KEY (workout_id) REFERENCES workout(id) ON DELETE CASCADE,
    FOREIGN KEY (exercise_id) REFERENCES exercise(id) ON DELETE SET NULL
);
