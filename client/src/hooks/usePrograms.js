import { useGetQuery, usePostMutation, usePutMutation, useDeleteMutation } from "@utils/apiHooks";
import { useErrorSnackbar, useSuccessSnackbar } from "@hooks/useSnackbar";
import { useAuth } from "../context/AuthContext";

export const usePrograms = () => {
  const setSuccess = useSuccessSnackbar();
  const setError = useErrorSnackbar();
  const { getContext } = useAuth();

  const programs = useGetQuery(["programs"], "/program");

  const createProgram = usePostMutation(["programs"], "/program", ["programs"]);
  const updateProgram = usePutMutation(["programs"], ({ programId }) => `/program/${programId}`, ["programs"]);
  const deleteProgram = useDeleteMutation(["programs"], ({ programId }) => `/program/${programId}`, ["programs"]);
  const activateProgram = usePostMutation([], ({ programId }) => `/program/${programId}/activate`, []);

  const handleMutation = async (fn, data, successMsg, errorMsg) => {
    try {
      await fn(data);
      setSuccess(successMsg);
    } catch (err) {
      setError(errorMsg);
    }
  };

  return {
    programs,
    createProgram: (data) => handleMutation(createProgram, data, "Program added!", "Failed to add program."),
    updateProgram: (data) => handleMutation(updateProgram, data, "Program updated!", "Failed to update program."),
    deleteProgram: (data) => handleMutation(deleteProgram, data, "Program deleted!", "Failed to delete program."),
    activateProgram: async (data) => {
      await handleMutation(activateProgram, data, "Program activated!", "Failed to activate program.");
      await getContext(true);
    },
  };
};
