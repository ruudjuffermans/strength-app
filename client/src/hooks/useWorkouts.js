import { useGetQuery, usePostMutation, usePutMutation, useDeleteMutation } from "@utils/apiHooks";
import { useErrorSnackbar, useSuccessSnackbar } from "@hooks/useSnackbar";

export const useWorkouts = () => {
    const setSuccess = useSuccessSnackbar();
    const setError = useErrorSnackbar();

    // ✅ Fetch the workout in "Draft" mode
    const workouts = useGetQuery(["workouts"], `/workout`);

    const addWorkout = usePostMutation(["workouts"], "/workouts", ["workouts"]);
    const deleteWorkout = useDeleteMutation(["workouts"], ({ id }) => `/workout/${id}`, ["workouts"]);


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
        workouts,
        deleteWorkout: (data) => handleMutation(deleteWorkout, data, "Workout deleted successfully!", "Failed to delete workout."),
    
    };
};
