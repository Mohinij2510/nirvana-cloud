import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/SignIn.css"; // Reuse SignIn styles or adjust as needed

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "patient" // default role
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost:8000/api/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      
      const data = await res.json();
      if (res.ok) {
        alert("Registration successful! Please sign in.");
        navigate("/SignIn");
      } else {
        alert(data.message || "Registration failed");
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
        <h2>Create an account</h2>
        <p>Join us to continue your journey</p>

        <form onSubmit={handleSubmit}>
          <input 
            type="text" 
            name="name"
            placeholder="Enter your full name" 
            value={formData.name}
            onChange={handleChange}
            required 
          />
          <input 
            type="email" 
            name="email"
            placeholder="Enter your Email" 
            value={formData.email}
            onChange={handleChange}
            required 
          />
          <input 
            type="password" 
            name="password"
            placeholder="Enter your Password" 
            value={formData.password}
            onChange={handleChange}
            required 
          />
          
          <div style={{ marginBottom: "15px", textAlign: "left", width: "100%", maxWidth: "350px" }}>
            <label style={{ marginRight: "15px", cursor: "pointer" }}>
              <input 
                type="radio" 
                name="role" 
                value="patient" 
                checked={formData.role === "patient"} 
                onChange={handleChange}
              />
              Patient
            </label>
            <label style={{ cursor: "pointer" }}>
              <input 
                type="radio" 
                name="role" 
                value="therapist" 
                checked={formData.role === "therapist"} 
                onChange={handleChange}
              />
              Therapist
            </label>
          </div>

          <button type="submit" className="signin-btn">Sign Up</button>
        </form>
    
        <div className="divider">
          <span>OR</span>
        </div>

        <div style={{ marginTop: "1rem", textAlign: "center" }}>
          <span>Already have an account? </span>
          <Link to="/SignIn" style={{ color: "#4A90E2", textDecoration: "none", fontWeight: "bold" }}>Sign In</Link>
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
