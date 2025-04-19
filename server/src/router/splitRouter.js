const { splitController } = require("../controllers");
const { asyncHandler } = require("../utils/asyncHandler");

function splitRouter(app) {
    app.get(
        "/api/split/:id",
        asyncHandler(splitController.getSplitById)
    );

    app.post(
        "/api/exercise-split/:splitId",
        asyncHandler(splitController.createSplitExercise)
    );

    app.put(
        "/api/exercise-split/:exerciseSplitId",
        asyncHandler(splitController.updateSplitExercise)
    );

    app.delete(
        "/api/exercise-split/:exerciseSplitId",
        asyncHandler(splitController.deleteSplitExercise)
    );
}

module.exports = splitRouter;
