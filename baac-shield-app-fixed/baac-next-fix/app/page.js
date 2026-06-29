"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import jsPDF from "jspdf";
import SignatureCanvas from "react-signature-canvas";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
 
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

function AttendeeSignatureBox({ onSave, onClear }) {
  const attendeeSigRef = useRef(null);

  return (
    <div style={{ marginTop: 8 }}>
      <div
        style={{
          border: "2px solid #cbd5e1",
          borderRadius: 10,
          background: "white",
          overflow: "hidden",
        }}
      >
        <SignatureCanvas
          ref={attendeeSigRef}
          penColor="black"
          onEnd={() => {
            if (attendeeSigRef.current && !attendeeSigRef.current.isEmpty()) {
              onSave(attendeeSigRef.current.toDataURL("image/png"));
            }
          }}
          canvasProps={{
            width: 350,
            height: 140,
            style: {
              width: "100%",
              maxWidth: 350,
              height: 140,
              display: "block",
            },
          }}
        />
      </div>

      <button
        type="button"
        onClick={() => {
          attendeeSigRef.current?.clear();
          onClear();
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
        Clear Worker Signature
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
const [corCategory, setCorCategory] = useState("");
const [corTruckUnit, setCorTruckUnit] = useState("");
const [corTrailerUnit, setCorTrailerUnit] = useState("");
const [corEquipmentUnit, setCorEquipmentUnit] = useState("");
const [corEquipmentDescription, setCorEquipmentDescription] = useState("");
const [corOfficeLocation, setCorOfficeLocation] = useState("");
const [corFieldJobNumber, setCorFieldJobNumber] = useState("");
const [corFieldLocation, setCorFieldLocation] = useState("");
const [corHandToolDescription, setCorHandToolDescription] = useState("");

const [corIssueDescription, setCorIssueDescription] = useState("");
const [corAssignedTo, setCorAssignedTo] = useState("");
const [corTargetFixDate, setCorTargetFixDate] = useState("");

const [corFixedBy, setCorFixedBy] = useState("");
const [user, setUser] = useState(null);
  const [role, setRole] = useState("worker");
  const [users, setUsers] = useState([]);
  const [accountActive, setAccountActive] = useState(true);
  const [email, setEmail] = useState("");

useEffect(() => {
  if (user?.email && !worker) {
    setWorker(user.email);
  }
}, [user]);
  
const [password, setPassword] = useState("");
const [corClosedDate, setCorClosedDate] = useState("");
const [corCloseoutNotes, setCorCloseoutNotes] = useState({});

const [corBeforePhotos, setCorBeforePhotos] = useState([]);
const [corAfterPhotos, setCorAfterPhotos] = useState({});
  const [hazardActionId, setHazardActionId] = useState(null);
const [correctiveActionText, setCorrectiveActionText] = useState("");
const [assignedTo, setAssignedTo] = useState("");
  const [hazardActionOwner, setHazardActionOwner] = useState("");
const [hazardDueDate, setHazardDueDate] = useState("");
  const [task, setTask] = useState("");
  const [risk, setRisk] = useState("");
  const [selectedShields, setSelectedShields] = useState([]);
  const [notes, setNotes] = useState("");
  const [stopWork, setStopWork] = useState(false);
  const [photos, setPhotos] = useState([]);

const [dueDate, setDueDate] = useState("");
  const [records, setRecords] = useState([]);
  const [hazardReports, setHazardReports] = useState([]);
  const [corActions, setCorActions] = useState([]);
 const [rpasOperations, setRpasOperations] = useState([]);
const [rpasProject, setRpasProject] = useState("");
const [rpasDate, setRpasDate] = useState("");
const [rpasPilot, setRpasPilot] = useState("");
const [rpasObserver, setRpasObserver] = useState("");
const [rpasMakeModel, setRpasMakeModel] = useState("");
const [rpasRegistration, setRpasRegistration] = useState("");
const [rpasOperationType, setRpasOperationType] = useState("");
const [rpasLocation, setRpasLocation] = useState("");

const [rpasAirspaceChecked, setRpasAirspaceChecked] = useState("");
const [rpasWeatherChecked, setRpasWeatherChecked] = useState("");
const [rpasSiteSurveyComplete, setRpasSiteSurveyComplete] = useState("");
const [rpasEmergencyReviewed, setRpasEmergencyReviewed] = useState("");

const [rpasBatteryChecked, setRpasBatteryChecked] = useState("");
const [rpasAirframeChecked, setRpasAirframeChecked] = useState("");
const [rpasControllerChecked, setRpasControllerChecked] = useState("");
const [rpasCrewBriefingComplete, setRpasCrewBriefingComplete] = useState("");

const [rpasPreflightNotes, setRpasPreflightNotes] = useState("");
const [rpasPreflightSignature, setRpasPreflightSignature] = useState("");

const [rpasPostflightCondition, setRpasPostflightCondition] = useState("");
const [rpasIncidentsDamage, setRpasIncidentsDamage] = useState("");
const [rpasBatteryLogs, setRpasBatteryLogs] = useState("");
const [rpasPostflightNotes, setRpasPostflightNotes] = useState("");
const [rpasPostflightSignature, setRpasPostflightSignature] = useState("");

const [rpasPhotos, setRpasPhotos] = useState([]);
 const [rpasResetKey, setRpasResetKey] = useState(0);
  const [toolboxTalks, setToolboxTalks] = useState([]);
const [toolboxProject, setToolboxProject] = useState("");
  const [toolboxSuperintendent, setToolboxSuperintendent] = useState("");
const [toolboxGuestVisitor, setToolboxGuestVisitor] = useState("");
const [toolboxJobNumber, setToolboxJobNumber] = useState("");
const [toolboxTime, setToolboxTime] = useState("");
const [toolboxWeather, setToolboxWeather] = useState("");
const [toolboxDailyScope, setToolboxDailyScope] = useState("");
const [toolboxLocates, setToolboxLocates] = useState("");
const [toolboxWorkersFitForDuty, setToolboxWorkersFitForDuty] = useState("");
const [toolboxWorkersAwareRights, setToolboxWorkersAwareRights] = useState("");
const [toolboxMusterPoint, setToolboxMusterPoint] = useState("");
const [toolboxEmergencyNumber, setToolboxEmergencyNumber] = useState("");
const [toolboxNearestHospital, setToolboxNearestHospital] = useState("");
const [toolboxFirstAidAttendants, setToolboxFirstAidAttendants] = useState("");
const [toolboxAdditionalHazards, setToolboxAdditionalHazards] = useState("");
const [toolboxOtherConsiderations, setToolboxOtherConsiderations] = useState("");
const [toolboxSupervisorRemarks, setToolboxSupervisorRemarks] = useState("");
const [toolboxDate, setToolboxDate] = useState("");
const [toolboxLocation, setToolboxLocation] = useState("");
const [toolboxSupervisor, setToolboxSupervisor] = useState("");
const [toolboxTopic, setToolboxTopic] = useState("");
const [toolboxDiscussionNotes, setToolboxDiscussionNotes] = useState("");
const [toolboxHazardsReviewed, setToolboxHazardsReviewed] = useState("");
const [toolboxControlsReviewed, setToolboxControlsReviewed] = useState("");
const [toolboxAttendees, setToolboxAttendees] = useState([
{ name: "", role: "", signature: "", signedAt: "" },
]);
const [toolboxPhotos, setToolboxPhotos] = useState([]);
 const [toolboxResetKey, setToolboxResetKey] = useState(0);
 const [toolboxStartDateFilter, setToolboxStartDateFilter] = useState(
  new Date().toISOString().split("T")[0]
);
const [toolboxEndDateFilter, setToolboxEndDateFilter] = useState(
  new Date().toISOString().split("T")[0]
);
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
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [activeTab, setActiveTab] = useState("worker");
  const [showSplash, setShowSplash] = useState(true);
  
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [riskFilter, setRiskFilter] = useState("All");
  const [stopWorkOnly, setStopWorkOnly] = useState(false);
  const [dateFilter, setDateFilter] = useState("All");
  const [startDateFilter, setStartDateFilter] = useState("");
  const [endDateFilter, setEndDateFilter] = useState("");
  const [projects, setProjects] = useState([]);
  const [allProjects, setAllProjects] = useState([]);
  const [newProjectName, setNewProjectName] = useState("");
  const [projectFilter, setProjectFilter] = useState("All");
  
  const [supervisorPin, setSupervisorPin] = useState("1234");
  const [alertEmail, setAlertEmail] = useState("rod.gonzalez@baacconstruction.com");
  const [companyName, setCompanyName] = useState("BAAC Construction");
  const [pinInput, setPinInput] = useState("");
  const [showPinPrompt, setShowPinPrompt] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [pendingTab, setPendingTab] = useState("");

  const [reviewingId, setReviewingId] = useState(null);
  const [reviewStatus, setReviewStatus] = useState("Pending Review");
  const [reviewSupervisor, setReviewSupervisor] = useState("");
  const [reviewSupervisorSignature, setReviewSupervisorSignature] = useState("");
  const [reviewComments, setReviewComments] = useState("");
    const [rectified, setRectified] = useState(false);

  const fileRef = useRef(null);
  const corBeforeFileRef = useRef(null);
  const workerSigRef = useRef(null);
  const supervisorSigRef = useRef(null);
const rpasPreflightSigRef = useRef(null);
const rpasPostflightSigRef = useRef(null);
 
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
  supabase.auth.getUser().then(async ({ data }) => {
    setUser(data.user);

    if (data.user?.email) {
      const res = await fetch(
        `${SUPABASE_URL}/rest/v1/user_roles?email=eq.${data.user.email}&select=role,active`,
        {
          headers: {
            apikey: SUPABASE_KEY,
            Authorization: `Bearer ${SUPABASE_KEY}`,
          },
        }
      );

    if (res.ok) {
  const roles = await res.json();

 if (roles[0]) {
  setAccountActive(roles[0].active);

  if (roles[0]?.role) {
    setRole(roles[0].role);
  }
}
      const usersRes = await fetch(
  `${SUPABASE_URL}/rest/v1/user_roles?select=email,role,active`,
  {
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
    },
  }
);

if (usersRes.ok) {
  const usersData = await usersRes.json();
  setUsers(usersData);
}
}
    }
  });
}, []);
  
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
      
const corRes = await fetch(
  `${SUPABASE_URL}/rest/v1/cor_corrective_actions?select=*&order=created_at.desc`,
  {
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
    },
  }
);

if (corRes.ok) {
  const corData = await corRes.json();
  setCorActions(corData);
}
const rpasRes = await fetch(
  `${SUPABASE_URL}/rest/v1/rpas_operations?select=*&order=created_at.desc`,
  {
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
    },
  }
);

if (rpasRes.ok) {
  const rpasData = await rpasRes.json();
  setRpasOperations(rpasData);
}
const toolboxRes = await fetch(
  `${SUPABASE_URL}/rest/v1/toolbox_talks?select=*&order=created_at.desc`,
  {
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
    },
  }
);

if (toolboxRes.ok) {
  const toolboxData = await toolboxRes.json();
  setToolboxTalks(toolboxData);
}
      
    } catch (error) {
      setMessage(`Could not load records from database: ${error.message}`);
    }
  }

  async function loadProjects() {
    try {
      const res = await fetch(
   `${SUPABASE_URL}/rest/v1/projects?select=*&active=eq.true&order=name.asc`,
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

const allRes = await fetch(
  `${SUPABASE_URL}/rest/v1/projects?select=*&order=name.asc`,
  {
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
    },
  }
);

if (allRes.ok) {
  const allData = await allRes.json();
  setAllProjects(allData);
}
    } catch (error) {
      setMessage(`Could not load projects: ${error.message}`);
    }
  }

  async function addProject() {
  const cleanName = newProjectName.trim();

  if (!cleanName) {
    setMessage("Please enter a project name.");
    return;
  }

  setLoading(true);
  setMessage("");

  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/projects`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
        Prefer: "return=representation",
      },
      body: JSON.stringify({
        name: cleanName,
        active: true,
      }),
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(text || "Could not add project");
    }

    setNewProjectName("");
    setMessage("Project added.");
    await loadProjects();
  } catch (error) {
    setMessage(`Could not add project: ${error.message}`);
  } finally {
    setLoading(false);
  }
}

async function deactivateProject(projectId) {
  setLoading(true);
  setMessage("");

  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/projects?id=eq.${projectId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${SUPABASE_KEY}`,
          Prefer: "return=representation",
        },
        body: JSON.stringify({
          active: false,
        }),
      }
    );

    if (!res.ok) {
      const text = await res.text();
      throw new Error(text || "Could not deactivate project");
    }

 const updated = await res.json();

if (!updated || updated.length === 0) {
  throw new Error("Project was not updated. Check Supabase update policy.");
}

setProjects((prev) => prev.filter((project) => project.id !== projectId));
setMessage("Project deactivated.");
await loadProjects();
  } catch (error) {
    setMessage(`Could not deactivate project: ${error.message}`);
  } finally {
    setLoading(false);
  }
}

async function reactivateProject(projectId) {
  setLoading(true);
  setMessage("");

  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/projects?id=eq.${projectId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${SUPABASE_KEY}`,
          Prefer: "return=representation",
        },
        body: JSON.stringify({
          active: true,
        }),
      }
    );

    if (!res.ok) {
      const text = await res.text();
      throw new Error(text || "Could not reactivate project");
    }

    const updated = await res.json();

    if (!updated || updated.length === 0) {
      throw new Error("Project was not updated. Check Supabase update policy.");
    }

    setMessage("Project reactivated.");
    await loadProjects();
  } catch (error) {
    setMessage(`Could not reactivate project: ${error.message}`);
  } finally {
    setLoading(false);
  }
}
  
async function loadSettings() {
  try {
    const res = await fetch(
    `${SUPABASE_URL}/rest/v1/app_settings?setting_key=in.(supervisor_pin,alert_email)&select=setting_key,setting_value`,
      {
        headers: {
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${SUPABASE_KEY}`,
        },
      }
    );

    if (!res.ok) {
      const text = await res.text();
      throw new Error(text || "Could not load settings");
    }

    const data = await res.json();

   data.forEach((setting) => {
  if (setting.setting_key === "supervisor_pin" && setting.setting_value) {
    setSupervisorPin(setting.setting_value);
  }

  if (setting.setting_key === "alert_email" && setting.setting_value) {
    setAlertEmail(setting.setting_value);
  }
});
  } catch (error) {
    setMessage(`Could not load settings: ${error.message}`);
  }
}

async function toggleUserStatus(email, active) {
  const confirmed = window.confirm(
  `${active ? "Disable" : "Enable"} ${email}?`
);

if (!confirmed) return;
  
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/user_roles?email=eq.${email}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
        Prefer: "return=representation",
      },
      body: JSON.stringify({
        active: !active,
      }),
    }
  );

  if (res.ok) {
    alert(`${email} updated successfully`);
    window.location.reload();
  } else {
    alert("Update failed");
  }
}
  
async function saveSupervisorPin() {
  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/app_settings?setting_key=eq.supervisor_pin`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${SUPABASE_KEY}`,
          Prefer: "return=representation",
        },
        body: JSON.stringify({
          setting_value: supervisorPin,
          updated_at: new Date().toISOString(),
        }),
      }
    );

    if (!res.ok) {
      const text = await res.text();
      throw new Error(text || "Could not save supervisor PIN");
    }

    setMessage("Supervisor PIN saved.");
  } catch (error) {
    setMessage(`Could not save supervisor PIN: ${error.message}`);
  }
}
  async function saveAlertEmail() {
  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/app_settings?setting_key=eq.alert_email`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${SUPABASE_KEY}`,
          Prefer: "return=representation",
        },
        body: JSON.stringify({
          setting_value: alertEmail,
          updated_at: new Date().toISOString(),
        }),
      }
    );

    if (!res.ok) {
      const text = await res.text();
      throw new Error(text || "Could not save alert email");
    }

    setMessage("Alert email saved.");
  } catch (error) {
    setMessage(`Could not save alert email: ${error.message}`);
  }
}

async function saveCompanyName() {
  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/app_settings?setting_key=eq.company_name`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${SUPABASE_KEY}`,
          Prefer: "return=representation",
        },
        body: JSON.stringify({
          setting_value: companyName,
          updated_at: new Date().toISOString(),
        }),
      }
    );

    if (!res.ok) {
      const text = await res.text();
      throw new Error(text || "Could not save company name");
    }

    setMessage("Company name saved.");
  } catch (error) {
    setMessage(`Could not save company name: ${error.message}`);
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
    const formData = new FormData();
    formData.append("file", file);

    const uploadRes = await fetch("/api/upload-photo", {
      method: "POST",
      body: formData,
    });

    const result = await uploadRes.json();

    if (!uploadRes.ok) {
      throw new Error(result.error || "Photo upload failed");
    }

    uploadedUrls.push(result.url);
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
        to: alertEmail,
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
   to: alertEmail,
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
    await loadRecords();
  } catch (error) {
    setMessage(`Could not save hazard report: ${error.message}`);
  } finally {
    setLoading(false);
  }
}

async function submitCorAction() {
  setLoading(true);
  setMessage("");

  if (
    !corCategory ||
    !corIssueDescription ||
    !correctiveActionText ||
    !corAssignedTo ||
    !corTargetFixDate
  ) {
    setMessage(
 "Please complete required fields: Audit Element, Finding / Issue, Corrective Action Required, Assigned To, and Due Date."
    );
    setLoading(false);
    return;
  }

  try {
    let uploadedBeforePhotoUrls = [];

if (corBeforePhotos.length > 0) {
  setMessage("Uploading COR before photos...");
  uploadedBeforePhotoUrls = await uploadPhotosToSupabase(corBeforePhotos);
  setMessage("COR before photos uploaded. Saving corrective action...");
}
    
    const payload = {
      category: corCategory,
      field_job_number: corFieldJobNumber,
      field_location: corFieldLocation,
      issue_description: corIssueDescription,
      corrective_action_required: correctiveActionText,
      assigned_to: corAssignedTo,
      target_fix_date: corTargetFixDate,
     priority: corEquipmentDescription,
before_photos: uploadedBeforePhotoUrls.join(", "),
status: "Open",
    };

    const res = await fetch(`${SUPABASE_URL}/rest/v1/cor_corrective_actions`, {
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
      throw new Error(text || "COR insert failed");
    }

    setCorCategory("");
    setCorFieldJobNumber("");
    setCorFieldLocation("");
    setCorIssueDescription("");
    setCorrectiveActionText("");
    setCorAssignedTo("");
    setCorTargetFixDate("");
    setCorEquipmentDescription("");
    setCorBeforePhotos([]);

    setMessage("COR corrective action submitted.");
    await loadRecords();
  } catch (error) {
    setMessage(`Could not save COR corrective action: ${error.message}`);
  } finally {
    setLoading(false);
  }
}

async function saveRpasOperation(statusValue = "Draft") {
  setLoading(true);
  setMessage("");

  if (!rpasProject || !rpasDate || !rpasPilot || !rpasMakeModel || !rpasLocation) {
    setMessage(
      "Please complete required fields: Project, Date, Pilot in Command, RPAS Make / Model, and Flight Location."
    );
    setLoading(false);
    return;
  }

  try {
    const uploadedPhotoUrls = await uploadPhotosToSupabase(rpasPhotos);

    const payload = {
      project_name: rpasProject,
      flight_date: rpasDate,
      pilot_in_command: rpasPilot,
      visual_observer: rpasObserver,

      rpas_make_model: rpasMakeModel,
      rpas_registration: rpasRegistration,
      operation_type: rpasOperationType,
      flight_location: rpasLocation,

      airspace_checked: rpasAirspaceChecked,
      weather_checked: rpasWeatherChecked,
      site_survey_complete: rpasSiteSurveyComplete,
      emergency_procedure_reviewed: rpasEmergencyReviewed,

      battery_condition_checked: rpasBatteryChecked,
      propellers_airframe_checked: rpasAirframeChecked,
      controller_firmware_gps_checked: rpasControllerChecked,
      crew_briefing_complete: rpasCrewBriefingComplete,

      preflight_notes: rpasPreflightNotes,
      preflight_signature: rpasPreflightSignature,

      postflight_condition: rpasPostflightCondition,
      incidents_damage_abnormalities: rpasIncidentsDamage,
      battery_logs_maintenance_notes: rpasBatteryLogs,
      postflight_notes: rpasPostflightNotes,
      postflight_signature: rpasPostflightSignature,

      photos: uploadedPhotoUrls.join(", "),
      status: statusValue,
      submitted_at: statusValue === "Submitted" ? new Date().toISOString() : null,
    };

    const res = await fetch(`${SUPABASE_URL}/rest/v1/rpas_operations`, {
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
      throw new Error(text || "RPAS operation save failed");
    }

    setRpasProject("");
    setRpasDate("");
    setRpasPilot("");
    setRpasObserver("");
    setRpasMakeModel("");
    setRpasRegistration("");
    setRpasOperationType("");
    setRpasLocation("");

    setRpasAirspaceChecked("");
    setRpasWeatherChecked("");
    setRpasSiteSurveyComplete("");
    setRpasEmergencyReviewed("");

    setRpasBatteryChecked("");
    setRpasAirframeChecked("");
    setRpasControllerChecked("");
    setRpasCrewBriefingComplete("");

    setRpasPreflightNotes("");
    setRpasPreflightSignature("");

    setRpasPostflightCondition("");
    setRpasIncidentsDamage("");
    setRpasBatteryLogs("");
    setRpasPostflightNotes("");
    setRpasPostflightSignature("");

    setRpasPhotos([]);
   setRpasResetKey((prev) => prev + 1);
rpasPreflightSigRef.current?.clear();
rpasPostflightSigRef.current?.clear();

    setMessage(
      statusValue === "Submitted"
        ? "RPAS operation checklist submitted."
        : "RPAS operation checklist saved as draft."
    );

    await loadRecords();
  } catch (error) {
    setMessage(`Could not save RPAS operation checklist: ${error.message}`);
  } finally {
    setLoading(false);
  }
}
 
async function saveToolboxTalk(statusValue = "Draft") {
  setLoading(true);
  setMessage("");

  if (!toolboxProject || !toolboxDate || !toolboxSupervisor || !toolboxTopic) {
    setMessage(
      "Please complete required fields: Project, Date, Supervisor / Lead, and Toolbox Topics."
    );
    setLoading(false);
    return;
  }

  try {
    const uploadedPhotoUrls = await uploadPhotosToSupabase(toolboxPhotos);

    const payload = {
      project_name: toolboxProject,
      superintendent: toolboxSuperintendent,
      guest_visitor: toolboxGuestVisitor,
      job_number: toolboxJobNumber,
      talk_date: toolboxDate,
      talk_time: toolboxTime,
      weather: toolboxWeather,
      location: toolboxLocation,
      supervisor_name: toolboxSupervisor,
      topic: toolboxTopic,
      discussion_notes: toolboxDiscussionNotes,
      daily_scope: toolboxDailyScope,
      locates: toolboxLocates,
      workers_fit_for_duty: toolboxWorkersFitForDuty,
      workers_aware_rights: toolboxWorkersAwareRights,
      muster_point: toolboxMusterPoint,
      emergency_number: toolboxEmergencyNumber,
      nearest_hospital: toolboxNearestHospital,
      first_aid_attendants: toolboxFirstAidAttendants,
      hazards_reviewed: toolboxHazardsReviewed,
      controls_reviewed: toolboxControlsReviewed,
      additional_hazards: toolboxAdditionalHazards,
      other_considerations: toolboxOtherConsiderations,
      supervisor_remarks: toolboxSupervisorRemarks,
      attendees: toolboxAttendees,
      photos: uploadedPhotoUrls.join(", "),
      status: statusValue,
      submitted_at: statusValue === "Submitted" ? new Date().toISOString() : null,
    };

    const res = await fetch(`${SUPABASE_URL}/rest/v1/toolbox_talks`, {
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
      throw new Error(text || "Toolbox talk save failed");
    }

    setToolboxProject("");
    setToolboxSuperintendent("");
    setToolboxGuestVisitor("");
    setToolboxJobNumber("");
    setToolboxDate("");
    setToolboxTime("");
    setToolboxWeather("");
    setToolboxLocation("");
    setToolboxSupervisor("");
    setToolboxTopic("");
    setToolboxDiscussionNotes("");
    setToolboxDailyScope("");
    setToolboxLocates("");
    setToolboxWorkersFitForDuty("");
    setToolboxWorkersAwareRights("");
    setToolboxMusterPoint("");
    setToolboxEmergencyNumber("");
    setToolboxNearestHospital("");
    setToolboxFirstAidAttendants("");
    setToolboxHazardsReviewed("");
    setToolboxControlsReviewed("");
    setToolboxAdditionalHazards("");
    setToolboxOtherConsiderations("");
    setToolboxSupervisorRemarks("");
   setToolboxAttendees([{ name: "", role: "", signature: "", signedAt: "" }]);
    setToolboxPhotos([]);
setToolboxResetKey((prev) => prev + 1);
    setMessage(
      statusValue === "Submitted"
        ? "Toolbox talk submitted."
        : "Toolbox talk saved as draft."
    );

    await loadRecords();
  } catch (error) {
    setMessage(`Could not save toolbox talk: ${error.message}`);
  } finally {
    setLoading(false);
  }
}
  
async function closeCorAction(corId) {
  setLoading(true);
  setMessage("");

  try {
    let uploadedAfterPhotoUrls = [];

    if (corAfterPhotos[corId] && corAfterPhotos[corId].length > 0) {
      setMessage("Uploading COR closeout photos...");
      uploadedAfterPhotoUrls = await uploadPhotosToSupabase(corAfterPhotos[corId]);
    }

    const payload = {
      status: "Closed",
      closeout_notes: corCloseoutNotes[corId] || "",
      after_photos: uploadedAfterPhotoUrls.join(", "),
      closed_date: new Date().toISOString().split("T")[0],
    };

    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/cor_corrective_actions?id=eq.${corId}`,
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
      throw new Error(text || "COR closeout failed");
    }

    setCorAfterPhotos((prev) => ({
      ...prev,
      [corId]: [],
    }));

    setCorCloseoutNotes((prev) => ({
      ...prev,
      [corId]: "",
    }));

    setMessage("COR corrective action closed.");
    await loadRecords();
  } catch (error) {
    setMessage(`Could not close COR corrective action: ${error.message}`);
  } finally {
    setLoading(false);
  }
}
  
  async function markRecordApproved(recordId) {
  setLoading(true);
  setMessage("");

  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/records?id=eq.${recordId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${SUPABASE_KEY}`,
          Prefer: "return=representation",
        },
        body: JSON.stringify({
          status: "Approved",
          rectified: true,
          reviewed_at: new Date().toISOString(),
        }),
      }
    );

    if (!res.ok) {
      const text = await res.text();
      throw new Error(text || "Could not approve record");
    }

    setMessage("Corrective action marked approved.");
    await loadRecords();
  } catch (error) {
    setMessage(`Could not approve record: ${error.message}`);
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
   setCorrectiveActionText(record.corrective_actions || "");
    setRectified(Boolean(record.rectified));
    setAssignedTo(record.assigned_to || "");
    setDueDate(record.due_date || "");
    setActiveTab("supervisor");
    setTimeout(() => {
  document
    .getElementById("worker-review-form")
    ?.scrollIntoView({ behavior: "smooth", block: "start" });
}, 100);
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
     corrective_actions: correctiveActionText,
      rectified,
      reviewed_at: new Date().toISOString(),
      stop_work: reviewStatus === "Stop Work",
      assigned_to: assignedTo,
      due_date: dueDate || null,
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
   setCorrectiveActionText("");
setAssignedTo("");
setDueDate("");
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
  assigned_to: hazardActionOwner,
due_date: hazardDueDate,
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
  
 async function downloadPdf(record) {
    const doc = new jsPDF();

    doc.setFillColor(15, 47, 102);
    doc.rect(0, 0, 210, 30, "F");

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(22);
  doc.text(`${companyName} SHIELD Report`, 14, 18);

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
  if (y > 220) {
    doc.addPage();
    y = 20;
  }

  doc.setFontSize(14);
  doc.text("Photos:", 14, y);
  y += 10;

  for (const url of photoUrls) {
    try {
      const response = await fetch(url);
      const blob = await response.blob();

      const base64 = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(blob);
      });

      if (y > 220) {
        doc.addPage();
        y = 20;
      }

      doc.addImage(base64, "JPEG", 14, y, 80, 60);
      y += 70;
    } catch (err) {
      doc.text("Photo failed to load", 14, y);
      y += 8;
    }
  }
}

    doc.save(`baac-shield-record-${record.id}.pdf`);
  }

async function downloadToolboxPdf(talk) {
  const doc = new jsPDF();

  doc.setFillColor(15, 47, 102);
  doc.rect(0, 0, 210, 32, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(20);
  doc.text(`${companyName} TOOLBOX TALK`, 14, 18);

  doc.setFontSize(10);
  doc.text("BAAC Shield Tailgate / Toolbox Meeting", 14, 25);

  doc.setTextColor(0, 0, 0);
  let y = 42;

  const addSection = (title) => {
    if (y > 260) {
      doc.addPage();
      y = 20;
    }

    doc.setFillColor(226, 232, 240);
    doc.rect(14, y - 6, 182, 10, "F");
    doc.setTextColor(15, 47, 102);
    doc.setFontSize(13);
    doc.text(title, 16, y);
    doc.setTextColor(0, 0, 0);
    y += 10;
  };

  const addLine = (label, value) => {
    if (y > 270) {
      doc.addPage();
      y = 20;
    }

    const text = `${label}: ${value || "-"}`;
    const lines = doc.splitTextToSize(text, 180);
    doc.setFontSize(10);
    doc.text(lines, 14, y);
    y += lines.length * 6 + 3;
  };

  const formatDateTime = (value) => {
    if (!value) return "-";
    try {
      return new Date(value).toLocaleString();
    } catch {
      return value;
    }
  };

  let attendees = [];

  try {
    attendees = Array.isArray(talk.attendees)
      ? talk.attendees
      : JSON.parse(talk.attendees || "[]");
  } catch {
    attendees = [];
  }

  addSection("Information");

  addLine("Project", talk.project_name);
  addLine("Job #", talk.job_number);
  addLine("Date", talk.talk_date);
  addLine("Time", talk.talk_time);
  addLine("Weather", talk.weather);
  addLine("Location", talk.location);
  addLine("Superintendent", talk.superintendent);
  addLine("Supervisor", talk.supervisor_name);
  addLine("Guest / Subcontractor / Visitor", talk.guest_visitor);
  addLine("Status", talk.status);
  addLine("Created", formatDateTime(talk.created_at));

  addSection("Work Plan");

  addLine("Daily Job Scope / Work Plan", talk.daily_scope);
  addLine("Locates # + Expiry Dates", talk.locates);
  addLine("Workers Fit For Duty", talk.workers_fit_for_duty);
  addLine("Workers Aware of 3 Basic Rights", talk.workers_aware_rights);
  addLine(
    "3 Basic Rights",
    "Right to Know, Right to Participate, and Right to Refuse Unsafe Work"
  );
  addLine("Muster Point", talk.muster_point);
  addLine("Emergency #", talk.emergency_number);
  addLine("Nearest Hospital", talk.nearest_hospital);
  addLine("# First Aid Attendants", talk.first_aid_attendants);

  addSection("Topics, Hazards, and Controls");

  addLine("Toolbox Topics", talk.topic);
  addLine("Discussion Notes", talk.discussion_notes);
  addLine("Hazards On Site", talk.hazards_reviewed);
  addLine("Additional Hazards", talk.additional_hazards);
  addLine("Hazard Controls", talk.controls_reviewed);
  addLine("Other Considerations", talk.other_considerations);
  addLine("Supervisor Remarks", talk.supervisor_remarks);

  addSection("Workers / Signatures");

  if (attendees.length === 0) {
    addLine("Workers", "No workers listed.");
  }

  for (const attendee of attendees) {
    if (y > 235) {
      doc.addPage();
      y = 20;
    }

    doc.setFontSize(11);
    doc.setTextColor(0, 0, 0);
    doc.text(`${attendee.name || "Unnamed Worker"}${attendee.role ? `, ${attendee.role}` : ""}`, 14, y);
    y += 7;

    addLine("Signed", formatDateTime(attendee.signedAt));

    if (
      attendee.signature &&
      String(attendee.signature).startsWith("data:image")
    ) {
      if (y > 230) {
        doc.addPage();
        y = 20;
      }

      doc.addImage(attendee.signature, "PNG", 120, y - 15, 65, 25);
      y += 14;
    }

    y += 5;
  }

  const photoUrls = talk.photos
    ? String(talk.photos)
        .split(",")
        .map((p) => p.trim())
        .filter(Boolean)
    : [];

  if (photoUrls.length > 0) {
    addSection("Photos");

    for (const url of photoUrls) {
      try {
        const response = await fetch(url);
        const blob = await response.blob();

        const base64 = await new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.readAsDataURL(blob);
        });

        if (y > 200) {
          doc.addPage();
          y = 20;
        }

        doc.addImage(base64, "JPEG", 14, y, 90, 65);
        y += 75;
      } catch (err) {
        addLine("Photo", "Failed to load");
      }
    }
  }

  doc.save(`baac-toolbox-talk-${talk.talk_date || "report"}.pdf`);
}

async function downloadFilteredToolboxPdfs() {
  if (filteredToolboxTalks.length === 0) {
    setMessage("No toolbox talks found for this date range.");
    return;
  }

  const doc = new jsPDF();
  let firstTalk = true;

  const formatDateTime = (value) => {
    if (!value) return "-";
    try {
      return new Date(value).toLocaleString();
    } catch {
      return value;
    }
  };

  const getImageFormat = (base64) => {
    return String(base64).startsWith("data:image/png") ? "PNG" : "JPEG";
  };

  for (const talk of filteredToolboxTalks) {
    if (!firstTalk) {
      doc.addPage();
    }

    firstTalk = false;

    doc.setFillColor(15, 47, 102);
    doc.rect(0, 0, 210, 32, "F");

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(20);
    doc.text(`${companyName} TOOLBOX TALK`, 14, 18);

    doc.setFontSize(10);
    doc.text("BAAC Shield Tailgate / Toolbox Meeting", 14, 25);

    doc.setTextColor(0, 0, 0);

    let y = 42;

    const addSection = (title) => {
      if (y > 260) {
        doc.addPage();
        y = 20;
      }

      doc.setFillColor(226, 232, 240);
      doc.rect(14, y - 6, 182, 10, "F");
      doc.setTextColor(15, 47, 102);
      doc.setFontSize(13);
      doc.text(title, 16, y);
      doc.setTextColor(0, 0, 0);
      y += 10;
    };

    const addLine = (label, value) => {
      if (y > 270) {
        doc.addPage();
        y = 20;
      }

      const text = `${label}: ${value || "-"}`;
      const lines = doc.splitTextToSize(text, 180);
      doc.setFontSize(10);
      doc.text(lines, 14, y);
      y += lines.length * 6 + 3;
    };

    let attendees = [];

    try {
      attendees = Array.isArray(talk.attendees)
        ? talk.attendees
        : JSON.parse(talk.attendees || "[]");
    } catch {
      attendees = [];
    }

    addSection("Information");

    addLine("Project", talk.project_name);
    addLine("Job #", talk.job_number);
    addLine("Date", talk.talk_date);
    addLine("Time", talk.talk_time);
    addLine("Weather", talk.weather);
    addLine("Location", talk.location);
    addLine("Superintendent", talk.superintendent);
    addLine("Supervisor", talk.supervisor_name);
    addLine("Guest / Subcontractor / Visitor", talk.guest_visitor);
    addLine("Status", talk.status);
    addLine("Created", formatDateTime(talk.created_at));

    addSection("Work Plan");

    addLine("Daily Job Scope / Work Plan", talk.daily_scope);
    addLine("Locates # + Expiry Dates", talk.locates);
    addLine("Workers Fit For Duty", talk.workers_fit_for_duty);
    addLine("Workers Aware of 3 Basic Rights", talk.workers_aware_rights);
    addLine(
      "3 Basic Rights",
      "Right to Know, Right to Participate, and Right to Refuse Unsafe Work"
    );
    addLine("Muster Point", talk.muster_point);
    addLine("Emergency #", talk.emergency_number);
    addLine("Nearest Hospital", talk.nearest_hospital);
    addLine("# First Aid Attendants", talk.first_aid_attendants);

    addSection("Topics, Hazards, and Controls");

    addLine("Toolbox Topics", talk.topic);
    addLine("Discussion Notes", talk.discussion_notes);
    addLine("Hazards On Site", talk.hazards_reviewed);
    addLine("Additional Hazards", talk.additional_hazards);
    addLine("Hazard Controls", talk.controls_reviewed);
    addLine("Other Considerations", talk.other_considerations);
    addLine("Supervisor Remarks", talk.supervisor_remarks);

    addSection("Workers / Signatures");

    if (attendees.length === 0) {
      addLine("Workers", "No workers listed.");
    }

    for (const attendee of attendees) {
      if (y > 235) {
        doc.addPage();
        y = 20;
      }

      doc.setFontSize(11);
      doc.setTextColor(0, 0, 0);
      doc.text(
        `${attendee.name || "Unnamed Worker"}${
          attendee.role ? `, ${attendee.role}` : ""
        }`,
        14,
        y
      );
      y += 7;

      addLine("Signed", formatDateTime(attendee.signedAt));

      if (
        attendee.signature &&
        String(attendee.signature).startsWith("data:image")
      ) {
        if (y > 230) {
          doc.addPage();
          y = 20;
        }

        doc.addImage(attendee.signature, "PNG", 120, y - 15, 65, 25);
        y += 14;
      }

      y += 5;
    }

    const photoUrls = talk.photos
      ? String(talk.photos)
          .split(",")
          .map((p) => p.trim())
          .filter(Boolean)
      : [];

    if (photoUrls.length > 0) {
      addSection("Photos");

      for (const url of photoUrls) {
        try {
          const response = await fetch(url);
          const blob = await response.blob();

          const base64 = await new Promise((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.readAsDataURL(blob);
          });

          if (y > 200) {
            doc.addPage();
            y = 20;
          }

          doc.addImage(base64, getImageFormat(base64), 14, y, 90, 65);
          y += 75;
        } catch (err) {
          addLine("Photo", "Failed to load");
        }
      }
    }
  }

  doc.save(
    `baac-toolbox-talks-${toolboxStartDateFilter || "start"}-to-${
      toolboxEndDateFilter || "end"
    }.pdf`
  );
}
 
function exportCombinedCSV() {
  const headers = [
    "Record Type",
    "Project",
    "Submitted By",
    "Supervisor",
    "Category / Risk",
    "Task / Description",
    "Controls / Immediate Action",
    "Status",
    "Reviewed By",
    "Supervisor Comments",
    "Corrective Action",
"Assigned To",
"Due Date",
"Rectified",
"Stop Work",
    "Submitted At",
    "Closed Date"
  ];

  const workerRows = filteredRecords.map((record) => [
    "Worker Form",
    record.project_name || "",
    record.worker_name || "",
    record.supervisor_name || "",
    record.critical_risk || "",
    record.task_description || "",
    record.shield_control || "",
    record.status || "",
    record.reviewed_by || "",
    record.supervisor_review_comments || "",
   record.corrective_actions || "",
record.assigned_to || "",
record.due_date || "",
record.rectified ? "Yes" : "No",
    record.stop_work ? "Yes" : "No",
    record.submitted_at || "",
    ""
  ]);

  const hazardRows = filteredHazardReports.map((report) => [
    report.report_type || "Hazard ID",
    report.project_name || "",
    report.reported_by || "",
    "",
    report.hazard_category || report.risk_level || "",
    report.hazard_description || "",
    report.immediate_action || "",
    report.action_status || report.status || "",
    report.reviewed_by || "",
    report.supervisor_review_comments || "",
    report.corrective_action || "",
    "",
    report.risk_level === "Critical" ? "Yes" : "No",
    report.created_at || report.submitted_at || "",
    report.closed_date || ""
  ]);

  const allRows = [...workerRows, ...hazardRows];

  if (!allRows.length) {
    setMessage("No records to export.");
    return;
  }

  const csvContent = [headers, ...allRows]
    .map((row) =>
      row.map((val) => `"${String(val).replace(/"/g, '""')}"`).join(",")
    )
    .join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
 const today = new Date().toISOString().split("T")[0];
const safeDateFilter = String(dateFilter || "All").replace(/[^a-z0-9]/gi, "-");
const safeProjectFilter = String(projectFilter || "All").replace(/[^a-z0-9]/gi, "-");

link.download = `baac-shield-audit-report-${today}-${safeDateFilter}-${safeProjectFilter}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

async function exportAuditPDF() {
  const doc = new jsPDF();

 doc.setFillColor(15, 47, 102);
doc.rect(0, 0, 210, 32, "F");

doc.setTextColor(255, 255, 255);
doc.setFontSize(20);
doc.text(`${companyName} SHIELD AUDIT REPORT`, 14, 18);

doc.setFontSize(10);
doc.text("Identify the risk. Verify the shield.", 14, 25);

doc.setTextColor(0, 0, 0);
doc.setFontSize(10);
doc.text(`Generated: ${new Date().toLocaleString()}`, 14, 40);
  doc.text(`Date Filter: ${dateFilter}`, 14, 46);  
    doc.text(`Project Filter: ${projectFilter}`, 14, 52);

let y = 64;

      doc.setFontSize(12);
  doc.text(`Total Worker Forms: ${records.length}`, 14, y);
  y += 7;
doc.text(`Filtered Hazard Reports: ${hazardReports.length}`, 14, y);
  y += 7;
  doc.text(`Pending Worker Reviews: ${pendingRecords.length}`, 14, y);
  y += 7;
  doc.text(`Needs Action: ${actionRecords.length}`, 14, y);
  y += 7;
  doc.text(`Closed / Approved Worker Records: ${closedRecords.length}`, 14, y);
  y += 10;

  const addLine = (label, value) => {
    const text = `${label}: ${value || "-"}`;
    const lines = doc.splitTextToSize(text, 180);
    doc.text(lines, 14, y);
    y += lines.length * 6 + 3;

    if (y > 270) {
      doc.addPage();
      y = 20;
    }
  };

  doc.setFillColor(226, 232, 240);
doc.rect(14, y - 6, 182, 10, "F");
doc.setTextColor(15, 47, 102);
doc.setFontSize(14);
doc.text("Worker Forms", 16, y);
doc.setTextColor(0, 0, 0);
y += 10;
doc.setFontSize(10);

  if (filteredRecords.length === 0) {
    addLine("Worker Forms", "No worker forms match the selected filters.");
    y += 5;
  }
    
 for (const record of filteredRecords) {
    addLine("Record Type", "Worker Form");
    addLine("Project", record.project_name);
    addLine("Worker", record.worker_name);
    addLine("Supervisor", record.supervisor_name);
    addLine("Risk", record.critical_risk);
    addLine("Task", record.task_description);
    addLine("Status", record.status);
    addLine("Reviewed By", record.reviewed_by);
    addLine("Comments", record.supervisor_review_comments);
   addLine("Corrective Actions", record.corrective_actions);
addLine("Assigned To", record.assigned_to);
addLine("Due Date", record.due_date);
addLine("Submitted", record.submitted_at);
   
const photoUrls = record.photos
  ? String(record.photos)
      .split(",")
      .map((p) => p.trim())
      .filter(Boolean)
  : [];

if (photoUrls.length > 0) {
  addLine("Photos", `${photoUrls.length} attached`);

  for (const url of photoUrls) {
    try {
      const response = await fetch(url);
      const blob = await response.blob();

      const base64 = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(blob);
      });

      if (y > 200) {
        doc.addPage();
        y = 20;
      }

      doc.addImage(base64, "JPEG", 14, y, 80, 60);
      y += 70;
    } catch (err) {
      addLine("Photo", "Failed to load");
    }
  }
}
   
    y += 5;
  }

  if (y > 240) {
    doc.addPage();
    y = 20;
  }

 doc.setFillColor(226, 232, 240);
doc.rect(14, y - 6, 182, 10, "F");
doc.setTextColor(15, 47, 102);
doc.setFontSize(14);
doc.text("Hazard IDs / Observations", 16, y);
doc.setTextColor(0, 0, 0);
y += 10;
doc.setFontSize(10);

  if (filteredHazardReports.length === 0) {
    addLine("Hazard Reports", "No hazard reports match the selected filters.");
    y += 5;
  }
    
  filteredHazardReports.forEach((report) => {
    addLine("Record Type", report.report_type || "Hazard ID");
    addLine("Project", report.project_name);
    addLine("Reported By", report.reported_by);
    addLine("Category", report.hazard_category);
    addLine("Risk Level", report.risk_level);
    addLine("Description", report.hazard_description);
    addLine("Immediate Action", report.immediate_action);
    addLine("Status", report.action_status || report.status);
    addLine("Reviewed By", report.reviewed_by);
    addLine("Supervisor Comments", report.supervisor_review_comments);
    addLine("Corrective Action", report.corrective_action);
    addLine("Closed Date", report.closed_date);
    y += 5;
  });

   const today = new Date().toISOString().split("T")[0];
  doc.save(`baac-shield-audit-report-${today}.pdf`);
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
  const overdueRecords = records.filter((record) => {
  if (!record.due_date) return false;

  const dueDateValue = new Date(record.due_date);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return record.status !== "Approved" && dueDateValue < today;
});
  const totalHazards = hazardReports.length;

const todayActivityStart = new Date();
todayActivityStart.setHours(0, 0, 0, 0);

const todayWorkerRecords = records.filter((record) => {
  if (!record.submitted_at) return false;
  return new Date(record.submitted_at) >= todayActivityStart;
});

const todayHazardReports = hazardReports.filter((report) => {
  const submittedValue = report.created_at || report.submitted_at;
  if (!submittedValue) return false;
  return new Date(submittedValue) >= todayActivityStart;
});

const todayStopWorkRecords = records.filter((record) => {
  if (!record.submitted_at) return false;
  return record.stop_work === true && new Date(record.submitted_at) >= todayActivityStart;
});

const openCorrectiveActions = records.filter((record) => {
  return (
    record.status !== "Approved" &&
    (record.corrective_actions || record.assigned_to || record.due_date)
  );
});

 const correctiveActionRegister = [
  ...records.filter((record) => {
    return (
      record.status !== "Approved" &&
      (record.corrective_actions ||
       record.assigned_to ||
       record.due_date)
    );
  }),

  ...hazardReports.filter((report) => {
    return (
      report.action_status !== "Closed" &&
      (report.corrective_action ||
       report.assigned_to ||
       report.due_date)
    );
  })
].sort((a, b) => {
  const aDate = a.due_date ? new Date(a.due_date) : new Date("9999-12-31");
  const bDate = b.due_date ? new Date(b.due_date) : new Date("9999-12-31");
  return aDate - bDate;
});

  const recentActivity = [
  ...records.map((record) => ({
    id: `record-${record.id}`,
    type: "Worker Form",
    title: record.worker_name || "Unknown worker",
    project: record.project_name || "Unknown project",
    time: record.submitted_at,
    record,
  })),
...hazardReports.map((report) => ({
  id: `hazard-${report.id}`,
  type: report.report_type || "Hazard ID",
  title: report.reported_by || "Unknown reporter",
  project: report.project_name || "Unknown project",
  time: report.created_at || report.submitted_at,
  report: report,
}))
]
  .filter((item) => item.time)
  .sort((a, b) => new Date(b.time) - new Date(a.time))
  .slice(0, 5);

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

const sortedHazardCategories = Object.entries(hazardCategoryCounts)
  .sort((a, b) => b[1] - a[1])
  .slice(0, 12);
  
const hazardIdCount = hazardReports.filter(
  (r) => r.report_type === "Hazard ID"
).length;

const observationCount = hazardReports.filter(
  (r) => r.report_type === "Observation"
).length;

const criticalHazardCount = hazardReports.filter(
  (r) => r.risk_level === "Critical"
).length;

  const sortedHazards = [...hazardReports].sort(
  (a, b) => new Date(b.created_at) - new Date(a.created_at)
);

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

  const customStartDate = startDateFilter
  ? new Date(`${startDateFilter}T00:00:00`)
  : null;

const customEndDate = endDateFilter
  ? new Date(`${endDateFilter}T23:59:59`)
  : null;

const matchesDate =
  customStartDate || customEndDate
    ? submittedDate &&
      (!customStartDate || submittedDate >= customStartDate) &&
      (!customEndDate || submittedDate <= customEndDate)
    : dateFilter === "All" ||
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

const supervisorSortedRecords = [...filteredRecords].sort((a, b) => {
  const aPending = (a.status || "Pending Review") === "Pending Review";
  const bPending = (b.status || "Pending Review") === "Pending Review";

  if (aPending && !bPending) return -1;
  if (!aPending && bPending) return 1;

  return new Date(b.submitted_at || 0) - new Date(a.submitted_at || 0);
});

const supervisorActionRecords = supervisorSortedRecords.filter((record) => {
  const status = record.status || "Pending Review";
  return (
    status === "Pending Review" ||
    status === "Needs Correction" ||
    status === "Stop Work"
  );
});
   
const filteredHazardReports = hazardReports.filter((report) => {
  const matchesSearch =
    !searchTerm ||
    report.reported_by?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    report.project_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    report.hazard_description?.toLowerCase().includes(searchTerm.toLowerCase());

  const matchesProject =
    projectFilter === "All" || report.project_name === projectFilter;

  const submittedDate = report.created_at
    ? new Date(report.created_at)
    : null;

  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(now.getDate() - 7);

  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(now.getDate() - 30);

const customStartDate = startDateFilter
  ? new Date(`${startDateFilter}T00:00:00`)
  : null;

const customEndDate = endDateFilter
  ? new Date(`${endDateFilter}T23:59:59`)
  : null;
  
const matchesDate =
  customStartDate || customEndDate
    ? submittedDate &&
      (!customStartDate || submittedDate >= customStartDate) &&
      (!customEndDate || submittedDate <= customEndDate)
    : dateFilter === "All" ||
      (dateFilter === "Today" && submittedDate && submittedDate >= todayStart) ||
      (dateFilter === "Last7" && submittedDate && submittedDate >= sevenDaysAgo) ||
      (dateFilter === "Last30" && submittedDate && submittedDate >= thirtyDaysAgo);
  return matchesSearch && matchesProject && matchesDate;
});
 
  const filteredToolboxTalks = toolboxTalks.filter((talk) => {
  const talkDate = talk.talk_date
    ? new Date(`${talk.talk_date}T00:00:00`)
    : talk.created_at
    ? new Date(talk.created_at)
    : null;

  if (!talkDate) return false;

  const startDate = toolboxStartDateFilter
    ? new Date(`${toolboxStartDateFilter}T00:00:00`)
    : null;

  const endDate = toolboxEndDateFilter
    ? new Date(`${toolboxEndDateFilter}T23:59:59`)
    : null;

  return (
    (!startDate || talkDate >= startDate) &&
    (!endDate || talkDate <= endDate)
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

if (!accountActive) {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f8fafc",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 500,
          background: "white",
          padding: 24,
          borderRadius: 12,
          boxShadow: "0 2px 12px rgba(0,0,0,0.1)",
          textAlign: "center",
        }}
      >
        <h2>Account Disabled</h2>

        <p>
          Your account has been disabled. Please contact your administrator.
        </p>
      </div>
    </main>
  );
}

if (!user) {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f8fafc",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 400,
          background: "white",
          padding: 24,
          borderRadius: 12,
          boxShadow: "0 2px 12px rgba(0,0,0,0.1)",
        }}
      >
        <h2>BAAC Shield Login</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "100%",
            padding: 12,
            marginBottom: 10,
            border: "1px solid #cbd5e1",
            borderRadius: 8,
          }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "100%",
            padding: 12,
            marginBottom: 10,
            border: "1px solid #cbd5e1",
            borderRadius: 8,
          }}
        />

        <button
          onClick={async () => {
            const { error } = await supabase.auth.signInWithPassword({
              email,
              password,
            });

            if (error) {
              alert(error.message);
            } else {
              window.location.reload();
            }
          }}
          style={{
            width: "100%",
            padding: 12,
            background: "#123d82",
            color: "white",
            border: "none",
            borderRadius: 8,
            fontWeight: "bold",
          }}
        >
          Login
        </button>
   <button
  onClick={async () => {
    if (!email) {
      alert("Enter your email address first.");
      return;
    }

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: window.location.origin,
    });

    if (error) {
      alert(error.message);
    } else {
      alert("Password reset email sent.");
    }
  }}
  style={{
    width: "100%",
    padding: 12,
    marginTop: 10,
    background: "#123d82",
    color: "white",
    border: "none",
    borderRadius: 8,
    fontWeight: "bold",
  }}
>
  Forgot Password
</button>

<button
  onClick={async () => {
    if (!email.endsWith("@baacconstruction.com")) {
      alert("Use your BAAC company email.");
      return;
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      alert(error.message);
    } else {
      alert("Account created. Check your email to confirm.");
    }
  }}
  style={{
    width: "100%",
    padding: 12,
    marginTop: 10,
    background: "#123d82",
    color: "white",
    border: "none",
    borderRadius: 8,
    fontWeight: "bold",
  }}
>
  Create Account
</button>

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
      background: "#123d82",
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
          <h1 style={{ margin: 0, fontSize: 26 }}>{companyName} SHIELD</h1>
            <div style={{ fontSize: 12, opacity: 0.7 }}>
              Identify the risk. Verify the shield.
            </div>
          </div>
        </div>

       <div style={{ marginTop: 10, display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
  <div style={{ opacity: 0.95 }}>
    Worker submission and supervisor review workflow
  </div>

 <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
  <div style={{ fontSize: 12, opacity: 0.95 }}>
Signed in as: {user?.email} · Role: {role}
  </div>

  <button
    type="button"
    onClick={async () => {
      await supabase.auth.signOut();
      window.location.reload();
    }}
    style={{
      padding: "6px 10px",
      borderRadius: 8,
      border: "1px solid rgba(255,255,255,0.6)",
      background: "white",
      color: "#123d82",
      fontWeight: "bold",
      cursor: "pointer",
    }}
  >
    Logout
  </button>
</div>
</div>
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
  onClick={() => setActiveTab("cor")}
  style={{
    padding: "10px 14px",
    borderRadius: 10,
    border: "1px solid #cbd5e1",
    background: activeTab === "cor" ? "#123d82" : "white",
    color: activeTab === "cor" ? "white" : "#0f172a",
    fontWeight: "bold",
    cursor: "pointer",
  }}
>
  COR Corrective Actions
</button>

<button
  type="button"
  onClick={() => setActiveTab("toolbox")}
  style={{
    padding: "10px 14px",
    borderRadius: 10,
    border: "1px solid #cbd5e1",
    background: activeTab === "toolbox" ? "#123d82" : "white",
    color: activeTab === "toolbox" ? "white" : "#0f172a",
    fontWeight: "bold",
    cursor: "pointer",
  }}
>
  Tailgate / Toolbox Talk
</button>

<button
  type="button"
  onClick={() => setActiveTab("rpas")}
  style={{
    padding: "10px 14px",
    borderRadius: 10,
    border: "1px solid #cbd5e1",
    background: activeTab === "rpas" ? "#123d82" : "white",
    color: activeTab === "rpas" ? "white" : "#0f172a",
    fontWeight: "bold",
    cursor: "pointer",
  }}
>
  RPAS Operations
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

{(role === "admin" || role === "supervisor") && (
      
  <button
    type="button"
    onClick={() => requestProtectedTab("admin")}
    style={{
      padding: "10px 14px",
      borderRadius: 10,
      border: "1px solid #cbd5e1",
      background: activeTab === "admin" ? "#123d82" : "white",
      color: activeTab === "admin" ? "white" : "#0f172a",
      fontWeight: "bold",
      cursor: "pointer",
    }}
  >
    Admin Settings
  </button>
)}
      
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
            readOnly
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

{activeTab === "cor" && (
  <div
    style={{
      background: "white",
      padding: 20,
      borderRadius: 12,
      border: "1px solid #dbe4ee",
      marginTop: 20,
    }}
  >
    <h2 style={{ marginTop: 0 }}>COR Corrective Actions</h2>

    <p style={{ color: "#64748b", marginTop: -4 }}>
      Create and track audit corrective actions by element, owner, due date, and status.
    </p>

    <div style={{ display: "grid", gap: 14 }}>
      <div>
        <label>Audit Element</label>
        <br />
        <select
          value={corCategory}
          onChange={(e) => setCorCategory(e.target.value)}
          style={{
            width: "100%",
            padding: 12,
            marginTop: 6,
            borderRadius: 10,
            border: "1px solid #cbd5e1",
          }}
        >
          <option value="">Select an audit element</option>
          <option>Documentation / Records</option>
          <option>Training / Competency</option>
          <option>Equipment / Tools</option>
          <option>Vehicles / Mobile Equipment</option>
          <option>PPE</option>
          <option>Housekeeping</option>
          <option>Hazard ID / Observation</option>
          <option>Worker Form / FLRA</option>
          <option>Emergency Preparedness</option>
          <option>Environmental</option>
          <option>Subcontractor / Visitor Control</option>
          <option>Supervision / Leadership</option>
          <option>Other</option>
        </select>
      </div>

      <div>
        <label>Project / Field Job Number</label>
        <br />
        <input
          value={corFieldJobNumber}
          onChange={(e) => setCorFieldJobNumber(e.target.value)}
          placeholder="Example: FOX CREEK / Job 1234"
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
        <label>Location</label>
        <br />
        <input
          value={corFieldLocation}
          onChange={(e) => setCorFieldLocation(e.target.value)}
          placeholder="Field location, shop, office, yard, etc."
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
        <label>Finding / Issue</label>
        <br />
        <textarea
          value={corIssueDescription}
          onChange={(e) => setCorIssueDescription(e.target.value)}
          rows="4"
          placeholder="Describe the audit finding or issue."
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
        <label>Corrective Action Required</label>
        <br />
        <textarea
          value={correctiveActionText}
          onChange={(e) => setCorrectiveActionText(e.target.value)}
          rows="4"
          placeholder="Describe what must be done to correct the finding."
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
        <label>Assigned To</label>
        <br />
        <input
          value={corAssignedTo}
          onChange={(e) => setCorAssignedTo(e.target.value)}
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
        <label>Due Date</label>
        <br />
        <input
          type="date"
          value={corTargetFixDate}
          onChange={(e) => setCorTargetFixDate(e.target.value)}
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
        <label>Priority</label>
        <br />
        <select
          value={corEquipmentDescription}
          onChange={(e) => setCorEquipmentDescription(e.target.value)}
          style={{
            width: "100%",
            padding: 12,
            marginTop: 6,
            borderRadius: 10,
            border: "1px solid #cbd5e1",
          }}
        >
          <option value="">Select priority</option>
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
          <option>Critical</option>
        </select>
      </div>

      <div
        style={{
          border: "1px solid #d1d5db",
          borderRadius: 14,
          padding: 16,
          background: "#f8fafc",
        }}
      >
        <h3 style={{ marginTop: 0 }}>Before / Evidence Photos</h3>
        <input
  ref={corBeforeFileRef}
  type="file"
  multiple
  accept="image/*"
  style={{ display: "none" }}
  onChange={(e) => setCorBeforePhotos(Array.from(e.target.files || []))}
/>

<button
  type="button"
  onClick={() => corBeforeFileRef.current?.click()}
  style={{
    padding: 12,
    border: "1px solid #94a3b8",
    borderRadius: 10,
    background: "white",
    cursor: "pointer",
    fontWeight: "bold",
  }}
>
  Upload Before Photos
</button>

{corBeforePhotos.length > 0 && (
  <div style={{ marginTop: 12 }}>
    <strong>Selected files:</strong>
    <ul style={{ marginTop: 8, paddingLeft: 18 }}>
      {corBeforePhotos.map((file) => (
        <li key={file.name}>{file.name}</li>
      ))}
    </ul>
  </div>
)}
      </div>

      <button
        type="button"
onClick={submitCorAction}
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
        Submit COR
      </button>
    </div>

       <div style={{ marginTop: 28 }}>
  <h3 style={{ marginBottom: 8 }}>Open COR Register</h3>

  {corActions.length === 0 ? (
    <div
      style={{
        padding: 14,
        border: "1px solid #dbe4ee",
        borderRadius: 10,
        background: "#f8fafc",
        color: "#64748b",
      }}
    >
      No COR corrective actions submitted yet.
    </div>
  ) : (
    <div style={{ display: "grid", gap: 12 }}>
      {corActions.map((cor) => (
        <div
          key={cor.id}
          style={{
            padding: 14,
            border: "1px solid #dbe4ee",
            borderRadius: 12,
            background: "#f8fafc",
          }}
        >
          <div style={{ fontWeight: "bold", fontSize: 16, marginBottom: 6 }}>
            {cor.category || "Corrective Action"}
          </div>

          <div>
            <strong>Project / Job:</strong> {cor.field_job_number || "-"}
          </div>

          <div>
            <strong>Location:</strong> {cor.field_location || "-"}
          </div>

          <div>
            <strong>Finding / Issue:</strong> {cor.issue_description || "-"}
          </div>

          <div>
            <strong>Corrective Action Required:</strong>{" "}
            {cor.corrective_action_required || "-"}
          </div>

          <div>
            <strong>Assigned To:</strong> {cor.assigned_to || "-"}
          </div>

          <div>
            <strong>Due Date:</strong> {cor.target_fix_date || "-"}
          </div>

          <div>
            <strong>Priority:</strong> {cor.priority || "-"}
          </div>

          <div>
            <strong>Status:</strong> {cor.status || "Open"}
          </div>

{cor.before_photos && String(cor.before_photos).trim() !== "" && (
  <div style={{ marginTop: 12 }}>
    <strong>Before Photos:</strong>

    <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 8 }}>
      {String(cor.before_photos)
        .split(",")
        .map((url) => url.trim())
        .filter(Boolean)
        .map((url, index) => (
          <a key={index} href={url} target="_blank" rel="noreferrer">
            <img
              src={url}
              alt={`COR before photo ${index + 1}`}
              style={{
                width: 90,
                height: 90,
                objectFit: "cover",
                borderRadius: 8,
                border: "1px solid #cbd5e1",
              }}
            />
          </a>
        ))}
    </div>
  </div>
)}

{cor.status === "Closed" && (
  <div
    style={{
      marginTop: 12,
      paddingTop: 12,
      borderTop: "1px solid #e2e8f0",
    }}
  >
    <strong>Closeout Notes:</strong>{" "}
    {cor.closeout_notes || "-"}

    <div style={{ marginTop: 8 }}>
      <strong>Closed Date:</strong> {cor.closed_date || "-"}
    </div>

    {cor.after_photos && String(cor.after_photos).trim() !== "" && (
      <div style={{ marginTop: 12 }}>
        <strong>After Photos:</strong>

        <div
          style={{
            display: "flex",
            gap: 10,
            flexWrap: "wrap",
            marginTop: 8,
          }}
        >
          {String(cor.after_photos)
            .split(",")
            .map((url) => url.trim())
            .filter(Boolean)
            .map((url, index) => (
              <a key={index} href={url} target="_blank" rel="noreferrer">
                <img
                  src={url}
                  alt={`COR after photo ${index + 1}`}
                  style={{
                    width: 90,
                    height: 90,
                    objectFit: "cover",
                    borderRadius: 8,
                    border: "1px solid #cbd5e1",
                  }}
                />
              </a>
            ))}
        </div>
      </div>
    )}
  </div>
)}

  {(cor.status || "Open") !== "Closed" && (
  <div
    style={{
      marginTop: 16,
      paddingTop: 12,
      borderTop: "1px solid #e2e8f0",
    }}
  >
    <label style={{ display: "block", fontWeight: "bold", marginBottom: 6 }}>
      Closeout Notes
    </label>

    <textarea
      value={corCloseoutNotes[cor.id] || ""}
      onChange={(e) =>
        setCorCloseoutNotes((prev) => ({
          ...prev,
          [cor.id]: e.target.value,
        }))
      }
      placeholder="Describe how this corrective action was completed..."
      style={{
        width: "100%",
        minHeight: 80,
        padding: 10,
        borderRadius: 8,
        border: "1px solid #cbd5e1",
        marginBottom: 10,
      }}
    />

   <label style={{ display: "block", fontWeight: "bold", marginBottom: 6 }}>
  After / Closeout Photos
</label>

<input
  type="file"
  multiple
  accept="image/*"
  onChange={(e) =>
    setCorAfterPhotos((prev) => ({
      ...prev,
      [cor.id]: Array.from(e.target.files || []),
    }))
  }
  style={{
    display: "block",
    marginBottom: 10,
  }}
/>

    <button
      type="button"
      onClick={() => closeCorAction(cor.id)}
      disabled={loading}
      style={{
        padding: 10,
        border: "none",
        borderRadius: 8,
        background: "#16a34a",
        color: "white",
        cursor: "pointer",
        fontWeight: "bold",
      }}
    >
      Close COR
    </button>

    {corAfterPhotos[cor.id] && corAfterPhotos[cor.id].length > 0 && (
      <div style={{ marginTop: 10, color: "#475569", fontSize: 13 }}>
        Selected after photos: {corAfterPhotos[cor.id].length}
      </div>
    )}
  </div>
)}
            
        </div>
      ))}
    </div>
  )}
</div>   
        
  </div>
)}

{activeTab === "rpas" && (
  <div
    style={{
      background: "white",
      padding: 20,
      borderRadius: 16,
      boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
      display: "grid",
      gap: 14,
    }}
  >
    <h2 style={{ marginTop: 0 }}>RPAS Operations</h2>

    <div
      style={{
        padding: 14,
        border: "1px solid #e2e8f0",
        borderRadius: 12,
        background: "#f8fafc",
      }}
    >
      <h3 style={{ marginTop: 0 }}>Flight Information</h3>

      <label>Project</label>
      <select
        value={rpasProject}
        onChange={(e) => setRpasProject(e.target.value)}
        style={{
          width: "100%",
          padding: 12,
          marginTop: 6,
          marginBottom: 10,
          borderRadius: 10,
          border: "1px solid #cbd5e1",
        }}
      >
        <option value="">Select project</option>
        {projects.map((project) => (
          <option key={project.id} value={project.name}>
            {project.name}
          </option>
        ))}
      </select>

      <label>Date</label>
      <input
        type="date"
        value={rpasDate}
        onChange={(e) => setRpasDate(e.target.value)}
        style={{
          width: "100%",
          padding: 12,
          marginTop: 6,
          marginBottom: 10,
          borderRadius: 10,
          border: "1px solid #cbd5e1",
        }}
      />

      <label>Pilot in Command</label>
      <input
        value={rpasPilot}
        onChange={(e) => setRpasPilot(e.target.value)}
        placeholder="Pilot in Command"
        style={{
          width: "100%",
          padding: 12,
          marginTop: 6,
          marginBottom: 10,
          borderRadius: 10,
          border: "1px solid #cbd5e1",
        }}
      />

      <label>Visual Observer</label>
      <input
        value={rpasObserver}
        onChange={(e) => setRpasObserver(e.target.value)}
        placeholder="Visual Observer"
        style={{
          width: "100%",
          padding: 12,
          marginTop: 6,
          marginBottom: 10,
          borderRadius: 10,
          border: "1px solid #cbd5e1",
        }}
      />

      <label>RPAS Make / Model</label>
      <input
        value={rpasMakeModel}
        onChange={(e) => setRpasMakeModel(e.target.value)}
        placeholder="Example: DJI Mavic 3 Enterprise"
        style={{
          width: "100%",
          padding: 12,
          marginTop: 6,
          marginBottom: 10,
          borderRadius: 10,
          border: "1px solid #cbd5e1",
        }}
      />

      <label>RPAS Registration #</label>
      <input
        value={rpasRegistration}
        onChange={(e) => setRpasRegistration(e.target.value)}
        placeholder="RPAS registration number"
        style={{
          width: "100%",
          padding: 12,
          marginTop: 6,
          marginBottom: 10,
          borderRadius: 10,
          border: "1px solid #cbd5e1",
        }}
      />

      <label>Operation Type</label>
      <select
        value={rpasOperationType}
        onChange={(e) => setRpasOperationType(e.target.value)}
        style={{
          width: "100%",
          padding: 12,
          marginTop: 6,
          marginBottom: 10,
          borderRadius: 10,
          border: "1px solid #cbd5e1",
        }}
      >
        <option value="">Select</option>
        <option value="Basic">Basic</option>
        <option value="Advanced">Advanced</option>
        <option value="Level 1 Complex">Level 1 Complex</option>
        <option value="Other">Other</option>
      </select>

      <label>Flight Location</label>
      <input
        value={rpasLocation}
        onChange={(e) => setRpasLocation(e.target.value)}
        placeholder="Flight location / coordinates"
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
        padding: 14,
        border: "1px solid #e2e8f0",
        borderRadius: 12,
        background: "#f8fafc",
      }}
    >
      <h3 style={{ marginTop: 0 }}>Pre-Flight Checklist</h3>

      <label>Airspace Checked</label>
      <select
        value={rpasAirspaceChecked}
        onChange={(e) => setRpasAirspaceChecked(e.target.value)}
        style={{
          width: "100%",
          padding: 12,
          marginTop: 6,
          marginBottom: 10,
          borderRadius: 10,
          border: "1px solid #cbd5e1",
        }}
      >
        <option value="">Select</option>
        <option value="Yes">Yes</option>
        <option value="No">No</option>
        <option value="N/A">N/A</option>
      </select>

      <label>Weather Checked</label>
      <select
        value={rpasWeatherChecked}
        onChange={(e) => setRpasWeatherChecked(e.target.value)}
        style={{
          width: "100%",
          padding: 12,
          marginTop: 6,
          marginBottom: 10,
          borderRadius: 10,
          border: "1px solid #cbd5e1",
        }}
      >
        <option value="">Select</option>
        <option value="Yes">Yes</option>
        <option value="No">No</option>
        <option value="N/A">N/A</option>
      </select>

      <label>Site Survey Complete</label>
      <select
        value={rpasSiteSurveyComplete}
        onChange={(e) => setRpasSiteSurveyComplete(e.target.value)}
        style={{
          width: "100%",
          padding: 12,
          marginTop: 6,
          marginBottom: 10,
          borderRadius: 10,
          border: "1px solid #cbd5e1",
        }}
      >
        <option value="">Select</option>
        <option value="Yes">Yes</option>
        <option value="No">No</option>
        <option value="N/A">N/A</option>
      </select>

      <label>Emergency / Flyaway Procedure Reviewed</label>
      <select
        value={rpasEmergencyReviewed}
        onChange={(e) => setRpasEmergencyReviewed(e.target.value)}
        style={{
          width: "100%",
          padding: 12,
          marginTop: 6,
          marginBottom: 10,
          borderRadius: 10,
          border: "1px solid #cbd5e1",
        }}
      >
        <option value="">Select</option>
        <option value="Yes">Yes</option>
        <option value="No">No</option>
        <option value="N/A">N/A</option>
      </select>

      <label>Battery Condition Checked</label>
      <select
        value={rpasBatteryChecked}
        onChange={(e) => setRpasBatteryChecked(e.target.value)}
        style={{
          width: "100%",
          padding: 12,
          marginTop: 6,
          marginBottom: 10,
          borderRadius: 10,
          border: "1px solid #cbd5e1",
        }}
      >
        <option value="">Select</option>
        <option value="Yes">Yes</option>
        <option value="No">No</option>
        <option value="N/A">N/A</option>
      </select>

      <label>Propellers / Airframe Checked</label>
      <select
        value={rpasAirframeChecked}
        onChange={(e) => setRpasAirframeChecked(e.target.value)}
        style={{
          width: "100%",
          padding: 12,
          marginTop: 6,
          marginBottom: 10,
          borderRadius: 10,
          border: "1px solid #cbd5e1",
        }}
      >
        <option value="">Select</option>
        <option value="Yes">Yes</option>
        <option value="No">No</option>
        <option value="N/A">N/A</option>
      </select>

      <label>Controller / Firmware / Compass / GPS Checked</label>
      <select
        value={rpasControllerChecked}
        onChange={(e) => setRpasControllerChecked(e.target.value)}
        style={{
          width: "100%",
          padding: 12,
          marginTop: 6,
          marginBottom: 10,
          borderRadius: 10,
          border: "1px solid #cbd5e1",
        }}
      >
        <option value="">Select</option>
        <option value="Yes">Yes</option>
        <option value="No">No</option>
        <option value="N/A">N/A</option>
      </select>

      <label>Crew Briefing Complete</label>
      <select
        value={rpasCrewBriefingComplete}
        onChange={(e) => setRpasCrewBriefingComplete(e.target.value)}
        style={{
          width: "100%",
          padding: 12,
          marginTop: 6,
          marginBottom: 10,
          borderRadius: 10,
          border: "1px solid #cbd5e1",
        }}
      >
        <option value="">Select</option>
        <option value="Yes">Yes</option>
        <option value="No">No</option>
        <option value="N/A">N/A</option>
      </select>

      <label>Pre-Flight Notes</label>
      <textarea
        value={rpasPreflightNotes}
        onChange={(e) => setRpasPreflightNotes(e.target.value)}
        placeholder="Pre-flight notes"
        rows={4}
        style={{
          width: "100%",
          padding: 12,
          marginTop: 6,
          marginBottom: 10,
          borderRadius: 10,
          border: "1px solid #cbd5e1",
        }}
      />

      <label>Pre-Flight Pilot Signature</label>
      <SignatureBox
        sigRef={rpasPreflightSigRef}
        onSave={setRpasPreflightSignature}
      />
    </div>

    <div
      style={{
        padding: 14,
        border: "1px solid #e2e8f0",
        borderRadius: 12,
        background: "#f8fafc",
      }}
    >
      <h3 style={{ marginTop: 0 }}>Post-Flight Checklist</h3>

      <label>Post-Flight Condition</label>
      <select
        value={rpasPostflightCondition}
        onChange={(e) => setRpasPostflightCondition(e.target.value)}
        style={{
          width: "100%",
          padding: 12,
          marginTop: 6,
          marginBottom: 10,
          borderRadius: 10,
          border: "1px solid #cbd5e1",
        }}
      >
        <option value="">Select</option>
        <option value="Acceptable">Acceptable</option>
        <option value="Issue Found">Issue Found</option>
        <option value="Grounded">Grounded</option>
      </select>

      <label>Incidents / Damage / Abnormalities</label>
      <textarea
        value={rpasIncidentsDamage}
        onChange={(e) => setRpasIncidentsDamage(e.target.value)}
        placeholder="Describe any incidents, damage, abnormalities, or near misses"
        rows={4}
        style={{
          width: "100%",
          padding: 12,
          marginTop: 6,
          marginBottom: 10,
          borderRadius: 10,
          border: "1px solid #cbd5e1",
        }}
      />

      <label>Battery Logs / Maintenance Notes</label>
      <textarea
        value={rpasBatteryLogs}
        onChange={(e) => setRpasBatteryLogs(e.target.value)}
        placeholder="Battery cycles, charging notes, maintenance notes"
        rows={4}
        style={{
          width: "100%",
          padding: 12,
          marginTop: 6,
          marginBottom: 10,
          borderRadius: 10,
          border: "1px solid #cbd5e1",
        }}
      />

      <label>Post-Flight Notes</label>
      <textarea
        value={rpasPostflightNotes}
        onChange={(e) => setRpasPostflightNotes(e.target.value)}
        placeholder="Post-flight notes"
        rows={4}
        style={{
          width: "100%",
          padding: 12,
          marginTop: 6,
          marginBottom: 10,
          borderRadius: 10,
          border: "1px solid #cbd5e1",
        }}
      />

      <label>Post-Flight Pilot Signature</label>
      <SignatureBox
        sigRef={rpasPostflightSigRef}
        onSave={setRpasPostflightSignature}
      />
    </div>

    <div
      style={{
        padding: 14,
        border: "1px solid #e2e8f0",
        borderRadius: 12,
        background: "#f8fafc",
      }}
    >
      <h3 style={{ marginTop: 0 }}>Photos / Attachments</h3>

      <input
        type="file"
        multiple
        accept="image/*"
        onChange={(e) => setRpasPhotos(Array.from(e.target.files || []))}
        style={{
          display: "block",
          marginTop: 8,
          marginBottom: 10,
        }}
      />

      {rpasPhotos.length > 0 && (
        <div style={{ color: "#475569", fontSize: 13 }}>
          Selected RPAS photos: {rpasPhotos.length}
        </div>
      )}
    </div>

    <button
      type="button"
      onClick={() => saveRpasOperation("Draft")}
      disabled={loading}
      style={{
        padding: 12,
        background: "#123d82",
        color: "white",
        border: "none",
        borderRadius: 10,
        fontWeight: "bold",
        cursor: "pointer",
      }}
    >
      Save RPAS Operation Checklist
    </button>
  </div>
)}

{activeTab === "toolbox" && (
  <div
   key={toolboxResetKey}
    style={{
      display: "grid",
      gap: 14,
      background: "white",
      padding: 18,
      borderRadius: 16,
      boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
    }}
  >
    <h2 style={{ marginTop: 0, marginBottom: 6 }}>
      Tailgate / Toolbox Talk
    </h2>

    <div>
      <label>Project</label>
      <br />
      <select
        value={toolboxProject}
        onChange={(e) => setToolboxProject(e.target.value)}
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
  <label>Superintendent</label>
  <br />
  <input
    value={toolboxSuperintendent}
    onChange={(e) => setToolboxSuperintendent(e.target.value)}
    placeholder="Superintendent name"
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
  <label>Job #</label>
  <br />
  <input
    value={toolboxJobNumber}
    onChange={(e) => setToolboxJobNumber(e.target.value)}
    placeholder="Job number"
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
  <label>Date</label>
  <br />
  <input
    type="date"
    value={toolboxDate}
    onChange={(e) => setToolboxDate(e.target.value)}
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
  <label>Time</label>
  <br />
  <input
    type="time"
    value={toolboxTime}
    onChange={(e) => setToolboxTime(e.target.value)}
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
  <label>Weather</label>
  <br />
  <input
    value={toolboxWeather}
    onChange={(e) => setToolboxWeather(e.target.value)}
    placeholder="Example: Clear, rain, snow, windy"
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
      <label>Location</label>
      <br />
      <input
        value={toolboxLocation}
        onChange={(e) => setToolboxLocation(e.target.value)}
        placeholder="Site, yard, shop, or meeting location"
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
      <label>Supervisor / Lead</label>
      <br />
      <input
        value={toolboxSupervisor}
        onChange={(e) => setToolboxSupervisor(e.target.value)}
        placeholder="Person leading the talk"
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
  <label>Guest / Subcontractor / Visitor</label>
  <br />
  <input
    value={toolboxGuestVisitor}
    onChange={(e) => setToolboxGuestVisitor(e.target.value)}
    placeholder="List any guests, subcontractors, or visitors"
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
<label>Toolbox Topics</label>
      <br />
      <input
        value={toolboxTopic}
        onChange={(e) => setToolboxTopic(e.target.value)}
        placeholder="Example: Line of fire, lifting, driving, PPE"
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
      <label>Discussion Notes</label>
      <br />
      <textarea
        value={toolboxDiscussionNotes}
        onChange={(e) => setToolboxDiscussionNotes(e.target.value)}
        rows="4"
        placeholder="What was discussed?"
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
   <label>Hazards On Site</label>
      <br />
      <textarea
        value={toolboxHazardsReviewed}
        onChange={(e) => setToolboxHazardsReviewed(e.target.value)}
        rows="3"
        placeholder="List hazards discussed with the crew"
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
 <label>Hazard Controls</label>
      <br />
      <textarea
        value={toolboxControlsReviewed}
        onChange={(e) => setToolboxControlsReviewed(e.target.value)}
        rows="3"
        placeholder="List controls, permits, PPE, procedures, or critical risk shields reviewed"
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
  <label>Additional Hazards</label>
  <br />
  <textarea
    value={toolboxAdditionalHazards}
    onChange={(e) => setToolboxAdditionalHazards(e.target.value)}
    rows="3"
    placeholder="List any additional hazards identified during the meeting"
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
  <label>Other Considerations to Review</label>
  <br />
  <textarea
    value={toolboxOtherConsiderations}
    onChange={(e) => setToolboxOtherConsiderations(e.target.value)}
    rows="3"
    placeholder="Permits, equipment, access, traffic, environment, public safety, subcontractors, or other items"
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
  <label>Supervisor Remarks</label>
  <br />
  <textarea
    value={toolboxSupervisorRemarks}
    onChange={(e) => setToolboxSupervisorRemarks(e.target.value)}
    rows="3"
    placeholder="Supervisor remarks or follow-up notes"
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
        padding: 14,
        border: "1px solid #e2e8f0",
        borderRadius: 12,
        background: "#f8fafc",
      }}
    >

<div>
  <label>Are Workers Fit For Duty?</label>
  <br />
  <select
    value={toolboxWorkersFitForDuty}
    onChange={(e) => setToolboxWorkersFitForDuty(e.target.value)}
    style={{
      width: "100%",
      padding: 12,
      marginTop: 6,
      borderRadius: 10,
      border: "1px solid #cbd5e1",
    }}
  >
    <option value="">Select</option>
    <option>Yes</option>
    <option>No</option>
    <option>N/A</option>
  </select>
</div>

<div>
  <label>Are Workers Aware of 3 Basic Rights?</label>
  <br />
  <select
    value={toolboxWorkersAwareRights}
    onChange={(e) => setToolboxWorkersAwareRights(e.target.value)}
    style={{
      width: "100%",
      padding: 12,
      marginTop: 6,
      borderRadius: 10,
      border: "1px solid #cbd5e1",
    }}
  >
    <option value="">Select</option>
    <option>Yes</option>
    <option>No</option>
    <option>N/A</option>
  </select>
</div>

<div
  style={{
    padding: 12,
    border: "1px solid #bfdbfe",
    borderRadius: 10,
    background: "#eff6ff",
    color: "#0f172a",
  }}
>
  <strong>3 Basic Rights:</strong> Right to Know, Right to Participate, and Right to Refuse Unsafe Work.
</div>
      
<h3 style={{ marginTop: 18 }}>Workers Present</h3>

      {toolboxAttendees.map((attendee, index) => (
        <div key={index} style={{ marginBottom: 12 }}>
          <label>Worker {index + 1}</label>
          <input
            value={attendee.name}
            onChange={(e) => {
              const updated = [...toolboxAttendees];
              updated[index].name = e.target.value;
              setToolboxAttendees(updated);
            }}
            placeholder="Worker name"
            style={{
              width: "100%",
              padding: 12,
              marginTop: 6,
              borderRadius: 10,
              border: "1px solid #cbd5e1",
            }}
          />

<input
  value={attendee.role || ""}
  onChange={(e) => {
    const updated = [...toolboxAttendees];
    updated[index].role = e.target.value;
    setToolboxAttendees(updated);
  }}
  placeholder="Worker role / position"
  style={{
    width: "100%",
    padding: 12,
    marginTop: 8,
    borderRadius: 10,
    border: "1px solid #cbd5e1",
  }}
/>
           
<div style={{ marginTop: 8 }}>
  <label>Worker Signature</label>

  <AttendeeSignatureBox
    onSave={(signatureData) => {
      const updated = [...toolboxAttendees];
      updated[index].signature = signatureData;
     updated[index].signedAt = new Date().toISOString();
      setToolboxAttendees(updated);
    }}
    onClear={() => {
      const updated = [...toolboxAttendees];
      updated[index].signature = "";
     updated[index].signedAt = "";
      setToolboxAttendees(updated);
    }}
  />
      
        </div>

  {attendee.signature && (
    <div style={{ marginTop: 6, color: "#166534", fontSize: 13 }}>
      Signature captured
    </div>
  )}
</div>

      ))}

      <button
        type="button"
        onClick={() =>
          setToolboxAttendees((prev) => [
            ...prev,
           { name: "", role: "", signature: "", signedAt: "" },
          ])
        }
        style={{
          padding: 10,
          border: "1px solid #94a3b8",
          borderRadius: 8,
          background: "white",
          cursor: "pointer",
          fontWeight: "bold",
        }}
      >
        Add Worker
      </button>
    </div>
<div
  style={{
    padding: 14,
    border: "1px solid #e2e8f0",
    borderRadius: 12,
    background: "#f8fafc",
  }}
>
  <h3 style={{ marginTop: 0 }}>Toolbox Photos / Attachments</h3>

  <input
    type="file"
    multiple
    accept="image/*"
    onChange={(e) => setToolboxPhotos(Array.from(e.target.files || []))}
    style={{
      display: "block",
      marginTop: 8,
      marginBottom: 10,
    }}
  />

  {toolboxPhotos.length > 0 && (
    <div style={{ color: "#475569", fontSize: 13 }}>
      Selected toolbox photos: {toolboxPhotos.length}
    </div>
  )}
</div>
    <button
      type="button"
onClick={() => saveToolboxTalk("Draft")}
      disabled={loading}
      style={{
        padding: 12,
        background: "#123d82",
        color: "white",
        border: "none",
        borderRadius: 10,
        fontWeight: "bold",
        cursor: "pointer",
      }}
    >

      Save Toolbox Talk
    </button>
  </div>
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

<div
  style={{
    border: "1px solid #d1d5db",
    borderRadius: 14,
    padding: 16,
    background: "#f8fafc",
  }}
>
  <h3 style={{ marginTop: 0 }}>Hazard Photos</h3>

  <input
    type="file"
    multiple
    accept="image/*"
    style={{ display: "none" }}
    onChange={(e) => setHazardPhotos(Array.from(e.target.files || []))}
    id="hazard-photo-upload"
  />

  <button
    type="button"
    onClick={() => document.getElementById("hazard-photo-upload")?.click()}
    style={{
      padding: 12,
      border: "1px solid #94a3b8",
      borderRadius: 10,
      background: "white",
      cursor: "pointer",
      fontWeight: "bold",
    }}
  >
    Upload Hazard Photos
  </button>

  {hazardPhotos.length > 0 && (
    <div style={{ marginTop: 12 }}>
      <strong>Selected files:</strong>
      <ul style={{ marginTop: 8, paddingLeft: 18 }}>
        {hazardPhotos.map((file) => (
          <li key={file.name}>{file.name}</li>
        ))}
      </ul>
    </div>
  )}
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

  <div
    style={{
      background: "white",
      borderRadius: 14,
      padding: 16,
      boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
      border: overdueRecords.length > 0 ? "2px solid #dc2626" : "none",
    }}
  >
   <div>
  <div style={{ color: "#991b1b", fontSize: 12, fontWeight: "bold" }}>
    Overdue Corrective Actions
  </div>
  <div style={{ fontSize: 28, fontWeight: "bold" }}>
    {overdueRecords.length}
  </div>
</div>
</div>
</div>

{overdueRecords.length > 0 && (
  <div
    style={{
      marginTop: 20,
      background: "#fef2f2",
      padding: 16,
      borderRadius: 12,
      border: "1px solid #fecaca",
      marginBottom: 20,
    }}
  >
    <h3 style={{ marginTop: 0, color: "#991b1b" }}>
      Overdue Corrective Actions
    </h3>

    <p style={{ marginTop: -6, color: "#7f1d1d", fontSize: 13 }}>
      These records have a due date before today and are not approved.
    </p>

    <div style={{ display: "grid", gap: 10 }}>
      {overdueRecords.map((record) => (
        <div
          key={record.id}
          style={{
            background: "white",
            border: "1px solid #fecaca",
            borderRadius: 10,
            padding: 12,
          }}
        >
      <div style={{ fontSize: 18, fontWeight: "bold", color: "#0f2f66" }}>
  {record.project_name || "No Project"}
</div>

<div>
  <strong>Status:</strong> {record.status || "Pending Review"}
</div>

<div>
  <strong>Due Date:</strong> {record.due_date || "—"}
</div>

<div>
  <strong>Worker:</strong> {record.worker_name || "—"}
</div>

<div>
  <strong>Assigned To:</strong> {record.assigned_to || "—"}
</div>

<div>
  <strong>Risk:</strong> {record.critical_risk || "—"}
</div>
          <button
  type="button"
  onClick={() => markRecordApproved(record.id)}
  disabled={loading}
  style={{
    marginTop: 10,
    padding: "8px 12px",
    borderRadius: 8,
    border: "none",
    background: "#16a34a",
    color: "white",
    cursor: "pointer",
    fontWeight: "bold",
  }}
>
Close Corrective Action
</button>
        </div>
      ))}
    </div>
  </div>
)}
  
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
  <h3 style={{ marginTop: 0, color: "#0f2f66" }}>
  Hazard IDs / Observations Pending Review
</h3>
<p style={{ marginTop: -6, color: "#64748b", fontSize: 13 }}>
  Review field-submitted hazards and observations, document corrective actions, and close them when complete.
</p>
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

{report.photos && String(report.photos).trim() !== "" && (
  <div style={{ marginTop: 12 }}>
    <strong>Photos:</strong>

    <div
      style={{
        display: "flex",
        gap: 10,
        flexWrap: "wrap",
        marginTop: 8,
      }}
    >
      {String(report.photos)
        .split(",")
        .map((photo) => photo.trim())
        .filter(Boolean)
        .map((photoUrl, index) => (
          <a
            key={`${report.id}-hazard-photo-${index}`}
            href={photoUrl}
            target="_blank"
            rel="noreferrer"
            style={{ display: "inline-block" }}
          >
            <img
              src={photoUrl}
              alt={`Hazard photo ${index + 1}`}
              style={{
                width: 120,
                height: 90,
                objectFit: "cover",
                borderRadius: 8,
                border: "1px solid #cbd5e1",
              }}
            />
          </a>
        ))}
    </div>
  </div>
)}
          
        <div style={{ marginTop: 10 }}>
          <strong>Description:</strong>
          <div>{report.hazard_description}</div>
 
          <div style={{ marginTop: 14 }}>
  <button
    type="button"
    onClick={() => {
      setHazardActionId(report.id);
      setHazardActionOwner(report.action_owner || "");
setHazardDueDate(report.due_date || "");
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

{hazardActionId === report.id &&
  report.photos &&
  String(report.photos).trim() !== "" && (
    <div style={{ marginTop: 14, marginBottom: 14 }}>
      <strong>Photos:</strong>

      <div
        style={{
          display: "flex",
          gap: 10,
          flexWrap: "wrap",
          marginTop: 8,
        }}
      >
        {String(report.photos)
          .split(",")
          .map((photo) => photo.trim())
          .filter(Boolean)
          .map((photoUrl, index) => (
            <a
              key={`${report.id}-expanded-hazard-photo-${index}`}
              href={photoUrl}
              target="_blank"
              rel="noreferrer"
              style={{ display: "inline-block" }}
            >
              <img
                src={photoUrl}
                alt={`Hazard photo ${index + 1}`}
                style={{
                  width: 140,
                  height: 100,
                  objectFit: "cover",
                  borderRadius: 8,
                  border: "1px solid #cbd5e1",
                }}
              />
            </a>
          ))}
      </div>
    </div>
  )}
      
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

<label>Action Owner</label>
<input
  value={hazardActionOwner}
  onChange={(e) => setHazardActionOwner(e.target.value)}
  style={{
    width: "100%",
    padding: 10,
    marginTop: 6,
    marginBottom: 12,
    borderRadius: 8,
  }}
/>

<label>Due Date</label>
<input
  type="date"
  value={hazardDueDate}
  onChange={(e) => setHazardDueDate(e.target.value)}
  style={{
    width: "100%",
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
 
          <div
  id="worker-review-form"
  style={{ display: reviewingId ? "grid" : "none", gap: 12 }}
>
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
                     setCorrectiveActionText("");
                      setAssignedTo("");
                      setDueDate("");
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
       
            <h2 style={{ marginTop: 0, color: "#0f2f66" }}>
  Worker Records
</h2>
    <p style={{ marginTop: -8, color: "#64748b", fontSize: 13 }}>
  Review worker submissions, corrective actions, approvals, and individual record PDFs.
</p>

       {supervisorActionRecords.length === 0 ? (
  <p>No records require supervisor action.</p>
) : (
  <div style={{ display: "grid", gap: 12 }}>
    {supervisorActionRecords.map((record) => {
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
                        
                         <div style={{ fontSize: 18, fontWeight: "bold", color: "#0f2f66" }}>
  {record.project_name || "No Project"}
</div>

<div>
  <strong>Worker:</strong> {record.worker_name || "—"}
</div>

<div>
  <strong>Risk:</strong> {record.critical_risk || "—"}
</div>

<div>
  <strong>Task:</strong>{" "}
  {record.task_description
    ? record.task_description.slice(0, 120)
    : "—"}
  {record.task_description && record.task_description.length > 120 ? "..." : ""}
</div>

<div>
  <strong>Submitted:</strong>{" "}
  {record.submitted_at
    ? new Date(record.submitted_at).toLocaleDateString()
    : "—"}
</div>

                          {record.reviewed_by && (
                            <div><strong>Reviewed By:</strong> {record.reviewed_by}</div>
                          )}

                          {record.supervisor_review_comments && (
                            <div><strong>Comments:</strong> {record.supervisor_review_comments}</div>
                          )}

                                 {photoUrls.length > 0 && (
                            <div style={{ marginTop: 12 }}>
                              <strong>Photos:</strong>
                              <div
                                style={{
                                  display: "grid",
                                 gridTemplateColumns: "repeat(auto-fit, minmax(90px, 120px))",
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
                                        height: 80,
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
    display: "inline-block",
    padding: "6px 10px",
    borderRadius: 999,
    background:
      record.status === "Approved"
        ? "#dcfce7"
        : record.status === "Needs Correction"
        ? "#fef3c7"
        : record.status === "Stop Work"
        ? "#fee2e2"
        : "#dbeafe",
    color:
      record.status === "Approved"
        ? "#166534"
        : record.status === "Needs Correction"
        ? "#92400e"
        : record.status === "Stop Work"
        ? "#991b1b"
        : "#1d4ed8",
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
  type="button"
  onClick={() =>
    setSelectedRecord({
      id: `record-${record.id}`,
      type: "Worker Form",
      title: record.worker_name || "Unknown worker",
      project: record.project_name || "Unknown project",
      time: record.submitted_at,
      record,
    })
  }
  style={{
    padding: "8px 12px",
    borderRadius: 8,
    border: "1px solid #cbd5e1",
    background: "white",
    cursor: "pointer",
    fontWeight: "bold",
  }}
>
  View Full Record
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
    width: "100%",
    maxWidth: "100%",
    overflowX: "hidden",
    boxSizing: "border-box",
  }}
>
          <h2 style={{ margin: 0 }}>Safety Dashboard</h2>

 {(role === "admin" || role === "supervisor") && (
  <div
    style={{
      marginTop: 18,
      marginBottom: 18,
      padding: 16,
      border: "1px solid #e2e8f0",
      borderRadius: 12,
      background: "#f8fafc",
    }}
  >
    
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 12,
        marginBottom: 14,
      }}
    >
      <div>
        <label>Start Date</label>
        <input
          type="date"
          value={toolboxStartDateFilter}
          onChange={(e) => setToolboxStartDateFilter(e.target.value)}
          style={{
            width: "100%",
            padding: 10,
            borderRadius: 8,
            border: "1px solid #cbd5e1",
            marginTop: 4,
          }}
        />
      </div>

      <div>
        <label>End Date</label>
        <input
          type="date"
          value={toolboxEndDateFilter}
          onChange={(e) => setToolboxEndDateFilter(e.target.value)}
          style={{
            width: "100%",
            padding: 10,
            borderRadius: 8,
            border: "1px solid #cbd5e1",
            marginTop: 4,
          }}
        />
      </div>
    </div>
<button
  type="button"
  onClick={downloadFilteredToolboxPdfs}
  disabled={filteredToolboxTalks.length === 0}
  style={{
    padding: "10px 12px",
    background: filteredToolboxTalks.length === 0 ? "#94a3b8" : "#123d82",
    color: "white",
    border: "none",
    borderRadius: 8,
    fontWeight: "bold",
    cursor: filteredToolboxTalks.length === 0 ? "not-allowed" : "pointer",
    marginBottom: 14,
  }}
>
  Download All Toolbox Talks in Date Range
</button>
    {filteredToolboxTalks.length === 0 ? (
      <p style={{ color: "#475569", marginBottom: 0 }}>
        No toolbox talks found for this date range.
      </p>
    ) : (
      <div style={{ display: "grid", gap: 12 }}>
        {filteredToolboxTalks.map((talk) => (
          <div
            key={talk.id}
            style={{
              padding: 12,
              border: "1px solid #cbd5e1",
              borderRadius: 10,
              background: "white",
            }}
          >
            <div style={{ fontWeight: "bold", marginBottom: 4 }}>
              {talk.project_name || "Unknown Project"}
            </div>

            <div style={{ fontSize: 13, color: "#475569", marginBottom: 4 }}>
              Date: {talk.talk_date || "-"} | Time: {talk.talk_time || "-"}
            </div>

            <div style={{ fontSize: 13, color: "#475569", marginBottom: 4 }}>
              Supervisor: {talk.supervisor_name || "-"}
            </div>

            <div style={{ fontSize: 13, color: "#475569", marginBottom: 4 }}>
              Location: {talk.location || "-"}
            </div>

            <div style={{ fontSize: 13, color: "#475569", marginBottom: 8 }}>
              Topic: {talk.topic || "-"}
            </div>

            <button
              type="button"
              onClick={() => downloadToolboxPdf(talk)}
              style={{
                padding: "8px 12px",
                background: "#123d82",
                color: "white",
                border: "none",
                borderRadius: 8,
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              Download PDF
            </button>
          </div>
        ))}
      </div>
    )}
  </div>
)}

 <h3 style={{ marginTop: 0 }}>Toolbox Talks Register</h3>

             <div
  style={{
    background: "white",
    borderRadius: 16,
   padding: 16,
    boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
    marginBottom: 18,
  }}
>
  <h2 style={{ marginTop: 0, color: "#0f2f66" }}>Today’s Activity</h2>

<div
  style={{
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
    gap: 12,
  }}
>
    <div>
      <div style={{ color: "#64748b", fontSize: 12 }}>Worker Forms Today</div>
      <div style={{ fontSize: 28, fontWeight: "bold" }}>
        {todayWorkerRecords.length}
      </div>
    </div>

    <div>
      <div style={{ color: "#64748b", fontSize: 12 }}>Hazards / Observations Today</div>
      <div style={{ fontSize: 28, fontWeight: "bold" }}>
        {todayHazardReports.length}
      </div>
    </div>

    <div>
      <div style={{ color: "#64748b", fontSize: 12 }}>Stop Work Today</div>
      <div style={{ fontSize: 28, fontWeight: "bold" }}>
        {todayStopWorkRecords.length}
      </div>
    </div>

    <div>
      <div style={{ color: "#64748b", fontSize: 12 }}>Open Corrective Actions</div>
      <div style={{ fontSize: 28, fontWeight: "bold" }}>
        {openCorrectiveActions.length}
      </div>
    </div>

    <div>
      <div style={{ color: "#991b1b", fontSize: 12, fontWeight: "bold" }}>
        Overdue Corrective Actions
      </div>
      <div style={{ fontSize: 28, fontWeight: "bold" }}>
        {overdueRecords.length}
      </div>
    </div>
  </div>
</div>

<div
  style={{
    background: "white",
    padding: 16,
    borderRadius: 12,
    border: "1px solid #dbe4ee",
    marginBottom: 20,
  }}
>
  <h3 style={{ marginTop: 0, color: "#0f2f66" }}>
    Hazard Analytics
  </h3>

  <div style={{ marginBottom: 20 }}>
    <strong>Hazard IDs vs Observations</strong>

    {Object.entries(hazardTypeCounts).map(([type, count]) => (
      <div key={type} style={{ marginTop: 10 }}>
        <div>{type} ({count})</div>

        <div
          style={{
            height: 18,
            background: "#e2e8f0",
            borderRadius: 8,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: `${(count / totalHazards) * 100}%`,
              height: "100%",
              background: "#2563eb",
            }}
          />
        </div>
      </div>
    ))}
  </div>

  <div style={{ marginBottom: 20 }}>
    <strong>Risk Levels</strong>

    {Object.entries(hazardRiskCounts).map(([level, count]) => (
      <div key={level} style={{ marginTop: 10 }}>
        <div>{level} ({count})</div>

        <div
          style={{
            height: 18,
            background: "#e2e8f0",
            borderRadius: 8,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: `${(count / totalHazards) * 100}%`,
              height: "100%",
              background:
                level === "Critical"
                  ? "#dc2626"
                  : level === "High"
                  ? "#ea580c"
                  : level === "Medium"
                  ? "#ca8a04"
                  : "#16a34a",
            }}
          />
        </div>
      </div>
    ))}
  </div>

<div style={{ marginBottom: 20 }}>
  <strong>Top Hazard Categories</strong>

  {sortedHazardCategories.map(([category, count]) => (
    <div key={category} style={{ marginTop: 10 }}>
      <div>
        {category} ({count})
      </div>

      <div
        style={{
          height: 18,
          background: "#e2e8f0",
          borderRadius: 8,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${(count / totalHazards) * 100}%`,
            height: "100%",
            background: "#16a34a",
          }}
        />
      </div>
    </div>
  ))}
</div>
      
  <h3 style={{ marginTop: 24, color: "#0f2f66" }}>
    Hazard History
  </h3>

<div style={{ display: "grid", gap: 10 }}>
  {sortedHazards.slice(0, 20).map((report) => (
    <div
      key={report.id}
      style={{
        background: "#f8fafc",
        border: "1px solid #dbe4ee",
        borderRadius: 10,
        padding: 12,
      }}
    >
      <div>
        <strong>{report.report_type}</strong>
      </div>

      <div>
        Project: {report.project_name}
      </div>

      <div>
        Category: {report.hazard_category}
      </div>

      <div>
        Risk Level: {report.risk_level}
      </div>

      <div>
        Status: {report.action_status || report.status}
      </div>

      <div>
        Date: {new Date(report.created_at).toLocaleDateString()}
      </div>
    </div>
  ))}
</div>
</div>
        
<div
  style={{
    background: "white",
    padding: 16,
    borderRadius: 12,
    border: "1px solid #dbe4ee",
    marginBottom: 20,
  }}
>
  <h3 style={{ marginTop: 0, color: "#0f2f66" }}>
    Open Corrective Action Register
  </h3>

  <p style={{ marginTop: -4, color: "#64748b", fontSize: 13 }}>
    Active corrective actions requiring follow-up.
  </p>

  <div style={{ display: "grid", gap: 10 }}>
    {correctiveActionRegister.length === 0 ? (
      <div>No corrective actions found.</div>
    ) : (
      correctiveActionRegister.map((record) => (
        <div
          key={record.id}
          style={{
            background: "#f8fafc",
            border: "1px solid #dbe4ee",
            borderRadius: 8,
            padding: 12,
          }}
        >
          <div>
       <strong>
  {record.worker_name ||
   record.reported_by ||
   "Unknown Reporter"}
</strong>
          </div>

      <div>Project: {record.project_name || "-"}</div>

<div>
  Assigned To: {record.assigned_to || "-"}
</div>

<div>
  Due Date: {record.due_date || "-"}
</div>

<div>
  Status: {record.status || record.action_status || "Pending Review"}
</div>

<div>
  Corrective Action:{" "}
  {record.corrective_actions ||
   record.corrective_action ||
   "-"}
</div>
        </div>
      ))
    )}
  </div>
</div>
        <div
  style={{
    background: "white",
    borderRadius: 16,
    padding: 16,
    boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
    marginBottom: 18,
  }}
>
  <h2 style={{ marginTop: 0, color: "#0f2f66" }}>Recent Activity</h2>

  {recentActivity.length === 0 ? (
    <p style={{ color: "#64748b", marginBottom: 0 }}>No recent activity yet.</p>
  ) : (
    <div style={{ display: "grid", gap: 10 }}>
      {recentActivity.map((item) => (
        <div
          key={item.id}
          style={{
            padding: 12,
            border: "1px solid #dbe4ee",
            borderRadius: 10,
            background: "#f8fafc",
          }}
        >
          <div style={{ fontWeight: "bold", color: "#0f2f66" }}>
            {item.type}
          </div>
          <div>
            <strong>Submitted By:</strong> {item.title}
          </div>
          <div>
            <strong>Project:</strong> {item.project}
          </div>
          <div style={{ color: "#64748b", fontSize: 13 }}>
            {new Date(item.time).toLocaleString()}
<div style={{ display: "flex", gap: 8, marginTop: 10 }}>
  <button
    type="button"
    onClick={() => setSelectedRecord(item)}
    style={{
      padding: "8px 12px",
      borderRadius: 8,
      border: "1px solid #cbd5e1",
      background: "white",
      cursor: "pointer",
      fontWeight: "bold",
    }}
  >
    View
  </button>

  <button
    type="button"
    onClick={() => {
      setSelectedRecord(item);
      setActiveTab("supervisor");
    }}
    style={{
      padding: "8px 12px",
      borderRadius: 8,
      border: "1px solid #cbd5e1",
      background: "#f8fafc",
      cursor: "pointer",
      fontWeight: "bold",
    }}
  >
    Open Full Record
  </button>
</div>
          </div>
        </div>
      ))}
    </div>
  )}
</div>
          <div
  style={{
    background: "#f8fafc",
    padding: 16,
    borderRadius: 12,
    border: "1px solid #dbe4ee",
    marginBottom: 20,
  }}
>
  <h3 style={{ marginTop: 0, color: "#0f2f66" }}>
    Audit Exports
  </h3>

  <p style={{ marginTop: 0, color: "#64748b", fontSize: 13 }}>
    Download filtered worker records, hazard IDs, observations, corrective actions, and closeouts.
  </p>

  <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
    <button
      type="button"
      onClick={exportCombinedCSV}
      style={{
        padding: "10px 14px",
        borderRadius: 8,
        border: "1px solid #cbd5e1",
        background: "#fff",
        cursor: "pointer",
        fontWeight: "bold",
      }}
    >
      Export AUDIT CSV
    </button>

    <button
      type="button"
      onClick={exportAuditPDF}
      style={{
        padding: "10px 14px",
        borderRadius: 8,
        border: "1px solid #cbd5e1",
        background: "#fff",
        cursor: "pointer",
        fontWeight: "bold",
      }}
    >
      Export AUDIT PDF
    </button>
  </div>
</div>

    <div
  style={{
    display: "flex",
    gap: 10,
    flexWrap: "wrap",
    marginTop: 12,
  }}
>
  <input
    type="date"
    value={startDateFilter}
    onChange={(e) => setStartDateFilter(e.target.value)}
    style={{
      padding: 10,
      borderRadius: 8,
      border: "1px solid #cbd5e1",
    }}
  />

  <input
    type="date"
    value={endDateFilter}
    onChange={(e) => setEndDateFilter(e.target.value)}
    style={{
      padding: 10,
      borderRadius: 8,
      border: "1px solid #cbd5e1",
    }}
  />

  <button
    type="button"
    onClick={() => {
      setStartDateFilter("");
      setEndDateFilter("");
    }}
    style={{
      padding: "10px 14px",
      borderRadius: 8,
      border: "1px solid #cbd5e1",
      background: "#fff",
      cursor: "pointer",
    }}
  >
    Clear Dates
  </button>
</div>    

<div
  style={{
    background: "white",
    padding: 16,
    borderRadius: 12,
    border: "1px solid #dbe4ee",
    marginBottom: 20,
  }}
>
  <h3 style={{ marginTop: 0, color: "#0f2f66" }}>
    Records by Project
  </h3>

  <div style={{ display: "grid", gap: 8 }}>
    {Object.entries(projectCounts).map(([project, count]) => (
      <div
        key={project}
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: 10,
          background: "#f8fafc",
          borderRadius: 8,
        }}
      >
        <span>{project}</span>
        <strong>{count}</strong>
      </div>
    ))}
  </div>
</div>

<h3 style={{ marginTop: 0, color: "#0f2f66" }}>
  Top Risk Categories
</h3>

<div style={{ display: "grid", gap: 8 }}>
  {Object.entries(riskCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([risk, count]) => (
      <div
        key={risk}
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: 10,
          background: "#f8fafc",
          borderRadius: 8,
        }}
      >
        <span>{risk}</span>
        <strong>{count}</strong>
      </div>
    ))}
</div>

<div
  style={{
    background: "white",
    padding: 16,
    borderRadius: 12,
    border: "1px solid #dbe4ee",
    marginBottom: 20,
  }}
>
  <h3 style={{ marginTop: 0, color: "#0f2f66" }}>
    Full Records History
  </h3>

  <p style={{ marginTop: -4, color: "#64748b", fontSize: 13 }}>
    Approved, closed, and historical records available for audit review.
  </p>

  <div style={{ display: "grid", gap: 10 }}>
    {closedRecords.slice(0, 20).map((record) => (
      <div
        key={record.id}
        style={{
          padding: 12,
          background: "#f8fafc",
          borderRadius: 8,
          border: "1px solid #dbe4ee",
        }}
      >
        <div>
          <strong>{record.worker_name}</strong>
        </div>

        <div>Project: {record.project_name}</div>
        <div>Risk: {record.critical_risk}</div>
        <div>Status: {record.status}</div>
        <div>Reviewed By: {record.reviewed_by || "—"}</div>
      </div>
    ))}
  </div>
</div>
    
   <div
            style={{
                          display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
              gap: 12,
            }}
          >
           <div
  style={{
    padding: 18,
    background: "linear-gradient(135deg, #e0f2fe, #f8fafc)",
    borderRadius: 14,
    border: "1px solid #bae6fd",
    boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
  }}
>
  <div style={{ fontSize: 12, color: "#0369a1", fontWeight: "bold" }}>
    Total Worker Forms
  </div>
  <div style={{ fontSize: 32, fontWeight: "bold", marginTop: 6 }}>
    {records.length}
  </div>
</div>

         <div
  style={{
    padding: 18,
    background: "linear-gradient(135deg, #fef9c3, #fffbeb)",
    borderRadius: 14,
    border: "1px solid #fde68a",
    boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
  }}
>
  <div style={{ fontSize: 12, color: "#92400e", fontWeight: "bold" }}>
    Pending Worker Reviews
  </div>
  <div style={{ fontSize: 32, fontWeight: "bold", marginTop: 6 }}>
    {pendingRecords.length}
  </div>
</div>

           <div
  style={{
    padding: 18,
    background: "linear-gradient(135deg, #fee2e2, #fff1f2)",
    borderRadius: 14,
    border: "1px solid #fecaca",
    boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
  }}
>
  <div style={{ fontSize: 12, color: "#991b1b", fontWeight: "bold" }}>
    Worker Records Needing Action
  </div>
  <div style={{ fontSize: 32, fontWeight: "bold", marginTop: 6 }}>
    {actionRecords.length}
  </div>
</div>

            <div
  style={{
    padding: 18,
    background: "linear-gradient(135deg, #dcfce7, #f0fdf4)",
    borderRadius: 14,
    border: "1px solid #bbf7d0",
    boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
  }}
>
  <div style={{ fontSize: 12, color: "#166534", fontWeight: "bold" }}>
    Approved / Closed Worker Records
  </div>
  <div style={{ fontSize: 32, fontWeight: "bold", marginTop: 6 }}>
    {closedRecords.length}
  </div>
</div>

            </div>
            
 <div
  style={{
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: 12,
  }}
>
  <div
  style={{
    padding: 18,
    background: "linear-gradient(135deg, #f1f5f9, #ffffff)",
    borderRadius: 14,
    border: "1px solid #cbd5e1",
    boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
  }}
>
  <div style={{ fontSize: 12, color: "#334155", fontWeight: "bold" }}>
    Total Hazard Reports
  </div>
  <div style={{ fontSize: 32, fontWeight: "bold", marginTop: 6 }}>
    {totalHazards}
  </div>
</div>

 <div
  style={{
    padding: 18,
    background: "linear-gradient(135deg, #e0f2fe, #f0f9ff)",
    borderRadius: 14,
    border: "1px solid #bae6fd",
    boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
  }}
>
  <div style={{ fontSize: 12, color: "#0369a1", fontWeight: "bold" }}>
    Hazard IDs
  </div>
  <div style={{ fontSize: 32, fontWeight: "bold", marginTop: 6 }}>
    {hazardIdCount}
  </div>
</div>

  <div
  style={{
    padding: 18,
    background: "linear-gradient(135deg, #ecfdf5, #f0fdf4)",
    borderRadius: 14,
    border: "1px solid #bbf7d0",
    boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
  }}
>
  <div style={{ fontSize: 12, color: "#166534", fontWeight: "bold" }}>
    Observations
  </div>
  <div style={{ fontSize: 32, fontWeight: "bold", marginTop: 6 }}>
    {observationCount}
  </div>
</div>

 <div
  style={{
    padding: 18,
    background: "linear-gradient(135deg, #fee2e2, #fff1f2)",
    borderRadius: 14,
    border: "1px solid #fecaca",
    boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
  }}
>
  <div style={{ fontSize: 12, color: "#991b1b", fontWeight: "bold" }}>
    Critical Hazards
  </div>
  <div style={{ fontSize: 32, fontWeight: "bold", marginTop: 6 }}>
    {criticalHazardCount}
  </div>
</div>
</div>
<h2
  style={{
    marginTop: 28,
    marginBottom: 4,
    color: "#0f2f66",
    borderBottom: "2px solid #dbe4ee",
    paddingBottom: 8,
  }}
>
  Hazard Analytics
</h2>
  
  <div style={{ marginTop: 20, display: "grid", gap: 20 }}>
  
          <div
            style={{
              background: "#f8fafc",
              borderRadius: 12,
              padding: 16,
              border: "1px solid #dbe4ee",
            }}
          >
           <h3
  style={{
    marginTop: 0,
    marginBottom: 12,
    color: "#0f2f66",
    borderBottom: "1px solid #dbe4ee",
    paddingBottom: 8,
  }}
>
  Recent Records
</h3>
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

{activeTab === "admin" && (
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
    <h2 style={{ margin: 0, color: "#0f2f66" }}>Admin Settings</h2>

    <p style={{ marginTop: 0, color: "#64748b" }}>
      Manage BAAC SHIELD settings, supervisor access, projects, and reporting options.
    </p>

<h3>User Management</h3>

<div
  style={{
    border: "1px solid #dbe4ee",
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
  }}
>
  {users.map((u) => (
  <div
  key={u.email}
  style={{
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: 8,
    padding: "8px 0",
    borderBottom: "1px solid #eee",
  }}
>
   <span
  style={{
    wordBreak: "break-word",
    maxWidth: "100%",
  }}
>
  {u.email}
</span>
<div
  style={{
    display: "flex",
    gap: 10,
    alignItems: "center",
    flexWrap: "wrap",
  }}
>
  <span>
    <strong>{u.role}</strong>
    {" • "}
    {u.active ? "Active" : "Disabled"}
  </span>

  <button
onClick={() => toggleUserStatus(u.email, u.active)}
    style={{
      padding: "4px 8px",
      borderRadius: 6,
      border: "1px solid #cbd5e1",
      cursor: "pointer",
    }}
  >
{u.active ? "Disable" : "Enable"}
  </button>
</div>
    </div>
  ))}
</div>
        
    <div
      style={{
        padding: 16,
        border: "1px solid #dbe4ee",
        borderRadius: 12,
        background: "#f8fafc",
      }}
    >
      <div style={{ display: "grid", gap: 10 }}>
  <h3 style={{ marginTop: 0, color: "#0f2f66" }}>
    Supervisor PIN
  </h3>

  <p style={{ marginTop: -6, color: "#64748b", fontSize: 13 }}>
    This PIN controls access to Supervisor Review, Safety Dashboard, and Admin Settings.
  </p>

  <label>Current Supervisor PIN</label>
  <input
    type="text"
    value={supervisorPin}
    onChange={(e) => setSupervisorPin(e.target.value)}
    style={{
      padding: 10,
      borderRadius: 8,
      border: "1px solid #cbd5e1",
      maxWidth: 220,
    }}
  />

<button
  type="button"
  onClick={saveSupervisorPin}
  style={{
    padding: "10px 14px",
    borderRadius: 8,
    border: "none",
    background: "#123d82",
    color: "white",
    cursor: "pointer",
    fontWeight: "bold",
    maxWidth: 140,
  }}
>
  Save PIN
</button>

</div>
    
    <div
  style={{
    marginTop: 18,
    paddingTop: 16,
    borderTop: "1px solid #dbe4ee",
    display: "grid",
    gap: 10,
  }}
>
  <h3 style={{ marginTop: 0, color: "#0f2f66" }}>
    Alert Email Recipient
  </h3>

  <p style={{ marginTop: -6, color: "#64748b", fontSize: 13 }}>
    This email receives worker form and hazard report alerts.
  </p>

  <label>Alert Email</label>
  <input
    type="email"
    value={alertEmail}
    onChange={(e) => setAlertEmail(e.target.value)}
    style={{
      padding: 10,
      borderRadius: 8,
      border: "1px solid #cbd5e1",
      maxWidth: 360,
    }}
  />

  <button
    type="button"
    onClick={saveAlertEmail}
    style={{
      padding: "10px 14px",
      borderRadius: 8,
      border: "none",
      background: "#123d82",
      color: "white",
      cursor: "pointer",
      fontWeight: "bold",
      maxWidth: 160,
    }}
  >
    Save Alert Email
  </button>

<div
  style={{
    marginTop: 18,
    paddingTop: 16,
    borderTop: "1px solid #dbe4ee",
    display: "grid",
    gap: 10,
  }}
>
  <h3 style={{ marginTop: 0, color: "#0f2f66" }}>
    Report Branding
  </h3>

  <p style={{ marginTop: -6, color: "#64748b", fontSize: 13 }}>
    These settings control company/report information used in BAAC SHIELD.
  </p>

  <label>Company Name</label>
  <input
    type="text"
    value={companyName}
    onChange={(e) => setCompanyName(e.target.value)}
    style={{
      padding: 10,
      borderRadius: 8,
      border: "1px solid #cbd5e1",
      maxWidth: 420,
    }}
  />

  <button
    type="button"
    onClick={saveCompanyName}
    style={{
      padding: "10px 14px",
      borderRadius: 8,
      border: "none",
      background: "#123d82",
      color: "white",
      cursor: "pointer",
      fontWeight: "bold",
      maxWidth: 170,
    }}
  >
    Save Company Name
  </button>
</div>
      
<div
  style={{
    marginTop: 18,
    paddingTop: 16,
    borderTop: "1px solid #dbe4ee",
    display: "grid",
    gap: 10,
  }}
>
  <h3 style={{ marginTop: 0, color: "#0f2f66" }}>
    Project Management
  </h3>

  <p style={{ marginTop: -6, color: "#64748b", fontSize: 13 }}>
    Add new active projects for worker forms, hazard reports, filters, and dashboards.
  </p>

  <label>New Project Name</label>
  <input
    type="text"
    value={newProjectName}
    onChange={(e) => setNewProjectName(e.target.value)}
    placeholder="Example: BAAC - Site 001"
    style={{
      padding: 10,
      borderRadius: 8,
      border: "1px solid #cbd5e1",
      maxWidth: 420,
    }}
  />

  <button
    type="button"
    onClick={addProject}
    disabled={loading}
    style={{
      padding: "10px 14px",
      borderRadius: 8,
      border: "none",
      background: "#123d82",
      color: "white",
      cursor: "pointer",
      fontWeight: "bold",
      maxWidth: 150,
    }}
  >
    Add Project
  </button>

  <div style={{ marginTop: 14 }}>
  <h4 style={{ marginBottom: 8, color: "#334155" }}>
    Active Projects
  </h4>

  {projects.length === 0 ? (
    <div style={{ color: "#64748b", fontSize: 13 }}>
      No active projects found.
    </div>
  ) : (
    <div style={{ display: "grid", gap: 8 }}>
      {projects.map((project) => (
        <div
          key={project.id}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 10,
            padding: 10,
            border: "1px solid #dbe4ee",
            borderRadius: 8,
            background: "white",
          }}
        >
          <div>{project.name}</div>

          <button
            type="button"
            onClick={() => deactivateProject(project.id)}
            disabled={loading}
            style={{
              padding: "6px 10px",
              borderRadius: 6,
              border: "1px solid #fecaca",
              background: "#fef2f2",
              color: "#991b1b",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Deactivate
          </button>
        </div>
      ))}
    </div>
  )}
</div>    

<div style={{ marginTop: 18 }}>
  <h4 style={{ marginBottom: 8, color: "#334155" }}>
    Deactivated Projects
  </h4>

  {allProjects.filter((project) => project.active === false).length === 0 ? (
    <div style={{ color: "#64748b", fontSize: 13 }}>
      No deactivated projects.
    </div>
  ) : (
    <div style={{ display: "grid", gap: 8 }}>
      {allProjects
        .filter((project) => project.active === false)
        .map((project) => (
          <div
            key={project.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 10,
              padding: 10,
              border: "1px solid #dbe4ee",
              borderRadius: 8,
              background: "#f8fafc",
              color: "#64748b",
            }}
          >
            <div>{project.name}</div>

            <button
  type="button"
  onClick={() => reactivateProject(project.id)}
  disabled={loading}
  style={{
    padding: "6px 10px",
    borderRadius: 6,
    border: "1px solid #bbf7d0",
    background: "#f0fdf4",
    color: "#166534",
    cursor: "pointer",
    fontWeight: "bold",
  }}
>
  Reactivate
          </button>
        </div>
      ))}
    </div>
  )}

</div>
</div>
</div>
</div>
</div>
)}

{selectedRecord && (
  <div
    onClick={() => setSelectedRecord(null)}
    style={{
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,0.5)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 9999,
    }}
  >
    <div
      onClick={(e) => e.stopPropagation()}
      style={{
        background: "white",
        padding: 20,
        borderRadius: 12,
        width: "90%",
        maxWidth: 600,
      }}
    >
      <h2>Submission Details</h2>

     <h2>Submission Details</h2>

<p><strong>Type:</strong> {selectedRecord.type}</p>
<p><strong>Project:</strong> {selectedRecord.project}</p>
<p><strong>Submitted By:</strong> {selectedRecord.title}</p>
<p><strong>Date:</strong> {new Date(selectedRecord.time).toLocaleString()}</p>

{selectedRecord.record && (
  <>
    <p><strong>Worker:</strong> {selectedRecord.record.worker_name || "—"}</p>
    <p><strong>Supervisor:</strong> {selectedRecord.record.supervisor_name || "—"}</p>
    <p><strong>Risk:</strong> {selectedRecord.record.critical_risk || "—"}</p>
    <p><strong>Task:</strong> {selectedRecord.record.task_description || "—"}</p>
    <p><strong>Shield Controls:</strong> {selectedRecord.record.shield_control || "—"}</p>
    <p><strong>Notes:</strong> {selectedRecord.record.notes || "—"}</p>
    <p><strong>Status:</strong> {selectedRecord.record.status || "—"}</p>
    <p><strong>Corrective Actions:</strong> {selectedRecord.record.corrective_actions || "—"}</p>
    <p><strong>Assigned To:</strong> {selectedRecord.record.assigned_to || "—"}</p>
    <p><strong>Due Date:</strong> {selectedRecord.record.due_date || "—"}</p>
    <p><strong>Rectified:</strong> {selectedRecord.record.rectified ? "Yes" : "No"}</p>
  </>
)}

{selectedRecord.record?.photos && (
  <>
    <h3>Photos</h3>

    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: 10,
      }}
    >
   {(selectedRecord?.record?.photos || "")
  .split(",")
  .filter(Boolean)
  .map((photo, index) => (
          <img
            key={index}
            src={photo.trim()}
            alt={`Worker Photo ${index + 1}`}
            style={{
              width: 180,
              borderRadius: 8,
              border: "1px solid #cbd5e1",
            }}
          />
        ))}
    </div>
  </>
)}

{selectedRecord.report && (
  <>
    <p><strong>Reported By:</strong> {selectedRecord.report.reported_by || "—"}</p>
    <p><strong>Category:</strong> {selectedRecord.report.hazard_category || "—"}</p>
    <p><strong>Risk Level:</strong> {selectedRecord.report.risk_level || "—"}</p>
    <p><strong>Description:</strong> {selectedRecord.report.hazard_description || "—"}</p>
    <p><strong>Immediate Action:</strong> {selectedRecord.report.immediate_action || "—"}</p>
    <p><strong>Status:</strong> {selectedRecord.report.action_status || selectedRecord.report.status || "—"}</p>
    <p><strong>Corrective Action:</strong> {selectedRecord.report.corrective_action || "—"}</p>
    <p><strong>Supervisor Comments:</strong> {selectedRecord.report.supervisor_review_comments || "—"}</p>
    <p><strong>Closed Date:</strong> {selectedRecord.report.closed_date || "—"}</p>
  </>
)}

{selectedRecord?.report?.photos && (
  <>
    <h3>Photos</h3>

    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: 10,
      }}
    >
     {(selectedRecord?.report?.photos || "")
  .split(",")
  .filter(Boolean)
  .map((photo, index) => (
          <img
            key={index}
            src={photo.trim()}
            alt={`Hazard Photo ${index + 1}`}
            style={{
              width: 180,
              borderRadius: 8,
              border: "1px solid #cbd5e1",
            }}
          />
        ))}
    </div>
  </>
)}

      <button
        onClick={() => setSelectedRecord(null)}
        style={{
          padding: "8px 12px",
          borderRadius: 8,
          border: "none",
          background: "#123d82",
          color: "white",
          cursor: "pointer",
        }}
      >
        Close
      </button>
    </div>
  </div>
)}
  
    </main>
  );
}
