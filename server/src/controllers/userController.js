const { userHandler } = require('../handlers');
const { sendAccountApprovedMail } = require('../mail/sender');
const { generatePassword, hashPassword } = require('../utils/cryptography');

const getAll = async (req, res) => {
  const users = await userHandler.getAllUsers();
  res.status(200).json(users);
};

const approve = async (req, res) => {
  const adminId = req.user.id;
  const { userId } = req.params;

  const user = await userHandler.getPendingUserById(userId);
  if (user.rowCount === 0) {
    throw new Error("User not found or already approved");
  }
  const password = generatePassword()
  const hashedPassword = await hashPassword(password);
  console.log(password)

  await sendAccountApprovedMail(user.email, user.firstname, password);

  const updatedUser = await userHandler.approveUser(userId, hashedPassword, adminId);
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

const getUserProfile = async (req, res) => {
  const userId = req.user.id;
  const profile = await userHandler.getUserProfile(userId);
  res.status(200).send(profile);
};


module.exports = {
  getAll,
  approve,
  disable,
  remove,
  setRolePremium,
  setRoleUser,
  getUserProfile
};
