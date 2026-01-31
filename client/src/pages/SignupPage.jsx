import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api.js";

const SignupPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      await api.post("/auth/register", { name, email, password });
      setSuccess("Signup successful. You can now log in.");
      setTimeout(() => navigate("/login"), 1000);
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1 style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <img
            src="/apnaghar-icon.svg"
            alt="ApnaGhar logo"
            style={{ width: 26, height: 26, borderRadius: "999px" }}
          />
          ApnaGhar signup
        </h1>
        <p className="subtitle">Create your admin account for the ApnaGhar hostel / PG dashboard.</p>
        <form onSubmit={handleSubmit} className="form">
          <label>
            Name
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
          <label>
            Email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          {error && <div className="error-text">{error}</div>}
          {success && <div className="error-text" style={{ color: "#bbf7d0" }}>{success}</div>}
          <button type="submit" disabled={loading}>
            {loading ? "Signing up..." : "Sign up"}
          </button>
        </form>
        <p style={{ fontSize: "0.85rem", marginTop: "0.75rem" }}>
          Already have an account?{" "}
          <button
            type="button"
            className="ghost"
            style={{ padding: "0.2rem 0.7rem", marginTop: 0, fontSize: "0.8rem" }}
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;



