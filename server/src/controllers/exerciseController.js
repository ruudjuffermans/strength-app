const { exerciseHandler } = require('../handlers');

const getAllExercises = async (req, res) => {
  const userId = req.user.id
  const exercises = await exerciseHandler.getAllExercises(userId);
  res.status(200).json(exercises);

}
const getExerciseById = async (req, res) => {
  const userId = req.user.id
  const { source, exerciseId } = req.params;

  const exercise = await exerciseHandler.getExerciseById(userId, source, exerciseId);
  if (!exercise) {
    return res.status(404).json({ error: "Exercise not found." });
  }
  res.status(200).json(exercise);
}

const createExercise = async (req, res) => {
  const userId = req.user.id
  const { name, description, muscle_group, equipment_type } = req.body;

  const createdExercise = await exerciseHandler.createExercise(userId, name, description, muscle_group, equipment_type, userId);
  res.status(200).json(createdExercise);
}

const updateExercise = async (req, res) => {
  const userId = req.user.id
  const { exerciseId } = req.params;
  const { name, description } = req.body;

  const updatedExercise = await exerciseHandler.updateExercise(userId, exerciseId, name, description);
  res.status(200).json(updatedExercise);
}

const deleteExercise = async (req, res) => {
  const userId = req.user.id
  const { exerciseId } = req.params;

  const deletedExercise = await exerciseHandler.deleteUserExercise(userId, exerciseId);
  res.status(200).json(deletedExercise);
}

module.exports = {
  getAllExercises,
  getExerciseById,
  updateExercise,
  createExercise,
  deleteExercise
};
