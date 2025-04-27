const express = require('express');
const { programController } = require("../controllers");
const { asyncHandler } = require("../utils/asyncHandler");

const router = express.Router();

router.get("/:id", asyncHandler(programController.getProgramById));
router.post("/:id/activate", asyncHandler(programController.activateProgram));
router.get("/", asyncHandler(programController.getAllPrograms));
router.put("/:id", asyncHandler(programController.updateProgram));
router.post("/", asyncHandler(programController.createProgram));
router.delete("/:id", asyncHandler(programController.deleteProgram));

router.post("/split/:programId", asyncHandler(programController.addSplit));
router.put("/split/:splitId", asyncHandler(programController.editSplit));
router.delete("/split/:splitId", asyncHandler(programController.removeSplit));

module.exports = router;
