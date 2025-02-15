const { workoutController } = require("../controllers");
const { asyncHandler } = require("../utils/asyncHandler");

function workoutRouter(app) {

    app.post(
        "/api/workouts/:splitId",
        asyncHandler(workoutController.createWorkoutFromSplit)
    );

    app.get(
        "/api/workouts",
        asyncHandler(workoutController.getDraftWorkout)
    );

    app.put(
        "/api/workouts/complete",
        asyncHandler(workoutController.completeWorkout)
    );

    app.delete(
        "/api/workouts/:workoutId",
        asyncHandler(workoutController.deleteWorkout)
    );

    app.patch(
        "/api/log/:logId",
        asyncHandler(workoutController.logSet)
    );

    app.patch(
        "/api/log/:logId/update",
        asyncHandler(workoutController.updateLoggedSet)
    );
}

module.exports = workoutRouter;
