const pool = require("../db");

async function getAllPrograms() {
  const result = await pool.query(`
    SELECT 
      p.id AS program_id, 
      p.name AS program_name, 
      p.description AS program_description,
      s.id AS split_id, 
      s.name AS split_name,
      s.description AS split_description
    FROM program p
    LEFT JOIN split s ON p.id = s.program_id
  `);

  const programs = {};

  result.rows.forEach((row) => {
    const programId = row.program_id;

    if (!programs[programId]) {
      programs[programId] = {
        id: programId,
        name: row.program_name,
        description: row.program_description,
        splits: [],
      };
    }

    if (row.split_id) {
      programs[programId].splits.push({
        id: row.split_id,
        name: row.split_name,
        description: row.split_description,
      });
    }
  });

  return Object.values(programs); // Convert object to array
}


async function getProgramById(groupId) {
  const result = await pool.query(
    `SELECT * FROM program WHERE id = $1;`,
    [groupId]
  );

  return result.rows[0];
}

async function createProgram(name, description) {
  const result = await pool.query(
    `INSERT INTO program (name, description)
     VALUES ($1, $2) RETURNING *`,
    [name, description]
  );
  return result.rows[0];
}

async function updateProgram(id, name, description) {
  const result = await pool.query(
    `UPDATE program 
     SET name = $2, description = $3
     WHERE id = $1
     RETURNING *`,
    [id, name, description]
  );
  return result.rows[0];
}

async function deleteProgram(id) {
  const result = await pool.query(
    `DELETE FROM program
     WHERE id = $1
     RETURNING *`,
    [id]
  );
  return result.rows[0];
}

async function addSplit(programId, name, description) {
  const result = await pool.query(
    `INSERT INTO split (program_id, name, description)
     VALUES ($1, $2, $3)
     RETURNING *`,
    [programId, name, description]
  );
  return result.rows[0];
}


async function editSplit(splitId, name, description) {
  console.log(description)
  console.log(description)
  console.log(description)
  console.log(description)
  console.log(description)
  const result = await pool.query(
    `UPDATE split 
     SET name = $2,
     description = $3
     WHERE id = $1
     RETURNING *`,
    [splitId, name, description]
  );
  return result.rows[0];
}

async function removeSplit(splitId) {
  await pool.query(
    `DELETE FROM split 
     WHERE id = $1`,
    [splitId]
  );
}




module.exports = {
  createProgram,
  getProgramById,
  getAllPrograms,
  updateProgram,
  deleteProgram,
  editSplit,
  removeSplit,
  addSplit
};
