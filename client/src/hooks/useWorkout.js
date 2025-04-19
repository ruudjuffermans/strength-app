import { useGetQuery, usePostMutation, usePutMutation, useDeleteMutation } from "@utils/apiHooks";
import { useErrorSnackbar, useSuccessSnackbar } from "@hooks/useSnackbar";

export const useWorkout = (workoutId) => {
    const setSuccess = useSuccessSnackbar();
    const setError = useErrorSnackbar();

    const workout = useGetQuery(["workout", workoutId], `/workout/${workoutId}`);

    // ✅ Mutations for workout management
    const completeWorkout = usePutMutation(["workout", workoutId], () => `/workout/${workoutId}/complete`, ["workout", workoutId]);
    const deleteWorkout = useDeleteMutation(["workout", workoutId], () => `/workouts`, ["workout", workoutId]);

    // ✅ Mutations for logging sets
    const logSet = usePutMutation(["workoutLogs", workoutId], ({ logId }) => `/log/${logId}`, ["workout", workoutId]);
    const updateLoggedSet = usePutMutation(["workoutLogs", workoutId], ({ logId }) => `/log/${logId}/update`, ["workoutLogs", workoutId]);

    // ✅ Handles API requests with notifications
    const handleMutation = async (mutationFn, data, successMessage, errorMessage) => {
        try {
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
