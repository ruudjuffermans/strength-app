import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import axiosInstance from "@service/api";
import { useErrorSnackbar, useSuccessSnackbar } from "@hooks/useSnackbar";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const setSuccess = useSuccessSnackbar();
  const setError = useErrorSnackbar();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const getContext = useCallback(async () => {
    if (user) return user; // ✅ already have it, no need to refetch
  
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
    getContext();
  }, [getContext]);

  // 🔐 Login
  const login = async (data) => {
    try {
      const res = await axiosInstance.post("/auth/login", data, {
        withCredentials: true,
      });
      setSuccess("Logged in successfully!");
      await getContext();
      return res.data;
    } catch (error) {
      console.error(error);
      setError("Failed to login.");
    }
  };

  // 🆕 Register
  const register = async (data) => {
    try {
      const res = await axiosInstance.post("/auth/register", data, {
        withCredentials: true,
      });
      setSuccess("Registered successfully!");
      return res.data;
    } catch (error) {
      console.error(error);
      setError("Failed to register.");
    }
  };

  // ✅ Approve (admin only)
  const approveUser = async (data) => {
    try {
      const res = await axiosInstance.post("/auth/approve", data, {
        withCredentials: true,
      });
      setSuccess("User approved!");
      return res.data;
    } catch (error) {
      console.error(error);
      setError("Failed to approve user.");
    }
  };

  const logout = async () => {
    try {
      await axiosInstance.post("/auth/logout", {}, {
        withCredentials: true,
      });
      setUser(null);
      setSuccess("Logged out.");
    } catch (error) {
      console.error(error);
      setError("Failed to logout.");
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, approveUser, logout, getContext }}>
      {children}
    </AuthContext.Provider>
  );
};

// 🔄 Hook for usage
export const useAuth = () => useContext(AuthContext);
