const { splitController } = require("../controllers");
const { asyncHandler } = require("../utils/asyncHandler");

function splitRouter(app) {
    app.get(
        "/split/:id",
        asyncHandler(splitController.getSplitById)
    );

    app.post(
        "/exercise-split/:splitId",
        asyncHandler(splitController.createSplitExercise)
    );

    app.put(
        "/exercise-split/:exerciseSplitId",
        asyncHandler(splitController.updateSplitExercise)
    );

    app.delete(
        "/exercise-split/:exerciseSplitId",
        asyncHandler(splitController.deleteSplitExercise)
    );

    app.put(
        "/exercise-split/reorder/:splitId",
        asyncHandler(splitController.reorderSplitExercises)
    );
}

module.exports = splitRouter;
