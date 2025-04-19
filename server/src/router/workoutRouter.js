const { workoutController } = require("../controllers");
const { asyncHandler } = require("../utils/asyncHandler");

function workoutRouter(app) {



    app.post(
        "/api/workout/create",
        asyncHandler(workoutController.createWorkout)
    );

    app.get(
        "/api/workout/:workoutId",
        asyncHandler(workoutController.getWorkoutById)
    );

    app.put(
        "/api/workout/:workoutId/complete",
        asyncHandler(workoutController.completeWorkout)
    );

    app.delete(
        "/api/workout/:workoutId",
        asyncHandler(workoutController.deleteWorkout)
    );

    app.get(
        "/api/workout",
        asyncHandler(workoutController.getAllWorkouts)
    );

    app.put(
        "/api/log/:logId",
        asyncHandler(workoutController.logSet)
    );

    // app.patch(
    //     "/api/log/:logId/update",
    //     asyncHandler(workoutController.updateLoggedSet)
    // );
}

module.exports = workoutRouter;
