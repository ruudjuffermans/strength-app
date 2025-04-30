CREATE TABLE base_program (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT
);

CREATE TABLE user_program (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    base_program_id INTEGER DEFAULT NULL,
    program_state program_state_enum DEFAULT 'Creating',
    name VARCHAR(255) NOT NULL,
    description TEXT,
    FOREIGN KEY (user_id) REFERENCES user_account (id) ON DELETE CASCADE,
    FOREIGN KEY (base_program_id) REFERENCES base_program(id) ON DELETE SET NULL
);

CREATE TABLE split (
    id SERIAL PRIMARY KEY,
    program_source TEXT CHECK (program_source IN ('base', 'user')) NOT NULL,
    program_ref_id INTEGER NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT
);

CREATE TABLE workout (
    id SERIAL PRIMARY KEY,
    user_id INTEGER,
    program VARCHAR(255) NOT NULL,
    split VARCHAR(255) NOT NULL,
    workout_state workout_state_enum DEFAULT 'Active',
    created_at TIMESTAMP DEFAULT now (),
    completed_at TIMESTAMP DEFAULT NULL,
    notes TEXT,
    FOREIGN KEY (user_id) REFERENCES user_account (id) ON DELETE CASCADE
);

CREATE TABLE base_exercise (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    muscle_group muscle_group_enum NOT NULL,
    equipment_type equipment_type_enum NOT NULL
);

CREATE TABLE user_exercise (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    base_exercise_id INTEGER,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    muscle_group muscle_group_enum NOT NULL,
    equipment_type equipment_type_enum NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user_account (id) ON DELETE CASCADE,
    FOREIGN KEY (base_exercise_id) REFERENCES base_exercise (id) ON DELETE CASCADE
);

CREATE TABLE split_exercise (
    id SERIAL PRIMARY KEY,
    split_id INTEGER NOT NULL,
    exercise_source TEXT CHECK (exercise_source IN ('base', 'user')) NOT NULL,
    exercise_ref_id INTEGER NOT NULL,
    sets INTEGER NOT NULL,
    reps INTEGER NOT NULL,
    exercise_order INTEGER,
    FOREIGN KEY (split_id) REFERENCES split (id) ON DELETE CASCADE
);

CREATE TABLE workout_log (
    id SERIAL PRIMARY KEY,
    user_id INTEGER,
    workout_id INTEGER NOT NULL,
    exercise_source TEXT CHECK (exercise_source IN ('base', 'user')) NOT NULL,
    exercise_ref_id INTEGER NOT NULL,
    set_number INTEGER NOT NULL,
    exercise_order INTEGER NOT NULL,
    target_reps INTEGER NOT NULL,
    performed_reps INTEGER DEFAULT NULL,
    weight_used DECIMAL(5, 2) DEFAULT NULL,
    logged BOOLEAN DEFAULT FALSE,
    locked BOOLEAN DEFAULT FALSE,
    notes TEXT,
    FOREIGN KEY (user_id) REFERENCES user_account (id) ON DELETE CASCADE,
    FOREIGN KEY (workout_id) REFERENCES workout (id) ON DELETE CASCADE
);