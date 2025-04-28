const { workoutHandler } = require("../handlers");

const getAllWorkouts = async (req, res) => {
  console.log(req.user)
  const workouts = await workoutHandler.getAllWorkouts(req.user.id);
  res.status(200).json(workouts);
};

const createWorkout = async (req, res) => {
  const { splitId } = req.body;
  const newWorkout = await workoutHandler.createWorkoutFromSplit(splitId, req.user.id);
  res.status(201).json(newWorkout);
};

const getWorkoutById = async (req, res) => {
  const { workoutId } = req.params;
  const workout = await workoutHandler.getWorkoutById(workoutId);
  res.status(200).json(workout);
};

const completeWorkout = async (req, res) => {
  const { workoutId } = req.params;
  const { notes } = req.body;
  const updatedWorkout = await workoutHandler.completeWorkout(workoutId, notes);

  res.status(200).json(updatedWorkout);
};

const deleteWorkout = async (req, res) => {
  const { workoutId } = req.params;

  await workoutHandler.deleteWorkout(workoutId);

  res.status(204).send();
};

const logSet = async (req, res) => {
  const { logId } = req.params;
  const { performedReps, weightUsed } = req.body;

  const updatedLog = await workoutHandler.logSet(logId, performedReps, weightUsed);

  res.status(200).json(updatedLog);
};

const updateLoggedSet = async (req, res) => {
  const { logId } = req.params;
  const { performedReps, weightUsed } = req.body;

  const updatedLog = await workoutHandler.updateLoggedSet(logId, performedReps, weightUsed);

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
};
