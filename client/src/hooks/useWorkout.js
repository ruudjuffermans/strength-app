import { useGetQuery, usePostMutation, usePutMutation, useDeleteMutation } from "@utils/apiHooks";
import { useErrorSnackbar, useSuccessSnackbar } from "@hooks/useSnackbar";

export const useWorkout = () => {
    const setSuccess = useSuccessSnackbar();
    const setError = useErrorSnackbar();

    // ✅ Fetch the workout in "Draft" mode
    const workout = useGetQuery(["workout", "draft"], `/workouts`);

    // ✅ Mutations for workout management
    const completeWorkout = usePutMutation(["workout", "draft"], () => `/workouts/complete`, ["workout", "draft"]);
    const deleteWorkout = useDeleteMutation(["workout", "draft"], () => `/workouts`, ["workout", "draft"]);

    // ✅ Mutations for logging sets
    const logSet = usePutMutation(["workoutLogs", "draft"], ({ logId }) => `/log/${logId}`, ["workout", "draft"]);
    const updateLoggedSet = usePutMutation(["workoutLogs", "draft"], ({ logId }) => `/log/${logId}/update`, ["workoutLogs", "draft"]);

    // ✅ Handles API requests with notifications
    const handleMutation = async (mutationFn, data, successMessage, errorMessage) => {
        try {
            console.log(data);
            await mutationFn(data);
            setSuccess(successMessage);
        } catch (error) {
            console.error(error);
            setError(errorMessage);
        }
    };

    return {
        workout,
        completeWorkout: () => handleMutation(completeWorkout, {}, "Workout completed successfully!", "Failed to complete workout."),
        deleteWorkout: () => handleMutation(deleteWorkout, {}, "Workout deleted successfully!", "Failed to delete workout."),
        logSet: (data) => handleMutation(logSet, data, "Set logged successfully!", "Failed to log set."),
        updateLoggedSet: (data) => handleMutation(updateLoggedSet, data, "Set updated successfully!", "Failed to update set."),
        removeLoggedSet: (data) => handleMutation(removeLoggedSet, data, "Set removed successfully!", "Failed to remove set."),
    };
};
