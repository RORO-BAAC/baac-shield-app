"use client";

import { useMemo, useRef, useState } from "react";

export default function Home() {
  const [submitted, setSubmitted] = useState(false);
  const [risk, setRisk] = useState("");
  const [stopWork, setStopWork] = useState(false);
  const [photos, setPhotos] = useState([]);
  const fileRef = useRef(null);

  const shieldOptions = useMemo(() => {
    const map = {
      "Breaking Containment": [
        "Isolation verified",
        "Gas testing complete",
        "Ignition sources controlled",
      ],
      "Bypassing Safety Controls": [
        "Authorization obtained",
        "Bypass documented",
        "Crew briefed",
      ],
      "Confined Space Entry": [
        "Permit in place",
        "Atmosphere tested",
        "Attendant assigned",
      ],
      Driving: [
        "Seatbelt confirmed",
        "Journey plan reviewed",
        "Fit for duty confirmed",
      ],
      "Energy Isolation": [
        "LOTO applied",
        "Zero energy verified",
        "Residual energy checked",
      ],
      Excavation: [
        "Locates verified",
        "Permit confirmed",
        "Protective system in place",
      ],
      "Hot Work": [
        "Permit in place",
        "Gas test complete",
        "Fire watch assigned",
      ],
      "Line of Fire": [
        "Exclusion zone established",
        "Safe positioning confirmed",
        "Loose objects secured",
      ],
      "Safe Mechanical Lifting": [
        "Lift plan reviewed",
        "Rigging inspected",
        "Qualified operator confirmed",
      ],
      "Working at Height": [
        "Fall protection in place",
        "Anchor verified",
        "Rescue plan reviewed",
      ],
      "Working Around Mobile Equipment": [
        "Spotter assigned",
        "Blind spots reviewed",
        "Travel path controlled",
      ],
      "Work Authorization": [
        "Permit verified",
        "FLRA complete",
        "Scope reviewed",
      ],
    };

    return map[risk] || [];
  }, [risk]);

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
  }

  function handleFiles(e) {
    const files = Array.from(e.target.files || []);
    setPhotos(files.map((f) => f.name));
  }

  return (
    <main
      style={{
        padding: 16,
        fontFamily: "Arial, sans-serif",
        maxWidth: 760,
        margin: "0 auto",
        background: "#f8fafc",
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          background: "linear-gradient(135deg, #0f2f66, #1d4f9a)",
          color: "white",
          padding: 20,
          borderRadius: 16,
          marginBottom: 18,
          boxShadow: "0 4px 14px rgba(0,0,0,0.15)",
        }}
      >
        <h1 style={{ margin: 0, fontSize: 34 }}>BAAC SHIELD</h1>
        <p style={{ marginTop: 8, marginBottom: 0, opacity: 0.95 }}>
          Identify the risk. Verify the shield.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "grid",
          gap: 14,
          background: "white",
          padding: 18,
          borderRadius: 16,
          boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
        }}
      >
        <h2 style={{ marginTop: 0, marginBottom: 6 }}>Worker Record</h2>

        <div>
          <label>Worker Name</label>
          <br />
          <input type="text" style={{ width: "100%", padding: 12, marginTop: 6, borderRadius: 10, border: "1px solid #cbd5e1" }} />
        </div>

        <div>
          <label>Supervisor Name</label>
          <br />
          <input type="text" style={{ width: "100%", padding: 12, marginTop: 6, borderRadius: 10, border: "1px solid #cbd5e1" }} />
        </div>

        <div>
          <label>Job Site</label>
          <br />
          <input type="text" style={{ width: "100%", padding: 12, marginTop: 6, borderRadius: 10, border: "1px solid #cbd5e1" }} />
        </div>

        <div>
          <label>Task Description</label>
          <br />
          <textarea rows="3" style={{ width: "100%", padding: 12, marginTop: 6, borderRadius: 10, border: "1px solid #cbd5e1" }} />
        </div>

        <div>
          <label>Critical Risk Category</label>
          <br />
          <select
            value={risk}
            onChange={(e) => setRisk(e.target.value)}
            style={{ width: "100%", padding: 12, marginTop: 6, borderRadius: 10, border: "1px solid #cbd5e1" }}
          >
            <option value="">Choose a risk</option>
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
          <label>Shield / Control</label>
          <br />
          <select
            style={{ width: "100%", padding: 12, marginTop: 6, borderRadius: 10, border: "1px solid #cbd5e1" }}
            disabled={!risk}
          >
            <option value="">
              {risk ? "Choose a shield" : "Select a risk first"}
            </option>
            {shieldOptions.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </div>

        <div>
          <label>Hazards / Notes</label>
          <br />
          <textarea
            rows="4"
            placeholder="List hazards, conditions, or concerns"
            style={{ width: "100%", padding: 12, marginTop: 6, borderRadius: 10, border: "1px solid #cbd5e1" }}
          />
        </div>

        <div
          style={{
            border: "1px solid #d1d5db",
            borderRadius: 14,
            padding: 16,
            background: "#f8fafc",
          }}
        >
          <h3 style={{ marginTop: 0 }}>Attachments</h3>

          <input
            ref={fileRef}
            type="file"
            multiple
            style={{ display: "none" }}
            onChange={handleFiles}
          />

          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            style={{
              padding: 12,
              border: "1px solid #94a3b8",
              borderRadius: 10,
              background: "white",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Upload Photos
          </button>

          {photos.length > 0 && (
            <div style={{ marginTop: 12 }}>
              <strong>Selected files:</strong>
              <ul style={{ marginTop: 8, paddingLeft: 18 }}>
                {photos.map((name) => (
                  <li key={name}>{name}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div
          style={{
            border: "1px solid #d1d5db",
            borderRadius: 14,
            padding: 16,
            background: "#f8fafc",
          }}
        >
          <h3 style={{ marginTop: 0 }}>Supervisor Approval</h3>

          <label style={{ display: "block", marginBottom: 10 }}>
            <input type="checkbox" /> Shield verified in place
          </label>

          <label style={{ display: "block", marginBottom: 10 }}>
            <input type="checkbox" /> Corrective actions completed
          </label>

          <label style={{ display: "block" }}>
            <input
              type="checkbox"
              checked={stopWork}
              onChange={(e) => setStopWork(e.target.checked)}
            />{" "}
            Stop work required
          </label>

          {stopWork && (
            <div
              style={{
                marginTop: 12,
                padding: 12,
                borderRadius: 10,
                background: "#fee2e2",
                color: "#991b1b",
                fontWeight: "bold",
              }}
            >
              Stop work has been triggered. Work should not continue until the
              issue is corrected and reviewed.
            </div>
          )}
        </div>

        <button
          type="submit"
          style={{
            padding: 14,
            border: "none",
            borderRadius: 12,
            background: "#123d82",
            color: "white",
            fontWeight: "bold",
            fontSize: 16,
            cursor: "pointer",
          }}
        >
          Submit Record
        </button>
      </form>

      {submitted && (
        <div
          style={{
            marginTop: 20,
            padding: 16,
            background: "#ecfdf5",
            borderRadius: 12,
            border: "1px solid #a7f3d0",
          }}
        >
          <strong>Record submitted.</strong>
          <div>Your BAAC SHIELD worker form is active and working.</div>
        </div>
      )}
    </main>
  );
}
