"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import jsPDF from "jspdf";
import SignatureCanvas from "react-signature-canvas";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export default function Home() {
  const [worker, setWorker] = useState("");
  const [workerSignature, setWorkerSignature] = useState("");
  const [supervisor, setSupervisor] = useState("");
  const [supervisorSignature, setSupervisorSignature] = useState("");
  const [jobSite, setJobSite] = useState("");
  const [task, setTask] = useState("");
  const [risk, setRisk] = useState("");
  const [selectedShields, setSelectedShields] = useState([]);
  const [notes, setNotes] = useState("");
  const [stopWork, setStopWork] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [records, setRecords] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [activeTab, setActiveTab] = useState("worker");

  const [reviewingId, setReviewingId] = useState(null);
  const [reviewStatus, setReviewStatus] = useState("Pending Review");
  const [reviewSupervisor, setReviewSupervisor] = useState("");
  const [reviewSupervisorSignature, setReviewSupervisorSignature] = useState("");
  const [reviewComments, setReviewComments] = useState("");
  const [correctiveActions, setCorrectiveActions] = useState("");
  const [rectified, setRectified] = useState(false);

  const fileRef = useRef(null);
  const workerSigRef = useRef(null);
  const supervisorSigRef = useRef(null);

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
    loadRecords();
  }, []);

  async function loadRecords() {
    try {
      const res = await fetch(
        `${SUPABASE_URL}/rest/v1/records?select=*&order=submitted_at.desc`,
        {
          headers: {
            apikey: SUPABASE_KEY,
            Authorization: `Bearer ${SUPABASE_KEY}`,
          },
        }
      );

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Could not load records");
      }

      const data = await res.json();
      setRecords(data);
    } catch (error) {
      setMessage(`Could not load records from database: ${error.message}`);
    }
  }

  function handleFiles(e) {
    const files = Array.from(e.target.files || []);
    setPhotos(files.map((f) => f.name));
  }

  function toggleShield(shield) {
    setSelectedShields((prev) =>
      prev.includes(shield)
        ? prev.filter((item) => item !== shield)
        : [...prev, shield]
    );
  }

  function clearForm() {
    setWorker("");
    setWorkerSignature("");
    setSupervisor("");
    setSupervisorSignature("");
    setJobSite("");
    setTask("");
    setRisk("");
    setSelectedShields([]);
    setNotes("");
    setStopWork(false);
    setPhotos([]);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setSubmitted(false);

    const payload = {
      worker_name: worker,
      worker_signature: workerSignature,
      supervisor_name: supervisor,
      supervisor_signature: supervisorSignature,
      job_site: jobSite,
      task_description: task,
      critical_risk: risk,
      shield_control: selectedShields.join(", "),
      notes,
      stop_work: stopWork,
      photos: photos.join(", "),
      status: "Pending Review",
      supervisor_review_comments: "",
      corrective_actions: "",
      rectified: false,
      reviewed_by: "",
      reviewed_at: null,
    };

    try {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/records`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${SUPABASE_KEY}`,
          Prefer: "return=representation",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Insert failed");
      }

      clearForm();
      setSubmitted(true);
      setMessage("Record submitted to database.");
      await loadRecords();
    } catch (error) {
      setMessage(`Could not save record: ${error.message}`);
    } finally {
      setLoading(false);
    }
  }

  function startReview(record) {
    setReviewingId(record.id);
    setReviewStatus(record.status || "Pending Review");
    setReviewSupervisor(record.reviewed_by || record.supervisor_name || "");
    setReviewSupervisorSignature(record.supervisor_signature || "");
    setReviewComments(record.supervisor_review_comments || "");
    setCorrectiveActions(record.corrective_actions || "");
    setRectified(Boolean(record.rectified));
    setActiveTab("supervisor");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function saveReview() {
    if (!reviewingId) return;

    setLoading(true);
    setMessage("");

    const payload = {
      status: reviewStatus,
      reviewed_by: reviewSupervisor,
      supervisor_signature: reviewSupervisorSignature,
      supervisor_review_comments: reviewComments,
      corrective_actions: correctiveActions,
      rectified: rectified,
      reviewed_at: new Date().toISOString(),
      stop_work: reviewStatus === "Stop Work" ? true : false,
    };

    try {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/records?id=eq.${reviewingId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${SUPABASE_KEY}`,
          Prefer: "return=representation",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Update failed");
      }

      setMessage("Supervisor review saved.");
      setReviewingId(null);
      setReviewStatus("Pending Review");
      setReviewSupervisor("");
      setReviewSupervisorSignature("");
      setReviewComments("");
      setCorrectiveActions("");
      setRectified(false);
      await loadRecords();
    } catch (error) {
      setMessage(`Could not save supervisor review: ${error.message}`);
    } finally {
      setLoading(false);
    }
  }

  async function deleteRecord(id) {
    try {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/records?id=eq.${id}`, {
        method: "DELETE",
        headers: {
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${SUPABASE_KEY}`,
        },
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Delete failed");
      }

      await loadRecords();
    } catch (error) {
      setMessage(`Could not delete record: ${error.message}`);
    }
  }

  const pendingRecords = records.filter(
    (r) => (r.status || "Pending Review") === "Pending Review"
  );
  const actionRecords = records.filter(
    (r) => r.status === "Needs Correction" || r.status === "Stop Work"
  );
  const closedRecords = records.filter(
    (r) => r.status === "Approved" || r.status === "Closed"
  );
  function downloadPdf(record) {
  const doc = new jsPDF();

  doc.setFillColor(15, 47, 102);
  doc.rect(0, 0, 210, 30, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(22);
  doc.text("BAAC SHIELD Report", 14, 18);

  doc.setFontSize(10);
  doc.text("Identify the risk. Verify the shield.", 14, 25);

  let y = 40;
  const lineGap = 8;

  doc.setTextColor(0, 0, 0);
  doc.setFontSize(12);

  const addLine = (label, value) => {
    const text = `${label}: ${value || "—"}`;
    const split = doc.splitTextToSize(text, 180);
    doc.text(split, 14, y);
    y += split.length * 6 + 2;
  };

  addLine("Worker", record.worker_name);
  addLine("Worker Signature", record.worker_signature);
  addLine("Supervisor", record.supervisor_name);
  addLine("Supervisor Signature", record.supervisor_signature);
  addLine("Job Site", record.job_site);
  addLine("Task Description", record.task_description);
  addLine("Critical Risk", record.critical_risk);
  addLine("Shield Controls", record.shield_control);
  addLine("Notes", record.notes);
  addLine("Status", record.status);
  addLine("Reviewed By", record.reviewed_by);
  addLine("Supervisor Comments", record.supervisor_review_comments);
  addLine("Corrective Actions", record.corrective_actions);
  addLine("Rectified", record.rectified ? "Yes" : "No");
  addLine("Stop Work", record.stop_work ? "Yes" : "No");
  addLine("Photos", record.photos);
  addLine("Submitted At", record.submitted_at);
  addLine("Reviewed At", record.reviewed_at);

  doc.save(`baac-shield-record-${record.id}.pdf`);
}
  function statusColor(status) {
    if (status === "Approved" || status === "Closed") return "#166534";
    if (status === "Stop Work") return "#b91c1c";
    if (status === "Needs Correction") return "#b45309";
    return "#1d4ed8";
  }

  return (
    <main
      style={{
        padding: 16,
        fontFamily: "Arial, sans-serif",
        maxWidth: 860,
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
          Worker submission and supervisor review workflow
        </p>
      </div>

      <div style={{ display: "flex", gap: 10, marginBottom: 18 }}>
        <button
          type="button"
          onClick={() => setActiveTab("worker")}
          style={{
            padding: "10px 14px",
            borderRadius: 10,
            border: "1px solid #cbd5e1",
            background: activeTab === "worker" ? "#123d82" : "white",
            color: activeTab === "worker" ? "white" : "#0f172a",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Worker Form
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("supervisor")}
          style={{
            padding: "10px 14px",
            borderRadius: 10,
            border: "1px solid #cbd5e1",
            background: activeTab === "supervisor" ? "#123d82" : "white",
            color: activeTab === "supervisor" ? "white" : "#0f172a",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Supervisor Review
        </button>
      </div>

      {activeTab === "worker" && (
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
              style={{
                width: "100%",
                padding: 12,
                marginTop: 6,
                borderRadius: 10,
                border: "1px solid #cbd5e1",
              }}
            />
          </div>

          <div>
  <label>Worker Signature</label>
  <div
    style={{
      border: "2px solid #cbd5e1",
      borderRadius: 10,
      marginTop: 6
    }}
  >
    <SignatureCanvas
      penColor="black"
      canvasProps={{
        width: 350,
        height: 120,
        className: "sigCanvas"
      }}
      ref={workerSigRef}
    />
  </div>

  <button
    type="button"
    onClick={() => workerSigRef.current.clear()}
    style={{
      marginTop: 6,
      padding: "6px 10px",
      borderRadius: 6,
      border: "1px solid #cbd5e1",
      background: "white",
      cursor: "pointer"
    }}
  >
    Clear Signature
  </button>
</div>

          <div>
  <label>Supervisor Signature</label>
  <div
    style={{
      border: "2px solid #cbd5e1",
      borderRadius: 10,
      marginTop: 6
    }}
  >
    <SignatureCanvas
      penColor="black"
      canvasProps={{
        width: 350,
        height: 120,
        className: "sigCanvas"
      }}
      ref={supervisorSigRef}
    />
  </div>

  <button
    type="button"
    onClick={() => supervisorSigRef.current.clear()}
    style={{
      marginTop: 6,
      padding: "6px 10px",
      borderRadius: 6,
      border: "1px solid #cbd5e1",
      background: "white",
      cursor: "pointer"
    }}
  >
    Clear Signature
  </button>
</div>
               

          <div>
            <label>Supervisor Signature</label>
            <br />
            <input
              value={supervisorSignature}
              onChange={(e) => setSupervisorSignature(e.target.value)}
              type="text"
              placeholder="Type full name as signature"
              style={{
                width: "100%",
                padding: 12,
                marginTop: 6,
                borderRadius: 10,
                border: "1px solid #cbd5e1",
              }}
            />
          </div>

          <div>
            <label>Job Site</label>
            <br />
            <input
              value={jobSite}
              onChange={(e) => setJobSite(e.target.value)}
              type="text"
              style={{
                width: "100%",
                padding: 12,
                marginTop: 6,
                borderRadius: 10,
                border: "1px solid #cbd5e1",
              }}
            />
          </div>

          <div>
            <label>Task Description</label>
            <br />
            <textarea
              value={task}
              onChange={(e) => setTask(e.target.value)}
              rows="3"
              style={{
                width: "100%",
                padding: 12,
                marginTop: 6,
                borderRadius: 10,
                border: "1px solid #cbd5e1",
              }}
            />
          </div>

          <div>
            <label>Critical Risk Category</label>
            <br />
            <select
              value={risk}
              onChange={(e) => {
                setRisk(e.target.value);
                setSelectedShields([]);
              }}
              style={{
                width: "100%",
                padding: 12,
                marginTop: 6,
                borderRadius: 10,
                border: "1px solid #cbd5e1",
              }}
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
            <label>Shield / Controls</label>
            <div
              style={{
                marginTop: 8,
                border: "1px solid #cbd5e1",
                borderRadius: 12,
                padding: 12,
                background: "#f8fafc",
              }}
            >
              {!risk ? (
                <div style={{ color: "#64748b" }}>Select a risk first</div>
              ) : (
                shieldOptions.map((item) => (
                  <label
                    key={item}
                    style={{
                      display: "block",
                      marginBottom: 10,
                      padding: 8,
                      borderRadius: 8,
                      background: selectedShields.includes(item)
                        ? "#dbeafe"
                        : "white",
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={selectedShields.includes(item)}
                      onChange={() => toggleShield(item)}
                    />{" "}
                    {item}
                  </label>
                ))
              )}
            </div>
          </div>

          <div>
            <label>Hazards / Notes</label>
            <br />
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows="4"
              style={{
                width: "100%",
                padding: 12,
                marginTop: 6,
                borderRadius: 10,
                border: "1px solid #cbd5e1",
              }}
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
            <h3 style={{ marginTop: 0 }}>Worker Stop Work Check</h3>
            <label style={{ display: "block" }}>
              <input
                type="checkbox"
                checked={stopWork}
                onChange={(e) => setStopWork(e.target.checked)}
              />{" "}
              Stop work required
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
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
            {loading ? "Saving..." : "Submit for Supervisor Review"}
          </button>
        </form>
      )}

      {activeTab === "supervisor" && (
        <div style={{ display: "grid", gap: 18 }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
              gap: 12,
            }}
          >
            <div
              style={{
                background: "white",
                borderRadius: 14,
                padding: 16,
                boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
              }}
            >
              <div style={{ color: "#64748b", fontSize: 12 }}>
                Pending Review
              </div>
              <div style={{ fontSize: 28, fontWeight: "bold" }}>
                {pendingRecords.length}
              </div>
            </div>
            <div
              style={{
                background: "white",
                borderRadius: 14,
                padding: 16,
                boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
              }}
            >
              <div style={{ color: "#64748b", fontSize: 12 }}>
                Needs Action
              </div>
              <div style={{ fontSize: 28, fontWeight: "bold" }}>
                {actionRecords.length}
              </div>
            </div>
            <div
              style={{
                background: "white",
                borderRadius: 14,
                padding: 16,
                boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
              }}
            >
              <div style={{ color: "#64748b", fontSize: 12 }}>
                Approved / Closed
              </div>
              <div style={{ fontSize: 28, fontWeight: "bold" }}>
                {closedRecords.length}
              </div>
            </div>
          </div>

          {reviewingId && (
            <div
              style={{
                background: "white",
                borderRadius: 16,
                padding: 18,
                boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
              }}
            >
              <h2 style={{ marginTop: 0 }}>Supervisor Review</h2>

              <div style={{ display: "grid", gap: 12 }}>
                <div>
                  <label>Status</label>
                  <br />
                  <select
                    value={reviewStatus}
                    onChange={(e) => setReviewStatus(e.target.value)}
                    style={{
                      width: "100%",
                      padding: 12,
                      marginTop: 6,
                      borderRadius: 10,
                      border: "1px solid #cbd5e1",
                    }}
                  >
                    <option>Pending Review</option>
                    <option>Approved</option>
                    <option>Needs Correction</option>
                    <option>Stop Work</option>
                    <option>Closed</option>
                  </select>
                </div>

                <div>
                  <label>Supervisor Sign-Off Name</label>
                  <br />
                  <input
                    value={reviewSupervisor}
                    onChange={(e) => setReviewSupervisor(e.target.value)}
                    type="text"
                    style={{
                      width: "100%",
                      padding: 12,
                      marginTop: 6,
                      borderRadius: 10,
                      border: "1px solid #cbd5e1",
                    }}
                  />
                </div>

                <div>
                  <label>Supervisor Signature</label>
                  <br />
                  <input
                    value={reviewSupervisorSignature}
                    onChange={(e) =>
                      setReviewSupervisorSignature(e.target.value)
                    }
                    type="text"
                    placeholder="Type full name as signature"
                    style={{
                      width: "100%",
                      padding: 12,
                      marginTop: 6,
                      borderRadius: 10,
                      border: "1px solid #cbd5e1",
                    }}
                  />
                </div>

                <div>
                  <label>Supervisor Comments</label>
                  <br />
                  <textarea
                    value={reviewComments}
                    onChange={(e) => setReviewComments(e.target.value)}
                    rows="4"
                    style={{
                      width: "100%",
                      padding: 12,
                      marginTop: 6,
                      borderRadius: 10,
                      border: "1px solid #cbd5e1",
                    }}
                  />
                </div>

                <div>
                  <label>Corrective Actions</label>
                  <br />
                  <textarea
                    value={correctiveActions}
                    onChange={(e) => setCorrectiveActions(e.target.value)}
                    rows="4"
                    style={{
                      width: "100%",
                      padding: 12,
                      marginTop: 6,
                      borderRadius: 10,
                      border: "1px solid #cbd5e1",
                    }}
                  />
                </div>

                <label>
                  <input
                    type="checkbox"
                    checked={rectified}
                    onChange={(e) => setRectified(e.target.checked)}
                  />{" "}
                  Rectified / corrected
                </label>

                <div style={{ display: "flex", gap: 10 }}>
                  <button
                    type="button"
                    onClick={saveReview}
                    disabled={loading}
                    style={{
                      padding: "12px 16px",
                      border: "none",
                      borderRadius: 10,
                      background: "#123d82",
                      color: "white",
                      fontWeight: "bold",
                      cursor: "pointer",
                    }}
                  >
                    {loading ? "Saving..." : "Save Review"}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setReviewingId(null);
                      setReviewStatus("Pending Review");
                      setReviewSupervisor("");
                      setReviewSupervisorSignature("");
                      setReviewComments("");
                      setCorrectiveActions("");
                      setRectified(false);
                    }}
                    style={{
                      padding: "12px 16px",
                      borderRadius: 10,
                      border: "1px solid #cbd5e1",
                      background: "white",
                      cursor: "pointer",
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          <div
            style={{
              background: "white",
              borderRadius: 16,
              padding: 18,
              boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
            }}
          >
            <h2 style={{ marginTop: 0 }}>All Records</h2>

            {records.length === 0 ? (
              <p>No records yet.</p>
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
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        gap: 12,
                        flexWrap: "wrap",
                      }}
                    >
                      <div>
                        <div>
                          <strong>Worker:</strong> {record.worker_name}
                        </div>
                        <div>
                          <strong>Worker Signature:</strong>{" "}
                          {record.worker_signature || "—"}
                        </div>
                        <div>
                          <strong>Supervisor:</strong> {record.supervisor_name}
                        </div>
                        <div>
                          <strong>Supervisor Signature:</strong>{" "}
                          {record.supervisor_signature || "—"}
                        </div>
                        <div>
                          <strong>Site:</strong> {record.job_site}
                        </div>
                        <div>
                          <strong>Task:</strong> {record.task_description}
                        </div>
                        <div>
                          <strong>Risk:</strong> {record.critical_risk}
                        </div>
                        <div>
                          <strong>Shield(s):</strong> {record.shield_control}
                        </div>
                        <div>
                          <strong>Notes:</strong> {record.notes}
                        </div>
                        <div>
                          <strong>Submitted:</strong> {record.submitted_at}
                        </div>
                        {record.reviewed_by && (
                          <div>
                            <strong>Reviewed By:</strong> {record.reviewed_by}
                          </div>
                        )}
                        {record.supervisor_review_comments && (
                          <div>
                            <strong>Comments:</strong>{" "}
                            {record.supervisor_review_comments}
                          </div>
                        )}
                        {record.corrective_actions && (
                          <div>
                            <strong>Corrective Actions:</strong>{" "}
                            {record.corrective_actions}
                          </div>
                        )}
                      </div>

                      <div>
                        <div
                          style={{
                            color: statusColor(record.status || "Pending Review"),
                            fontWeight: "bold",
                            marginBottom: 10,
                          }}
                        >
                          {record.status || "Pending Review"}
                        </div>

                        <button
                          onClick={() => startReview(record)}
                          style={{
                            display: "block",
                            width: "100%",
                            marginBottom: 8,
                            padding: "8px 12px",
                            borderRadius: 8,
                            border: "1px solid #cbd5e1",
                            background: "white",
                            cursor: "pointer",
                          }}
                        >
                          Review
                        </button>

                         <button
  onClick={() => downloadPdf(record)}
  style={{
    display: "block",
    width: "100%",
    marginBottom: 8,
    padding: "8px 12px",
    borderRadius: 8,
    border: "1px solid #cbd5e1",
    background: "#0f2f66",
    color: "white",
    cursor: "pointer",
    fontWeight: "bold"
  }}
>
  Download PDF
</button>
    
                        <button
                          onClick={() => deleteRecord(record.id)}
                          style={{
                            display: "block",
                            width: "100%",
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
                    </div>

                    {record.stop_work && (
                      <div
                        style={{
                          color: "#b91c1c",
                          fontWeight: "bold",
                          marginTop: 10,
                        }}
                      >
                        Stop Work Required
                      </div>
                    )}

                    {record.rectified && (
                      <div
                        style={{
                          color: "#166534",
                          fontWeight: "bold",
                          marginTop: 10,
                        }}
                      >
                        Rectified
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {message && (
        <div
          style={{
            marginTop: 20,
            padding: 16,
            background: submitted ? "#ecfdf5" : "#fff7ed",
            borderRadius: 12,
            border: submitted
              ? "1px solid #a7f3d0"
              : "1px solid #fdba74",
            whiteSpace: "pre-wrap",
            wordBreak: "break-word",
          }}
        >
          {message}
        </div>
      )}
    </main>
  );
}
