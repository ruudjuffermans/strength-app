const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const crypto = require('crypto');
const config = require("./config.js");

const salt = bcrypt.genSaltSync(10, "b");

const hashPassword = (plainPassword) => {
  return bcrypt.hash(plainPassword, salt);
};

const comparePassword = (plainPassword, hash) => {
  return bcrypt.compare(plainPassword, hash);
};

const signToken = (payload, expiresIn) => {
  return jwt.sign(payload, config.TOKEN_SECRET, { expiresIn });
};

const createRegistryToken = (payload) => {
  return signToken({ payload }, "45m");
};

const createAccessToken = (payload) => {
  return signToken({ payload }, "7m");
};

const createResetToken = (payload) => {
  return signToken(payload, '15m');
};

const createRefreshToken = (payload) => {
  return signToken({ ...payload }, "7d");
};

const decodeToken = (token) => {
  return jwt.decode(token, config.TOKEN_SECRET).payload;
};

const verifyToken = (token) => {
  return jwt.verify(token, config.TOKEN_SECRET);
};

module.exports = {
  hashPassword,
  comparePassword,
  createRegistryToken,
  createResetToken,
  createAccessToken,
  createRefreshToken,
  decodeToken,
  verifyToken,
};
