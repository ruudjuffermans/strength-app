import { useGetQuery, usePostMutation, usePutMutation, useDeleteMutation } from "@utils/apiHooks";
import { useErrorSnackbar } from "@hooks/useSnackbar";
import { useSuccessSnackbar } from "@hooks/useSnackbar";

export const useSplit = (splitId) => {
  const setSuccess = useSuccessSnackbar();
  const setError = useErrorSnackbar();

  if (!splitId) {
    throw new Error("useSplit requires a splitId to be provided.");
  }

  const splitExercises = useGetQuery(["exerciseSplit", splitId], `/split/${splitId}`);

  const addExercise = usePostMutation(["exerciseSplit", splitId], () => `/exercise-split/${splitId}`, ["split", splitId]);
  const editExercise = usePutMutation(["exerciseSplit", splitId], ({ exerciseSplitId }) => `/exercise-split/${exerciseSplitId}`, ["exerciseSplit", splitId]);
  const deleteExercise = useDeleteMutation(["exerciseSplit", splitId], ({ exerciseSplitId }) => `/exercise-split/${exerciseSplitId}`, ["exerciseSplit", splitId]);
  const createWorkout = usePostMutation(["workout", splitId], () => `/workout/create`, ["workout", splitId]);

  const reorderExercises = usePutMutation(["exerciseSplit", splitId], () => `/exercise-split/reorder/${splitId}`, ["exerciseSplit", splitId]);

  const handleMutation = async (mutationFn, data, successMessage, errorMessage) => {
    try {
      const res = await mutationFn(data);
      setSuccess(successMessage);
      return res;
    } catch (error) {
      console.error(error);
      setError(errorMessage);
    }
  };

  return {
    splitExercises,
    addExercise: (data) => handleMutation(addExercise, data, "Exercise added successfully!", "Failed to add Exercise."),
    editExercise: (data) => handleMutation(editExercise, data, "Exercise updated successfully!", "Failed to update Exercise."),
    deleteExercise: (data) => handleMutation(deleteExercise, data, "Exercise deleted successfully!", "Failed to delete Exercise."),
    createWorkout: (data) => handleMutation(createWorkout, data, "Workout created successfully!", "Failed to create workout."),
    reorderExercises: (data) => handleMutation(reorderExercises, data, "Exercise order updated!", "Failed to reorder exercises."),
  };
};
