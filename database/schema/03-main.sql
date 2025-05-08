CREATE TABLE program (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    creator INTEGER DEFAULT NULL,
    is_overwriter BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT FALSE,
    overwriter_ref INTEGER DEFAULT NULL,
    FOREIGN KEY (overwriter_ref) REFERENCES program(id) ON DELETE
    SET NULL
);

CREATE TABLE split (
    id SERIAL PRIMARY KEY,
    program_id INTEGER,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    FOREIGN KEY (program_id) REFERENCES program (id) ON DELETE CASCADE
);

CREATE TABLE workout (
    id SERIAL PRIMARY KEY,
    user_id INTEGER,
    program VARCHAR(255) NOT NULL,
    split VARCHAR(255) NOT NULL,
    workout_state workout_state_enum DEFAULT 'Active',
    created_at TIMESTAMP DEFAULT now(),
    completed_at TIMESTAMP DEFAULT NULL,
    notes TEXT,
    FOREIGN KEY (user_id) REFERENCES user_account (id) ON DELETE CASCADE
);

CREATE TABLE exercise (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    muscle_group muscle_group_enum NOT NULL,
    equipment_type equipment_type_enum NOT NULL,
    creator INTEGER DEFAULT NULL,
    is_overwriter BOOLEAN DEFAULT FALSE,
    overwriter_ref INTEGER DEFAULT NULL,
    FOREIGN KEY (overwriter_ref) REFERENCES program(id) ON DELETE
    SET NULL
);

CREATE TABLE split_exercise (
    id SERIAL PRIMARY KEY,
    split_id INTEGER NOT NULL,
    exercise_id INTEGER,
    sets INTEGER NOT NULL,
    reps INTEGER NOT NULL,
    exercise_order INTEGER,
    FOREIGN KEY (split_id) REFERENCES split (id) ON DELETE CASCADE,
    FOREIGN KEY (exercise_id) REFERENCES exercise (id) ON DELETE CASCADE
);

CREATE TABLE workout_log (
    id SERIAL PRIMARY KEY,
    user_id INTEGER,
    workout_id INTEGER NOT NULL,
    exercise_id INTEGER NOT NULL,
    set_number INTEGER NOT NULL,
    exercise_order INTEGER NOT NULL,
    target_reps INTEGER NOT NULL,
    performed_reps INTEGER DEFAULT NULL,
    weight_used DECIMAL(5, 2) DEFAULT NULL,
    one_rm DECIMAL(8, 5) DEFAULT NULL,
    logged BOOLEAN DEFAULT FALSE,
    locked BOOLEAN DEFAULT FALSE,
    notes TEXT,
    FOREIGN KEY (user_id) REFERENCES user_account (id) ON DELETE CASCADE,
    FOREIGN KEY (workout_id) REFERENCES workout (id) ON DELETE CASCADE,
    FOREIGN KEY (exercise_id) REFERENCES exercise (id) ON DELETE CASCADE
);