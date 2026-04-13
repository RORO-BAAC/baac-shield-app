"use client";

import { useState } from "react";

export default function Home() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <main style={{ padding: 20, fontFamily: "Arial", maxWidth: 700, margin: "0 auto" }}>
      <h1>BAAC SHIELD</h1>
      <p>Identify the risk. Verify the shield.</p>

      <form onSubmit={handleSubmit} style={{ display: "grid", gap: 14 }}>
        <div>
          <label>Worker Name</label><br />
          <input type="text" style={{ width: "100%", padding: 10 }} />
        </div>

        <div>
          <label>Supervisor Name</label><br />
          <input type="text" style={{ width: "100%", padding: 10 }} />
        </div>

        <div>
          <label>Job Site</label><br />
          <input type="text" style={{ width: "100%", padding: 10 }} />
        </div>

        <div>
          <label>Task Description</label><br />
          <textarea rows="3" style={{ width: "100%", padding: 10 }} />
        </div>

        <div>
          <label>Critical Risk Category</label><br />
          <select style={{ width: "100%", padding: 10 }}>
            <option>Choose a risk</option>
            <option>Breaking Containment</option>
            <option>Bypassing Safety Controls</option>
            <option>Confined Space Entry</option>
            <option>Driving</option>
            <option>Energy Isolation</option>
            <option>Excavation</option>
            <option>Hot Work</option>
            <option>Line of Fire</option>
            <option>Safe Mechanical Lifting</option>
            <option>Working at Height</option>
            <option>Working Around Mobile Equipment</option>
            <option>Work Authorization</option>
          </select>
        </div>

        <div>
          <label>Shield / Control</label><br />
          <textarea rows="3" placeholder="Describe the shield or control being used" style={{ width: "100%", padding: 10 }} />
        </div>

        <div>
          <label>Hazards / Notes</label><br />
          <textarea rows="4" placeholder="List hazards, conditions, or concerns" style={{ width: "100%", padding: 10 }} />
        </div>

        <div>
          <label>
            <input type="checkbox" /> Supervisor verified shield is in place
          </label>
        </div>

        <div>
          <label>
            <input type="checkbox" /> Corrective actions completed
          </label>
        </div>

        <div>
          <label>
            <input type="checkbox" /> Stop work required
          </label>
        </div>

        <button
          type="submit"
          style={{
            padding: 12,
            border: "none",
            borderRadius: 8,
            background: "#123d82",
            color: "white",
            fontWeight: "bold"
          }}
        >
          Submit Record
        </button>
      </form>

      {submitted && (
        <div style={{ marginTop: 20, padding: 16, background: "#eef6ee", borderRadius: 10 }}>
          <strong>Record submitted.</strong>
          <div>Your BAAC SHIELD form is working.</div>
        </div>
      )}
    </main>
  );
}
