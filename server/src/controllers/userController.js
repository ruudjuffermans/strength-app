const { userHandler } = require('../handlers');

const getAll = async (req, res) => {
  const users = await userHandler.getAllUsers();
  res.status(200).json(users);
};

const approve = async (req, res) => {
  const { userId } = req.params;
  const updatedUser = await userHandler.approveUser(userId);
  res.status(200).json(updatedUser);
};

const disable = async (req, res) => {
  const { userId } = req.params;
  const updatedUser = await userHandler.disableUser(userId);
  res.status(200).json(updatedUser);
};

const remove = async (req, res) => {
  const { userId } = req.params;
  await userHandler.removeUser(userId);
  res.status(204).send();
};

const setRolePremium = async (req, res) => {
  const { userId } = req.params;
  await userHandler.setRolePremium(userId);
  res.status(204).send();
};

const setRoleUser = async (req, res) => {
  const { userId } = req.params;
  await userHandler.setRoleUser(userId);
  res.status(204).send();
};

module.exports = {
  getAll,
  approve,
  disable,
  remove,
  setRolePremium,
  setRoleUser
};
