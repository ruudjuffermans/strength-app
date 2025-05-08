import { usePostMutation, usePutMutation, useDeleteMutation, useGetQuery } from "@utils/apiHooks";
import { useErrorSnackbar, useSuccessSnackbar } from "@hooks/useSnackbar";
import { createMutationHandler } from "../utils/mutationHandler";

export const useProgramSplit = (programId, splitId) => {

  if (!programId) {
    throw new Error("useProgramSplit requires a programId to be provided.");
  }

  if (!splitId) {
    throw new Error("useProgramSplit requires a splitId to be provided.");
  }

  const setSuccess = useSuccessSnackbar();
  const setError = useErrorSnackbar();
  const handleMutation = createMutationHandler({ setSuccess, setError });

  // const programSplit = useGetQuery(["program", programId], `program/${programId}/split/${splitId}`);
  const createWorkout = usePostMutation(["workout"], () => `program/${programId}/split/${splitId}/create-workout`, ["workout"]); 

  const editSplit = usePutMutation(["splits"], () => `/program/${programId}/split${splitId}`, ["programs"]);
  const deleteSplit = useDeleteMutation(["splits"], () => `/program/${programId}/split/${splitId}`, ["programs"]);

  const addExercise = usePostMutation(["splits"], () => `/program/${programId}/split/${splitId}/add-exercise`, ["programs"]);
  const editExercise = usePutMutation(["splits"], ({ exerciseId }) => `/program/${programId}/split/${splitId}/exercise/${exerciseId}`, ["programs"]);
  const deleteExercise = useDeleteMutation(["split"], ({ exerciseId }) => `/program/${programId}/split/${splitId}/exercise/${exerciseId}`, ["programs"]);
  const reorderExercises = usePutMutation(["split", splitId], () => `/split/${splitId}/reorder/`, ["split", splitId]);

  return {
    // programSplit,
    createWorkout: (data) => handleMutation(createWorkout, data, "Workout created!", "Failed to create workout."),
    editSplit: (data) => handleMutation(editSplit, data, "Split updated!", "Failed to update split.", ["name", "description"]),
    deleteSplit: () => handleMutation(deleteSplit, {}, "Split deleted!", "Failed to delete split."),
    addExercise: (data) => handleMutation(addExercise, data, "Exercise added successfully!", "Failed to add Exercise.", ["exerciseId", "reps", "sets"]),
    editExercise: (data) => handleMutation(editExercise, data, "Exercise updated successfully!", "Failed to update Exercise.", ["exerciseId"]),
    deleteExercise: (data) => handleMutation(deleteExercise, data, "Exercise deleted successfully!", "Failed to delete Exercise.", ["exerciseId"]),
    reorderExercises: (data) => handleMutation(reorderExercises, data, "Exercise order updated!", "Failed to reorder exercises.", ["exercises"]),
  };
};