import { NavLink, useLocation } from "react-router-dom";
import { FaGraduationCap } from "react-icons/fa";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "../styles/Navbar.css";

export default function Navbar() {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className={`navbar ${isHome ? "navbar-transparent" : ""}`}>
      <div className="navbar-brand">
        <FaGraduationCap className="navbar-logo-icon" />
        <h2>Campus Info</h2>
      </div>
      <ul>
        <li><NavLink to="/">Campus</NavLink></li>
        <li><NavLink to="/schools">Schools</NavLink></li>
        <li><NavLink to="/map">Map View</NavLink></li>
        <li><NavLink to="/students">Students</NavLink></li>
        <li><NavLink to="/gallery">Gallery</NavLink></li>
        <li><NavLink to="/faq">FAQ</NavLink></li>
        <li><NavLink to="/contact">Contact</NavLink></li>
        
        {!user && (
          <>
            <li><NavLink to="/login">Login</NavLink></li>
            <li><NavLink to="/register">Register</NavLink></li>
          </>
        )}
        
        {user && (
          <>
            <li><NavLink to="/dashboard">Dashboard</NavLink></li>
            {user.role === "Admin" && <li><NavLink to="/admin">Admin</NavLink></li>}
            <li><button onClick={logout} className="nav-logout-btn" style={{ background: 'transparent', border: 'none', color: 'inherit', font: 'inherit', cursor: 'pointer', padding: '0.5rem 1rem' }}>Logout</button></li>
          </>
        )}
      </ul>
    </nav>
  );
}
