const { workoutController } = require("../controllers");
const { asyncHandler } = require("../utils/asyncHandler");
const express = require('express');

const router = express.Router();

router.post("/create", asyncHandler(workoutController.createWorkout));
router.get("/:workoutId", asyncHandler(workoutController.getWorkoutById));
router.put("/:workoutId/complete", asyncHandler(workoutController.completeWorkout));
router.put("/:workoutId/order/:exerciseOrder/complete", asyncHandler(workoutController.completeExercise));
router.delete("/:workoutId", asyncHandler(workoutController.deleteWorkout));
router.get("/", asyncHandler(workoutController.getAllWorkouts));
router.put("/log/:logId", asyncHandler(workoutController.logSet));
router.put("/log/:logId/update", asyncHandler(workoutController.updateLoggedSet));
router.put("/log/:logId/update", asyncHandler(workoutController.updateLoggedSet));

module.exports = router;