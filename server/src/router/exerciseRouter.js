const { exerciseController } = require("../controllers");
const { asyncHandler } = require("../utils/asyncHandler");

function exerciseRouter(app) {

    app.get(
        "/api/exercise",
        asyncHandler(exerciseController.getAllExercises)
    );

    app.get(
        "/api/exercise/:id",
        asyncHandler(exerciseController.getExerciseById)
    );

    app.put(
        "/api/exercise/:id",
        asyncHandler(exerciseController.updateExercise)
    );

    app.post(
        "/api/exercise",
        asyncHandler(exerciseController.createExercise)
    );

    app.delete(
        "/api/exercise/:id",
        asyncHandler(exerciseController.deleteExercise)
    );
}

module.exports = exerciseRouter;
