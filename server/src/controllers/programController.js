const { programHandler } = require('../handlers');

const getAllPrograms = async (req, res) => {
  try {
    const exercises = await programHandler.getAllPrograms(req.user.userId);
    res.status(200).json(exercises);
  } catch (error) {
    console.error("Error fetching all programs:", error);
    res.status(500).json(error);
  }
}

const getProgramById = async (req, res) => {
  try {
    const { id } = req.params;
    const program = await programHandler.getProgramById(id);
    if (!program) {
      return res.status(404).json({ error: "Program not found." });
    }
    res.status(200).json(program);
  } catch (error) {
    console.error("Error fetching program by ID:", error);
    res.status(500).json(error);
  }
}

const createProgram = async (req, res) => {
  try {
    const { name, description } = req.body;
    const createdProgram = await programHandler.createProgram(name, description);
    res.status(200).json(createdProgram);
  } catch (error) {
    console.error("Error updating program:", error);
    res.status(500).json(error);
  }
}

const activateProgram = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.user;
    const updatedProgram = await programHandler.activateProgram(id, userId);
    res.status(200).json(updatedProgram);
  } catch (error) {
    console.error("Error updating program:", error);
    res.status(500).json(error);
  }
}

const updateProgram = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;
    const updatedProgram = await programHandler.updateProgram(id, name, description);
    res.status(200).json(updatedProgram);
  } catch (error) {
    console.error("Error updating program:", error);
    res.status(500).json(error);
  }
}

const deleteProgram = async (req, res) => {
  try {
    const { id } = req.params;
    await programHandler.deleteProgram(id);
    res.status(200).json();
  } catch (error) {
    console.error("Error deleting program:", error);
    res.status(500).json(error);
  }
}

const addSplit = async (req, res) => {
  try {
    const { programId } = req.params;
    const { name, description } = req.body;
    const updatedProgram = await programHandler.addSplit(programId, name, description);
    res.status(200).json(updatedProgram);
  } catch (error) {
    console.error("Error adding split:", error);
    res.status(500).json(error);
  }
}

const editSplit = async (req, res) => {
  try {
    const { splitId } = req.params;
    const { name, description } = req.body;
    const updatedProgram = await programHandler.editSplit(splitId, name, description);
    res.status(200).json(updatedProgram);
  } catch (error) {
    console.error("Error updating split:", error);
    res.status(500).json(error);
  }
}

const removeSplit = async (req, res) => {
  try {
    const { splitId } = req.params;
    await programHandler.removeSplit(splitId);
    res.status(200).json();
  } catch (error) {
    console.error("Error removing split:", error);
    res.status(500).json(error);
  }
}


module.exports = {
  getAllPrograms,
  getProgramById,
  createProgram,
  updateProgram,
  deleteProgram,
  activateProgram,
  addSplit,
  editSplit,
  removeSplit
};
