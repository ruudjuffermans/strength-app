const { exerciseController } = require("../controllers");
const { asyncHandler } = require("../utils/asyncHandler");

function exerciseRouter(app) {

    app.get(
        "/exercise",
        asyncHandler(exerciseController.getAllExercises)
    );

    app.get(
        "/exercise/:id",
        asyncHandler(exerciseController.getExerciseById)
    );

    app.put(
        "/exercise/:id",
        asyncHandler(exerciseController.updateExercise)
    );

    app.post(
        "/exercise",
        asyncHandler(exerciseController.createExercise)
    );

    app.delete(
        "/exercise/:id",
        asyncHandler(exerciseController.deleteExercise)
    );
}

module.exports = exerciseRouter;
