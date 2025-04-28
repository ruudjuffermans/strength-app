const { authHandler } = require('../handlers');
const { sendConfirmationMail, sendResetPasswordMail } = require('../mail/sender.js');
const AppError = require('../utils/appError.js');
const config = require('../utils/config.js');
const { hashPassword, createRegistryToken, decodeToken, comparePassword, createAccessToken, createResetToken, verifyToken } = require('../utils/cryptography.js');

const register = async (req, res) => {
  const { email, firstname, lastname, password } = req.body;

  const hashedPassword = await hashPassword(password);
  const user = await authHandler.register({ email, firstname, lastname, password: hashedPassword });
  await authHandler.createDefaultUserSettings(user.id);
  const registrytoken = await createRegistryToken({email : user.email})
  await sendConfirmationMail(email, firstname, registrytoken);
  res.status(200).json(user);
};

const activate = async (req, res) => {
  const { code } = req.body;
  const { email } = await decodeToken(code)
  const user = await authHandler.getUserByEmail(email);
  await authHandler.setVerified(user.id);
  return res.status(200)
};

const login = async (req, res) => {
  const {email, password} = req.body;

  const user = await authHandler.getUserByEmail(email);
  if (!user) {
    throw new AppError("Invalid email or password", 401); // User not found
  }

  if (user.status === 'Pending') {
    throw new AppError("Account is still pending approval", 403); // Pending user
  }

  if (user.status === 'Rejected') {
    throw new AppError("Account has been rejected", 403); // Rejected user
  }

  const valid = await comparePassword(password, user.password_hash);
  if (!valid) {
    throw new AppError("Invalid email or password", 401); // Invalid password
  }

  const token = createAccessToken(user);

  res.cookie("token", token, {
    httpOnly: true,
    secure: false,
    sameSite: "Lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.status(200).json(user);
};

const getContext = async (req, res) => {
  const token = req.cookies?.token;
  if (token) {
    const ctx = await decodeToken(token)

    const user = await authHandler.getUserById(ctx.id);
    return res.status(200).json(user);
  }
  res.status(401).json({ message: "Unauthorized: Invalid or expired token" });
};

const logout = async (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: config.ENV === "production" ? true : false,
    sameSite: "Lax",
  })
  res.status(200).json({ message: "Logged out successfully." });
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  const user = await authHandler.getUserByEmail(email);

  if (!user) {
    return res.status(200).json({ message: "If that email is registered, you'll receive a reset link." });
  }

  const resetToken = createResetToken({ id: user.id, email: user.email });

  const resetUrl = `${config.CLIENT_URL}/reset-password/${resetToken}`;
  await sendResetPasswordMail(email, user.firstname, resetUrl);

  res.status(200).json({ message: "Reset link sent to email if registered." });
};

const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  let decoded;
  try {
    decoded = verifyToken(token);
  } catch (error) {
    throw new AppError("Reset token is invalid or has expired.", 400);
  }

  const user = await authHandler.getUserById(decoded.id);
  if (!user) {
    throw new AppError("User not found.", 404);
  }

  const newPasswordHash = await hashPassword(password);

  await authHandler.updatePassword(user.id, newPasswordHash);

  res.status(200).json({ message: "Password has been reset successfully!" });
};

module.exports = {
  register,
  activate,
  login,
  getContext,
  logout,
  forgotPassword,
  resetPassword,
};