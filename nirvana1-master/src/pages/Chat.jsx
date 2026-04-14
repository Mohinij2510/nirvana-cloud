import React, { useState } from "react";
import "../styles/Chat.css";
import { Link } from "react-router-dom";

export default function Chat() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  const sendMessage = async () => {
    if (!message.trim()) return;

    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });

      const data = await res.json();

      setChat([
        ...chat,
        { user: message, bot: data.reply }
      ]);

      setMessage("");
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <div className="chat-container">
      
      {/* Sidebar */}
      <aside className="chat-sidebar">
        <img src="/logo.png" alt="Nirvana Logo" className="logo" />
        <nav>
          <ul>
            <li>🗑️ Clear conversations</li>
            <li>📄 Updates & FAQ</li>

            <li className="nav-link">
              <Link to="/Dashboard">📊 Dashboard</Link>
            </li>

            <li className="nav-link">
              <Link to="/resources">📂 My Resources</Link>
            </li>

            <li>🔓 Log out</li>
          </ul>
        </nav>
      </aside>

      {/* Main Chat */}
      <main className="chat-main">

        {/* Header */}
        <div className="chat-header">
          <img src="/penguin.png" alt="Nova" className="assistant-avatar" />
          <p>
            <em>
              Hey there! I'm Nova, your mental wellness companion. How are you feeling today?
            </em>
          </p>
        </div>

        {/* Chat Messages */}
        <div className="chat-messages">
          {chat.length === 0 ? (
            <>
              <div className="feature">
                <span className="icon">💬</span>
                <h3>Examples</h3>
                <button>“I feel tired and unmotivated.”</button>
                <button>“I feel like I need someone to talk to.”</button>
                <button>“I feel lonely and need some support.”</button>
              </div>

              <div className="feature">
                <span className="icon">✨</span>
                <h3>Capabilities</h3>
                <button>Remembers what user said earlier.</button>
                <button>Allows follow-up corrections.</button>
                <button>Declines inappropriate requests.</button>
              </div>

              <div className="feature">
                <span className="icon">⚠️</span>
                <h3>Limitations</h3>
                <button>May generate incorrect info.</button>
                <button>May produce biased content.</button>
                <button>Limited knowledge.</button>
              </div>
            </>
          ) : (
            chat.map((c, i) => (
              <div key={i} className="chat-bubble">
                <p><strong>You:</strong> {c.user}</p>
                <p><strong>Nova:</strong> {c.bot}</p>
              </div>
            ))
          )}
        </div>

        {/* Input */}
        <div className="chat-input-area">
          <input
            type="text"
            className="chat-input"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button className="send-btn" onClick={sendMessage}>
            ➤
          </button>
        </div>

      </main>
    </div>
  );
}