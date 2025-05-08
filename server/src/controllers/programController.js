const { programHandler, splitHandler, splitExerciseHandler, userHandler, workoutHandler } = require('../handlers');
const AppError = require('../utils/appError');

const getAllPrograms = async (req, res) => {
  const userId = req.user.id;
  
  const programs = await programHandler.getAllPrograms(userId);
  res.status(200).json(programs);
}

const createUserProgram = async (req, res) => {
  const userId = req.user.id;
  const { name, description } = req.body;

  const createdProgram = await programHandler.createProgram(userId, name, description);
  res.status(200).json(createdProgram);
}

const getProgramById = async (req, res) => {
  const userId = req.user.id;
  const { programId } = req.params;

  const program = await programHandler.getProgramById(userId, programId);
  if (!program) {
    return res.status(404).json({ error: "Program not found." });
  }

  const splits = await splitHandler.getSplitsByProgramId(programId);

  for (const split of splits) {
    const exercises = await splitExerciseHandler.getExercisesBySplitId(split.id);
    split.exercises = exercises;
  }

  program.splits = splits;
  res.status(200).json(program);
};

const updateUserProgram = async (req, res) => {
  const userId = req.user.id;
  const { programId } = req.params;
  const { name, description } = req.body;

  const updatedProgram = await programHandler.updateUserProgram(userId, programId, name, description);
  res.status(200).json(updatedProgram);
}


const createWorkout = async (req, res) => {
  const userId = req.user.id
  const { splitId } = req.params;
  const newWorkout = await workoutHandler.createWorkoutFromSplit(userId, splitId);
  res.status(201).json(newWorkout);
};

const deleteUserProgram = async (req, res) => {
  const userId = req.user.id;
  const { programId } = req.params;

  await programHandler.deleteUserProgram(userId, programId);
  res.status(200).json();
}

const activateProgram = async (req, res) => {
  const userId = req.user.id;
  const { programId } = req.params;

  const program = await userHandler.setActiveProgram(userId, programId);

  if (!program) {
    throw new AppError('Program not found or not owned by user.', 404);
  }

  const activatedProgram = await userHandler.setActiveProgram(userId, programId);
  res.status(200).json(activatedProgram);
}

const createSplit = async (req, res) => {
  const userId = req.user.id;
  const { programId } = req.params;
  const { name, description } = req.body;

  const program = await programHandler.getProgramById(userId, programId);

  if (!program) {
    throw new AppError('Program not found or not owned by user.', 404);
  }

  const updatedProgram = await splitHandler.createSplit(programId, name, description);
  res.status(200).json(updatedProgram);
};


const updateSplit = async (req, res) => {
  const userId = req.user.id;
  const { programId, splitId } = req.params;
  const { name, description } = req.body;

  const program = await programHandler.getProgramById(userId, programId);

  if (!program) {
    throw new AppError('Program not found or not owned by user.', 404);
  }

  const updatedProgram = await splitHandler.updateSplit(splitId, name, description);
  res.status(200).json(updatedProgram);
};

const deleteSplit = async (req, res) => {
  const userId = req.user.id;
  const { programId, splitId } = req.params;

  const program = await programHandler.getProgramById(userId, programId);

  if (!program) {
    throw new AppError('Program not found or not owned by user.', 404);
  }

  await splitHandler.deleteSplit(splitId);
  res.status(200).json({ message: 'Split deleted successfully.' });
};

const createUserExercise = async (req, res) => {
  const userId = req.user.id;
  const { programId, splitId } = req.params;
  const { exerciseId, sets, reps } = req.body

  const program = await programHandler.getProgramById(userId, programId);

  if (!program) {
    throw new AppError('Program not found or not owned by user.', 404);
  }

  const createdExerciseSplit = await splitExerciseHandler.createExercise(splitId, exerciseId, sets, reps);
  res.status(201).json(createdExerciseSplit);
};

const updateUserExercise = async (req, res) => {
  const userId = req.user.id;
  const { programId, splitId, exerciseId } = req.params;
  const { reps, sets } = req.body

  const program = await programHandler.getProgramById(userId, programId);

  if (!program) {
    throw new AppError('Program not found or not owned by user.', 404);
  }

  const updatedExerciseSplit = await splitExerciseHandler.updateExercise(splitId, exerciseId, reps, sets);
  res.status(201).json(updatedExerciseSplit);
};

const deleteUserExercise = async (req, res) => {
  const userId = req.user.id;
  const { programId, splitId, exerciseId } = req.params;

  const program = await programHandler.getProgramById(userId, programId);

  if (!program) {
    throw new AppError('Program not found or not owned by user.', 404);
  }

  await splitExerciseHandler.deleteExercise(splitId, exerciseId);
  res.status(201).json();
};

const reorderExercises = async (req, res) => {
  const { programId, splitId } = req.params;
  const exercises = req.body;

  if (!Array.isArray(exercises)) {
    return res.status(400).json({ error: "Invalid format. Expected { exercises: [...] }" });
  }

  await splitExerciseHandler.reorderExercises(programId, splitId, exercises);
  res.status(200).json({ message: "Order updated successfully." });
};

module.exports = {
  getAllPrograms,
  getProgramById,
  createUserProgram,
  updateUserProgram,
  deleteUserProgram,
  activateProgram,
  createSplit,
  updateSplit,
  deleteSplit,
  createUserExercise,
  updateUserExercise,
  deleteUserExercise,
  reorderExercises,
  createWorkout
};
