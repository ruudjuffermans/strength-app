const pool = require('../db');
const { hashPassword } = require('../utils/cryptography');

async function createAdminUser() {
    const email = 'admin@example.com';
    const firstname = 'Admin';
    const lastname = 'User';
    const password = 'SuperSecure123!';
    const hashedPassword = await hashPassword(password)

    const client = await pool.connect();
    try {
        const result = await client.query(
            `INSERT INTO user_account (
                id, email, firstname, lastname, password_hash, role, status, created_at, approved_at
            ) VALUES (1, $1, $2, $3, $4, 'Admin', 'Approved', NOW(), NOW())
            ON CONFLICT (email) DO NOTHING
            RETURNING id;`,
            [email, firstname, lastname, hashedPassword]
        );
        
        await client.query(
            `SELECT setval('user_account_id_seq', (SELECT MAX(id) FROM user_account));`,
            []
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
