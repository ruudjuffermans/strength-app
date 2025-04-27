import { useGetQuery, usePostMutation, usePutMutation, useDeleteMutation } from "@utils/apiHooks";
import { useErrorSnackbar } from "@hooks/useSnackbar";
import { useSuccessSnackbar } from "@hooks/useSnackbar";
import { useAuth } from "../context/AuthContext";

export const usePrograms = () => {
    const setSuccess = useSuccessSnackbar();
    const setError = useErrorSnackbar();
    const { getContext } = useAuth();

    const programs = useGetQuery(["programs"], "/program");

    const createProgram = usePostMutation(["programs"], "/program", ["programs"]);
    const updateProgram = usePutMutation(["programs"], ({ id }) => `/program/${id}`, ["programs"]);
    const activateProgram = usePostMutation([], ({ programId }) => `/program/${programId}/activate`, []);
    const deleteProgram = useDeleteMutation(["programs"], ({programId}) => `/program/${programId}`, ["programs"]);
    
    const addSplit = usePostMutation(["splits"], ({ programId }) => `/split/${programId}`, ["programs"]);
    const editSplit = usePutMutation(["splits"], ({ splitId }) => `/split/${splitId}`, ["programs"]);
    const deleteSplit = useDeleteMutation(["splits"], ({ splitId }) => `/split/${splitId}`, ["programs"]);

    const handleMutation = async (mutationFn, data, successMessage, errorMessage) => {
        try {
            await mutationFn(data);
            setSuccess(successMessage);
        } catch (error) {
            setError(errorMessage);
        }
    };

    return {
        programs,
        createProgram: (data) => handleMutation(createProgram, data, "Program added successfully!", "Failed to add program."),
        updateProgram: (data) => handleMutation(updateProgram, data, "Program updated successfully!", "Failed to update program."),
        activateProgram: async (data) => {
            await handleMutation(activateProgram, data, "Program activated successfully!", "Failed to activate program.");
            await getContext(true);
        },
        deleteProgram: (data) => handleMutation(deleteProgram, data, "Program deleted successfully!", "Failed to delete program."),
        addSplit: (data) => handleMutation(addSplit, data, "Split added successfully!", "Failed to add split."),
        editSplit: (data) => handleMutation(editSplit, data, "Split updated successfully!", "Failed to update split."),
        deleteSplit: (data) => handleMutation(deleteSplit, data, "Split deleted successfully!", "Failed to delete split."),
    };
};
