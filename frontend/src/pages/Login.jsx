import React, { useState } from "react";
import { Link } from "react-router"; // ✅ FIXED
import { useAuth } from "../hooks/useAuth";
import toast from "react-hot-toast";

const Login = () => {
  const { login } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      toast.error("All fields are required!");
      return;
    }

    try {
      setLoading(true);
      await login(form); // Assuming this handles setting user
    } catch (err) {
      setError("Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          <div className="card bg-base-100">
            <div className="card-body">
              <h1 className="text-3xl text-center font-bold text-primary font-mono tracking-tight">
                ThinkBoard
              </h1>
              <h2 className="card-title text-2xl mb-4 text-center justify-center">
                Welcome back, Login!
              </h2>

              {error && (
                <div className="text-red-500 text-sm mb-3 text-center">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="email"
                    name="email" // ✅ Added
                    placeholder="Enter your email"
                    className="input input-bordered"
                    value={form.email}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <input
                    type="password"
                    name="password" // ✅ Added
                    placeholder="Enter your password"
                    className="input input-bordered"
                    value={form.password}
                    onChange={handleChange}
                  />
                </div>

                <div className="card-actions">
                  <button
                    type="submit"
                    className="btn btn-primary w-full"
                    disabled={loading}
                  >
                    {loading ? "Logging in..." : "Login"}
                  </button>
                </div>

                <div className="w-[62%] mx-auto mt-3 flex gap-1 justify-center text-sm">
                  <p>Don't have an account?</p>
                  <Link
                    to="/register"
                    className="text-primary hover:text-[#18A048]"
                  >
                    Register
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
