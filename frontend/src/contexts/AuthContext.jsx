import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router"; // ✅ FIXED
import api from "../lib/axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // ✅ Check if user is logged in on mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await api.get("/auth/me", {
          withCredentials: true,
        });
        setUser(data);
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  // Sign-up method

  const signup = async (credentials) => {
    try {
      await api.post("/auth/register", credentials, {
        withCredentials: true,
      });

      const { data } = await api.get("/auth/me", {
        withCredentials: true,
      });

      setUser(data);
      toast.success("User Registered successfully");
      navigate("/", { replace: true });
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
      throw err;
    }
  };

  // ✅ Login method
  const login = async (credentials) => {
    try {
      await api.post("/auth/login", credentials, {
        withCredentials: true,
      });

      const { data } = await api.get("/auth/me", {
        withCredentials: true,
      });

      setUser(data);
      toast.success("Login successful");
      navigate("/", { replace: true }); // ✅ Move here instead
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
      throw err; // Allow caller to handle error
    }
  };

  // ✅ Logout method
  const logout = async () => {
    try {
      await api.post("/auth/logout", {}, { withCredentials: true });
      setUser(null);
      toast.success("Logged out");
      navigate("/login");
    } catch (err) {
      toast.error("Logout failed");
    }
  };

  const value = {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user,
    signup,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
