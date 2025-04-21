const { workoutHandler } = require("../handlers");

const getAllWorkouts = async (req, res) => {
  const workouts = await workoutHandler.getAllWorkouts();
  res.status(200).json(workouts);
};

const createWorkout = async (req, res) => {
  const { splitId } = req.body;
    const newWorkout = await workoutHandler.createWorkoutFromSplit(splitId);
    res.status(201).json(newWorkout);
};

const getWorkoutById = async (req, res) => {
    const { workoutId } = req.params;
    const workout = await workoutHandler.getWorkoutById(workoutId);
    res.status(200).json(workout);
};

const completeWorkout = async (req, res) => {
  try {
    const { workoutId } = req.params;
    const { notes } = req.body;
    console.log(notes)
    const updatedWorkout = await workoutHandler.completeWorkout(workoutId, notes);

    res.status(200).json(updatedWorkout);
  } catch (error) {
    console.error("Error updating workout state:", error);
    res.status(500).json({ error: "Failed to update workout state." });
  }
};

const deleteWorkout = async (req, res) => {
  try {
    const { workoutId } = req.params;
    console.log(`Deleting workout with ID: ${workoutId}`);

    await workoutHandler.deleteWorkout(workoutId);

    res.status(204).send();
  } catch (error) {
    console.error("Error deleting workout:", error);
    res.status(500).json({ error: "Failed to delete workout." });
  }
};

const logSet = async (req, res) => {
  try {
    const { logId } = req.params;
    const { performedReps, weightUsed } = req.body;

    const updatedLog = await workoutHandler.logSet(logId, performedReps, weightUsed);

    res.status(200).json(updatedLog);
  } catch (error) {
    console.error("Error logging set:", error);
    res.status(500).json({ error: "Failed to log set." });
  }
};

// ✅ 6️⃣ Update a logged set
const updateLoggedSet = async (req, res) => {
  try {
    const { logId } = req.params;
    const { performedReps, weightUsed } = req.body;

    console.log(`Updating logged set ${logId}`);

    const updatedLog = await workoutHandler.updateLoggedSet(logId, performedReps, weightUsed);

    res.status(200).json(updatedLog);
  } catch (error) {
    console.error("Error updating logged set:", error);
    res.status(500).json({ error: "Failed to update logged set." });
  }
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
