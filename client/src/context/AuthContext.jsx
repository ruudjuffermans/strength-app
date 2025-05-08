import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { useErrorSnackbar, useSuccessSnackbar } from "@hooks/useSnackbar";
import { usePostMutation } from "@utils/apiHooks";
import axiosInstance from "@service/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const location = useLocation();
  const setSuccess = useSuccessSnackbar();
  const setError = useErrorSnackbar();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const loginMutation = usePostMutation(["auth", "login"], () => `/auth/login`);
  const registerMutation = usePostMutation(["auth", "register"], () => `/auth/register`);
  const activateMutation = usePostMutation(["auth", "activate"], () => `/auth/activate`);
  const approveUserMutation = usePostMutation(["auth", "approve"], () => `/auth/approve`);

  const getContext = useCallback(async (force = false) => {
    if (user && !force) return user;
    try {
      const res = await axiosInstance.get("/auth/me", {
        withCredentials: true,
      });
      setUser(res.data);
      return res.data;
    } catch (error) {
      setUser(null);
      return null;
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    const authRoutes = ["/login", "/register", "/forgot-password"];
    if (authRoutes.includes(location.pathname)) {
      setLoading(false);
      return;
    }
    getContext();
  }, [getContext, location.pathname]);

  const handleMutation = async (mutationFn, data, successMessage, errorMessage, reloadContext = false) => {
    try {
      const res = await mutationFn(data);
      setSuccess(successMessage);
      if (reloadContext) await getContext(true);
      return res;
    } catch (error) {
      console.error(error);
      setError(error.response?.data?.error || errorMessage);
      return null;
    }
  };

  const login = (data) => handleMutation(loginMutation, data, "Logged in successfully!", "Failed to login.", true);
  const register = (data) => handleMutation(registerMutation, data, "Registered successfully!", "Failed to register.");
  const activate = (data) => handleMutation(activateMutation, data, "Account activated!", "Failed to activate.");
  const approveUser = (data) => handleMutation(approveUserMutation, data, "User approved!", "Failed to approve user.");

  const logout = async () => {
    try {
      await axiosInstance.post("/auth/logout", {}, { withCredentials: true });
      setUser(null);
      setSuccess("Logged out.");
    } catch (error) {
      console.error(error);
      setError("Failed to logout.");
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      login,
      register,
      activate,
      approveUser,
      logout,
      getContext
    }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use Auth context
export const useAuth = () => useContext(AuthContext);
