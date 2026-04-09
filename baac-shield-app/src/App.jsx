import React, { useMemo, useRef, useState } from "react";
import { jsPDF } from "jspdf";
import logo from "./logo.png";

const riskLibrary = {
  "Breaking Containment": {
    description: "Manage ignition sources and exposure to energy and hazardous substances.",
    shields: ["Opening / break location verified", "Energy isolation complete", "Gas testing completed when required", "Ignition sources managed", "PPE and defensive positioning verified", "Exclusion zone established"],
    prompts: ["Has the opening point or break location been clearly identified?", "Have all hazardous energy sources been isolated?", "Is gas testing required and complete?", "Are workers outside the line of fire?"]
  },
  "Bypassing Safety Controls": {
    description: "Obtain authorization before overriding or disabling safety controls.",
    shields: ["Authorization obtained", "Safety critical equipment identified", "Bypass documented and communicated", "Mitigations reviewed with crew", "Return-to-normal steps identified", "Exclusion zone rules confirmed"],
    prompts: ["What safety control is being bypassed?", "Who authorized the bypass?", "What extra safeguards are in place?", "How will the control be returned to normal service?"]
  },
  "Confined Space Entry": {
    description: "Obtain authorization before entering a confined space.",
    shields: ["Energy sources isolated", "Atmosphere tested and monitored", "Safe entry / exit established", "Attendant in place", "Rescue plan available", "Entry permit authorized"],
    prompts: ["Has the confined space permit been issued?", "Has atmospheric testing been completed?", "Is ventilation adequate?", "Is a rescue plan and attendant in place?"]
  },
  "Driving": {
    description: "Follow safe driving rules.",
    shields: ["Seatbelt confirmed", "Speed and road conditions reviewed", "No phone / device use while driving", "Driver fit and rested", "Journey management plan reviewed", "Vehicle inspected"],
    prompts: ["Has the vehicle been inspected?", "Has the route, weather, and traffic been reviewed?", "Is the driver fit for duty?", "Is journey management documented?"]
  },
  "Energy Isolation": {
    description: "Verify isolation and zero energy before work begins.",
    shields: ["All energy sources identified", "LOTO applied", "Zero energy verified", "Residual / stored energy checked", "Tamper protection maintained", "Safe re-energization plan confirmed"],
    prompts: ["What energy sources are present?", "Has LOTO been applied to all isolation points?", "How was zero energy verified?", "Is there any residual energy remaining?"]
  },
  "Excavation": {
    description: "Obtain authorization before digging or entering excavations.",
    shields: ["Authorization / permit confirmed", "Underground utilities located", "Safe exposure method selected", "Protective system in place", "Spoil pile setback maintained", "Changing conditions monitored"],
    prompts: ["Have locates / One Call requirements been completed?", "How will utilities be exposed safely?", "What trench protection or shield is in place?", "Who is monitoring for changing soil or water conditions?"]
  },
  "Hot Work": {
    description: "Control flammables and ignition sources.",
    shields: ["Ignition sources identified and controlled", "Flammables removed or isolated", "Hot work authorization obtained", "Gas test completed", "Atmosphere monitored", "Fire watch / extinguisher in place"],
    prompts: ["Has hot work been authorized?", "What combustibles were removed or isolated?", "Was gas testing completed?", "Who is responsible for fire watch?"]
  },
  "Line of Fire": {
    description: "Keep yourself and others out of the line of fire.",
    shields: ["Workers positioned outside hazard path", "Barriers and exclusion zones established", "Dropped object controls in place", "Loose items secured", "Entry permission rules understood", "Safe distance maintained"],
    prompts: ["Where is the line-of-fire hazard?", "What exclusion zone is in place?", "Who controls access into the zone?", "Have loose or suspended items been secured?"]
  },
  "Safe Mechanical Lifting": {
    description: "Plan lifting operations and control the area.",
    shields: ["Lift plan reviewed", "Load and rigging inspected", "Qualified operator confirmed", "Exclusion zone established", "No one under suspended load", "Communication method confirmed"],
    prompts: ["Was the lift plan reviewed with the crew?", "Is the rigging fit for purpose?", "Who is the qualified operator / signaler?", "How is the lift zone controlled?"]
  },
  "Working at Height": {
    description: "Verify fall protection and secure work platforms.",
    shields: ["Fall hazard assessed", "Access equipment inspected", "Tie-off / travel restraint in place", "Dropped object prevention in place", "Rescue / emergency plan reviewed", "Anchorage verified"],
    prompts: ["What is the fall exposure?", "What fall protection system is being used?", "Has the anchor point been verified?", "How will rescue be handled if needed?"]
  },
  "Working Around Mobile Equipment": {
    description: "Maintain communication and stay out of danger zones.",
    shields: ["Operator and worker communication established", "Spotter assigned", "Blind spots reviewed", "Travel path controlled", "Pedestrian separation maintained", "Swing radius / danger zone controlled"],
    prompts: ["What mobile equipment is operating nearby?", "Who is the spotter?", "How are blind spots being controlled?", "How are pedestrians separated from equipment?"]
  },
  "Work Authorization": {
    description: "Verify permits, JHA / FLRA, and competency before work begins.",
    shields: ["Permit verified", "JHA / FLRA completed", "Scope and hazards reviewed", "Workers competent for task", "Simultaneous operations reviewed", "Required approvals obtained"],
    prompts: ["What work authorization applies?", "Has the JHA / FLRA been completed?", "Are all workers competent and briefed?", "Are there any simultaneous operations affecting the task?"]
  }
};

const criticalRiskOptions = Object.keys(riskLibrary).concat(["Other"]);
const baseShieldOptions = ["Permit / Work Authorization verified", "Energy isolation / LOTO applied", "Utility locates verified", "Exclusion zones established", "Spotter assigned", "Equipment inspected and fit for use", "PPE verified", "Gas testing / atmosphere monitored", "Trench protection / shoring in place", "Traffic control implemented", "Supervisor field verification", "Stop Work Authority applied", "Other"];
const tabs = ["form", "records", "mobile", "platform", "blueprint", "handoff", "deploy"];
const prettyTab = { form: "Live Form", records: "Records", mobile: "Mobile", platform: "Platform", blueprint: "Blueprint", handoff: "Handoff", deploy: "Deploy" };

const initialForm = {
  projectName: "",
  location: "",
  workerName: "",
  supervisorName: "",
  taskDescription: "",
  criticalRisk: "",
  customRisk: "",
  selectedShields: [],
  customShield: "",
  riskDescription: "",
  immediateActions: "",
  correctiveActions: "",
  verifiedEffective: "",
  rectified: false,
  workerSignature: "",
  workerDate: new Date().toISOString().slice(0, 10),
  supervisorSignature: "",
  supervisorDate: new Date().toISOString().slice(0, 10),
  photoNames: [],
  permitNames: []
};

function Card({ title, desc, children, className = "" }) {
  return <div className={`card ${className}`}><div className="card-header"><h3 className="card-title">{title}</h3>{desc && <div className="card-desc">{desc}</div>}</div><div className="card-body">{children}</div></div>;
}

export default function App() {
  const [form, setForm] = useState(initialForm);
  const [submittedRecords, setSubmittedRecords] = useState([]);
  const [step, setStep] = useState(1);
  const [tab, setTab] = useState("form");
  const photoRef = useRef(null);
  const permitRef = useRef(null);

  const selectedRisk = form.criticalRisk && form.criticalRisk !== "Other" ? riskLibrary[form.criticalRisk] : null;
  const smartShieldOptions = useMemo(() => {
    const fromRisk = selectedRisk ? selectedRisk.shields : [];
    return fromRisk.concat(baseShieldOptions.filter((item) => !fromRisk.includes(item)));
  }, [selectedRisk]);
  const completedSteps = useMemo(() => {
    let count = 0;
    if (form.projectName && form.location && form.workerName && form.taskDescription) count++;
    if (form.criticalRisk && form.riskDescription) count++;
    if (form.selectedShields.length > 0 || form.customShield) count++;
    if (form.supervisorName && form.verifiedEffective) count++;
    if (form.workerSignature && form.supervisorSignature && form.rectified) count++;
    return count;
  }, [form]);
  const progress = completedSteps / 5 * 100;

  const updateField = (field, value) => setForm((prev) => ({ ...prev, [field]: value }));
  const toggleShield = (shield) => setForm((prev) => ({ ...prev, selectedShields: prev.selectedShields.includes(shield) ? prev.selectedShields.filter((s) => s !== shield) : prev.selectedShields.concat([shield]) }));
  const handleFiles = (field, files) => setForm((prev) => ({ ...prev, [field]: Array.from(files || []).map((f) => f.name) }));

  const exportPdf = (recordLike = null) => {
    const record = recordLike || {
      ...form,
      finalRisk: form.criticalRisk === "Other" ? form.customRisk : form.criticalRisk,
      finalShields: form.customShield ? form.selectedShields.concat([form.customShield]) : form.selectedShields
    };
    const doc = new jsPDF();
    let y = 18;
    const line = (label, value) => {
      const split = doc.splitTextToSize(`${label}: ${value || "-"}`, 175);
      doc.text(split, 15, y);
      y += split.length * 7;
    };
    doc.setFontSize(18);
    doc.text("BAAC SHIELD Critical Risk Record", 15, y);
    y += 10;
    doc.setFontSize(11);
    line("Project", record.projectName);
    line("Location", record.location);
    line("Worker", record.workerName);
    line("Supervisor", record.supervisorName);
    line("Task", record.taskDescription);
    line("Critical Risk", record.finalRisk || record.criticalRisk);
    line("Risk Description", record.riskDescription);
    line("Shields", (record.finalShields || []).join(", "));
    line("Immediate Actions", record.immediateActions);
    line("Verification", record.verifiedEffective);
    line("Corrective Actions", record.correctiveActions);
    line("Rectified", record.rectified ? "Yes" : "No");
    line("Photos", (record.photoNames || []).join(", "));
    line("Documents", (record.permitNames || []).join(", "));
    line("Worker Signoff", `${record.workerSignature || "-"} ${record.workerDate ? `(${record.workerDate})` : ""}`);
    line("Supervisor Signoff", `${record.supervisorSignature || "-"} ${record.supervisorDate ? `(${record.supervisorDate})` : ""}`);
    doc.save("baac-shield-record.pdf");
  };

  const handleSubmit = () => {
    const record = {
      ...form,
      id: Date.now(),
      finalRisk: form.criticalRisk === "Other" ? form.customRisk : form.criticalRisk,
      finalShields: form.customShield ? form.selectedShields.concat([form.customShield]) : form.selectedShields,
      submittedAt: new Date().toLocaleString()
    };
    setSubmittedRecords((prev) => [record, ...prev]);
    setForm(initialForm);
    setStep(1);
  };

  return (
    <div className="app-shell">
      <div className="container">
        <div className="card header-card">
          <div className="header-top">
            <div className="header-grid">
              <div>
                <div className="logo-row">
                  <img src={logo} alt="BAAC logo" />
                  <div>
                    <div className="kicker">BAAC</div>
                    <div style={{ fontSize: 22, fontWeight: 800 }}>SHIELD Critical Risk Management</div>
                  </div>
                </div>
                <h1 className="h1">Mobile Field Verification App</h1>
                <p className="muted-light">Smart risk-based verification for crews. Identify the risk. Verify the shield. Record proof. Sign off. Export. Deploy.</p>
                <div className="badges">
                  <span className="badge dark">Risk-smart</span>
                  <span className="badge dark">Mobile-first</span>
                  <span className="badge dark">Photos + PDF</span>
                  <span className="badge dark">Deployment ready</span>
                </div>
              </div>
              <div className="progress-card">
                <div className="progress-row"><span>Record completion</span><span>{Math.round(progress)}%</span></div>
                <div className="progress-bar"><div className="progress-fill" style={{ width: `${progress}%` }} /></div>
                <div className="step-grid">{[1,2,3,4,5].map((n) => <button key={n} className={`step-btn ${step === n ? "active" : ""}`} onClick={() => setStep(n)}>Step {n}</button>)}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="tab-row">{tabs.map((item) => <button key={item} className={`tab-btn ${tab === item ? "active" : ""}`} onClick={() => setTab(item)}>{prettyTab[item]}</button>)}</div>

        {tab === "form" && (
          <div className="main-grid">
            <div className="stack">
              {step === 1 && <Card title="Step 1: BAAC Work Details" desc="Start with the crew, task, location, and field leadership involved."><div className="grid-2"><div className="field"><label>Project name</label><input className="input" value={form.projectName} onChange={(e)=>updateField("projectName", e.target.value)} /></div><div className="field"><label>Location</label><input className="input" value={form.location} onChange={(e)=>updateField("location", e.target.value)} /></div><div className="field"><label>Worker name</label><input className="input" value={form.workerName} onChange={(e)=>updateField("workerName", e.target.value)} /></div><div className="field"><label>Supervisor name</label><input className="input" value={form.supervisorName} onChange={(e)=>updateField("supervisorName", e.target.value)} /></div></div><div className="field" style={{ marginTop: 16 }}><label>Task description</label><textarea className="textarea" value={form.taskDescription} onChange={(e)=>updateField("taskDescription", e.target.value)} /></div><div className="button-row" style={{ marginTop: 16 }}><span></span><button className="btn primary" disabled={!(form.projectName && form.location && form.workerName && form.taskDescription)} onClick={()=>setStep(2)}>Next step</button></div></Card>}

              {step === 2 && <Card title="Step 2: Identify the BAAC Critical Risk" desc="The worker identifies the exposure before work continues."><div className="field"><label>Critical risk</label><select className="select" value={form.criticalRisk} onChange={(e)=>{ updateField("criticalRisk", e.target.value); updateField("selectedShields", []); }}>{["", ...criticalRiskOptions].map((r) => <option key={r} value={r}>{r || "Choose a critical risk"}</option>)}</select></div>{form.criticalRisk === "Other" && <div className="field" style={{ marginTop: 16 }}><label>Custom risk</label><input className="input" value={form.customRisk} onChange={(e)=>updateField("customRisk", e.target.value)} /></div>}{selectedRisk && <div className="smart-box" style={{ marginTop: 16 }}><strong>Risk Guidance</strong><div className="small" style={{ marginTop: 6 }}>{selectedRisk.description}</div><div className="prompt-list" style={{ marginTop: 12 }}>{selectedRisk.prompts.map((p) => <div className="prompt-item" key={p}>{p}</div>)}</div></div>}<div className="field" style={{ marginTop: 16 }}><label>Why is this a critical risk?</label><textarea className="textarea" value={form.riskDescription} onChange={(e)=>updateField("riskDescription", e.target.value)} /></div><div className="button-row" style={{ marginTop: 16 }}><button className="btn" onClick={()=>setStep(1)}>Back</button><button className="btn primary" disabled={!(form.criticalRisk && form.riskDescription)} onClick={()=>setStep(3)}>Next step</button></div></Card>}

              {step === 3 && <Card title="Step 3: Choose the BAAC Shield" desc="Smart shield suggestions appear based on the selected critical risk.">{selectedRisk && <div className="smart-box blue"><strong>Smart mode:</strong> These shield options were prioritized for <strong>{form.criticalRisk}</strong>.</div>}<div className="shield-grid" style={{ marginTop: 16 }}>{smartShieldOptions.map((shield) => <label key={shield} className="shield-item"><input type="checkbox" checked={form.selectedShields.includes(shield)} onChange={()=>toggleShield(shield)} /><span>{shield}</span></label>)}</div><div className="grid-2" style={{ marginTop: 16 }}><div className="field"><label>Additional shield</label><input className="input" value={form.customShield} onChange={(e)=>updateField("customShield", e.target.value)} /></div><div className="field"><label>Immediate actions taken</label><textarea className="textarea" value={form.immediateActions} onChange={(e)=>updateField("immediateActions", e.target.value)} /></div></div><div className="grid-2" style={{ marginTop: 16 }}><div className="field"><label>Upload photos</label><input ref={photoRef} hidden type="file" multiple onChange={(e)=>handleFiles("photoNames", e.target.files)} /><button className="btn" onClick={()=>photoRef.current?.click()}>Add Photos</button><div className="small">{form.photoNames.join(", ")}</div></div><div className="field"><label>Attach permits / locates / forms</label><input ref={permitRef} hidden type="file" multiple onChange={(e)=>handleFiles("permitNames", e.target.files)} /><button className="btn" onClick={()=>permitRef.current?.click()}>Add Documents</button><div className="small">{form.permitNames.join(", ")}</div></div></div><div className="button-row" style={{ marginTop: 16 }}><button className="btn" onClick={()=>setStep(2)}>Back</button><button className="btn primary" disabled={!(form.selectedShields.length > 0 || form.customShield)} onClick={()=>setStep(4)}>Next step</button></div></Card>}

              {step === 4 && <Card title="Step 4: Supervisor Verification" desc="The supervisor confirms the shield is installed, understood, and effective before work proceeds."><div className="field"><label>Shield verification result</label><select className="select" value={form.verifiedEffective} onChange={(e)=>updateField("verifiedEffective", e.target.value)}><option value="">Select verification result</option><option value="effective">Effective - work may proceed</option><option value="needs-correction">Needs correction before proceeding</option><option value="stop-work">STOP WORK - discuss and reassess</option></select></div>{form.verifiedEffective === "stop-work" && <div className="red-box" style={{ marginTop: 16 }}><strong>Stop Work triggered</strong><div>Work should not continue until safeguards are implemented and the record is re-verified.</div></div>}<div className="field" style={{ marginTop: 16 }}><label>Corrective actions</label><textarea className="textarea" value={form.correctiveActions} onChange={(e)=>updateField("correctiveActions", e.target.value)} /></div><label className="shield-item" style={{ marginTop: 16 }}><input type="checkbox" checked={form.rectified} onChange={(e)=>updateField("rectified", e.target.checked)} /><span>Corrective actions have been completed / rectified</span></label><div className="button-row" style={{ marginTop: 16 }}><button className="btn" onClick={()=>setStep(3)}>Back</button><button className="btn primary" disabled={!(form.supervisorName && form.verifiedEffective)} onClick={()=>setStep(5)}>Next step</button></div></Card>}

              {step === 5 && <Card title="Step 5: BAAC Sign-Off" desc="Final dated confirmation that the risk was managed and any required corrections were completed."><div className="grid-2"><div className="field"><label>Worker sign-off</label><input className="input" value={form.workerSignature} onChange={(e)=>updateField("workerSignature", e.target.value)} /></div><div className="field"><label>Worker date</label><input className="input" type="date" value={form.workerDate} onChange={(e)=>updateField("workerDate", e.target.value)} /></div><div className="field"><label>Supervisor sign-off</label><input className="input" value={form.supervisorSignature} onChange={(e)=>updateField("supervisorSignature", e.target.value)} /></div><div className="field"><label>Supervisor date</label><input className="input" type="date" value={form.supervisorDate} onChange={(e)=>updateField("supervisorDate", e.target.value)} /></div></div><div className="button-row" style={{ marginTop: 16 }}><button className="btn" onClick={()=>setStep(4)}>Back</button><div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}><button className="btn" onClick={()=>exportPdf()}>Export PDF</button><button className="btn primary" disabled={!(form.workerSignature && form.supervisorSignature && form.rectified)} onClick={handleSubmit}>Complete Record</button></div></div></Card>}
            </div>

            <div className="sidebar-grid">
              <Card title="12 BAAC Critical Risk Categories" desc="Based on your BAAC Field Guide"> <div className="shield-grid">{criticalRiskOptions.filter((r)=>r!=="Other").map((risk)=><div key={risk} className="prompt-item" style={{ background: form.criticalRisk === risk ? "#0f172a" : "#f8fafc", color: form.criticalRisk === risk ? "#fff" : "#0f172a" }}>{risk}</div>)}</div></Card>
              <Card title="BAAC Current Draft" desc="Live record review before final closeout."><div className="stack" style={{ gap: 10 }}><div className="summary-line"><strong>Project:</strong> {form.projectName || "—"}</div><div className="summary-line"><strong>Location:</strong> {form.location || "—"}</div><div className="summary-line"><strong>Worker:</strong> {form.workerName || "—"}</div><div className="summary-line"><strong>Critical risk:</strong> {(form.criticalRisk === "Other" ? form.customRisk : form.criticalRisk) || "—"}</div><div className="summary-line"><strong>Photos:</strong> {form.photoNames.length ? form.photoNames.join(", ") : "—"}</div><div className="summary-line"><strong>Docs:</strong> {form.permitNames.length ? form.permitNames.join(", ") : "—"}</div><div className="summary-line"><strong>Verification:</strong> {form.verifiedEffective || "—"}</div><div className="summary-line"><strong>Rectified:</strong> {form.rectified ? "Yes" : "No"}</div></div></Card>
            </div>
          </div>
        )}

        {tab === "records" && <Card title="BAAC Completed Records" desc="Completed BAAC SHIELD field records appear here.">{submittedRecords.length === 0 ? <div className="info-box">No completed records yet. Finish the live form to create one.</div> : <div className="stack">{submittedRecords.map((record)=><div className="record-card" key={record.id}><div style={{ display: "flex", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}><div><div style={{ fontWeight: 800, fontSize: 20 }}>{record.projectName}</div><div className="small">{record.location}</div><div className="small">Submitted {record.submittedAt}</div></div><div style={{ display: "flex", gap: 10, alignItems: "center" }}><span className="badge">Completed</span><button className="btn" onClick={()=>exportPdf(record)}>PDF</button></div></div><div className="stack" style={{ gap: 10, marginTop: 16 }}><div><strong>Task:</strong> {record.taskDescription}</div><div><strong>Critical risk:</strong> {record.finalRisk}</div><div><strong>Shields:</strong> {record.finalShields.join(", ")}</div><div><strong>Verification:</strong> {record.verifiedEffective}</div></div></div>)}</div>}</Card>}

        {tab === "mobile" && <div className="mobile-grid"><Card title="Mobile-First Upgrades" desc="Built for workers and supervisors in the field."><div className="simple-list"><div className="simple-item"><strong>Large tap targets:</strong> easier use with gloves and in bright conditions.</div><div className="simple-item"><strong>Step navigation:</strong> easy switching for phones.</div><div className="simple-item"><strong>Fast upload:</strong> add photos and permits from the field.</div><div className="simple-item"><strong>Clear record status:</strong> incomplete vs completed workflow.</div></div></Card><div className="phone"><div className="phone-top"><div>BAAC SHIELD</div><span className="badge">Field</span></div><div className="phone-body"><div className="prompt-item"><div className="small">Selected Risk</div><div style={{ fontWeight: 800 }}>{form.criticalRisk || "Excavation"}</div></div><div className="prompt-item"><div className="small">Suggested Shield</div><div style={{ fontWeight: 800 }}>{smartShieldOptions[0] || "Utility locates verified"}</div></div><div className="prompt-item"><div className="small">Verification</div><div style={{ fontWeight: 800 }}>Supervisor field verification required</div></div><button className="btn primary">Continue Record</button><button className="btn">Upload Photo Proof</button><button className="btn" style={{ color: "#b91c1c", borderColor: "#fecaca" }}>STOP WORK</button></div></div></div>}

        {tab === "platform" && <div className="handoff-grid"><Card title="Real-World Platform Version" desc="This is the version that would actually run for BAAC crews."><div className="simple-list"><div className="simple-item"><strong>User login roles:</strong> Worker, Supervisor, HSE, and Admin.</div><div className="simple-item"><strong>Saved cloud records:</strong> Every record stored with date, time, project, and status.</div><div className="simple-item"><strong>Audit trail:</strong> Track who created, edited, verified, and closed each record.</div><div className="simple-item"><strong>Notifications:</strong> Email or app alerts for supervisor review and overdue corrective actions.</div><div className="simple-item"><strong>Dashboard:</strong> Open records, stop-work events, and pending rectifications.</div></div></Card><div className="stack"><Card title="Login + Access Flow" desc="Suggested structure for the production app."><div className="grid-2"><div className="simple-item"><strong>Worker</strong><div className="small">Create record, identify risk, choose shields, upload proof, sign off.</div></div><div className="simple-item"><strong>Supervisor</strong><div className="small">Review, verify shield, assign corrective actions, close record.</div></div><div className="simple-item"><strong>HSE</strong><div className="small">Monitor trends, review stop-work cases, audit compliance.</div></div><div className="simple-item"><strong>Admin</strong><div className="small">Manage users, categories, shield libraries, and retention.</div></div></div></Card><Card title="Saved Records Dashboard" desc="Prototype of the production record view."><div className="stats-grid"><div className="stat"><div className="small">Open Records</div><div style={{ fontSize: 30, fontWeight: 800 }}>12</div></div><div className="stat"><div className="small">Pending Rectification</div><div style={{ fontSize: 30, fontWeight: 800 }}>4</div></div><div className="stat"><div className="small">Stop Work Events</div><div style={{ fontSize: 30, fontWeight: 800 }}>2</div></div></div></Card></div></div>}

        {tab === "blueprint" && <div className="handoff-grid"><div className="stack"><Card title="Phase 1 Production Blueprint" desc="The structure to build the real BAAC SHIELD app."><div className="simple-list"><div className="simple-item"><strong>Goal</strong><div className="small">Launch a working BAAC SHIELD platform with secure login, saved records, supervisor verification, and corrective action tracking.</div></div><div className="simple-item"><strong>Best first rollout</strong><div className="small">Phone-friendly web app before building a full native app.</div></div><div className="simple-item"><strong>Core system pieces</strong><div className="small">Authentication, record database, file storage, role permissions, dashboards, and notifications.</div></div></div></Card><Card title="User Roles and Permissions" desc="Who can do what in the real system."><div className="simple-list"><div className="simple-item"><strong>Worker</strong><div className="small">Create record, sign worker section, submit for review.</div></div><div className="simple-item"><strong>Supervisor</strong><div className="small">Verify shield, add corrective actions, close or escalate stop-work cases.</div></div><div className="simple-item"><strong>HSE</strong><div className="small">Audit records, review trends, monitor overdue actions.</div></div><div className="simple-item"><strong>Admin</strong><div className="small">Manage users, libraries, retention rules, and notifications.</div></div></div></Card></div><div className="stack"><Card title="Record Status Flow" desc="Suggested lifecycle for every BAAC SHIELD record."><div className="simple-list">{["Draft","Submitted by Worker","Under Supervisor Review","Action Required","Rectified","Closed","Stop Work","Archived"].map((s) => <div key={s} className="simple-item" style={s === "Stop Work" ? { background: "#fef2f2", color: "#b91c1c" } : {}}>{s}</div>)}</div></Card><Card title="Database Structure" desc="Simple production schema to give a developer."><div className="simple-list"><div className="simple-item"><strong>users</strong><div className="small">id, name, email, role, company, active_status</div></div><div className="simple-item"><strong>projects</strong><div className="small">id, project_name, location, client, active_status</div></div><div className="simple-item"><strong>records</strong><div className="small">id, project_id, worker_id, supervisor_id, critical_risk, verification_status, record_status</div></div><div className="simple-item"><strong>corrective_actions</strong><div className="small">id, record_id, action_text, assigned_to, due_date, completed_flag</div></div><div className="simple-item"><strong>attachments</strong><div className="small">id, record_id, file_name, file_type, storage_url</div></div><div className="simple-item"><strong>audit_log</strong><div className="small">id, record_id, action, user_id, timestamp, notes</div></div></div></Card></div></div>}

        {tab === "handoff" && <div className="handoff-grid"><div className="stack"><Card title="Developer Handoff Package" desc="What a developer needs to estimate, scope, and build the BAAC SHIELD app."><div className="simple-list"><div className="simple-item"><strong>Project Name</strong><div className="small">BAAC SHIELD Critical Risk Management App</div></div><div className="simple-item"><strong>Core Purpose</strong><div className="small">Digitize the BAAC SHIELD process so workers can identify critical risks, choose shields, upload proof, and send records for supervisor verification and closeout.</div></div><div className="simple-item"><strong>Primary Users</strong><div className="small">Workers, Supervisors, HSE, and Admin.</div></div><div className="simple-item"><strong>Preferred Deployment</strong><div className="small">Secure mobile-friendly web app first, optional installable app later.</div></div></div></Card><Card title="MVP Scope" desc="Must-have items for Version 1."><div className="simple-list">{["Secure login by role","Create BAAC SHIELD record","12 critical risk categories","Risk-based smart shield suggestions","Worker sign-off and supervisor verification","Corrective action assignment and closeout","Photo / permit / document upload","PDF export","Dashboard for open, stop-work, and closed records"].map((s)=><div className="simple-item" key={s}>{s}</div>)}</div></Card></div><div className="stack"><Card title="Page-by-Page App Structure" desc="Recommended screens for the production build."><div className="simple-list">{[["1. Login","Email / password login with role-based access."],["2. Dashboard","Open records, action required items, stop-work events, recent submissions."],["3. New Record","Project, task, worker, supervisor, and location details."],["4. Risk Selection","Choose one of the 12 BAAC critical risks and show guidance prompts."],["5. Shield Selection","Smart shield suggestions, custom shield entry, immediate actions, attachments."],["6. Supervisor Review","Verification result, corrective actions, stop-work handling, rectification check."],["7. Sign-Off / PDF","Worker and supervisor signatures, dates, PDF export, final closeout."],["8. Record Details","Audit trail, attachments, status history, comments, reopen option."],["9. Admin Settings","Manage users, risk library, shield library, notifications, and projects."]].map(([a,b])=><div className="simple-item" key={a}><strong>{a}</strong><div className="small">{b}</div></div>)}</div></Card><Card title="Build Estimate Guidance" desc="High-level way to discuss this with a developer."><div className="simple-list"><div className="simple-item"><strong>Prototype to MVP</strong><div className="small">Use this packaged version as the visual process model.</div></div><div className="simple-item"><strong>Ask for 3 prices</strong><div className="small">MVP only, MVP plus dashboard, and full production build.</div></div><div className="simple-item"><strong>Ask for timeline by phase</strong><div className="small">Phase 1 core record workflow, Phase 2 dashboard and notifications, Phase 3 reporting and advanced features.</div></div></div></Card></div></div>}

        {tab === "deploy" && <div className="stack"><Card title="Phase 1 Build Order" desc="The order a developer should build this in."><div className="grid-2">{[["1. Authentication","Set up secure role-based login."],["2. Records Database","Create saved record tables and status logic."],["3. Record Form","Connect the BAAC SHIELD workflow to real saved data."],["4. Attachments","Enable photo, permit, and PDF storage."],["5. Supervisor Review","Add approval, corrective action, and stop-work handling."],["6. Dashboard + Alerts","Launch reporting, overdue actions, and notifications."]].map(([a,b]) => <div key={a} className="simple-item"><strong>{a}</strong><div className="small">{b}</div></div>)}</div></Card><Card title="Recommended Tech Stack" desc="Simple, realistic path for a real BAAC rollout."><div className="grid-2">{[["Frontend","React / Next.js mobile-friendly web app"],["Database","Supabase or Firebase for saved records"],["Authentication","Role-based login for Worker, Supervisor, HSE, Admin"],["Storage","Photo, PDF, and permit upload storage"],["Notifications","Email alerts for verification and overdue actions"],["Deployment","Secure web app first, installable app second"]].map(([a,b]) => <div key={a} className="simple-item"><strong>{a}</strong><div className="small">{b}</div></div>)}</div></Card></div>}
      </div>
    </div>
  );
}
