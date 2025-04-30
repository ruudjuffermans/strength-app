const pool = require('../db');
const { hashPassword } = require('../utils/cryptography');

async function createBaseUsers() {
    const users = [
        {
            id: 1,
            email: 'admin@example.com',
            firstname: 'Admin',
            lastname: 'User',
            password: 'SuperSecure123!',
            role: 'Admin'
        },
        {
            id: 2,
            email: 'base@example.com',
            firstname: 'Base',
            lastname: 'User',
            password: 'SuperSecure456!',
            role: 'User'
        },
        {
            id: 3,
            email: 'test@example.com',
            firstname: 'Test',
            lastname: 'User',
            password: 'SuperSecure789!',
            role: 'User'
        }
    ];

    const client = await pool.connect();
    try {
        for (const user of users) {
            const hashedPassword = await hashPassword(user.password);

            const result = await client.query(
                `INSERT INTO user_account (
                    id, email, firstname, lastname, password_hash, role, status, created_at, approved_at
                ) VALUES ($1, $2, $3, $4, $5, $6, 'Approved', NOW(), NOW())
                ON CONFLICT (email) DO NOTHING
                RETURNING id;`,
                [user.id, user.email, user.firstname, user.lastname, hashedPassword, user.role]
            );

            if (result.rows.length) {
                console.log(`User created: ${user.email} (ID: ${result.rows[0].id})`);
            } else {
                console.log(`ℹ User already exists, skipping: ${user.email}`);
            }
        }

        await client.query(
            `SELECT setval('user_account_id_seq', (SELECT MAX(id) FROM user_account));`
        );

        console.log('Sequence reset successfully.');
    } catch (err) {
        console.error('Error creating users:', err);
    } finally {
        client.release();
        pool.end();
    }
}

createBaseUsers()
