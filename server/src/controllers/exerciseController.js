const { exerciseHandler } = require('../handlers');

const getAllExercises = async (req, res) => {

  const exercises = await exerciseHandler.getAllExercises();
  res.status(200).json(exercises);

}

const getExerciseById = async (req, res) => {
  const { id } = req.params;
  const exercise = await exerciseHandler.getExerciseById(id);
  if (!exercise) {
    return res.status(404).json({ error: "Exercise not found." });
  }
  res.status(200).json(exercise);
}

const updateExercise = async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  const updatedExercise = await exerciseHandler.updateExercise(id, name, description);
  res.status(200).json(updatedExercise);
}

const createExercise = async (req, res) => {
  const { name, description, muscle_group, equipment_type } = req.body;
  const createdExercise = await exerciseHandler.createExercise(name, description, muscle_group, equipment_type);
  res.status(200).json(createdExercise);
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
