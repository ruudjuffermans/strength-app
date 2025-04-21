const splitHandler = require('../handlers/splitHandler');

const getSplitById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id)
    const split = await splitHandler.getSplitById(id);
    if (!split) {
      return res.status(404).json({ error: "Split not found." });
    }
    res.status(200).json(split);
  } catch (error) {
    console.error("Error fetching split by ID:", error);
    res.status(500).json(error);
  }
}

const createSplitExercise = async (req, res) => {
  const { splitId } = req.params;
  const { exerciseId, sets, reps } = req.body

  console.log(req.body)
  console.log(splitId, exerciseId, sets, reps)

  const createdExerciseSplit = await splitHandler.addExercise(splitId, exerciseId, sets, reps);

  res.status(201).json(createdExerciseSplit);
};

const updateSplitExercise = async (req, res) => {
  const { exerciseSplitId } = req.params;
  const { reps, sets } = req.body
  const updatedExerciseSplit = await splitHandler.editExercise(exerciseSplitId, reps, sets);

  res.status(201).json(updatedExerciseSplit);
};

const deleteSplitExercise = async (req, res) => {
  const { exerciseSplitId } = req.params;
  console.log(exerciseSplitId)
  await splitHandler.removeExercise(exerciseSplitId);
  
  res.status(201).json();
};

const reorderSplitExercises = async (req, res) => {
  const { splitId } = req.params;
  const exercises = req.body; // Destructure from object

  console.log(exercises)

  try {
    if (!Array.isArray(exercises)) {
      return res.status(400).json({ error: "Invalid format. Expected { exercises: [...] }" });
    }

    await splitHandler.reorderExercises(splitId, exercises);
    res.status(200).json({ message: "Order updated successfully." });
  } catch (error) {
    console.error("Error reordering exercises:", error);
    res.status(500).json({ error: "Failed to reorder exercises." });
  }
};


module.exports = { 
  getSplitById,
  createSplitExercise,
  updateSplitExercise,
  deleteSplitExercise,
  reorderSplitExercises
};
