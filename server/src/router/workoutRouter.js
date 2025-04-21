const { workoutController } = require("../controllers");
const { asyncHandler } = require("../utils/asyncHandler");

function workoutRouter(app) {



    app.post(
        "/workout/create",
        asyncHandler(workoutController.createWorkout)
    );

    app.get(
        "/workout/:workoutId",
        asyncHandler(workoutController.getWorkoutById)
    );

    app.put(
        "/workout/:workoutId/complete",
        asyncHandler(workoutController.completeWorkout)
    );

    app.delete(
        "/workout/:workoutId",
        asyncHandler(workoutController.deleteWorkout)
    );

    app.get(
        "/workout",
        asyncHandler(workoutController.getAllWorkouts)
    );

    app.put(
        "/log/:logId",
        asyncHandler(workoutController.logSet)
    );

    // app.patch(
    //     "/api/log/:logId/update",
    //     asyncHandler(workoutController.updateLoggedSet)
    // );
}

module.exports = workoutRouter;
