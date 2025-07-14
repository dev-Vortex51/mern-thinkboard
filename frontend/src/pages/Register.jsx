import React from "react";
import { Link } from "react-router";
import { useAuth } from "../hooks/useAuth";
import { useState } from "react";
import toast from "react-hot-toast";

const Register = () => {
  const { signup } = useAuth();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password || !form.name) {
      toast.error("All fields are required!");
      return;
    }

    try {
      setLoading(true);
      await signup(form); // Assuming this handles setting user
    } catch (err) {
      setError("Account Registeration failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex items-center ">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          <div className="card bg-base-100">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-4 justify-center">
                Get started today!
              </h2>
              {error && (
                <div className="text-red-500 text-sm mb-3 text-center">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Name</span>
                  </label>
                  <input
                    type="text"
                    name="name" // ✅ Added
                    placeholder="Enter your name"
                    className="input input-bordered"
                    value={form.name}
                    onChange={handleChange}
                  />
                </div>
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

                <div className="card-actions ">
                  <button
                    type="submit"
                    className="btn btn-primary w-full"
                    disabled={loading}
                  >
                    {loading ? "Registering..." : "Register"}
                  </button>
                </div>
                <div className=" w-[60%] mx-auto mt-3 flex text-center  ">
                  <p>Already have an Account?</p>
                  <span>
                    <Link
                      to="/login"
                      className=" text-primary hover:text-[#18A048]"
                    >
                      Login
                    </Link>
                  </span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
