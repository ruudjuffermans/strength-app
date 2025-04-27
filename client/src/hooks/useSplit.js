import { useGetQuery, usePostMutation, usePutMutation, useDeleteMutation } from "@utils/apiHooks";
import { useErrorSnackbar } from "@hooks/useSnackbar";
import { useSuccessSnackbar } from "@hooks/useSnackbar";

export const useSplit = (splitId) => {
  const setSuccess = useSuccessSnackbar();
  const setError = useErrorSnackbar();

  if (!splitId) {
    throw new Error("useSplit requires a splitId to be provided.");
  }

  const split = useGetQuery(["split", splitId], `/split/${splitId}`);
  const addExercise = usePostMutation(["split", splitId], () => `/split/${splitId}/add`, ["split", splitId]);
  const editExercise = usePutMutation(["split", splitId], ({ exerciseId }) => `/split/exercise/${exerciseId}`, ["split", splitId]);
  const deleteExercise = useDeleteMutation(["split", splitId], ({ exerciseId }) => `/split/exercise/${exerciseId}`, ["split", splitId]);
  const createWorkout = usePostMutation(["workout", splitId], () => `/workout/create`, ["workout", splitId]);
  const reorderExercises = usePutMutation(["split", splitId], () => `/split/${splitId}/reorder/`, ["split", splitId]);

  const handleMutation = async (mutationFn, data, successMessage, errorMessage) => {
    try {
      const res = await mutationFn(data);
      setSuccess(successMessage);
      return res;
    } catch (error) {
      setError(errorMessage);
    }
  };

  return {
    split,
    addExercise: (data) => handleMutation(addExercise, data, "Exercise added successfully!", "Failed to add Exercise."),
    editExercise: (data) => handleMutation(editExercise, data, "Exercise updated successfully!", "Failed to update Exercise."),
    deleteExercise: (data) => handleMutation(deleteExercise, data, "Exercise deleted successfully!", "Failed to delete Exercise."),
    createWorkout: (data) => handleMutation(createWorkout, data, "Workout created successfully!", "Failed to create workout."),
    reorderExercises: (data) => handleMutation(reorderExercises, data, "Exercise order updated!", "Failed to reorder exercises."),
  };
};
