import React from "react";

import "../styles/SignIn.css";

export default function SignIn() {

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target[1].value;
    const password = e.target[2].value;

    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/signin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
    });
      console.log("Response status:", res.status); // Add this
      const data = await res.json();
      if (res.ok) {
        alert(`Welcome, ${data.profile_name}`);
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
          <input type="text" placeholder="Enter your profile name" required />
          <input type="email" placeholder="Enter your Email" required />
          <input type="password" placeholder="Enter your Password" required />
          <button type="submit" className="signin-btn">Sign In</button>
        </form>
    
        <div className="divider">
          <span>OR</span>
        </div>

        <button className="google-btn">
          <img src="https://www.svgrepo.com/show/475656/google-color.svg" width="20" alt="Google Icon" />
          Continue with Google
        </button>
      </div>

      <div className="signin-image-wrapper">
        <div className="signin-image-box">
          <img src="/loginpg.png" alt="Namaste Art" />
        </div>
      </div>
    </div>
  );
}
