import { usePostMutation } from "@utils/apiHooks";
import { useErrorSnackbar, useSuccessSnackbar } from "@hooks/useSnackbar";
import axiosInstance from "@service/api";

export const useAuth = () => {
    const setSuccess = useSuccessSnackbar();
    const setError = useErrorSnackbar();

    const login = usePostMutation(["auth", "login"], () => `/auth/login`);
    const register = usePostMutation(["auth", "register"], () => `/auth/register`);
    const activate = usePostMutation(["auth", "activate"], () => `/auth/activate`);
    const approveUser = usePostMutation(["auth", "approve"], () => `/auth/approve`);

    const handleMutation = async (mutationFn, data, successMessage, errorMessage) => {
        try {
            const res = await mutationFn(data);
            setSuccess(successMessage);
            return res;
        } catch (error) {
            setError(errorMessage);
        }
    };

    const getContext = async () => {
        try {
            const res = await axiosInstance.get("/auth/me", {
                withCredentials: true,
            });
            return res.data;
        } catch (error) {
            console.error("Failed to retrieve auth context:", error);
            return null;
        }
    };

    return {
        login: (data) => handleMutation(login, data, "Logged in successfully!", "Failed to login."),
        register: (data) => handleMutation(register, data, "Registered successfully! Awaiting approval.", "Failed to register."),
        activate: (data) => handleMutation(activate, data, "Activation successfully! Awaiting approval.", "Failed to activate."),
        approveUser: (data) => handleMutation(approveUser, data, "User approved successfully!", "Failed to approve user."),
        getContext,
    };
};
