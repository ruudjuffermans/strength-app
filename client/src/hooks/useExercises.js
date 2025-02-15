import { useGetQuery, usePostMutation, usePutMutation, useDeleteMutation } from "@utils/apiHooks";
import { useErrorSnackbar, useSuccessSnackbar } from "@hooks/useSnackbar";

export const useExercises = () => {
    const setSuccess = useSuccessSnackbar();
    const setError = useErrorSnackbar();

    const exercises = useGetQuery(["exercises"], "/exercise", (data) => {
      console.log("Fetched exercises:", data);
      return data;
  });
  

    const addExercise = usePostMutation(["exercises"], "/exercise", ["exercises"]);
    const updateExercise = usePutMutation(["exercises"], ({ id }) => `/exercise/${id}`, ["exercises"]);
    const deleteExercise = useDeleteMutation(["exercises"], ({ id }) => `/exercise/${id}`, ["exercises"]);

    const handleMutation = async (mutationFn, data, successMessage, errorMessage) => {
        try {
            await mutationFn(data);
            setSuccess(successMessage);
        } catch (error) {
            setError(error?.response?.data?.error || errorMessage);
        }
    };

    return {
        exercises,
        addExercise: (data) => handleMutation(addExercise, data, "Exercise added successfully!", "Failed to add exercise."),
        updateExercise: (data) => handleMutation(updateExercise, data, "Exercise updated successfully!", "Failed to update exercise."),
        deleteExercise: (data) => handleMutation(deleteExercise, data, "Exercise deleted successfully!", "Failed to delete exercise."),
    };
};
