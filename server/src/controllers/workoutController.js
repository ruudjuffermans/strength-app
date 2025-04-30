const { workoutHandler } = require("../handlers");

const getAllWorkouts = async (req, res) => {
  const userId = req.user.id
  const { exerciseId } = req.params;
  const { name, description } = req.body;
  const workouts = await workoutHandler.getAllWorkouts(userId);
  res.status(200).json(workouts);
};

const createWorkout = async (req, res) => {
  const userId = req.user.id
  const { splitId } = req.params;
  const newWorkout = await workoutHandler.createWorkoutFromSplit(userId, splitId);
  res.status(201).json(newWorkout);
};

const getWorkoutById = async (req, res) => {
  const userId = req.user.id
  const { workoutId } = req.params;

  const workout = await workoutHandler.getWorkoutById(userId, workoutId);

  res.status(200).json(workout);
};

const completeWorkout = async (req, res) => {
  const userId = req.user.id
  const { workoutId } = req.params;
  const { notes } = req.body;

  const updatedWorkout = await workoutHandler.completeWorkout(userId, workoutId, notes);

  res.status(200).json(updatedWorkout);
};

const deleteWorkout = async (req, res) => {
  const userId = req.user.id
  const { workoutId } = req.params;

  await workoutHandler.deleteWorkout(userId, workoutId);

  res.status(204).send();
};

const completeExercise = async (req, res) => {
  const userId = req.user.id
  const { workoutId, exerciseOrder } = req.params;

  const updatedLog = await workoutHandler.completeExercise(userId, workoutId, exerciseOrder);

  res.status(200).json(updatedLog);
};

const logSet = async (req, res) => {
  const userId = req.user.id
  const { logId } = req.params;
  const { performedReps, weightUsed } = req.body;

  const updatedLog = await workoutHandler.logSet(userId, logId, performedReps, weightUsed);

  res.status(200).json(updatedLog);
};

const updateLoggedSet = async (req, res) => {
  const userId = req.user.id
  const { logId } = req.params;
  const { performedReps, weightUsed } = req.body;

  const updatedLog = await workoutHandler.updateLoggedSet(userId, logId, performedReps, weightUsed);

  res.status(200).json(updatedLog);
};

module.exports = {
  getAllWorkouts,
  createWorkout,
  getWorkoutById,
  deleteWorkout,
  completeWorkout,
  logSet,
  updateLoggedSet,
  completeExercise
};
