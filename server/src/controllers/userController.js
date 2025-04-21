const { userHandler } = require('../handlers');

const getAll = async (req, res) => {
  try {
    const users = await userHandler.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Failed to fetch users." });
  }
};

const approve = async (req, res) => {
  try {
    const { userId } = req.params;
    const updatedUser = await userHandler.approveUser(userId);
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error approving user:", error);
    res.status(500).json({ error: "Failed to approve user." });
  }
};

const disable = async (req, res) => {
  try {
    const { userId } = req.params;
    const updatedUser = await userHandler.disableUser(userId);
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error disabling user:", error);
    res.status(500).json({ error: "Failed to disable user." });
  }
};

const remove = async (req, res) => {
  try {
    const { userId } = req.params;
    await userHandler.removeUser(userId);
    res.status(204).send(); // No content
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Failed to delete user." });
  }
};

module.exports = {
  getAll,
  approve,
  disable,
  remove,
};
