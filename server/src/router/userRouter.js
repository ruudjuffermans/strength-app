const express = require('express');
const { userController } = require("../controllers");
const { asyncHandler } = require("../utils/asyncHandler");

const router = express.Router();

router.get("/profile", asyncHandler(userController.getUserProfile));

module.exports = router;
