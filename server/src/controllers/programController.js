const { programHandler } = require('../handlers');

const getAllPrograms = async (req, res) => {
  try {
    const exercises = await programHandler.getAllPrograms(req.user.id);
    res.status(200).json(exercises);
  } catch (error) {
    console.error("Error fetching all programs:", error);
    res.status(500).json(error);
  }
}

const getProgramById = async (req, res) => {
  const { id } = req.params;
  const program = await programHandler.getProgramById(id);
  if (!program) {
    return res.status(404).json({ error: "Program not found." });
  }
  res.status(200).json(program);
}

const createProgram = async (req, res) => {
  const { name, description } = req.body;
  console.log("hit")
  const createdProgram = await programHandler.createProgram(name, description, req.user.id);
  res.status(200).json(createdProgram);
}

const activateProgram = async (req, res) => {
  const { id } = req.params;
  const ctx = req.user;

  const updatedProgram = await programHandler.activateProgram(id, ctx.id);
  res.status(200).json(updatedProgram);
}

const updateProgram = async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  const updatedProgram = await programHandler.updateProgram(id, name, description);
  res.status(200).json(updatedProgram);
}

const deleteProgram = async (req, res) => {
  const { id } = req.params;
  await programHandler.deleteProgram(id);
  res.status(200).json();
}

const addSplit = async (req, res) => {
  const { programId } = req.params;
  const { name, description } = req.body;
  const updatedProgram = await programHandler.addSplit(programId, name, description);
  res.status(200).json(updatedProgram);
}

const editSplit = async (req, res) => {
  const { splitId } = req.params;
  const { name, description } = req.body;
  const updatedProgram = await programHandler.editSplit(splitId, name, description);
  res.status(200).json(updatedProgram);
}

const removeSplit = async (req, res) => {
  const { splitId } = req.params;
  await programHandler.removeSplit(splitId);
  res.status(200).json();
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
