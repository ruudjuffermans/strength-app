const express = require('express');
const { authController } = require("../controllers");
const { asyncHandler } = require("../utils/asyncHandler");

const router = express.Router();

router.post("/register", asyncHandler(authController.register));
router.post("/login", asyncHandler(authController.login));
router.get("/me", asyncHandler(authController.getContext));
router.post("/logout", asyncHandler(authController.logout));
router.post("/forgot-password", asyncHandler(authController.forgotPassword));

module.exports = router;
