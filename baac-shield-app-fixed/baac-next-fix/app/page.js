"use client";

import { useEffect, useMemo, useRef, useState } from "react";

export default function Home() {
  const [worker, setWorker] = useState("");
  const [supervisor, setSupervisor] = useState("");
  const [jobSite, setJobSite] = useState("");
  const [task, setTask] = useState("");
  const [risk, setRisk] = useState("");
  const [shield, setShield] = useState("");
  const [notes, setNotes] = useState("");
  const [stopWork, setStopWork] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [records, setRecords] = useState([]);
  const [submitted, setSubmitted] = useState(false);
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

  useEffect(() => {
    const saved = localStorage.getItem("baac-shield-records");
    if (saved) {
      setRecords(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("baac-shield-records", JSON.stringify(records));
  }, [records]);

  function handleFiles(e) {
    const files = Array.from(e.target.files || []);
    setPhotos(files.map((f) => f.name));
  }

  function clearForm() {
    setWorker("");
    setSupervisor("");
    setJobSite("");
    setTask("");
    setRisk("");
    setShield("");
    setNotes("");
    setStopWork(false);
    setPhotos([]);
  }

  function handleSubmit(e) {
    e.preventDefault();

    const newRecord = {
      id: Date.now(),
      worker,
      supervisor,
      jobSite,
      task,
      risk,
      shield,
      notes,
      stopWork,
      photos,
      submittedAt: new Date().toLocaleString(),
    };

    setRecords((prev) => [newRecord, ...prev]);
    setSubmitted(true);
    clearForm();
  }

  function deleteRecord(id) {
    setRecords((prev) => prev.filter((record) => record.id !== id));
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
          <input
            value={worker}
            onChange={(e) => setWorker(e.target.value)}
            type="text"
            style={{ width: "100%", padding: 12, marginTop: 6, borderRadius: 10, border: "1px solid #cbd5e1" }}
          />
        </div>

        <div>
          <label>Supervisor Name</label>
          <br />
          <input
            value={supervisor}
            onChange={(e) => setSupervisor(e.target.value)}
            type="text"
            style={{ width: "100%", padding: 12, marginTop: 6, borderRadius: 10, border: "1px solid #cbd5e1" }}
          />
        </div>

        <div>
          <label>Job Site</label>
          <br />
          <input
            value={jobSite}
            onChange={(e) => setJobSite(e.target.value)}
            type="text"
            style={{ width: "100%", padding: 12, marginTop: 6, borderRadius: 10, border: "1px solid #cbd5e1" }}
          />
        </div>

        <div>
          <label>Task Description</label>
          <br />
          <textarea
            value={task}
            onChange={(e) => setTask(e.target.value)}
            rows="3"
            style={{ width: "100%", padding: 12, marginTop: 6, borderRadius: 10, border: "1px solid #cbd5e1" }}
          />
        </div>

        <div>
          <label>Critical Risk Category</label>
          <br />
          <select
            value={risk}
            onChange={(e) => {
              setRisk(e.target.value);
              setShield("");
            }}
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
            value={shield}
            onChange={(e) => setShield(e.target.value)}
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
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows="4"
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
              Stop work has been triggered.
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
          <strong>Record submitted and saved on this device.</strong>
        </div>
      )}

      <div
        style={{
          marginTop: 22,
          background: "white",
          padding: 18,
          borderRadius: 16,
          boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
        }}
      >
        <h2 style={{ marginTop: 0 }}>Saved Records</h2>

        {records.length === 0 ? (
          <p>No saved records yet.</p>
        ) : (
          <div style={{ display: "grid", gap: 12 }}>
            {records.map((record) => (
              <div
                key={record.id}
                style={{
                  border: "1px solid #dbe4ee",
                  borderRadius: 12,
                  padding: 14,
                  background: "#f8fafc",
                }}
              >
                <div><strong>Worker:</strong> {record.worker}</div>
                <div><strong>Site:</strong> {record.jobSite}</div>
                <div><strong>Risk:</strong> {record.risk}</div>
                <div><strong>Shield:</strong> {record.shield}</div>
                <div><strong>Submitted:</strong> {record.submittedAt}</div>
                {record.stopWork && (
                  <div style={{ color: "#b91c1c", fontWeight: "bold", marginTop: 8 }}>
                    Stop Work Required
                  </div>
                )}
                <button
                  onClick={() => deleteRecord(record.id)}
                  style={{
                    marginTop: 10,
                    padding: "8px 12px",
                    borderRadius: 8,
                    border: "1px solid #cbd5e1",
                    background: "white",
                    cursor: "pointer",
                  }}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
