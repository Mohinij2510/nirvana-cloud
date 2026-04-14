import React from "react";
import "../styles/resources.css";

export default function Resources() {

  const scrollToCategory = (id) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="resources-page">

      {/* Header */}
      <div className="resources-header">
        <h1>🌿 Mental Wellness Resources</h1>
        <p>
          Explore curated articles, videos, and tools to support your mental health journey.
        </p>
      </div>

      {/* Category Buttons */}
      <div className="category-nav">
        {[
          "anxiety",
          "depression",
          "sleep",
          "stress",
          "self-care",
          "mindfulness",
          "trauma",
          "relationships",
          "crisis",
          "professional",
        ].map((cat) => (
          <button key={cat} onClick={() => scrollToCategory(cat)}>
            {cat}
          </button>
        ))}
      </div>

      {/* ================= ANXIETY ================= */}
      <div id="anxiety" className="category-section">
        <h2>🧠 Anxiety</h2>

        <a
          href="https://manastha.com/blog/how-to-deal-with-social-anxiety"
          target="_blank"
          rel="noreferrer"
          className="resource-link"
        >
          How to deal with Social Anxiety
        </a>

        <iframe
          src="https://www.youtube.com/embed/PxjxY9VilCs"
          title="Anxiety video"
        ></iframe>
      </div>

      {/* ================= DEPRESSION ================= */}
      <div id="depression" className="category-section">
        <h2>🌧 Depression</h2>

        <a
          href="https://www.nimh.nih.gov/health/topics/depression"
          target="_blank"
          rel="noreferrer"
          className="resource-link"
        >
          Depression Guide (NIMH)
        </a>

        <iframe
          src="https://www.youtube.com/embed/qfrpO9PsGC0"
          title="Depression video"
        ></iframe>
      </div>

      {/* ================= SLEEP ================= */}
      <div id="sleep" className="category-section">
        <h2>😴 Sleep</h2>

        <a
          href="https://www.sleepfoundation.org/mental-health"
          target="_blank"
          rel="noreferrer"
          className="resource-link"
        >
          Why Sleep Matters for Mental Health
        </a>

        <iframe
          src="https://www.youtube.com/embed/IM48HKJbu70"
          title="Sleep video"
        ></iframe>
      </div>

      {/* ================= STRESS ================= */}
      <div id="stress" className="category-section">
        <h2>😓 Stress</h2>

        <a
          href="https://www.helpguide.org/articles/stress/stress-management.htm"
          target="_blank"
          rel="noreferrer"
          className="resource-link"
        >
          Stress Management Techniques
        </a>

        <iframe
          src="https://www.youtube.com/embed/MIr3RsUWrdo"
          title="Stress video"
        ></iframe>
      </div>

      {/* ================= CRISIS ================= */}
      <div id="crisis" className="category-section crisis-box">
        <h2>🚨 Crisis Support</h2>

        <p>
          <strong>
            If you are in danger, please call emergency services (100) immediately.
          </strong>
        </p>

        <ul>
          <li>📞 Suicide Helpline: 988</li>
          <li>
            🌐 <a href="https://icallhelpline.org/" target="_blank">iCall Support</a>
          </li>
          <li>
            🌐 <a href="http://www.aasra.info/" target="_blank">Aasra Helpline</a>
          </li>
        </ul>
      </div>

      {/* ================= PROFESSIONAL ================= */}
      <div id="professional" className="category-section">
        <h2>👨‍⚕️ Professional Help</h2>

        <a
          href="https://www.psychologytoday.com/us/therapists"
          target="_blank"
          className="resource-link"
        >
          Find a Therapist
        </a>

        <a
          href="https://www.nimh.nih.gov/health/topics/mental-health-treatments"
          target="_blank"
          className="resource-link"
        >
          Types of Mental Health Treatments
        </a>
      </div>

    </div>
  );
}