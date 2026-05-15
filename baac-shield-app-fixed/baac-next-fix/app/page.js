"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import jsPDF from "jspdf";
import SignatureCanvas from "react-signature-canvas";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

function SignatureBox({ sigRef, onSave }) {
  return (
    <div>
      <div
        style={{
          border: "2px solid #cbd5e1",
          borderRadius: 10,
          marginTop: 6,
          background: "white",
          overflow: "hidden",
        }}
      >
        <SignatureCanvas
          ref={sigRef}
          penColor="black"
          onEnd={() => {
            if (sigRef.current && !sigRef.current.isEmpty()) {
              onSave(sigRef.current.toDataURL("image/png"));
            }
          }}
           canvasProps={{
           width: 350,
           height: 180,
           style: {
           width: "100%",
           maxWidth: 350,
           height: 180,
           display: "block",
        },
        }}
        />
      </div>

      <button
        type="button"
        onClick={() => {
          sigRef.current?.clear();
          onSave("");
        }}
        style={{
          marginTop: 8,
          padding: "8px 12px",
          borderRadius: 8,
          border: "1px solid #cbd5e1",
          background: "white",
          cursor: "pointer",
        }}
      >
        Clear Signature
      </button>
    </div>
  );
}

export default function Home() {
  const [worker, setWorker] = useState("");
  const [workerSignature, setWorkerSignature] = useState("");
  const [supervisor, setSupervisor] = useState("");
  const [projectName, setProjectName] = useState("");
  const [hazardProject, setHazardProject] = useState("");
  const [hazardReportType, setHazardReportType] = useState("Hazard ID");
const [reportedBy, setReportedBy] = useState("");
const [hazardCategory, setHazardCategory] = useState("");
const [hazardDescription, setHazardDescription] = useState("");
const [immediateAction, setImmediateAction] = useState("");
const [hazardRiskLevel, setHazardRiskLevel] = useState("");
const [hazardPhotos, setHazardPhotos] = useState([]);

  const [hazardActionId, setHazardActionId] = useState(null);
const [correctiveActionText, setCorrectiveActionText] = useState("");
const [assignedTo, setAssignedTo] = useState("");
  
  const [task, setTask] = useState("");
  const [risk, setRisk] = useState("");
  const [selectedShields, setSelectedShields] = useState([]);
  const [notes, setNotes] = useState("");
  const [stopWork, setStopWork] = useState(false);
  const [photos, setPhotos] = useState([]);

const [dueDate, setDueDate] = useState("");
const [actionStatus, setActionStatus] = useState("Open");
  const [records, setRecords] = useState([]);
  const [hazardReports, setHazardReports] = useState([]);
  const projectCounts = records.reduce((acc, record) => {
  const project = record.project_name || "Unknown";
  acc[project] = (acc[project] || 0) + 1;
  return acc;
  }, {});
  const riskCounts = records.reduce((acc, record) => {
  const risk = record.critical_risk || "Unknown";
  acc[risk] = (acc[risk] || 0) + 1;
  return acc;
}, {});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [activeTab, setActiveTab] = useState("worker");
  const [showSplash, setShowSplash] = useState(true);
  
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [riskFilter, setRiskFilter] = useState("All");
  const [stopWorkOnly, setStopWorkOnly] = useState(false);
  const [dateFilter, setDateFilter] = useState("All");
  const [projects, setProjects] = useState([]);
  const [projectFilter, setProjectFilter] = useState("All");
  
  const [supervisorPin, setSupervisorPin] = useState("1234");
  const [pinInput, setPinInput] = useState("");
  const [showPinPrompt, setShowPinPrompt] = useState(false);
  const [pendingTab, setPendingTab] = useState("");

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

  function requestProtectedTab(tabName) {
    setPendingTab(tabName);
    setPinInput("");
    setShowPinPrompt(true);
  }

  function unlockProtectedTab() {
    if (pinInput === supervisorPin) {
      setActiveTab(pendingTab);
      setShowPinPrompt(false);
      setPinInput("");
      setMessage("");
    } else {
      setMessage("Incorrect supervisor PIN.");
    }
  }

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
    loadProjects();

    const timer = setTimeout(() => {
    setShowSplash(false);
  }, 1800);

  return () => clearTimeout(timer);
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

      const hazardRes = await fetch(
  `${SUPABASE_URL}/rest/v1/hazard_reports?select=*`,
  {
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
    },
  }
);

if (hazardRes.ok) {
  const hazardData = await hazardRes.json();
  setHazardReports(hazardData);
}
    } catch (error) {
      setMessage(`Could not load records from database: ${error.message}`);
    }
  }

  async function loadProjects() {
    try {
      const res = await fetch(
        `${SUPABASE_URL}/rest/v1/projects?select=*&order=name.asc`,
        {
          headers: {
            apikey: SUPABASE_KEY,
            Authorization: `Bearer ${SUPABASE_KEY}`,
          },
        }
      );

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Could not load projects");
      }

      const data = await res.json();
      setProjects(data.filter((p) => p.active !== false));
    } catch (error) {
      setMessage(`Could not load projects: ${error.message}`);
    }
  }
  
  function handleFiles(e) {
    const files = Array.from(e.target.files || []);
    setPhotos(files);
  }

  function toggleShield(shield) {
    setSelectedShields((prev) =>
      prev.includes(shield)
        ? prev.filter((item) => item !== shield)
        : [...prev, shield]
    );
  }

  async function uploadPhotosToSupabase(files) {
    if (!files || files.length === 0) return [];

    const uploadedUrls = [];

    for (const file of files) {
      const safeName = file.name.replace(/\s+/g, "-");
      const fileName = `${Date.now()}-${safeName}`;

      const uploadRes = await fetch(
        `${SUPABASE_URL}/storage/v1/object/baac-photos/${fileName}`,
        {
          method: "POST",
          headers: {
            apikey: SUPABASE_KEY,
            Authorization: `Bearer ${SUPABASE_KEY}`,
            "Content-Type": file.type || "application/octet-stream",
            "x-upsert": "true",
          },
          body: file,
        }
      );

      if (!uploadRes.ok) {
        const text = await uploadRes.text();
        throw new Error(text || "Photo upload failed");
      }

      uploadedUrls.push(
        `${SUPABASE_URL}/storage/v1/object/public/baac-photos/${fileName}`
      );
    }

    return uploadedUrls;
  }

  function clearForm() {
    setWorker("");
    setWorkerSignature("");
    setSupervisor("");
    setTask("");
    setRisk("");
    setSelectedShields([]);
    setNotes("");
    setStopWork(false);
    setPhotos([]);
    workerSigRef.current?.clear();
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setSubmitted(false);

    try {
      const uploadedPhotoUrls = await uploadPhotosToSupabase(photos);

      const payload = {
        worker_name: worker,
        worker_signature: workerSignature,
        supervisor_name: supervisor,
        project_name: projectName,
        supervisor_signature: "",
        task_description: task,
        critical_risk: risk,
        shield_control: selectedShields.join(", "),
        notes,
        stop_work: stopWork,
        photos: uploadedPhotoUrls.join(", "),
        status: "Pending Review",
        supervisor_review_comments: "",
        corrective_actions: "",
        rectified: false,
        reviewed_by: "",
        reviewed_at: null,
      };

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

      await fetch("/api/send-alert", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: "rod.gonzalez@baacconstruction.com",
          subject: stopWork
            ? "BAAC SHIELD - STOP WORK ALERT"
            : "BAAC SHIELD - New Record Submitted",
          worker,
          supervisor,
          project: projectName,
          task,
          risk,
          notes,
          stopWork,
        }),
      });

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

async function submitHazardReport() {
  setLoading(true);
  setMessage("");

  if (
  !hazardProject ||
  !reportedBy ||
  !hazardCategory ||
  !hazardDescription ||
  !hazardRiskLevel
) {
    setMessage(
  "Please complete required fields: Project, Reported By, Hazard Category, Hazard Description, and Risk Level."
);
    setLoading(false);
    return;
  }

  try {
    const uploadedPhotoUrls = await uploadPhotosToSupabase(hazardPhotos);

    const payload = {
      project_name: hazardProject,
      report_type: hazardReportType,
      reported_by: reportedBy,
      hazard_category: hazardCategory,
      hazard_description: hazardDescription,
      immediate_action: immediateAction,
      risk_level: hazardRiskLevel,
      photos: uploadedPhotoUrls.join(", "),
      status: "Open",
      action_status: "Open",
    };

    const res = await fetch(`${SUPABASE_URL}/rest/v1/hazard_reports`, {
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
      throw new Error(text || "Hazard report insert failed");
    }

const emailRes = await fetch("/api/send-alert", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    to: "rod.gonzalez@baacconstruction.com",
    subject:
      hazardReportType === "Observation"
        ? "BAAC SHIELD - New Observation Submitted"
        : "BAAC SHIELD - New Hazard ID Submitted",
    worker: reportedBy,
    supervisor: "",
    project: hazardProject,
    task: hazardDescription,
    risk: hazardCategory,
    notes: `Type: ${hazardReportType} | Risk Level: ${hazardRiskLevel} | Immediate Action: ${
      immediateAction || "-"
    }`,
    stopWork: hazardRiskLevel === "Critical",
  }),
});

if (!emailRes.ok) {
  const emailText = await emailRes.text();
  throw new Error(emailText || "Hazard email failed");
}
    
    setHazardProject("");
    setReportedBy("");
    setHazardCategory("");
    setHazardDescription("");
    setImmediateAction("");
    setHazardRiskLevel("");
    setHazardPhotos([]);

    setMessage("Hazard report submitted.");
  } catch (error) {
    setMessage(`Could not save hazard report: ${error.message}`);
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
      rectified,
      reviewed_at: new Date().toISOString(),
      stop_work: reviewStatus === "Stop Work",
    };

    try {
      const res = await fetch(
        `${SUPABASE_URL}/rest/v1/records?id=eq.${reviewingId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            apikey: SUPABASE_KEY,
            Authorization: `Bearer ${SUPABASE_KEY}`,
            Prefer: "return=representation",
          },
          body: JSON.stringify(payload),
        }
      );

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
      supervisorSigRef.current?.clear();
      await loadRecords();
    } catch (error) {
      setMessage(`Could not save supervisor review: ${error.message}`);
    } finally {
      setLoading(false);
    }
  }

async function saveHazardReview() {
  if (!hazardActionId) return;

  setLoading(true);
  setMessage("");

  const payload = {
    action_status: reviewStatus,
    reviewed_by: reviewSupervisor,
    supervisor_review_comments: reviewComments,
    corrective_action: correctiveActionText,
    closed_date:
      reviewStatus === "Closed"
        ? new Date().toISOString().split("T")[0]
        : null,
  };

  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/hazard_reports?id=eq.${hazardActionId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${SUPABASE_KEY}`,
          Prefer: "return=representation",
        },
        body: JSON.stringify(payload),
      }
    );

    if (!res.ok) {
      const text = await res.text();
      throw new Error(text || "Hazard review update failed");
    }

    if (reviewStatus === "Closed") {
      setHazardReports((prev) =>
        prev.filter((report) => report.id !== hazardActionId)
      );
    }

    setMessage("Hazard review saved.");

    setHazardActionId(null);
    setReviewStatus("Open");
    setReviewSupervisor("");
    setReviewComments("");
    setCorrectiveActionText("");

    await loadRecords();
  } catch (error) {
    setMessage(`Could not save hazard review: ${error.message}`);
  } finally {
    setLoading(false);
  }
}
  
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

    const addLine = (label, value) => {
      const text = `${label}: ${value || "—"}`;
      const split = doc.splitTextToSize(text, 180);
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(12);
      doc.text(split, 14, y);
      y += split.length * 6 + 4;
    };

    addLine("Worker", record.worker_name);
    addLine("Supervisor", record.supervisor_name);
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
    addLine("Submitted At", record.submitted_at);
    addLine("Reviewed At", record.reviewed_at);

    if (
      record.worker_signature &&
      String(record.worker_signature).startsWith("data:image")
    ) {
      if (y > 220) {
        doc.addPage();
        y = 20;
      }
      doc.text("Worker Signature:", 14, y);
      y += 4;
      doc.addImage(record.worker_signature, "PNG", 14, y, 80, 30);
      y += 38;
    }

    if (
      record.supervisor_signature &&
      String(record.supervisor_signature).startsWith("data:image")
    ) {
      if (y > 220) {
        doc.addPage();
        y = 20;
      }
      doc.text("Supervisor Signature:", 14, y);
      y += 4;
      doc.addImage(record.supervisor_signature, "PNG", 14, y, 80, 30);
      y += 38;
    }

    const photoUrls = record.photos
      ? String(record.photos)
          .split(",")
          .map((p) => p.trim())
          .filter(Boolean)
      : [];

    if (photoUrls.length > 0) {
      if (y > 240) {
        doc.addPage();
        y = 20;
      }
      doc.text("Photo Links:", 14, y);
      y += 6;
      photoUrls.forEach((url) => {
        const split = doc.splitTextToSize(url, 180);
        doc.text(split, 14, y);
        y += split.length * 6 + 2;
      });
    }

    doc.save(`baac-shield-record-${record.id}.pdf`);
  }

  function exportFilteredToCSV() {
  if (!filteredRecords.length) {
    setMessage("No filtered records to export.");
    return;
  }

  const headers = [
    "Worker",
    "Supervisor",
    "Project",
    "Task",
    "Risk",
    "Status",
    "Stop Work",
    "Submitted At"
  ];

  const rows = filteredRecords.map((record) => [
    record.worker_name || "",
    record.supervisor_name || "",
    record.project_name || "",
    record.task_description || "",
    record.critical_risk || "",
    record.status || "",
    record.stop_work ? "Yes" : "No",
    record.submitted_at || ""
  ]);

  const csvContent = [
    headers,
    ...rows
  ]
    .map((row) =>
      row.map((val) => `"${String(val).replace(/"/g, '""')}"`).join(",")
    )
    .join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "baac-shield-records.csv";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

  function statusColor(status) {
    if (status === "Approved") return "#166534";
    if (status === "Stop Work") return "#b91c1c";
    if (status === "Needs Correction") return "#b45309";
    return "#1d4ed8";
  }

  const pendingRecords = records.filter(
    (r) => (r.status || "Pending Review") === "Pending Review"
  );
  const actionRecords = records.filter(
    (r) => r.status === "Needs Correction" || r.status === "Stop Work"
  );
  const closedRecords = records.filter((r) => r.status === "Approved");
  const totalHazards = hazardReports.length;

  const hazardTypeCounts = hazardReports.reduce((acc, report) => {
  const type = report.report_type || "Unknown";
  acc[type] = (acc[type] || 0) + 1;
  return acc;
}, {});

const hazardRiskCounts = hazardReports.reduce((acc, report) => {
  const level = report.risk_level || "Unknown";
  acc[level] = (acc[level] || 0) + 1;
  return acc;
}, {});

const hazardCategoryCounts = hazardReports.reduce((acc, report) => {
  const category = report.hazard_category || "Unknown";
  acc[category] = (acc[category] || 0) + 1;
  return acc;
}, {});
const hazardIdCount = hazardReports.filter(
  (r) => r.report_type === "Hazard ID"
).length;

const observationCount = hazardReports.filter(
  (r) => r.report_type === "Observation"
).length;

const criticalHazardCount = hazardReports.filter(
  (r) => r.risk_level === "Critical"
).length;

 const filteredRecords = records.filter((record) => {
  const matchesSearch =
  !searchTerm ||
  record.worker_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
  record.task_description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
  record.project_name?.toLowerCase().includes(searchTerm.toLowerCase());

  const matchesStatus =
    statusFilter === "All" ||
    (record.status || "Pending Review") === statusFilter;

  const matchesRisk =
    riskFilter === "All" || record.critical_risk === riskFilter;

  const matchesProject =
    projectFilter === "All" || record.project_name === projectFilter;

  const matchesStopWork =
    !stopWorkOnly || record.stop_work === true;

  const submittedDate = record.submitted_at
    ? new Date(record.submitted_at)
    : null;

  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(now.getDate() - 7);

  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(now.getDate() - 30);

  const matchesDate =
    dateFilter === "All" ||
    (dateFilter === "Today" && submittedDate && submittedDate >= todayStart) ||
    (dateFilter === "Last7" && submittedDate && submittedDate >= sevenDaysAgo) ||
    (dateFilter === "Last30" && submittedDate && submittedDate >= thirtyDaysAgo);

  return (
    matchesSearch &&
    matchesStatus &&
    matchesRisk &&
    matchesStopWork &&
    matchesDate &&
    matchesProject
  );
});

  if (showSplash) {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #0f2f66, #1d4f9a)",
        color: "white",
        fontFamily: "Arial, sans-serif",
        padding: 20,
      }}
    >
      <div
        style={{
          textAlign: "center",
          maxWidth: 520,
          opacity: 1,
          transition: "opacity 0.5s ease",
        }}
      >
        <img
          src="/baac-logo.png"
          alt="BAAC Logo"
          style={{
            width: 160,
            height: "auto",
            marginBottom: 24,
            borderRadius: 12,
            background: "white",
            padding: 6,
            boxShadow: "0 8px 24px rgba(0,0,0,0.18)",
          }}
        />

        <h1
          style={{
            margin: 0,
            fontSize: 38,
            letterSpacing: 1.2,
            fontWeight: "bold",
          }}
        >
          BAAC SHIELD
        </h1>

        <p
          style={{
            marginTop: 10,
            marginBottom: 6,
            fontSize: 18,
            fontWeight: "bold",
            opacity: 0.95,
          }}
        >
          BAAC Critical Risk Management System
        </p>

        <p
          style={{
            marginTop: 8,
            fontSize: 15,
            opacity: 0.88,
          }}
        >
          Identify the risk. Verify the shield.
        </p>

        <div
          style={{
            marginTop: 26,
            fontSize: 14,
            letterSpacing: 1,
            opacity: 0.75,
          }}
        >
          Loading...
        </div>
      </div>
    </main>
  );
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
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <img
            src="/baac-logo.png"
            alt="BAAC Logo"
            style={{
              height: 50,
              width: "auto",
              borderRadius: 6,
              background: "white",
              padding: 4,
            }}
          />
          <div>
            <h1 style={{ margin: 0, fontSize: 26 }}>BAAC SHIELD</h1>
            <div style={{ fontSize: 12, opacity: 0.7 }}>
              Identify the risk. Verify the shield.
            </div>
          </div>
        </div>

        <p style={{ marginTop: 8, marginBottom: 0, opacity: 0.95 }}>
          Worker submission and supervisor review workflow
        </p>
      </div>

      <div style={{ display: "flex", gap: 10, marginBottom: 18, flexWrap: "wrap" }}>
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
    onClick={() => setActiveTab("hazard")}
    style={{
      padding: "10px 14px",
      borderRadius: 10,
      border: "1px solid #cbd5e1",
      background: activeTab === "hazard" ? "#123d82" : "white",
      color: activeTab === "hazard" ? "white" : "#0f172a",
      fontWeight: "bold",
      cursor: "pointer",
    }}
  >
    Hazard ID
  </button>

  <button
    type="button"
    onClick={() => requestProtectedTab("supervisor")}
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

  <button
    type="button"
    onClick={() => requestProtectedTab("dashboard")}
    style={{
      padding: "10px 14px",
      borderRadius: 10,
      border: "1px solid #cbd5e1",
      background: activeTab === "dashboard" ? "#123d82" : "white",
      color: activeTab === "dashboard" ? "white" : "#0f172a",
      fontWeight: "bold",
      cursor: "pointer",
    }}
  >
    Safety Dashboard
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
            <SignatureBox sigRef={workerSigRef} onSave={setWorkerSignature} />
          </div>

          <div>
            <label>Project Name</label>
            <br />
            <select
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              style={{
                width: "100%",
                padding: 12,
                marginTop: 6,
                borderRadius: 10,
                border: "1px solid #cbd5e1",
              }}
            >
              <option value="">Select a project</option>
              {projects.map((project) => (
                <option key={project.id} value={project.name}>
                  {project.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label>Supervisor Name</label>
            <br />
            <input
              value={supervisor}
              onChange={(e) => setSupervisor(e.target.value)}
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
              accept="image/*"
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
                  {photos.map((file) => (
                    <li key={file.name}>{file.name}</li>
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
            <h3 style={{ marginTop: 0 }}>Unsafe Condition / Stop Work</h3>
            <label style={{ display: "block" }}>
              <input
                type="checkbox"
                checked={stopWork}
                onChange={(e) => setStopWork(e.target.checked)}
              />{" "}
              Unsafe condition identified — stop work and escalate
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

{activeTab === "hazard" && (
  <div
    style={{
      background: "white",
      padding: 20,
      borderRadius: 12,
      border: "1px solid #dbe4ee",
      marginTop: 20,
    }}
  >
    <h2 style={{ marginTop: 0 }}>Hazard ID Report</h2>

    <div style={{ display: "grid", gap: 16 }}>

      <div>
        <label>Project</label>
        <br />
        <select
          value={hazardProject}
          onChange={(e) => setHazardProject(e.target.value)}
          style={{
            width: "100%",
            padding: 12,
            borderRadius: 10,
            border: "1px solid #cbd5e1",
          }}
        >
          <option value="">Select a project</option>

          {projects.map((project) => (
            <option key={project.id} value={project.name}>
              {project.name}
            </option>
          ))}
        </select>
      </div>

<div style={{ marginBottom: 16 }}>
  <label>Report Type</label>
  <br />
  <select
    value={hazardReportType}
    onChange={(e) => setHazardReportType(e.target.value)}
    style={{
      width: "100%",
      padding: 12,
      marginTop: 6,
      borderRadius: 10,
      border: "1px solid #cbd5e1",
    }}
  >
    <option value="Hazard ID">Hazard ID</option>
    <option value="Observation">Observation</option>
  </select>
</div>
            
      <div>
        <label>Reported By</label>
        <br />
        <input
          value={reportedBy}
          onChange={(e) => setReportedBy(e.target.value)}
          style={{
            width: "100%",
            padding: 12,
            borderRadius: 10,
            border: "1px solid #cbd5e1",
          }}
        />
      </div>

      <div>
  <label>Hazard Category</label>
  <br />
  <select
    value={hazardCategory}
    onChange={(e) => setHazardCategory(e.target.value)}
    style={{
      width: "100%",
      padding: 12,
      borderRadius: 10,
      border: "1px solid #cbd5e1",
    }}
  >
    <option value="">Select a critical risk</option>
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
        <label>Hazard Description</label>
        <br />
        <textarea
          value={hazardDescription}
          onChange={(e) => setHazardDescription(e.target.value)}
          rows={4}
          style={{
            width: "100%",
            padding: 12,
            borderRadius: 10,
            border: "1px solid #cbd5e1",
          }}
        />
      </div>

      <div>
        <label>Immediate Action Taken</label>
        <br />
        <textarea
          value={immediateAction}
          onChange={(e) => setImmediateAction(e.target.value)}
          rows={3}
          style={{
            width: "100%",
            padding: 12,
            borderRadius: 10,
            border: "1px solid #cbd5e1",
          }}
        />
      </div>

      <div>
        <label>Risk Level</label>
        <br />
        <select
          value={hazardRiskLevel}
          onChange={(e) => setHazardRiskLevel(e.target.value)}
          style={{
            width: "100%",
            padding: 12,
            borderRadius: 10,
            border: "1px solid #cbd5e1",
          }}
        >
          <option value="">Select risk level</option>
          <option value="Low">Low</option>
          <option value="Moderate">Moderate</option>
          <option value="High">High</option>
          <option value="Critical">Critical</option>
        </select>
      </div>

      <div>
        <label>Photos</label>
        <br />
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={(e) => setHazardPhotos(Array.from(e.target.files))}
        />
      </div>

      <button
        type="button"
         onClick={submitHazardReport}
        style={{
          background: "#123d82",
          color: "white",
          padding: "12px 18px",
          borderRadius: 10,
          border: "none",
          fontWeight: "bold",
          cursor: "pointer",
        }}
      >
        Submit Hazard Report
      </button>

    </div>
  </div>
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
              <div style={{ color: "#64748b", fontSize: 12 }}>Pending Review</div>
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
              <div style={{ color: "#64748b", fontSize: 12 }}>Needs Action</div>
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
              <div style={{ color: "#64748b", fontSize: 12 }}>Approved / Closed</div>
              <div style={{ fontSize: 28, fontWeight: "bold" }}>
                {closedRecords.length}
              </div>
            </div>
          </div>

<div
  style={{
    marginTop: 20,
    background: "#f8fafc",
    padding: 16,
    borderRadius: 12,
    border: "1px solid #dbe4ee",
    marginBottom: 20,
  }}
>
  <h3 style={{ marginTop: 0 }}>Hazard Reports Pending Review</h3>

{hazardReports.filter((r) => r.action_status !== "Closed").length === 0 ? (
  <div>No hazard reports pending review.</div>
) : (
  hazardReports
    .filter((r) => r.action_status !== "Closed")
    .map((report) => (
      <div
        key={report.id}
        style={{
          background: "white",
          border: "1px solid #dbe4ee",
          borderRadius: 10,
          padding: 14,
          marginBottom: 12,
        }}
      >
        <div style={{ fontWeight: "bold", marginBottom: 6 }}>
          {report.report_type || "Hazard"}
        </div>

        <div><strong>Project:</strong> {report.project_name}</div>
        <div><strong>Reported By:</strong> {report.reported_by}</div>
        <div><strong>Category:</strong> {report.hazard_category}</div>
        <div><strong>Risk:</strong> {report.risk_level}</div>
        <div><strong>Status:</strong> {report.action_status || "Open"}</div>

        <div style={{ marginTop: 10 }}>
          <strong>Description:</strong>
          <div>{report.hazard_description}</div>
          <div style={{ marginTop: 14 }}>
  <button
    type="button"
    onClick={() => {
      setHazardActionId(report.id);
      setReviewStatus(report.action_status || "Open");
      setReviewSupervisor(report.reviewed_by || "");
      setReviewComments(report.supervisor_review_comments || "");
      setCorrectiveActionText(report.corrective_action || "");
    }}
    style={{
      background: "#123d82",
      color: "white",
      border: "none",
      padding: "10px 14px",
      borderRadius: 8,
      fontWeight: "bold",
      cursor: "pointer",
    }}
  >
    Review / Close Hazard
  </button>
</div>
        </div>
      {hazardActionId === report.id && (
  <div
    style={{
      marginTop: 16,
      padding: 16,
      background: "#f8fafc",
      borderRadius: 10,
      border: "1px solid #dbe4ee",
    }}
  >
    <label>Status</label>
    <select
      value={reviewStatus}
      onChange={(e) => setReviewStatus(e.target.value)}
      style={{
        width: "100%",
        padding: 10,
        marginTop: 6,
        marginBottom: 12,
        borderRadius: 8,
      }}
    >
      <option>Open</option>
          <option>Closed</option>
    </select>

    <label>Supervisor Name</label>
    <input
      type="text"
      value={reviewSupervisor}
      onChange={(e) => setReviewSupervisor(e.target.value)}
      style={{
        width: "100%",
        padding: 10,
        marginTop: 6,
        marginBottom: 12,
        borderRadius: 8,
      }}
    />

    <label>Comments</label>
    <textarea
      value={reviewComments}
      onChange={(e) => setReviewComments(e.target.value)}
      style={{
        width: "100%",
        minHeight: 80,
        padding: 10,
        marginTop: 6,
        marginBottom: 12,
        borderRadius: 8,
      }}
    />

    <label>Corrective Action / Resolution</label>
    <textarea
      value={correctiveActionText}
      onChange={(e) => setCorrectiveActionText(e.target.value)}
      style={{
        width: "100%",
        minHeight: 80,
        padding: 10,
        marginTop: 6,
        marginBottom: 12,
        borderRadius: 8,
      }}
    />

    <button
      type="button"
      onClick={saveHazardReview}
      style={{
        background: "#16a34a",
        color: "white",
        border: "none",
        padding: "10px 14px",
        borderRadius: 8,
        fontWeight: "bold",
        cursor: "pointer",
      }}
    >
      Save Hazard Review
    </button>
  </div>
)}
      </div>
    ))
)}
 
{reviewingId && (
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
                  <SignatureBox
                    sigRef={supervisorSigRef}
                    onSave={setReviewSupervisorSignature}
                  />
                </div>
{reviewingId && (
<div style={{ marginTop: 20 }}>
  <h3>Corrective Action</h3>

  <label>Corrective Action Required</label>
  <textarea
    value={correctiveActionText}
    onChange={(e) => setCorrectiveActionText(e.target.value)}
    style={{
      width: "100%",
      minHeight: 100,
      padding: 12,
      marginTop: 6,
      borderRadius: 10,
      border: "1px solid #cbd5e1",
      marginBottom: 16,
    }}
  />

  <label>Assigned To</label>
  <input
    type="text"
    value={assignedTo}
    onChange={(e) => setAssignedTo(e.target.value)}
    style={{
      width: "100%",
      padding: 12,
      marginTop: 6,
      borderRadius: 10,
      border: "1px solid #cbd5e1",
      marginBottom: 16,
    }}
  />

  <label>Due Date</label>
  <input
    type="date"
    value={dueDate}
    onChange={(e) => setDueDate(e.target.value)}
    style={{
      width: "100%",
      padding: 12,
      marginTop: 6,
      borderRadius: 10,
      border: "1px solid #cbd5e1",
      marginBottom: 16,
    }}
  />
</div>

    )}
                      
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
                    onClick={saveHazardReview}
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
                      supervisorSigRef.current?.clear();
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
          
          <div
            style={{
              background: "white",
              borderRadius: 16,
              padding: 18,
              boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
            }}
          >
            <div style={{ marginBottom: 20 }}>
  <h2>Records by Project</h2>

  {Object.entries(projectCounts).length === 0 ? (
    <p>No data yet.</p>
  ) : (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {Object.entries(projectCounts).map(([project, count]) => (
        <div
          key={project}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <div style={{ width: 150 }}>{project}</div>

          <div
            style={{
              height: 20,
              width: `${count * 20}px`,
              background: "#3b82f6",
              borderRadius: 6,
            }}
          />

          <div>{count}</div>
        </div>
      ))}
    </div>
  )}
</div>

<div style={{ marginBottom: 20 }}>
  <h2>Records by Critical Risk</h2>

  {Object.entries(riskCounts).length === 0 ? (
    <p>No data yet.</p>
  ) : (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {Object.entries(riskCounts).map(([risk, count]) => (
        <div
          key={risk}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <div style={{ width: 220 }}>{risk}</div>

          <div
            style={{
              height: 20,
              width: `${count * 20}px`,
              background: "#f59e0b",
              borderRadius: 6,
            }}
          />

          <div>{count}</div>
        </div>
      ))}
    </div>
  )}
</div>
    
            <h2 style={{ marginTop: 0 }}>All Records</h2>

            <div style={{ marginBottom: 10 }}>
  <button
    type="button"
    onClick={exportFilteredToCSV}
    style={{
      padding: "8px 12px",
      borderRadius: 8,
      border: "1px solid #cbd5e1",
      background: "#f1f5f9",
      cursor: "pointer",
      fontWeight: "bold"
    }}
  >
    Export CSV
  </button>
</div>

            <div style={{ marginBottom: 16 }}>
              <input
                type="text"
                placeholder="Search worker, project, task..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: "100%",
                  padding: 8,
                  marginBottom: 8,
                  borderRadius: 6,
                  border: "1px solid #ccc",
                }}
              />

              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="All">All Status</option>
                  <option value="Pending Review">Pending Review</option>
                  <option value="Approved">Approved</option>
                  <option value="Needs Correction">Needs Correction</option>
                  <option value="Stop Work">Stop Work</option>
                </select>

                <select
                  value={riskFilter}
                  onChange={(e) => setRiskFilter(e.target.value)}
                >
                  <option value="All">All Risks</option>
                  <option value="Breaking Containment">Breaking Containment</option>
                  <option value="Confined Space Entry">Confined Space Entry</option>
                  <option value="Energy Isolation">Energy Isolation</option>
                  <option value="Hot Work">Hot Work</option>
                  <option value="Safe Mechanical Lifting">Safe Mechanical Lifting</option>
                  <option value="Working Around Mobile Equipment">
                    Working Around Mobile Equipment
                  </option>
                  <option value="Bypassing Safety Controls">
                    Bypassing Safety Controls
                  </option>
                  <option value="Driving">Driving</option>
                  <option value="Excavation">Excavation</option>
                  <option value="Line of Fire">Line of Fire</option>
                  <option value="Working at Height">Working at Height</option>
                  <option value="Work Authorization">Work Authorization</option>
                </select>
                  
<select
  value={dateFilter}
  onChange={(e) => setDateFilter(e.target.value)}
>
  <option value="All">All Dates</option>
  <option value="Today">Today</option>
  <option value="Last7">Last 7 Days</option>
  <option value="Last30">Last 30 Days</option>
</select>

<select
  value={projectFilter}
  onChange={(e) => setProjectFilter(e.target.value)}
>
  <option value="All">All Projects</option>
  {[...new Set(records.map((r) => r.project_name).filter(Boolean))].map((project) => (
    <option key={project} value={project}>
      {project}
    </option>
  ))}
</select>
                      
                <label>
                  <input
                    type="checkbox"
                    checked={stopWorkOnly}
                    onChange={(e) => setStopWorkOnly(e.target.checked)}
                  />{" "}
                  Stop Work Only
                </label>

<button
  type="button"
  onClick={() => {
    setSearchTerm("");
    setStatusFilter("All");
    setRiskFilter("All");
    setDateFilter("All");
    setProjectFilter("All");
    setStopWorkOnly(false);
  }}
  style={{
    padding: "6px 10px",
    borderRadius: 6,
    border: "1px solid #cbd5e1",
    background: "#f1f5f9",
    cursor: "pointer",
    fontWeight: "bold",
  }}
>
  Clear Filters
</button>
                 )}
                   
              </div>
            </div>

            {filteredRecords.length === 0 ? (
              <p>No records match your search or filters.</p>
            ) : (
              <div style={{ display: "grid", gap: 12 }}>
                {filteredRecords.map((record) => {
                  const photoUrls = record.photos
                    ? String(record.photos)
                        .split(",")
                        .map((p) => p.trim())
                        .filter(Boolean)
                    : [];

                  return (
                   <div
                  key={record.id}
                  style={{
                  border: record.stop_work ? "2px solid #dc2626" : "1px solid #dbe4ee",
                  borderRadius: 12,
                  padding: 14,
                  background: record.stop_work ? "#fef2f2" : "#f8fafc",
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
                        <div style={{ flex: 1, minWidth: 260 }}>
                          {record.stop_work && (
                           <div
                          style={{
                          background: "#dc2626",
                          color: "white",
                           padding: "4px 10px",
                           borderRadius: 6,
                           fontWeight: "bold",
                           fontSize: 12,
                           display: "inline-block",
                         marginBottom: 8,
                             }}
                              >
                         ⚠ STOP WORK
                        </div>
                       )}
                        
                          <div><strong>Worker:</strong> {record.worker_name}</div>
                          <div><strong>Worker Signature:</strong> {record.worker_signature ? "Captured" : "—"}</div>
                          <div><strong>Supervisor:</strong> {record.supervisor_name}</div>
                          <div><strong>Supervisor Signature:</strong> {record.supervisor_signature ? "Captured" : "—"}</div>
                          <div><strong>Project:</strong> {record.project_name}</div>
                          <div><strong>Task:</strong> {record.task_description}</div>
                          <div><strong>Risk:</strong> {record.critical_risk}</div>
                          <div><strong>Shield(s):</strong> {record.shield_control}</div>
                          <div><strong>Notes:</strong> {record.notes}</div>
                          <div><strong>Submitted:</strong> {record.submitted_at}</div>

                          {record.reviewed_by && (
                            <div><strong>Reviewed By:</strong> {record.reviewed_by}</div>
                          )}

                          {record.supervisor_review_comments && (
                            <div><strong>Comments:</strong> {record.supervisor_review_comments}</div>
                          )}

                          {record.corrective_actions && (
                            <div><strong>Corrective Actions:</strong> {record.corrective_actions}</div>
                          )}

                          {photoUrls.length > 0 && (
                            <div style={{ marginTop: 12 }}>
                              <strong>Photos:</strong>
                              <div
                                style={{
                                  display: "grid",
                                  gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
                                  gap: 10,
                                  marginTop: 8,
                                }}
                              >
                                {photoUrls.map((url) => (
                                  <a
                                    key={url}
                                    href={url}
                                    target="_blank"
                                    rel="noreferrer"
                                    style={{ textDecoration: "none" }}
                                  >
                                    <img
                                      src={url}
                                      alt="Uploaded record"
                                      style={{
                                        width: "100%",
                                        height: 110,
                                        objectFit: "cover",
                                        borderRadius: 8,
                                        border: "1px solid #cbd5e1",
                                        background: "white",
                                      }}
                                    />
                                  </a>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>

                        <div style={{ minWidth: 150 }}>
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
                              fontWeight: "bold",
                            }}
                          >
                            Download PDF
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
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === "dashboard" && (
        <div
          style={{
            background: "white",
            padding: 20,
            borderRadius: 16,
            boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
            display: "grid",
            gap: 16,
          }}
        >
          <h2 style={{ margin: 0 }}>Safety Dashboard</h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
              gap: 12,
            }}
          >
            <div style={{ padding: 16, background: "#f1f5f9", borderRadius: 12 }}>
              <div style={{ fontSize: 12, color: "#64748b" }}>Total Records</div>
              <div style={{ fontSize: 28, fontWeight: "bold" }}>{records.length}</div>
            </div>

            <div style={{ padding: 16, background: "#fef9c3", borderRadius: 12 }}>
              <div style={{ fontSize: 12, color: "#64748b" }}>Pending Review</div>
              <div style={{ fontSize: 28, fontWeight: "bold" }}>{pendingRecords.length}</div>
            </div>

            <div style={{ padding: 16, background: "#fee2e2", borderRadius: 12 }}>
              <div style={{ fontSize: 12, color: "#64748b" }}>Needs Action</div>
              <div style={{ fontSize: 28, fontWeight: "bold" }}>{actionRecords.length}</div>
            </div>

            <div style={{ padding: 16, background: "#dcfce7", borderRadius: 12 }}>
              <div style={{ fontSize: 12, color: "#64748b" }}>Approved</div>
              <div style={{ fontSize: 28, fontWeight: "bold" }}>{closedRecords.length}</div>
            </div>

            </div>
            
 <div
  style={{
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: 12,
  }}
>
  <div style={{ padding: 16, background: "#f1f5f9", borderRadius: 12 }}>
    <div style={{ fontSize: 12, color: "#64748b" }}>Total Hazard Reports</div>
    <div style={{ fontSize: 28, fontWeight: "bold" }}>{totalHazards}</div>
  </div>

  <div style={{ padding: 16, background: "#e0f2fe", borderRadius: 12 }}>
    <div style={{ fontSize: 12, color: "#64748b" }}>Hazard IDs</div>
    <div style={{ fontSize: 28, fontWeight: "bold" }}>{hazardIdCount}</div>
  </div>

  <div style={{ padding: 16, background: "#ecfdf5", borderRadius: 12 }}>
    <div style={{ fontSize: 12, color: "#64748b" }}>Observations</div>
    <div style={{ fontSize: 28, fontWeight: "bold" }}>{observationCount}</div>
  </div>

  <div style={{ padding: 16, background: "#fee2e2", borderRadius: 12 }}>
    <div style={{ fontSize: 12, color: "#64748b" }}>Critical Hazards</div>
    <div style={{ fontSize: 28, fontWeight: "bold" }}>{criticalHazardCount}</div>
  </div>
</div>
<h2 style={{ marginTop: 28 }}>Hazard Analytics</h2>
  
  <div style={{ marginTop: 20, display: "grid", gap: 20 }}>
  <div>
    <h3>Hazard Reports by Type</h3>
    {Object.entries(hazardTypeCounts).map(([type, count]) => (
      <div
        key={type}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          marginBottom: 8,
        }}
      >
        <div style={{ width: 140 }}>{type}</div>
        <div
          style={{
            height: 18,
            width: `${count * 25}px`,
            background: "#3b82f6",
            borderRadius: 6,
          }}
        />
        <strong>{count}</strong>
      </div>
    ))}
  </div>

  <div>
    <h3>Hazard Reports by Risk Level</h3>
    {Object.entries(hazardRiskCounts).map(([level, count]) => (
      <div
        key={level}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          marginBottom: 8,
        }}
      >
        <div style={{ width: 140 }}>{level}</div>
        <div
          style={{
            height: 18,
            width: `${count * 25}px`,
            background: "#f59e0b",
            borderRadius: 6,
          }}
        />
        <strong>{count}</strong>
      </div>
    ))}
  </div>

  <div>
    <h3>Hazard Reports by Category</h3>
    {Object.entries(hazardCategoryCounts).map(([category, count]) => (
      <div
        key={category}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          marginBottom: 8,
        }}
      >
        <div style={{ width: 220 }}>{category}</div>
        <div
          style={{
            height: 18,
            width: `${count * 25}px`,
            background: "#22c55e",
            borderRadius: 6,
          }}
        />
        <strong>{count}</strong>
      </div>
    ))}
  </div>
</div>
          <div
            style={{
              background: "#f8fafc",
              borderRadius: 12,
              padding: 16,
              border: "1px solid #dbe4ee",
            }}
          >
            <h3 style={{ marginTop: 0 }}>Recent Records</h3>
            {records.length === 0 ? (
              <p>No records yet.</p>
            ) : (
              <div style={{ display: "grid", gap: 10 }}>
                {records.slice(0, 5).map((record) => (
                  <div
                    key={record.id}
                    style={{
                      padding: 12,
                      background: "white",
                      borderRadius: 10,
                      border: "1px solid #e2e8f0",
                    }}
                  >
                    <div><strong>Worker:</strong> {record.worker_name}</div>
                    <div><strong>Project:</strong> {record.project_name || "—"}</div>
                    <div><strong>Risk:</strong> {record.critical_risk}</div>
                    <div>
                      <strong>Status:</strong>{" "}
                      <span style={{ color: statusColor(record.status || "Pending Review"), fontWeight: "bold" }}>
                        {record.status || "Pending Review"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {showPinPrompt && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(15, 23, 42, 0.55)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            padding: 20,
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: 420,
              background: "white",
              borderRadius: 16,
              padding: 20,
              boxShadow: "0 8px 30px rgba(0,0,0,0.2)",
            }}
          >
            <h3 style={{ marginTop: 0, marginBottom: 8 }}>Supervisor Access</h3>
            <p style={{ marginTop: 0, color: "#475569" }}>
              Enter supervisor PIN to continue.
            </p>

            <input
              value={pinInput}
              onChange={(e) => setPinInput(e.target.value)}
              type="password"
              placeholder="Enter PIN"
              style={{
                width: "100%",
                padding: 12,
                borderRadius: 10,
                border: "1px solid #cbd5e1",
                marginBottom: 12,
              }}
            />

            <div style={{ display: "flex", gap: 10 }}>
              <button
                type="button"
                onClick={unlockProtectedTab}
                style={{
                  padding: "10px 14px",
                  borderRadius: 10,
                  border: "none",
                  background: "#123d82",
                  color: "white",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                Unlock
              </button>

              <button
                type="button"
                onClick={() => {
                  setShowPinPrompt(false);
                  setPinInput("");
                  setPendingTab("");
                }}
                style={{
                  padding: "10px 14px",
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

      {message && (
        <div
          style={{
            marginTop: 20,
            padding: 16,
            background: submitted ? "#ecfdf5" : "#fff7ed",
            borderRadius: 12,
            border: submitted ? "1px solid #a7f3d0" : "1px solid #fdba74",
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
