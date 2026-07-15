import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import {
  FaGraduationCap, FaUserCircle, FaEnvelope, FaShieldAlt,
  FaSignOutAlt, FaUniversity, FaUsers, FaSchool
} from "react-icons/fa";
import "../styles/Dashboard.css";

export default function UserDashboard() {
  const { user, logout } = useContext(AuthContext);

  if (!user) {
    return (
      <div className="dashboard-page">
        <div className="dashboard-empty">
          <FaUserCircle />
          <h2>You are not logged in</h2>
          <p>Please sign in to view your dashboard.</p>
          <Link to="/login" className="dash-login-btn">Sign In</Link>
        </div>
      </div>
    );
  }

  const isAdmin = user.role === "Admin";

  return (
    <div className="dashboard-page">
      {/* Header */}
      <div className="dashboard-header">
        <div className="dashboard-header-inner">
          <div className="dash-avatar">
            {user.name?.charAt(0).toUpperCase()}
          </div>
          <div>
            <h1>Welcome back, <span>{user.name}</span></h1>
            <p className="dash-role-badge">
              {isAdmin ? <><FaShieldAlt /> Admin</>  : <><FaUserCircle /> User</>}
            </p>
          </div>
        </div>
        <button className="dash-logout-btn" onClick={logout}>
          <FaSignOutAlt /> Logout
        </button>
      </div>

      <div className="dashboard-container">
        {/* Profile Card */}
        <div className="dash-section">
          <h2 className="dash-section-title">Your Profile</h2>
          <div className="dash-profile-card">
            <div className="dash-profile-row">
              <FaUserCircle className="dash-profile-icon" />
              <div>
                <span className="dash-profile-label">Full Name</span>
                <span className="dash-profile-value">{user.name}</span>
              </div>
            </div>
            <div className="dash-profile-row">
              <FaEnvelope className="dash-profile-icon" />
              <div>
                <span className="dash-profile-label">Email Address</span>
                <span className="dash-profile-value">{user.email}</span>
              </div>
            </div>
            <div className="dash-profile-row">
              <FaShieldAlt className="dash-profile-icon" />
              <div>
                <span className="dash-profile-label">Account Role</span>
                <span className="dash-profile-value dash-role-text">{user.role}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="dash-section">
          <h2 className="dash-section-title">Quick Access</h2>
          <div className="dash-quick-grid">
            <Link to="/" className="dash-quick-card">
              <div className="dqc-icon campus"><FaUniversity /></div>
              <span>View Campuses</span>
            </Link>
            <Link to="/schools" className="dash-quick-card">
              <div className="dqc-icon school"><FaSchool /></div>
              <span>Browse Schools</span>
            </Link>
            <Link to="/students" className="dash-quick-card">
              <div className="dqc-icon student"><FaUsers /></div>
              <span>Students List</span>
            </Link>
            {isAdmin && (
              <Link to="/admin" className="dash-quick-card admin">
                <div className="dqc-icon admin-ic"><FaShieldAlt /></div>
                <span>Admin Panel</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
