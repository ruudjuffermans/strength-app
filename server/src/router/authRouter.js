const express = require('express');
const { authController } = require("../controllers");
const { asyncHandler } = require("../utils/asyncHandler");

const router = express.Router();

router.post("/register", asyncHandler(authController.register));
router.post("/activate", asyncHandler(authController.activate));
router.post("/login", asyncHandler(authController.login));
router.get("/me", asyncHandler(authController.getContext));
router.post("/logout", asyncHandler(authController.logout));
router.post("/forgot-password", asyncHandler(authController.forgotPassword));
router.post("/reset-password/:token", asyncHandler(authController.resetPassword));

module.exports = router;
