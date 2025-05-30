const express = require('express');
const { userController } = require("../controllers");
const { asyncHandler } = require("../utils/asyncHandler");

const router = express.Router();

router.get("/", asyncHandler(userController.getAll));
router.post("/approve/:userId", asyncHandler(userController.approve));
router.post("/disable/:userId", asyncHandler(userController.disable));
router.delete("/remove/:userId", asyncHandler(userController.remove));
router.delete("/set-role-premium/:userId", asyncHandler(userController.setRolePremium));
router.delete("/set-role-user/:userId", asyncHandler(userController.setRoleUser));

module.exports = router;
