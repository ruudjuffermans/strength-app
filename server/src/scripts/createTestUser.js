const bcrypt = require('bcrypt');
const pool = require('../db');

async function createTestUser() {
    const email = 'test@example.com';
    const fullName = 'Test User';
    const password = 'SuperSecure789!';
    const hashedPassword = await bcrypt.hash(password, 10);

    const client = await pool.connect();
    try {
        
        const result = await client.query(
            `INSERT INTO user_account (
                id, email, full_name, password_hash, role, status, created_at, approved_at, active_program
            ) VALUES (3, $1, $2, $3, 'User', 'Approved', NOW(), NOW(), 3)
            ON CONFLICT (email) DO NOTHING
            RETURNING id;`,
            [email, fullName, hashedPassword]
        );

        if (result.rows.length) {
            console.log(`Test user created with ID ${result.rows[0].id}`);
        } else {
            console.log(`Test user already exists, skipping.`);
        }
    } catch (err) {
        console.error('Error creating test user:', err);
    } finally {
        client.release();
        pool.end(); 
    }
}

createTestUser()
