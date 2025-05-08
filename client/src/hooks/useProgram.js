import { usePostMutation, usePutMutation, useDeleteMutation, useGetQuery } from "@utils/apiHooks";
import { useErrorSnackbar, useSuccessSnackbar } from "@hooks/useSnackbar";
import { createMutationHandler } from "../utils/mutationHandler";

export const useProgram = (programId) => {

    if (!programId) {
        throw new Error("useProgram requires a programId to be provided.");
    }

    const setSuccess = useSuccessSnackbar();
    const setError = useErrorSnackbar();
    const handleMutation = createMutationHandler({ setSuccess, setError });

    const program = useGetQuery(["program", programId], `/program/${programId}`);

    const editProgram = usePutMutation(["program"], () => `/program/${programId}`, ["programs"]);
    const deleteProgram = useDeleteMutation(["program"], () => `/program/${programId}`, ["programs"]);
    const activateProgram = usePostMutation(["user"], () => `/program/${programId}/activate`, []);

    const addSplit = usePostMutation(["splits"], () => `/program/${programId}/add-split`, ["programs"]);

    return {
        program,
        editProgram: (data) => handleMutation(editProgram, data, "Program updated!", "Failed to update program.", ["name", "description"]),
        deleteProgram: () => handleMutation(deleteProgram, {}, "Workout deleted!", "Failed to delete workout."),
        activateProgram: () => handleMutation(activateProgram, {}, "Activate program!", "Failed to activate program."),
        addSplit: (data) => handleMutation(addSplit, data, "Split added!", "Failed to add split.", ["name", "description"]),
    };
};