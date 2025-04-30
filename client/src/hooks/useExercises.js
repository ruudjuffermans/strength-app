import { useGetQuery, usePostMutation, usePutMutation, useDeleteMutation } from "@utils/apiHooks";
import { useErrorSnackbar, useSuccessSnackbar } from "@hooks/useSnackbar";

export const useExercises = () => {
  const setSuccess = useSuccessSnackbar();
  const setError = useErrorSnackbar();

  const exercises = useGetQuery(["exercises"], "/exercise");

  const createExerciseMutation = usePostMutation(["exercises"], "/exercise", ["exercises"]);
  const updateExerciseMutation = usePutMutation(["exercises"], ({ id }) => `/exercise/${id}`, ["exercises"]);
  const deleteExerciseMutation = useDeleteMutation(["exercises"], ({ id }) => `/exercise/${id}`, ["exercises"]);

  const handle = async (fn, data, successMsg, errorMsg) => {
    try {
      await fn(data);
      setSuccess(successMsg);
    } catch (err) {
      setError(errorMsg);
    }
  };

  return {
    exercises,
    addExercise: (data) => handle(createExerciseMutation, data, "Exercise created!", "Failed to create exercise."),
    updateExercise: (data) => handle(updateExerciseMutation, data, "Exercise updated!", "Failed to update exercise."),
    deleteExercise: (data) => handle(deleteExerciseMutation, data, "Exercise deleted!", "Failed to delete exercise."),
  };
};
