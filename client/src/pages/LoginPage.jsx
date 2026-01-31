import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api.js";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("adminName", res.data.admin.name);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
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
          ApnaGhar Admin
        </h1>
        <p className="subtitle">Sign in to manage rooms, students and payments.</p>
        <form onSubmit={handleSubmit} className="form">
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
          <button type="submit" disabled={loading}>
            {loading ? "Signing in..." : "Login"}
          </button>
        </form>
        <p style={{ fontSize: "0.85rem", marginTop: "0.75rem" }}>
          New here?{" "}
          <button
            type="button"
            className="ghost"
            style={{ padding: "0.2rem 0.7rem", marginTop: 0, fontSize: "0.8rem" }}
            onClick={() => navigate("/signup")}
          >
            Create admin account
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;



