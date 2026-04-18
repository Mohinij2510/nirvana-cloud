import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import "../styles/Home.css";

export default function Home() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };
  return (
    <div className="home">
      {/* Navbar */}
      <nav className="navbar">
        <img src="/logo.png" alt="Nirvana Logo" className="logo" />
        <div className="nav-buttons">
          <Link to="/resources" className="nav-item">Resources</Link>
          <a href="#" className="nav-item">Community</a>
          <a href="#" className="nav-item">FAQs</a>
          {user ? (
            <>
              <Link to={user.role === 'patient' ? "/PatientDashboard" : "/Dashboard"} className="nav-item">Dashboard</Link>
              <button onClick={handleLogout} className="nav-item register-btn" style={{ background: "transparent", border: "1px solid #1E2B3C", color: "#1E2B3C", cursor: "pointer" }}>Log out</button>
            </>
          ) : (
            <>
              <Link to="/signin" className="nav-item">Sign in</Link> 
              <Link to="/Register" className="nav-item register-btn">Register</Link>
            </>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main className="main">
        <div className="main-text">
          <h1>Take the first step towards a healthier mind with Nirvana.</h1>
          <button className="cta-button">
          <Link to="/Chat" className="cta-button">Chat With Nova, Your personal AI Therapist →</Link> 
          </button>
        </div>
        <div className="main-image">
          <img src="/penguin.png" alt="Penguin" />
        </div>
      </main>
    </div>
  );
}
