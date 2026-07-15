import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { FaGraduationCap, FaEnvelope, FaLock, FaUser, FaEye, FaEyeSlash, FaShieldAlt } from "react-icons/fa";
import "../styles/Auth.css";

export default function Register() {
  const { login } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("User");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Registration failed");
      login(data.user, data.token);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        {/* Left branding panel */}
        <div className="auth-brand">
          <div className="auth-brand-inner">
            <div className="auth-logo">
              <FaGraduationCap />
            </div>
            <h2>Campus Info</h2>
            <p>Join our platform and get access to campus information, school data, and student management tools.</p>
            <ul className="auth-features">
              <li>✅ Manage campus & schools</li>
              <li>✅ Track student progress</li>
              <li>✅ Monitor placement records</li>
              <li>✅ Admin dashboard access</li>
            </ul>
          </div>
        </div>

        {/* Right form panel */}
        <div className="auth-form-panel">
          <h1 className="auth-title">Create account</h1>
          <p className="auth-subtitle">Get started with Campus Info today</p>

          {error && <div className="auth-error">{error}</div>}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="auth-field">
              <label htmlFor="reg-name">Full Name</label>
              <div className="auth-input-wrap">
                <FaUser className="auth-input-icon" />
                <input
                  id="reg-name"
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="auth-field">
              <label htmlFor="reg-email">Email address</label>
              <div className="auth-input-wrap">
                <FaEnvelope className="auth-input-icon" />
                <input
                  id="reg-email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="auth-field">
              <label htmlFor="reg-password">Password</label>
              <div className="auth-input-wrap">
                <FaLock className="auth-input-icon" />
                <input
                  id="reg-password"
                  type={showPass ? "text" : "password"}
                  placeholder="Min. 6 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button type="button" className="auth-eye-btn" onClick={() => setShowPass(!showPass)}>
                  {showPass ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <div className="auth-field">
              <label htmlFor="reg-confirm">Confirm Password</label>
              <div className="auth-input-wrap">
                <FaLock className="auth-input-icon" />
                <input
                  id="reg-confirm"
                  type={showPass ? "text" : "password"}
                  placeholder="Repeat your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="auth-field">
              <label htmlFor="reg-role">Account Type</label>
              <div className="auth-input-wrap">
                <FaShieldAlt className="auth-input-icon" />
                <select
                  id="reg-role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="User">User — Browse & explore</option>
                  <option value="Admin">Admin — Full management access</option>
                </select>
              </div>
            </div>

            <button type="submit" className="auth-submit-btn" disabled={loading}>
              {loading ? <span className="auth-spinner" /> : "Create Account"}
            </button>
          </form>

          <p className="auth-switch">
            Already have an account? <Link to="/login">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
