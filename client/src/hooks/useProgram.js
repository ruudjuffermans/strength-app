import { usePostMutation, usePutMutation, useDeleteMutation, useGetQuery } from "@utils/apiHooks";
import { useErrorSnackbar, useSuccessSnackbar } from "@hooks/useSnackbar";

export const useProgram = (programId) => {

    if (!programId) {
        throw new Error("useProgram requires a programId to be provided.");
    }


    const setSuccess = useSuccessSnackbar();
    const setError = useErrorSnackbar();

    const program = useGetQuery(["program", programId], `/program/${programId}`);
    const updateProgram = usePutMutation(["programs"], ({ programId }) => `/program/${programId}`, ["programs"]);
    const addSplit = usePostMutation(["splits"], () => `/program/${programId}/add-split`, ["programs"]);
    const createWorkout = usePostMutation(["workout"], () => `workout/create`, ["workout"]);
    const editSplit = usePutMutation(["splits"], ({ splitId }) => `/program/${programId}/split${splitId}`, ["programs"]);
    const deleteSplit = useDeleteMutation(["splits"], ({ splitId }) => `/program/${programId}/split/${splitId}`, ["programs"]);

    const handle = async (fn, data, successMsg, errorMsg) => {
        try {
            const res = await fn(data);
            setSuccess(successMsg);
            return res;
        } catch (err) {
            setError(errorMsg);
        }
    };

    return {
        program,
        updateProgram: (data) => handleMutation(updateProgram, data, "Program updated!", "Failed to update program."),
        addSplit: (data) => handle(addSplit, data, "Split added!", "Failed to add split."),
        editSplit: (data) => handle(editSplit, data, "Split updated!", "Failed to update split."),
        deleteSplit: (data) => handle(deleteSplit, data, "Split deleted!", "Failed to delete split."),
        createWorkout: (data) => handle(createWorkout, data, "Workout created!", "Failed to create workout."),
    };
};