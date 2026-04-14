import React from "react";
import { Link } from 'react-router-dom';
import "../styles/Home.css";

export default function Home() {
  return (
    <div className="home">
      {/* Navbar */}
      <nav className="navbar">
        <img src="/logo.png" alt="Nirvana Logo" className="logo" />
        <div className="nav-buttons">
          <a href="#" className="nav-item">Resources</a>
          <a href="#" className="nav-item">Community</a>
          <a href="#" className="nav-item">FAQs</a>
          <Link to="/signin" className="nav-item">Sign in</Link> 
          <Link to="/signin" className="nav-item register-btn">Register</Link>
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
