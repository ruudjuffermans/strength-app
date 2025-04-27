const express = require('express');
const { exerciseController } = require("../controllers");
const { asyncHandler } = require("../utils/asyncHandler");

const router = express.Router();

router.get("/", asyncHandler(exerciseController.getAllExercises));
router.get("/:id", asyncHandler(exerciseController.getExerciseById));
router.put("/:id", asyncHandler(exerciseController.updateExercise));
router.post("/", asyncHandler(exerciseController.createExercise));
router.delete("/:id", asyncHandler(exerciseController.deleteExercise));

module.exports = router;