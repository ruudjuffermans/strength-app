CREATE TYPE user_role_enum AS ENUM (
    'User', 'Admin'
);

CREATE TYPE user_status_enum AS ENUM (
    'Pending', 'Approved', 'Rejected'
);

CREATE TABLE user_account (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    full_name VARCHAR(255),
    password_hash TEXT,
    role user_role_enum DEFAULT 'User',
    status user_status_enum DEFAULT 'Pending',
    created_at TIMESTAMP DEFAULT NOW(),
    approved_at TIMESTAMP,
    approved_by INTEGER,
    FOREIGN KEY (approved_by) REFERENCES user_account(id) ON DELETE SET NULL
);