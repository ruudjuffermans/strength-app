const bcrypt = require('bcrypt');
const pool = require('../db');

async function createAdminUser() {
    const email = 'admin@example.com';
    const fullName = 'Admin User';
    const password = 'SuperSecure123!';
    const hashedPassword = await bcrypt.hash(password, 10);

    const client = await pool.connect();
    try {
        const result = await client.query(
            `INSERT INTO user_account (
                id, email, full_name, password_hash, role, status, created_at, approved_at
            ) VALUES (1, $1, $2, $3, 'Admin', 'Approved', NOW(), NOW())
            ON CONFLICT (email) DO NOTHING
            RETURNING id;`,
            [email, fullName, hashedPassword]
        );

        if (result.rows.length) {
            console.log(`Admin user created with ID ${result.rows[0].id}`);
        } else {
            console.log(`ℹAdmin user already exists, skipping.`);
        }
    } catch (err) {
        console.error('Error creating admin user:', err);
    } finally {
        client.release();
        pool.end();
    }
}

createAdminUser()
