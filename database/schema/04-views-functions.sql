CREATE OR REPLACE FUNCTION copy_base_program_to_user(p_user_id INTEGER, p_base_program_id INTEGER)
RETURNS INTEGER AS $$
DECLARE
  new_user_program_id INTEGER;
BEGIN
  -- Insert a copy into user_program
  INSERT INTO user_program (user_id, base_program_id, program_state, name, description)
  SELECT 
    p_user_id, 
    bp.id, 
    'Creating', 
    bp.name, 
    bp.description
  FROM base_program bp
  WHERE bp.id = p_base_program_id
  RETURNING id INTO new_user_program_id;

  RETURN new_user_program_id;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE VIEW program AS
SELECT 
  up.id AS id,
  up.name AS name,
  up.description AS description,
  'user' AS source,
  up.user_id,
  up.program_state
FROM user_program up

UNION ALL

SELECT
  bp.id AS id,
  bp.name AS name,
  bp.description AS description,
  'base' AS source,
  NULL AS user_id,
  'Active' AS program_state
FROM base_program bp;

CREATE OR REPLACE VIEW exercise AS
SELECT 
  be.id,
  be.name,
  be.description,
  be.muscle_group,
  be.equipment_type,
  'base' AS source,
  NULL AS user_id,
  NULL AS base_exercise_id
FROM base_exercise be

UNION ALL

SELECT 
  ue.id,
  ue.name,
  ue.description,
  ue.muscle_group,
  ue.equipment_type,
  'user' AS source,
  ue.user_id,
  ue.base_exercise_id
FROM user_exercise ue;
