import { createContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router"; // ✅ FIXED

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // ✅ Check if user is logged in on mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get("http://localhost:5001/api/auth/me", {
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
      await axios.post("http://localhost:5001/api/auth/register", credentials, {
        withCredentials: true,
      });

      const { data } = await axios.get("http://localhost:5001/api/auth/me", {
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
      await axios.post("http://localhost:5001/api/auth/login", credentials, {
        withCredentials: true,
      });

      const { data } = await axios.get("http://localhost:5001/api/auth/me", {
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
      await axios.post(
        "http://localhost:5001/api/auth/logout",
        {},
        { withCredentials: true }
      );
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
