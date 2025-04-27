import { useGetQuery, usePostMutation, usePutMutation, useDeleteMutation } from "@utils/apiHooks";
import { useErrorSnackbar, useSuccessSnackbar } from "@hooks/useSnackbar";

export const useWorkout = (workoutId) => {
    const setSuccess = useSuccessSnackbar();
    const setError = useErrorSnackbar();

    if (!workoutId) {
        throw new Error("useWorkout requires a workoutId to be provided.");
      }

    const workout = useGetQuery(["workout", workoutId], `/workout/${workoutId}`);
    const completeWorkout = usePutMutation(["workout", workoutId], () => `/workout/${workoutId}/complete`, ["workout", workoutId]);
    const deleteWorkout = useDeleteMutation(["workout", workoutId], () => `/workout/${workoutId}`, ["workout", workoutId]);
    const logSet = usePutMutation(["workout", workoutId], ({ logId }) => `/workout/log/${logId}`, ["workout", workoutId]);
    const updateLoggedSet = usePutMutation(["workout", workoutId], ({ logId }) => `/log/${logId}/update`, ["workoutLogs", workoutId]);

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
        completeWorkout: (data) => handleMutation(completeWorkout, data, "Workout completed successfully!", "Failed to complete workout."),
        deleteWorkout: () => handleMutation(deleteWorkout, {}, "Workout deleted successfully!", "Failed to delete workout."),
        logSet: (data) => handleMutation(logSet, data, "Set logged successfully!", "Failed to log set."),
        updateLoggedSet: (data) => handleMutation(updateLoggedSet, data, "Set updated successfully!", "Failed to update set."),
        removeLoggedSet: (data) => handleMutation(removeLoggedSet, data, "Set removed successfully!", "Failed to remove set."),
    };
};
