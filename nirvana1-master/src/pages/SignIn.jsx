import React from "react";
import { useNavigate, Link } from "react-router-dom";

import "../styles/SignIn.css";

export default function SignIn() {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      const res = await fetch(`http://localhost:8000/api/signin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      console.log("Response status:", res.status);
      const data = await res.json();
      if (res.ok) {
        // Store user data in localStorage
        localStorage.setItem("user", JSON.stringify({
          email: data.email,
          name: data.profile_name,
          role: data.role
        }));
        
        alert(`Welcome, ${data.profile_name}`);
        
        // Redirect based on role
        if (data.role === "patient") {
          navigate("/");
        } else {
          navigate("/Dashboard");
        }
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error("Fetch Error:", err);
      alert("Something went wrong");
    }
  };

  return (
    <div className="signin-container">
      <div className="signin-form">
        <img src="/logo.png" className="logo" alt="Nirvana Logo" />
        <h2>Log in or sign up</h2>
        <p>Use your email or other service to continue with us</p>

        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="Enter your Email" required />
          <input type="password" placeholder="Enter your Password" required />
          <button type="submit" className="signin-btn">Sign In</button>
        </form>
    
        <div className="divider">
          <span>OR</span>
        </div>

        <div style={{ marginTop: "1rem", textAlign: "center" }}>
          <span>Don't have an account? </span>
          <Link to="/Register" style={{ color: "#4A90E2", textDecoration: "none", fontWeight: "bold" }}>Sign Up</Link>
        </div>
      </div>

      <div className="signin-image-wrapper">
        <div className="signin-image-box">
          <img src="/loginpg.png" alt="Namaste Art" />
        </div>
      </div>
    </div>
  );
}
