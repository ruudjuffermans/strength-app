const bcrypt = require('bcrypt');
const pool = require('../db');

async function createAdminUser() {
    const email = 'base@example.com';
    const fullName = 'Base User';
    const password = 'SuperSecure456!';
    const hashedPassword = await bcrypt.hash(password, 10);

    const client = await pool.connect();
    try {
        const result = await client.query(
            `INSERT INTO user_account (
                email, full_name, password_hash, role, status, created_at, approved_at
            ) VALUES ($1, $2, $3, 'User', 'Approved', NOW(), NOW())
            ON CONFLICT (email) DO NOTHING
            RETURNING id;`,
            [email, fullName, hashedPassword]
        );

        if (result.rows.length) {
            console.log(`Base user created with ID ${result.rows[0].id}`);
        } else {
            console.log(`Base user already exists, skipping.`);
        }
    } catch (err) {
        console.error('Error creating base user:', err);
    } finally {
        client.release();
    }
}

createAdminUser()
