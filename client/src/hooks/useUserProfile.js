import {
    useGetQuery,
    usePostMutation,
    useDeleteMutation
  } from "@utils/apiHooks";
  import { useErrorSnackbar, useSuccessSnackbar } from "@hooks/useSnackbar";
  
  export const useUserProfile = () => {
    const setSuccess = useSuccessSnackbar();
    const setError = useErrorSnackbar();
  
    // Queries
    const userProfile = useGetQuery(["users"], "/user/profile");
  
    // Mutations
    const approve = usePostMutation(["users"], ({ userId }) => `/admin/approve/${userId}`, ["users"]);
    const disable = usePostMutation(["users"], ({ userId }) => `/admin/disable/${userId}`, ["users"]);
    const deleteUser = useDeleteMutation(["users"], ({ userId }) => `/admin/remove/${userId}`, ["users"]);
  
    // Unified mutation handler
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
      userProfile,
      approveUser: (data) => handleMutation(approve, data, "User approved.", "Failed to approve user."),
      disableUser: (data) => handleMutation(disable, data, "User disabled.", "Failed to disable user."),
      deleteUser: (data) => handleMutation(deleteUser, data, "User deleted.", "Failed to delete user."),
    };
  };
  