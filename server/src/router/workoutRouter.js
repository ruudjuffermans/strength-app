const { workoutController } = require("../controllers");
const { asyncHandler } = require("../utils/asyncHandler");
const express = require('express');

const router = express.Router();

router.post("/create", asyncHandler(workoutController.createWorkout));
router.get("/:workoutId", asyncHandler(workoutController.getWorkoutById));
router.put("/:workoutId/complete", asyncHandler(workoutController.completeWorkout));
router.delete("/:workoutId", asyncHandler(workoutController.deleteWorkout));
router.get("/", asyncHandler(workoutController.getAllWorkouts));
router.put("/log/:logId", asyncHandler(workoutController.logSet));

module.exports = router;