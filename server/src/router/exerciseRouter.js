const express = require('express');
const { exerciseController } = require("../controllers");
const { asyncHandler } = require("../utils/asyncHandler");

const router = express.Router();

router.get("/", asyncHandler(exerciseController.getAllExercises));
router.get("/:exerciseId/source/:source", asyncHandler(exerciseController.getExerciseById));
router.post("/", asyncHandler(exerciseController.createExercise));
router.put("/:exerciseId", asyncHandler(exerciseController.updateExercise));
router.delete("/:exerciseId", asyncHandler(exerciseController.deleteExercise));

module.exports = router;