import {
    useGetQuery,
    usePostMutation,
    useDeleteMutation
  } from "@utils/apiHooks";
  import { useErrorSnackbar, useSuccessSnackbar } from "@hooks/useSnackbar";
  
  export const useUsers = () => {
    const setSuccess = useSuccessSnackbar();
    const setError = useErrorSnackbar();
  
    // Queries
    const users = useGetQuery(["users"], "/user");
  
    // Mutations
    const approve = usePostMutation(["users"], ({ userId }) => `/user/approve/${userId}`, ["users"]);
    const disable = usePostMutation(["users"], ({ userId }) => `/user/disable/${userId}`, ["users"]);
    const deleteUser = useDeleteMutation(["users"], ({ userId }) => `/user/remove/${userId}`, ["users"]);
  
    // Unified mutation handler
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
      users,
      approveUser: (data) => handleMutation(approve, data, "User approved.", "Failed to approve user."),
      disableUser: (data) => handleMutation(disable, data, "User disabled.", "Failed to disable user."),
      deleteUser: (data) => handleMutation(deleteUser, data, "User deleted.", "Failed to delete user."),
    };
  };
  