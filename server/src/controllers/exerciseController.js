const { exerciseHandler } = require('../handlers');

const getAllExercises = async (req, res) => {
  try {
    const exercises = await exerciseHandler.getAllExercises();
    res.status(200).json(exercises);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
}

const getExerciseById = async (req, res) => {
  try {
    const { id } = req.params;
    const exercise = await exerciseHandler.getExerciseById(id);
    if (!exercise) {
      return res.status(404).json({ error: "Exercise not found." });
    }
    res.status(200).json(exercise);
  } catch (error) {
    console.error("Error fetching exercise by ID:", error);
    res.status(500).json(error);
  }
}

const updateExercise = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;
    const updatedExercise = await exerciseHandler.updateExercise(id, name, description);
    res.status(200).json(updatedExercise);
  } catch (error) {
    console.error("Error updating exercise:", error);
    res.status(500).json(error);
  }
}

const createExercise = async (req, res) => {
  try {
    const { name, description } = req.body;
    const createdExercise = await exerciseHandler.createExercise(name, description);
    res.status(200).json(createdExercise);
  } catch (error) {
    console.error("Error creating exercise:", error);
    res.status(500).json(error);
  }
}

const deleteExercise = async (req, res) => {

    const { id } = req.params;
    await exerciseHandler.deleteExercise(id);
    res.status(200).json();
}

module.exports = {
  getAllExercises,
  getExerciseById,
  updateExercise,
  createExercise,
  deleteExercise
};
