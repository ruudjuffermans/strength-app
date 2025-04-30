const express = require('express');
const { programController } = require("../controllers");
const { asyncHandler } = require("../utils/asyncHandler");

const router = express.Router();

router.get("/", asyncHandler(programController.getAllPrograms));
router.get("/:programId/source/:source", asyncHandler(programController.getProgramById));
router.post("/", asyncHandler(programController.createUserProgram));
router.put("/:programId", asyncHandler(programController.updateUserProgram));
router.delete("/:programId", asyncHandler(programController.deleteUserProgram));

router.post("/:programId/add-split", asyncHandler(programController.createSplit));
router.put("/:programId/split:splitId", asyncHandler(programController.updateSplit));
router.delete("/:programId/split/:splitId", asyncHandler(programController.deleteSplit));

router.post("/:programId/split/:splitId/add-exercise", asyncHandler(programController.createUserExercise));
router.put("/:programId/split/:splitId/exercise/:exerciseId", asyncHandler(programController.updateUserExercise));
router.delete("/:programId/split/:splitId/exercise/:exerciseId", asyncHandler(programController.deleteUserExercise));
router.put("/:programId/split/:splitId", asyncHandler(programController.reorderExercises));

module.exports = router;
