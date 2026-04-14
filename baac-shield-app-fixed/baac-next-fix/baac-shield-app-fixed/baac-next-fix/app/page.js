'use client';

import { useMemo, useRef, useState } from 'react';
import jsPDF from 'jspdf';

const riskLibrary = {
  'Breaking Containment': {
    description: 'Manage ignition sources and exposure to energy and hazardous substances.',
    shields: ['Opening / break location verified', 'Energy isolation complete', 'Gas testing completed when required', 'Ignition sources managed', 'PPE and defensive positioning verified', 'Exclusion zone established'],
    prompts: ['Has the opening point or break location been clearly identified?', 'Have all hazardous energy sources been isolated?', 'Is gas testing required and complete?', 'Are workers outside the line of fire?']
  },
  'Bypassing Safety Controls': {
    description: 'Obtain authorization before overriding or disabling safety controls.',
    shields: ['Authorization obtained', 'Safety critical equipment identified', 'Bypass documented and communicated', 'Mitigations reviewed with crew', 'Return-to-normal steps identified', 'Exclusion zone rules confirmed'],
    prompts: ['What safety control is being bypassed?', 'Who authorized the bypass?', 'What extra safeguards are in place?', 'How will the control be returned to normal service?']
  },
  'Confined Space Entry': {
    description: 'Obtain authorization before entering a confined space.',
    shields: ['Energy sources isolated', 'Atmosphere tested and monitored', 'Safe entry / exit established', 'Attendant in place', 'Rescue plan available', 'Entry permit authorized'],
    prompts: ['Has the confined space permit been issued?', 'Has atmospheric testing been completed?', 'Is ventilation adequate?', 'Is a rescue plan and attendant in place?']
  },
  Driving: {
    description: 'Follow safe driving rules.',
    shields: ['Seatbelt confirmed', 'Speed and road conditions reviewed', 'No phone / device use while driving', 'Driver fit and rested', 'Journey management plan reviewed', 'Vehicle inspected'],
    prompts: ['Has the vehicle been inspected?', 'Has the route, weather, and traffic been reviewed?', 'Is the driver fit for duty?', 'Is journey management documented?']
  },
  'Energy Isolation': {
    description: 'Verify isolation and zero energy before work begins.',
    shields: ['All energy sources identified', 'LOTO applied', 'Zero energy verified', 'Residual / stored energy checked', 'Tamper protection maintained', 'Safe re-energization plan confirmed'],
    prompts: ['What energy sources are present?', 'Has LOTO been applied to all isolation points?', 'How was zero energy verified?', 'Is there any residual energy remaining?']
  },
  Excavation: {
    description: 'Obtain authorization before digging or entering excavations.',
    shields: ['Authorization / permit confirmed', 'Underground utilities located', 'Safe exposure method selected', 'Protective system in place', 'Spoil pile setback maintained', 'Changing conditions monitored'],
    prompts: ['Have locates / One Call requirements been completed?', 'How will utilities be exposed safely?', 'What trench protection or shield is in place?', 'Who is monitoring for changing soil or water conditions?']
  },
  'Hot Work': {
    description: 'Control flammables and ignition sources.',
    shields: ['Ignition sources identified and controlled', 'Flammables removed or isolated', 'Hot work authorization obtained', 'Gas test completed', 'Atmosphere monitored', 'Fire watch / extinguisher in place'],
    prompts: ['Has hot work been authorized?', 'What combustibles were removed or isolated?', 'Was gas testing completed?', 'Who is responsible for fire watch?']
  },
  'Line of Fire': {
    description: 'Keep yourself and others out of the line of fire.',
    shields: ['Workers positioned outside hazard path', 'Barriers and exclusion zones established', 'Dropped object controls in place', 'Loose items secured', 'Entry permission rules understood', 'Safe distance maintained'],
    prompts: ['Where is the line-of-fire hazard?', 'What exclusion zone is in place?', 'Who controls access into the zone?', 'Have loose or suspended items been secured?']
  },
  'Safe Mechanical Lifting': {
    description: 'Plan lifting operations and control the area.',
    shields: ['Lift plan reviewed', 'Load and rigging inspected', 'Qualified operator confirmed', 'Exclusion zone established', 'No one under suspended load', 'Communication method confirmed'],
    prompts: ['Was the lift plan reviewed with the crew?', 'Is the rigging fit for purpose?', 'Who is the qualified operator / signaler?', 'How is the lift zone controlled?']
  },
  'Working at Height': {
    description: 'Verify fall protection and secure work platforms.',
    shields: ['Fall hazard assessed', 'Access equipment inspected', 'Tie-off / travel restraint in place', 'Dropped object prevention in place', 'Rescue / emergency plan reviewed', 'Anchorage verified'],
    prompts: ['What is the fall exposure?', 'What fall protection system is being used?', 'Has the anchor point been verified?', 'How will rescue be handled if needed?']
  },
  'Working Around Mobile Equipment': {
    description: 'Maintain communication and stay out of danger zones.',
    shields: ['Operator and worker communication established', 'Spotter assigned', 'Blind spots reviewed', 'Travel path controlled', 'Pedestrian separation maintained', 'Swing radius / danger zone controlled'],
    prompts: ['What mobile equipment is operating nearby?', 'Who is the spotter?', 'How are blind spots being controlled?', 'How are pedestrians separated from equipment?']
  },
  'Work Authorization': {
    description: 'Verify permits, JHA / FLRA, and competency before work begins.',
    shields: ['Permit verified', 'JHA / FLRA completed', 'Scope and hazards reviewed', 'Workers competent for task', 'Simultaneous operations reviewed', 'Required approvals obtained'],
    prompts: ['What work authorization applies?', 'Has the JHA / FLRA been completed?', 'Are all workers competent and briefed?', 'Are there any simultaneous operations affecting the task?']
  }
};

const criticalRiskOptions = Object.keys(riskLibrary).concat(['Other']);
const baseShieldOptions = ['Permit / Work Authorization verified', 'Energy isolation / LOTO applied', 'Utility locates verified', 'Exclusion zones established', 'Spotter assigned', 'Equipment inspected and fit for use', 'PPE verified', 'Gas testing / atmosphere monitored', 'Trench protection / shoring in place', 'Traffic control implemented', 'Supervisor field verification', 'Stop Work Authority applied', 'Other'];

const initialForm = {
  projectName: '',
  location: '',
  workerName: '',
  supervisorName: '',
  taskDescription: '',
  criticalRisk: '',
  customRisk: '',
  selectedShields: [],
  customShield: '',
  riskDescription: '',
  immediateActions: '',
  correctiveActions: '',
  verifiedEffective: '',
  rectified: false,
  workerSignature: '',
  workerDate: new Date().toISOString().slice(0, 10),
  supervisorSignature: '',
  supervisorDate: new Date().toISOString().slice(0, 10),
  photoNames: [],
  permitNames: []
};

function Field({ label, children, full }) {
  return (
    <div className={full ? 'field-full' : ''}>
      <label>{label}</label>
      {children}
    </div>
  );
}

export default function Page() {
  const [form, setForm] = useState(initialForm);
  const [records, setRecords] = useState([]);
  const [step, setStep] = useState(1);
  const [tab, setTab] = useState('form');
  const photoRef = useRef(null);
  const docRef = useRef(null);

  const selectedRisk = form.criticalRisk && form.criticalRisk !== 'Other' ? riskLibrary[form.criticalRisk] : null;
  const smartShieldOptions = useMemo(() => {
    const preferred = selectedRisk ? selectedRisk.shields : [];
    return preferred.concat(baseShieldOptions.filter((item) => !preferred.includes(item)));
  }, [selectedRisk]);

  const completedSteps = useMemo(() => {
    let count = 0;
    if (form.projectName && form.location && form.workerName && form.taskDescription) count += 1;
    if (form.criticalRisk && form.riskDescription) count += 1;
    if (form.selectedShields.length > 0 || form.customShield) count += 1;
    if (form.supervisorName && form.verifiedEffective) count += 1;
    if (form.workerSignature && form.supervisorSignature && form.rectified) count += 1;
    return count;
  }, [form]);
  const progress = (completedSteps / 5) * 100;

  const updateField = (field, value) => setForm((prev) => ({ ...prev, [field]: value }));
  const toggleShield = (shield) => setForm((prev) => ({
    ...prev,
    selectedShields: prev.selectedShields.includes(shield)
      ? prev.selectedShields.filter((s) => s !== shield)
      : [...prev.selectedShields, shield]
  }));
  const handleFiles = (field, files) => updateField(field, Array.from(files || []).map((f) => f.name));

  const finalRisk = form.criticalRisk === 'Other' ? form.customRisk : form.criticalRisk;
  const finalShields = form.customShield ? [...form.selectedShields, form.customShield] : form.selectedShields;

  const exportPdf = (recordLike) => {
    const record = recordLike || { ...form, finalRisk, finalShields };
    const doc = new jsPDF();
    let y = 16;
    const addLine = (label, value) => {
      const text = `${label}: ${value || '-'}`;
      const lines = doc.splitTextToSize(text, 180);
      doc.text(lines, 14, y);
      y += lines.length * 7;
    };
    doc.setFontSize(18);
    doc.text('BAAC SHIELD Critical Risk Record', 14, y);
    y += 10;
    doc.setFontSize(11);
    addLine('Project', record.projectName);
    addLine('Location', record.location);
    addLine('Worker', record.workerName);
    addLine('Supervisor', record.supervisorName);
    addLine('Task', record.taskDescription);
    addLine('Critical Risk', record.finalRisk || record.criticalRisk);
    addLine('Risk Description', record.riskDescription);
    addLine('Shields', (record.finalShields || []).join(', '));
    addLine('Immediate Actions', record.immediateActions);
    addLine('Verification', record.verifiedEffective);
    addLine('Corrective Actions', record.correctiveActions);
    addLine('Rectified', record.rectified ? 'Yes' : 'No');
    addLine('Photos', (record.photoNames || []).join(', '));
    addLine('Documents', (record.permitNames || []).join(', '));
    addLine('Worker Signoff', `${record.workerSignature || '-'} ${record.workerDate ? `(${record.workerDate})` : ''}`);
    addLine('Supervisor Signoff', `${record.supervisorSignature || '-'} ${record.supervisorDate ? `(${record.supervisorDate})` : ''}`);
    doc.save('baac-shield-record.pdf');
  };

  const submitRecord = () => {
    const record = {
      ...form,
      id: Date.now(),
      finalRisk,
      finalShields,
      submittedAt: new Date().toLocaleString()
    };
    setRecords((prev) => [record, ...prev]);
    setForm(initialForm);
    setStep(1);
    setTab('records');
  };

  const tabs = ['form', 'records', 'mobile', 'platform', 'blueprint', 'handoff', 'deploy'];

  return (
    <div className="wrap">
      <div className="header">
        <div className="header-top">
          <div>
            <div className="brand">
              <img src="/baac-shield.png" alt="BAAC SHIELD" />
              <div>
                <div style={{ fontSize: 12, letterSpacing: 2, opacity: .75 }}>BAAC</div>
                <div style={{ fontSize: 22, fontWeight: 700 }}>SHIELD Critical Risk Management</div>
              </div>
            </div>
            <h1 style={{ margin: '18px 0 8px', fontSize: 34 }}>Deployable Phone App Build</h1>
            <p style={{ maxWidth: 760, color: 'rgba(255,255,255,.82)' }}>This version is packaged as a real Next.js app so you can upload it to GitHub, deploy it on Vercel, and open it on your phone.</p>
            <div className="badges">
              <span className="badge">Risk-smart</span>
              <span className="badge">Mobile-first</span>
              <span className="badge">Photos + PDF</span>
              <span className="badge">Deployment-ready</span>
            </div>
          </div>
          <div className="progress-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <strong>Record completion</strong>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="progress-bar"><div className="progress-fill" style={{ width: `${progress}%` }} /></div>
            <div className="step-buttons">
              {[1, 2, 3, 4, 5].map((n) => (
                <button key={n} className={step === n ? 'active' : ''} onClick={() => setStep(n)}>Step {n}</button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="tabs tabbar">
        {tabs.map((name) => (
          <button key={name} className={tab === name ? 'active' : ''} onClick={() => setTab(name)}>{name.charAt(0).toUpperCase() + name.slice(1)}</button>
        ))}
      </div>

      {tab === 'form' && (
        <div className="grid main-grid">
          <div className="grid">
            {step === 1 && (
              <div className="card">
                <h3>Step 1: BAAC Work Details</h3>
                <p>Start with the crew, task, location, and field leadership involved.</p>
                <div className="field-grid" style={{ marginTop: 16 }}>
                  <Field label="Project name"><input type="text" value={form.projectName} onChange={(e) => updateField('projectName', e.target.value)} placeholder="BAAC Shield Fibre Build - Segment A" /></Field>
                  <Field label="Location"><input type="text" value={form.location} onChange={(e) => updateField('location', e.target.value)} placeholder="Calgary - Access Road / Work Zone 3" /></Field>
                  <Field label="Worker name"><input type="text" value={form.workerName} onChange={(e) => updateField('workerName', e.target.value)} placeholder="Worker completing the record" /></Field>
                  <Field label="Supervisor name"><input type="text" value={form.supervisorName} onChange={(e) => updateField('supervisorName', e.target.value)} placeholder="Supervisor verifying the shield" /></Field>
                  <Field label="Task description" full><textarea value={form.taskDescription} onChange={(e) => updateField('taskDescription', e.target.value)} placeholder="Describe the work being performed" /></Field>
                </div>
                <div className="btnrow"><div /><button className="btn" disabled={!(form.projectName && form.location && form.workerName && form.taskDescription)} onClick={() => setStep(2)}>Next step</button></div>
              </div>
            )}

            {step === 2 && (
              <div className="card">
                <h3>Step 2: Identify the BAAC Critical Risk</h3>
                <p>The worker identifies the exposure before work continues.</p>
                <div className="field-grid" style={{ marginTop: 16, gridTemplateColumns: '1fr' }}>
                  <Field label="Critical risk"><select value={form.criticalRisk} onChange={(e) => { updateField('criticalRisk', e.target.value); updateField('selectedShields', []); }}><option value="">Choose a critical risk</option>{criticalRiskOptions.map((risk) => <option key={risk} value={risk}>{risk}</option>)}</select></Field>
                  {form.criticalRisk === 'Other' && <Field label="Custom risk"><input type="text" value={form.customRisk} onChange={(e) => updateField('customRisk', e.target.value)} placeholder="Enter the specific critical risk" /></Field>}
                  {selectedRisk && (
                    <div className="info-box">
                      <strong>Risk Guidance</strong>
                      <p style={{ marginTop: 8 }}>{selectedRisk.description}</p>
                      <div className="prompt-list" style={{ marginTop: 12 }}>
                        {selectedRisk.prompts.map((prompt) => <div className="prompt" key={prompt}>{prompt}</div>)}
                      </div>
                    </div>
                  )}
                  <Field label="Why is this a critical risk?"><textarea value={form.riskDescription} onChange={(e) => updateField('riskDescription', e.target.value)} placeholder="Describe the exposure, consequence, or concern" /></Field>
                </div>
                <div className="btnrow"><button className="btn secondary" onClick={() => setStep(1)}>Back</button><button className="btn" disabled={!(form.criticalRisk && form.riskDescription)} onClick={() => setStep(3)}>Next step</button></div>
              </div>
            )}

            {step === 3 && (
              <div className="card">
                <h3>Step 3: Choose the BAAC Shield</h3>
                <p>Smart shield suggestions appear based on the selected critical risk.</p>
                {selectedRisk && <div className="info-box" style={{ marginTop: 16 }}><strong>Smart mode:</strong> These shield options were prioritized for {form.criticalRisk}.</div>}
                <div className="check-grid" style={{ marginTop: 16 }}>
                  {smartShieldOptions.map((shield) => (
                    <label key={shield} className="check-item">
                      <input type="checkbox" checked={form.selectedShields.includes(shield)} onChange={() => toggleShield(shield)} />
                      <span>{shield}</span>
                    </label>
                  ))}
                </div>
                <div className="field-grid" style={{ marginTop: 16 }}>
                  <Field label="Additional shield or site-specific control" full><input type="text" value={form.customShield} onChange={(e) => updateField('customShield', e.target.value)} placeholder="Enter any extra shield if needed" /></Field>
                  <Field label="Immediate actions taken" full><textarea value={form.immediateActions} onChange={(e) => updateField('immediateActions', e.target.value)} placeholder="What was done right away to make the work safe?" /></Field>
                  <Field label="Upload photos"><><input ref={photoRef} type="file" multiple style={{ display: 'none' }} onChange={(e) => handleFiles('photoNames', e.target.files)} /><button type="button" className="btn secondary" onClick={() => photoRef.current?.click()}>Add Photos</button><div className="small" style={{ marginTop: 8 }}>{form.photoNames.join(', ') || 'No photos selected'}</div></></Field>
                  <Field label="Attach permits / locates / forms"><><input ref={docRef} type="file" multiple style={{ display: 'none' }} onChange={(e) => handleFiles('permitNames', e.target.files)} /><button type="button" className="btn secondary" onClick={() => docRef.current?.click()}>Add Documents</button><div className="small" style={{ marginTop: 8 }}>{form.permitNames.join(', ') || 'No documents selected'}</div></></Field>
                </div>
                <div className="btnrow"><button className="btn secondary" onClick={() => setStep(2)}>Back</button><button className="btn" disabled={!(form.selectedShields.length > 0 || form.customShield)} onClick={() => setStep(4)}>Next step</button></div>
              </div>
            )}

            {step === 4 && (
              <div className="card">
                <h3>Step 4: Supervisor Verification</h3>
                <p>The supervisor confirms the shield is installed, understood, and effective before work proceeds.</p>
                <div className="field-grid" style={{ marginTop: 16, gridTemplateColumns: '1fr' }}>
                  <Field label="Shield verification result"><select value={form.verifiedEffective} onChange={(e) => updateField('verifiedEffective', e.target.value)}><option value="">Select verification result</option><option value="effective">Effective - work may proceed</option><option value="needs-correction">Needs correction before proceeding</option><option value="stop-work">STOP WORK - discuss and reassess</option></select></Field>
                  {form.verifiedEffective === 'stop-work' && <div className="info-box" style={{ background: '#fef2f2', borderColor: '#fecaca' }}><strong>Stop Work triggered</strong><p style={{ marginTop: 8 }}>Work should not continue until safeguards are implemented and the record is re-verified.</p></div>}
                  <Field label="Corrective actions"><textarea value={form.correctiveActions} onChange={(e) => updateField('correctiveActions', e.target.value)} placeholder="List corrections, rework, or follow-up actions" /></Field>
                  <label className="check-item"><input type="checkbox" checked={form.rectified} onChange={(e) => updateField('rectified', e.target.checked)} /><span><strong>Corrective actions have been completed / rectified</strong><br /><span className="small">Use this once the issue has been fixed and verified.</span></span></label>
                </div>
                <div className="btnrow"><button className="btn secondary" onClick={() => setStep(3)}>Back</button><button className="btn" disabled={!(form.supervisorName && form.verifiedEffective)} onClick={() => setStep(5)}>Next step</button></div>
              </div>
            )}

            {step === 5 && (
              <div className="card">
                <h3>Step 5: BAAC Sign-Off</h3>
                <p>Final dated confirmation that the risk was managed and any required corrections were completed.</p>
                <div className="field-grid" style={{ marginTop: 16 }}>
                  <Field label="Worker sign-off"><input type="text" value={form.workerSignature} onChange={(e) => updateField('workerSignature', e.target.value)} placeholder="Type full name" /></Field>
                  <Field label="Worker date"><input type="date" value={form.workerDate} onChange={(e) => updateField('workerDate', e.target.value)} /></Field>
                  <Field label="Supervisor sign-off"><input type="text" value={form.supervisorSignature} onChange={(e) => updateField('supervisorSignature', e.target.value)} placeholder="Type full name" /></Field>
                  <Field label="Supervisor date"><input type="date" value={form.supervisorDate} onChange={(e) => updateField('supervisorDate', e.target.value)} /></Field>
                </div>
                <div className="btnrow"><button className="btn secondary" onClick={() => setStep(4)}>Back</button><div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}><button className="btn secondary" onClick={() => exportPdf()}>Export PDF</button><button className="btn" disabled={!(form.workerSignature && form.supervisorSignature && form.rectified)} onClick={submitRecord}>Complete Record</button></div></div>
              </div>
            )}
          </div>

          <div className="side-grid">
            <div className="card">
              <h4>12 BAAC Critical Risk Categories</h4>
              <p>Based on your BAAC field guide.</p>
              <div className="category-grid" style={{ marginTop: 14 }}>
                {criticalRiskOptions.filter((r) => r !== 'Other').map((risk) => <div key={risk} className={`category ${form.criticalRisk === risk ? 'active' : ''}`}>{risk}</div>)}
              </div>
            </div>
            <div className="card">
              <h4>BAAC Current Draft</h4>
              <p>Live record review before final closeout.</p>
              <div className="stat-list" style={{ marginTop: 14 }}>
                <div className="mini-card"><strong>Project:</strong> {form.projectName || '—'}</div>
                <div className="mini-card"><strong>Location:</strong> {form.location || '—'}</div>
                <div className="mini-card"><strong>Worker:</strong> {form.workerName || '—'}</div>
                <div className="mini-card"><strong>Critical risk:</strong> {finalRisk || '—'}</div>
                <div className="mini-card"><strong>Photos:</strong> {form.photoNames.join(', ') || '—'}</div>
                <div className="mini-card"><strong>Docs:</strong> {form.permitNames.join(', ') || '—'}</div>
                <div className="mini-card"><strong>Verification:</strong> {form.verifiedEffective || '—'}</div>
                <div className="mini-card"><strong>Rectified:</strong> {form.rectified ? 'Yes' : 'No'}</div>
                <div className="mini-card"><strong>Shields:</strong><div className="tag-wrap">{finalShields.length ? finalShields.map((item) => <span className="tag" key={item}>{item}</span>) : 'None selected'}</div></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {tab === 'records' && (
        <div className="card">
          <h3>BAAC Completed Records</h3>
          <p>Completed BAAC SHIELD field records appear here.</p>
          <div className="records" style={{ marginTop: 16 }}>
            {!records.length && <div className="record-card">No completed records yet. Finish the live form to create one.</div>}
            {records.map((record) => (
              <div key={record.id} className="record-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
                  <div>
                    <h4>{record.projectName}</h4>
                    <p>{record.location}</p>
                    <div className="small" style={{ marginTop: 6 }}>Submitted {record.submittedAt}</div>
                  </div>
                  <button className="btn secondary" onClick={() => exportPdf(record)}>PDF</button>
                </div>
                <div className="field-grid" style={{ marginTop: 14 }}>
                  <div className="mini-card"><strong>Task:</strong> {record.taskDescription}</div>
                  <div className="mini-card"><strong>Critical risk:</strong> {record.finalRisk}</div>
                  <div className="mini-card"><strong>Worker:</strong> {record.workerName}</div>
                  <div className="mini-card"><strong>Supervisor:</strong> {record.supervisorName}</div>
                  <div className="mini-card field-full"><strong>Shields:</strong> {record.finalShields.join(', ')}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === 'mobile' && (
        <div className="grid" style={{ gridTemplateColumns: '0.7fr 1.3fr' }}>
          <div className="card">
            <h3>Mobile-First Upgrades</h3>
            <p>Built for workers and supervisors in the field.</p>
            <div className="flow-list" style={{ marginTop: 16 }}>
              <div className="mini-card"><strong>Large tap targets:</strong> easier use with gloves and in bright conditions.</div>
              <div className="mini-card"><strong>Fast file upload:</strong> add photos and permits from the field.</div>
              <div className="mini-card"><strong>Simple flow:</strong> workers can move step by step without confusion.</div>
              <div className="mini-card"><strong>Phone-ready:</strong> works in mobile browser and can be added to the home screen.</div>
            </div>
          </div>
          <div className="phone">
            <div className="phone-top"><span>BAAC SHIELD</span><span>Field</span></div>
            <div className="phone-body">
              <div className="mini-card"><div className="small">Selected Risk</div><div>{form.criticalRisk || 'Excavation'}</div></div>
              <div className="mini-card"><div className="small">Suggested Shield</div><div>{smartShieldOptions[0] || 'Utility locates verified'}</div></div>
              <div className="mini-card"><div className="small">Verification</div><div>Supervisor field verification required</div></div>
              <button className="btn">Continue Record</button>
              <button className="btn secondary">Upload Photo Proof</button>
              <button className="btn secondary" style={{ borderColor: '#fca5a5', color: '#b91c1c' }}>STOP WORK</button>
            </div>
          </div>
        </div>
      )}

      {tab === 'platform' && (
        <div className="grid main-grid">
          <div className="card">
            <h3>Real-World Platform Version</h3>
            <p>This is the version that would actually run for BAAC crews.</p>
            <div className="flow-list" style={{ marginTop: 16 }}>
              <div className="mini-card"><strong>User login roles:</strong> Worker, Supervisor, HSE, and Admin.</div>
              <div className="mini-card"><strong>Saved cloud records:</strong> every record stored with date, time, project, and status.</div>
              <div className="mini-card"><strong>Audit trail:</strong> track who created, edited, verified, and closed each record.</div>
              <div className="mini-card"><strong>Notifications:</strong> email or app alerts for supervisor review and overdue corrective actions.</div>
              <div className="mini-card"><strong>Dashboard:</strong> open records, stop-work events, and pending rectifications.</div>
            </div>
          </div>
          <div className="grid">
            <div className="card">
              <h4>Login + Access Flow</h4>
              <p>Suggested structure for the production app.</p>
              <div className="field-grid" style={{ marginTop: 16 }}>
                <div className="mini-card"><strong>Worker</strong><br /><span className="small">Create record, identify risk, choose shields, upload proof, sign off.</span></div>
                <div className="mini-card"><strong>Supervisor</strong><br /><span className="small">Review, verify shield, assign corrective actions, close record.</span></div>
                <div className="mini-card"><strong>HSE</strong><br /><span className="small">Monitor trends, review stop-work cases, audit compliance.</span></div>
                <div className="mini-card"><strong>Admin</strong><br /><span className="small">Manage users, categories, shield libraries, and record retention.</span></div>
              </div>
            </div>
            <div className="card">
              <h4>Saved Records Dashboard</h4>
              <p>Prototype of the production record view.</p>
              <div className="kpi-grid" style={{ marginTop: 16 }}>
                <div className="kpi"><div className="small">Open Records</div><div className="big">12</div></div>
                <div className="kpi"><div className="small">Pending Rectification</div><div className="big">4</div></div>
                <div className="kpi"><div className="small">Stop Work Events</div><div className="big">2</div></div>
              </div>
              <div className="flow-list" style={{ marginTop: 16 }}>
                <div className="mini-card"><strong>BAAC Fibre Build - Segment A</strong><br /><span className="small">Excavation • Supervisor review pending</span></div>
                <div className="mini-card"><strong>North Access Road Utility Exposure</strong><br /><span className="small">Line of Fire • Corrective action assigned</span></div>
                <div className="mini-card"><strong>Pump Station Entry</strong><br /><span className="small">Confined Space Entry • Closed and archived</span></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {tab === 'blueprint' && (
        <div className="grid main-grid">
          <div className="grid">
            <div className="card">
              <h3>Phase 1 Production Blueprint</h3>
              <p>The structure to build the real BAAC SHIELD app.</p>
              <div className="flow-list" style={{ marginTop: 16 }}>
                <div className="mini-card"><strong>Goal:</strong> Launch a working BAAC SHIELD platform with secure login, saved records, supervisor verification, and corrective action tracking.</div>
                <div className="mini-card"><strong>Best first rollout:</strong> phone-friendly web app before building a full native app.</div>
                <div className="mini-card"><strong>Core system pieces:</strong> authentication, record database, file storage, role permissions, dashboards, and notifications.</div>
              </div>
            </div>
            <div className="card">
              <h4>User Roles and Permissions</h4>
              <div className="flow-list" style={{ marginTop: 16 }}>
                <div className="mini-card"><strong>Worker:</strong> create record, select risk, choose shields, upload proof, sign worker section, submit for review.</div>
                <div className="mini-card"><strong>Supervisor:</strong> review record, verify shield, add corrective actions, reopen if needed, sign off, close or escalate stop-work cases.</div>
                <div className="mini-card"><strong>HSE:</strong> audit records, review trends, monitor overdue actions, review stop-work events, export reports.</div>
                <div className="mini-card"><strong>Admin:</strong> manage users, projects, category libraries, shield wording, retention rules, and notification settings.</div>
              </div>
            </div>
          </div>
          <div className="grid">
            <div className="card">
              <h4>Record Status Flow</h4>
              <div className="flow-list" style={{ marginTop: 16 }}>
                {['Draft', 'Submitted by Worker', 'Under Supervisor Review', 'Action Required', 'Rectified', 'Closed', 'Stop Work', 'Archived'].map((item) => <div key={item} className="status-pill">{item}</div>)}
              </div>
            </div>
            <div className="card">
              <h4>Database Structure</h4>
              <div className="flow-list" style={{ marginTop: 16 }}>
                <div className="mini-card"><strong>users</strong><br /><span className="small">id, name, email, role, company, active_status</span></div>
                <div className="mini-card"><strong>projects</strong><br /><span className="small">id, project_name, location, client, active_status</span></div>
                <div className="mini-card"><strong>records</strong><br /><span className="small">id, project_id, worker_id, supervisor_id, critical_risk, task_description, risk_description, verification_status, record_status, dates, signatures</span></div>
                <div className="mini-card"><strong>record_shields</strong><br /><span className="small">id, record_id, shield_name, shield_type, verified_flag</span></div>
                <div className="mini-card"><strong>corrective_actions</strong><br /><span className="small">id, record_id, action_text, assigned_to, due_date, completed_flag, completed_date</span></div>
                <div className="mini-card"><strong>attachments</strong><br /><span className="small">id, record_id, file_name, file_type, storage_url, uploaded_by, uploaded_at</span></div>
                <div className="mini-card"><strong>audit_log</strong><br /><span className="small">id, record_id, action, user_id, timestamp, notes</span></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {tab === 'handoff' && (
        <div className="grid main-grid">
          <div className="grid">
            <div className="card">
              <h3>Developer Handoff Package</h3>
              <p>What a developer needs to estimate, scope, and build the BAAC SHIELD app.</p>
              <div className="flow-list" style={{ marginTop: 16 }}>
                <div className="mini-card"><strong>Project Name:</strong> BAAC SHIELD Critical Risk Management App</div>
                <div className="mini-card"><strong>Core Purpose:</strong> Digitize the BAAC SHIELD process so workers can identify critical risks, choose shields, upload proof, and send records for supervisor verification and closeout.</div>
                <div className="mini-card"><strong>Primary Users:</strong> Workers, Supervisors, HSE, and Admin.</div>
                <div className="mini-card"><strong>Preferred Deployment:</strong> secure mobile-friendly web app first, optional installable app later.</div>
              </div>
            </div>
            <div className="card">
              <h4>MVP Scope</h4>
              <div className="flow-list" style={{ marginTop: 16 }}>
                {['Secure login by role', 'Create BAAC SHIELD record', '12 critical risk categories', 'Risk-based smart shield suggestions', 'Worker sign-off and supervisor verification', 'Corrective action assignment and closeout', 'Photo / permit / document upload', 'PDF export', 'Dashboard for open, stop-work, and closed records'].map((item) => <div key={item} className="mini-card">{item}</div>)}
              </div>
            </div>
          </div>
          <div className="grid">
            <div className="card">
              <h4>Page-by-Page App Structure</h4>
              <div className="flow-list" style={{ marginTop: 16 }}>
                {[
                  '1. Login — email / password login with role-based access.',
                  '2. Dashboard — open records, action-required items, stop-work events, recent submissions.',
                  '3. New Record — project, task, worker, supervisor, and location details.',
                  '4. Risk Selection — choose one of the 12 BAAC critical risks and show guidance prompts.',
                  '5. Shield Selection — smart shield suggestions, custom shield entry, immediate actions, attachments.',
                  '6. Supervisor Review — verification result, corrective actions, stop-work handling, rectification check.',
                  '7. Sign-Off / PDF — worker and supervisor signatures, dates, PDF export, final closeout.',
                  '8. Record Details — audit trail, attachments, status history, comments, reopen option.',
                  '9. Admin Settings — manage users, risk library, shield library, notifications, and projects.'
                ].map((item) => <div key={item} className="mini-card">{item}</div>)}
              </div>
            </div>
            <div className="card">
              <h4>User Flow Map</h4>
              <div className="flow-list" style={{ marginTop: 16 }}>
                {['Worker logs in', 'Creates record', 'Selects critical risk', 'Chooses shields and uploads proof', 'Signs and submits', 'Supervisor reviews and verifies', 'Corrective action assigned if needed', 'Record rectified and closed', 'HSE audits and reports'].map((item) => <div key={item} className="status-pill">{item}</div>)}
              </div>
            </div>
          </div>
        </div>
      )}

      {tab === 'deploy' && (
        <div className="grid">
          <div className="card">
            <h3>Phase 1 Build Order</h3>
            <p>The order a developer should build this in.</p>
            <div className="field-grid" style={{ marginTop: 16 }}>
              {[
                ['1. Authentication', 'Set up secure role-based login.'],
                ['2. Records Database', 'Create saved record tables and status logic.'],
                ['3. Record Form', 'Connect the BAAC SHIELD workflow to real saved data.'],
                ['4. Attachments', 'Enable photo, permit, and PDF storage.'],
                ['5. Supervisor Review', 'Add approval, corrective action, and stop-work handling.'],
                ['6. Dashboard + Alerts', 'Launch reporting, overdue actions, and notifications.']
              ].map(([title, text]) => <div key={title} className="mini-card"><strong>{title}</strong><br /><span className="small">{text}</span></div>)}
            </div>
          </div>
          <div className="card">
            <h4>Recommended Tech Stack</h4>
            <p>Simple, realistic path for a real BAAC rollout.</p>
            <div className="field-grid" style={{ marginTop: 16 }}>
              {[
                ['Frontend', 'Next.js mobile-friendly web app'],
                ['Database', 'Supabase or Firebase for saved records'],
                ['Authentication', 'Role-based login for Worker, Supervisor, HSE, Admin'],
                ['Storage', 'Photo, PDF, and permit upload storage'],
                ['Notifications', 'Email alerts for verification and overdue actions'],
                ['Deployment', 'Secure web app first, installable app second']
              ].map(([title, text]) => <div key={title} className="mini-card"><strong>{title}</strong><br /><span className="small">{text}</span></div>)}
            </div>
            <div className="dialog-note mini-card"><strong>Recommended real build path:</strong> keep this prototype as the process model, then add login, saved records, storage, dashboard, and reporting.</div>
          </div>
        </div>
      )}
    </div>
  );
}
