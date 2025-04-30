import { usePostMutation, usePutMutation, useDeleteMutation } from "@utils/apiHooks";
import { useErrorSnackbar, useSuccessSnackbar } from "@hooks/useSnackbar";

export const useProgram = (programId, source) => {

    if (!programId) {
        throw new Error("useProgram requires a programId to be provided.");
    }

    if (!source) {
        throw new Error("useProgram requires a source to be provided.");
    }

    const setSuccess = useSuccessSnackbar();
    const setError = useErrorSnackbar();

    const program = useGetQuery(["program", splitId], `/program/${programId}/source${source}`);
    const updateProgram = usePutMutation(["programs"], ({ programId }) => `/program/${programId}`, ["programs"]);
    const addSplit = usePostMutation(["splits"], () => `/program/${programId}/add-split`, ["programs"]);
    const editSplit = usePutMutation(["splits"], ({ splitId }) => `/program/${programId}/split${splitId}`, ["programs"]);
    const deleteSplit = useDeleteMutation(["splits"], ({ splitId }) => `/program/${programId}/split/${splitId}`, ["programs"]);

    const handle = async (fn, data, successMsg, errorMsg) => {
        try {
            await fn(data);
            setSuccess(successMsg);
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
    };
};