const express = require('express');
const { splitController } = require("../controllers");
const { asyncHandler } = require("../utils/asyncHandler");

const router = express.Router();

router.get("/:splitId", asyncHandler(splitController.getSplitById));
router.put("/:splitId/reorder/", asyncHandler(splitController.reorderSplitExercises));

router.post("/:splitId/add", asyncHandler(splitController.createSplitExercise));
router.put("/exercise/:exerciseSplitId", asyncHandler(splitController.updateSplitExercise));
router.delete("/exercise/:exerciseSplitId", asyncHandler(splitController.deleteSplitExercise));


module.exports = router;
