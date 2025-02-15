const { workoutHandler } = require("../handlers");

// ✅ 1️⃣ Create a new workout from a split
const createWorkoutFromSplit = async (req, res) => {
  try {
    const { splitId } = req.params;
    console.log(`Creating workout for splitId: ${splitId}`);

    const newWorkout = await workoutHandler.createWorkoutFromSplit(splitId);

    res.status(201).json(newWorkout);
  } catch (error) {
    console.error("Error creating workout:", error);
    res.status(500).json({ error: "Failed to create workout." });
  }
};

const getDraftWorkout = async (req, res) => {

  console.log("hit")
  const workout = await workoutHandler.getDraftWorkout();
  console.log(workout)
  if (!workout) {
    return res.status(200).json({ error: "Workout not found." });
  }

  res.status(200).json(workout);

};

const completeWorkout = async (req, res) => {
  try {

    const updatedWorkout = await workoutHandler.completeWorkout();

    res.status(200).json(updatedWorkout);
  } catch (error) {
    console.error("Error updating workout state:", error);
    res.status(500).json({ error: "Failed to update workout state." });
  }
};

// ✅ 4️⃣ Delete a workout
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
  createWorkoutFromSplit,
  getDraftWorkout,
  completeWorkout,
  deleteWorkout,
  logSet,
  updateLoggedSet,
};
