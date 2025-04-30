CREATE TYPE muscle_group_enum AS ENUM (
    'Chest',
    'Triceps',
    'Back',
    'Biceps',
    'Calves',
    'Quads',
    'Glutes',
    'Forearms',
    'Hamstrings',
    'Shoulders',
    'Abs'
);

CREATE TYPE equipment_type_enum AS ENUM (
    'Bodyweight',
    'Barbell',
    'Machine',
    'Dumbbell',
    'Cable',
    'Smith Machine'
);

CREATE TYPE workout_state_enum AS ENUM ('Active', 'Completed');

CREATE TYPE program_state_enum AS ENUM ('Creating', 'Active');

CREATE TYPE user_role_enum AS ENUM ('User', 'Admin', 'Premium');

CREATE TYPE user_status_enum AS ENUM ('Pending', 'Verified', 'Approved', 'Rejected');

CREATE TYPE theme_enum AS ENUM ('light', 'dark');

CREATE TYPE units_enum AS ENUM ('metric', 'imperial');

CREATE TYPE cookie_consent_enum AS ENUM ('accepted', 'rejected');
