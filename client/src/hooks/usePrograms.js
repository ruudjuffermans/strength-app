import { useGetQuery, usePostMutation, usePutMutation, useDeleteMutation } from "@utils/apiHooks";
import { useErrorSnackbar, useSuccessSnackbar } from "@hooks/useSnackbar";
import { createMutationHandler } from "../utils/mutationHandler";

export const usePrograms = () => {
  
  const setSuccess = useSuccessSnackbar();
  const setError = useErrorSnackbar();
  const handleMutation = createMutationHandler({ setSuccess, setError });

  const programs = useGetQuery(["programs"], "/program");
  const addProgram = usePostMutation(["programs"], "/program", ["programs"]);

  return {
    programs,
    addProgram: (data) => handleMutation(addProgram, data, "Program added!", "Failed to add program.", ["name", "description"]),
  };
};
