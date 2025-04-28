const pool = require('../db');
const { hashPassword } = require('../utils/cryptography');

async function createBaseUser() {
    const email = 'base@example.com';
    const firstname = 'Base';
    const lastname = 'User';
    const password = 'SuperSecure456!';
    const hashedPassword = await hashPassword(password)

    const client = await pool.connect();
    try {
        
        const result = await client.query(
            `INSERT INTO user_account (
                id, email, firstname, lastname, password_hash, role, status, created_at, approved_at
            ) VALUES (2, $1, $2, $3, $4, 'User', 'Approved', NOW(), NOW())
            ON CONFLICT (email) DO NOTHING
            RETURNING id;`,
            [email, firstname, lastname, hashedPassword]
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
        pool.end(); 
    }
}

createBaseUser()