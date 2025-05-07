CREATE TABLE user_account (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    firstname VARCHAR(255),
    lastname VARCHAR(255),
    password_hash TEXT DEFAULT NULL,
    role user_role_enum DEFAULT 'User',
    status user_status_enum DEFAULT 'Pending',
    created_at TIMESTAMP DEFAULT NOW(),
    active_program INTEGER DEFAULT 1,
    active_workout INTEGER DEFAULT NULL,
    approved_at TIMESTAMP,
    approved_by INTEGER,
    reset_password_token VARCHAR(255) DEFAULT NULL,
    reset_password_expires TIMESTAMP DEFAULT NULL,
    FOREIGN KEY (approved_by) REFERENCES user_account(id) ON DELETE SET NULL
);

CREATE TABLE user_settings (
    user_id INTEGER PRIMARY KEY,
    theme theme_enum DEFAULT 'dark',
    preferred_units units_enum DEFAULT 'metric',
    newsletter_subscribed BOOLEAN DEFAULT FALSE,
    cookie_consent cookie_consent_enum DEFAULT NULL,
    FOREIGN KEY (user_id) REFERENCES user_account(id) ON DELETE CASCADE
);

CREATE TABLE user_weight_log (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    weight DECIMAL(5, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY (user_id) REFERENCES user_account(id) ON DELETE CASCADE
);
