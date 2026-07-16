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
 const [fleetAssets, setFleetAssets] = useState([]);
const [fleetDefects, setFleetDefects] = useState([]);

const [fleetUnitNumber, setFleetUnitNumber] = useState("");
const [fleetAssetType, setFleetAssetType] = useState("");
const [fleetAssetDescription, setFleetAssetDescription] = useState("");

const [fleetReportedBy, setFleetReportedBy] = useState("");
const [fleetDriverOperator, setFleetDriverOperator] = useState("");
const [fleetProject, setFleetProject] = useState("");
const [fleetJobNumber, setFleetJobNumber] = useState("");
const [fleetLocation, setFleetLocation] = useState("");

const [fleetDefectIdentified, setFleetDefectIdentified] = useState("");
const [fleetDefectCategory, setFleetDefectCategory] = useState("");
const [fleetPriority, setFleetPriority] = useState("");
const [fleetOutOfService, setFleetOutOfService] = useState("");

const [fleetAssignedTo, setFleetAssignedTo] = useState("");
const [fleetDueDate, setFleetDueDate] = useState("");

const [fleetRepairVendor, setFleetRepairVendor] = useState("");
const [fleetRepairContact, setFleetRepairContact] = useState("");
const [fleetFixedBy, setFleetFixedBy] = useState("");
const [fleetFixedDate, setFleetFixedDate] = useState("");
const [fleetRepairNotes, setFleetRepairNotes] = useState("");

const [fleetInvoiceNumber, setFleetInvoiceNumber] = useState("");
const [fleetReceiptNumber, setFleetReceiptNumber] = useState("");
const [fleetRepairCost, setFleetRepairCost] = useState("");
const [fleetPaidStatus, setFleetPaidStatus] = useState("");
const [fleetPaidDate, setFleetPaidDate] = useState("");

const [fleetPhotos, setFleetPhotos] = useState([]);
const [fleetSupervisorSignoffName, setFleetSupervisorSignoffName] = useState("");
const [fleetSupervisorSignature, setFleetSupervisorSignature] = useState("");
const [fleetStatus, setFleetStatus] = useState("Open");
  const [editingFleetDefectId, setEditingFleetDefectId] = useState(null);
  const [fleetDefectFilter, setFleetDefectFilter] = useState("All");
  
  const [siteDocuments, setSiteDocuments] = useState([]);
const [siteDocProject, setSiteDocProject] = useState("");
const [siteDocTitle, setSiteDocTitle] = useState("");
const [siteDocType, setSiteDocType] = useState("");
const [siteDocDate, setSiteDocDate] = useState("");
const [siteDocReviewDate, setSiteDocReviewDate] = useState("");
const [siteDocExpiryDate, setSiteDocExpiryDate] = useState("");
const [siteDocUploadedBy, setSiteDocUploadedBy] = useState("");
const [siteDocNotes, setSiteDocNotes] = useState("");
const [siteDocFile, setSiteDocFile] = useState(null);
  const [fieldDocType, setFieldDocType] = useState("");

const [flraRecords, setFlraRecords] = useState([]);
const [flraProject, setFlraProject] = useState("");
  const [flraWorkerName, setFlraWorkerName] = useState("");
const [flraJobNumber, setFlraJobNumber] = useState("");
const [flraGuestVisitorName, setFlraGuestVisitorName] = useState("");
const [flraFireRating, setFlraFireRating] = useState("");
const [flraWeather, setFlraWeather] = useState("");
const [flraCountry, setFlraCountry] = useState("");
const [flraDate, setFlraDate] = useState("");
const [flraTime, setFlraTime] = useState("");
const [flraLocation, setFlraLocation] = useState("");
const [flraSupervisor, setFlraSupervisor] = useState("");
const [flraCrewMembers, setFlraCrewMembers] = useState("");

const [flraWorkScope, setFlraWorkScope] = useState("");
const [flraTaskSteps, setFlraTaskSteps] = useState("");
const [flraHazards, setFlraHazards] = useState("");
const [flraCriticalRisks, setFlraCriticalRisks] = useState("");
const [flraControls, setFlraControls] = useState("");
const [flraPpe, setFlraPpe] = useState("");
const [flraEquipment, setFlraEquipment] = useState("");
const [flraPreJobHazards, setFlraPreJobHazards] = useState([]);
const [flraWorkersRightsReviewed, setFlraWorkersRightsReviewed] = useState("");
const [flraGeneralHazards, setFlraGeneralHazards] = useState([]);

const [flraHazardTask, setFlraHazardTask] = useState("");
const [flraHazardHazard, setFlraHazardHazard] = useState("");
const [flraHazardRisk, setFlraHazardRisk] = useState("");
const [flraHazardControls, setFlraHazardControls] = useState("");
const [flraSupervisorSignature, setFlraSupervisorSignature] = useState("");
 const [flraWorkerSignatures, setFlraWorkerSignatures] = useState([
  { name: "", role: "", signature: "", signedAt: "" },
]);
const [flraResetKey, setFlraResetKey] = useState(0); 
const [flraLocatesReviewed, setFlraLocatesReviewed] = useState("");
const [flraPermitsReviewed, setFlraPermitsReviewed] = useState("");
const [flraEmergencyPlanReviewed, setFlraEmergencyPlanReviewed] = useState("");
const [flraMusterPoint, setFlraMusterPoint] = useState("");
const [flraNearestHospital, setFlraNearestHospital] = useState("");

const [flraAdditionalNotes, setFlraAdditionalNotes] = useState("");
const [flraCompletedBy, setFlraCompletedBy] = useState("");
const [flraPhotos, setFlraPhotos] = useState([]);
 const [rpasOperations, setRpasOperations] = useState([]);
const [rpasProject, setRpasProject] = useState("");
const [rpasDate, setRpasDate] = useState("");
const [rpasPilot, setRpasPilot] = useState("");
const [rpasObserver, setRpasObserver] = useState("");
const [rpasMakeModel, setRpasMakeModel] = useState("");
const [rpasRegistration, setRpasRegistration] = useState("");
const [rpasOperationType, setRpasOperationType] = useState("");
const [rpasLocation, setRpasLocation] = useState("");
const [rpasPilotCertificateType, setRpasPilotCertificateType] = useState("");
const [rpasPilotCertificateNumber, setRpasPilotCertificateNumber] = useState("");
const [rpasWeightCategory, setRpasWeightCategory] = useState("");
const [rpasSiteAuthorizationConfirmed, setRpasSiteAuthorizationConfirmed] = useState("");
const [rpasClientApprovalConfirmed, setRpasClientApprovalConfirmed] = useState("");
const [rpasControlledAirspace, setRpasControlledAirspace] = useState("");
const [rpasNavDroneAuthorization, setRpasNavDroneAuthorization] = useState("");
const [rpasNotamsChecked, setRpasNotamsChecked] = useState("");
const [rpasNearbyAerodromesChecked, setRpasNearbyAerodromesChecked] = useState("");
const [rpasMaxPlannedAltitude, setRpasMaxPlannedAltitude] = useState("");
const [rpasVlosConfirmed, setRpasVlosConfirmed] = useState("");
const [rpasSeparationFromPeopleConfirmed, setRpasSeparationFromPeopleConfirmed] = useState("");
const [rpasTakeoffLandingZoneConfirmed, setRpasTakeoffLandingZoneConfirmed] = useState("");
const [rpasCommunicationPlanConfirmed, setRpasCommunicationPlanConfirmed] = useState("");
const [rpasFlightLogRecorded, setRpasFlightLogRecorded] = useState("");
const [rpasImageryBackedUp, setRpasImageryBackedUp] = useState("");
const [rpasEquipmentSecured, setRpasEquipmentSecured] = useState("");
const [rpasSupervisorNotifiedComplete, setRpasSupervisorNotifiedComplete] = useState("");
const [rpasBatteryIdsUsed, setRpasBatteryIdsUsed] = useState("");
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

const [dailyActivityDate, setDailyActivityDate] = useState(
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
 const [qaqcSection, setQaqcSection] = useState("dashboard");
 const [qaqcInspectionType, setQaqcInspectionType] = useState("");
 const [qaqcProjectId, setQaqcProjectId] = useState("");
const [qaqcWorksite, setQaqcWorksite] = useState("");
const [qaqcWorkPackage, setQaqcWorkPackage] = useState("");
const [qaqcSupplier, setQaqcSupplier] = useState("");
const [qaqcDeliveryDate, setQaqcDeliveryDate] = useState("");
const [qaqcReceivedBy, setQaqcReceivedBy] = useState("");
 const [qaqcPoNumber, setQaqcPoNumber] = useState("");
const [qaqcPackingSlip, setQaqcPackingSlip] = useState("");
const [qaqcDeliveryTicket, setQaqcDeliveryTicket] = useState("");
const [qaqcCarrierDriver, setQaqcCarrierDriver] = useState("");
const [qaqcManufacturer, setQaqcManufacturer] = useState("");
const [qaqcStorageLocation, setQaqcStorageLocation] = useState("");
  const [qaqcInspectionPhotos, setQaqcInspectionPhotos] = useState([]);
  const [qaqcWorkInspections, setQaqcWorkInspections] = useState([]);
  const [selectedQaqcInspection, setSelectedQaqcInspection] = useState(null);
 const [qaqcItemDescription, setQaqcItemDescription] = useState("");
const [qaqcItemCode, setQaqcItemCode] = useState("");
const [qaqcQuantityOrdered, setQaqcQuantityOrdered] = useState("");
const [qaqcQuantityReceived, setQaqcQuantityReceived] = useState("");
const [qaqcMaterialCondition, setQaqcMaterialCondition] = useState("");
const [qaqcAcceptanceStatus, setQaqcAcceptanceStatus] = useState("");
  const [showSplash, setShowSplash] = useState(true);
  
  const [searchTerm, setSearchTerm] = useState("");
  const [recordsCenterSearch, setRecordsCenterSearch] = useState("");
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
  // CRM records
const [crmCustomers, setCrmCustomers] = useState([]);
const [crmSubcontractors, setCrmSubcontractors] = useState([]);
const [crmActivities, setCrmActivities] = useState([]);
const [crmOpportunities, setCrmOpportunities] = useState([]);

// CRM navigation and search
const [crmSection, setCrmSection] = useState("dashboard");
const [crmSearch, setCrmSearch] = useState("");
const [editingCrmCustomerId, setEditingCrmCustomerId] = useState(null);
 const [selectedCrmCustomerId, setSelectedCrmCustomerId] = useState(null);
// Customer form
const [crmCustomerCompany, setCrmCustomerCompany] = useState("");
const [crmCustomerType, setCrmCustomerType] = useState("Customer");
const [crmCustomerContact, setCrmCustomerContact] = useState("");
const [crmCustomerTitle, setCrmCustomerTitle] = useState("");
const [crmCustomerPhone, setCrmCustomerPhone] = useState("");
const [crmCustomerEmail, setCrmCustomerEmail] = useState("");
const [crmCustomerCity, setCrmCustomerCity] = useState("");
const [crmCustomerProvince, setCrmCustomerProvince] = useState("");
const [crmCustomerIndustry, setCrmCustomerIndustry] = useState("");
const [crmCustomerStatus, setCrmCustomerStatus] = useState("Active");
const [crmCustomerAssignedTo, setCrmCustomerAssignedTo] = useState("");
const [crmCustomerFollowUp, setCrmCustomerFollowUp] = useState("");
const [crmCustomerNotes, setCrmCustomerNotes] = useState("");

// Subcontractor form
const [crmSubCompany, setCrmSubCompany] = useState("");
const [crmSubTrade, setCrmSubTrade] = useState("");
const [crmSubContact, setCrmSubContact] = useState("");
const [crmSubPhone, setCrmSubPhone] = useState("");
const [crmSubEmail, setCrmSubEmail] = useState("");
const [crmSubServiceArea, setCrmSubServiceArea] = useState("");
const [crmSubStatus, setCrmSubStatus] = useState("Pending Review");
const [crmSubWcbNumber, setCrmSubWcbNumber] = useState("");
const [crmSubInsuranceExpiry, setCrmSubInsuranceExpiry] = useState("");
const [crmSubCorStatus, setCrmSubCorStatus] = useState("");
const [crmSubCorExpiry, setCrmSubCorExpiry] = useState("");
const [crmSubApproved, setCrmSubApproved] = useState(false);
const [crmSubNotes, setCrmSubNotes] = useState("");

// Activity form
const [crmActivityCustomerId, setCrmActivityCustomerId] = useState("");
const [crmActivitySubcontractorId, setCrmActivitySubcontractorId] = useState("");
const [crmActivityContact, setCrmActivityContact] = useState("");
const [crmActivityType, setCrmActivityType] = useState("Call");
const [crmActivityDate, setCrmActivityDate] = useState(
  new Date().toISOString().split("T")[0]
);
const [crmActivitySubject, setCrmActivitySubject] = useState("");
const [crmActivityNotes, setCrmActivityNotes] = useState("");
const [crmActivityOutcome, setCrmActivityOutcome] = useState("");
const [crmActivityFollowUpRequired, setCrmActivityFollowUpRequired] =
  useState(false);
const [crmActivityFollowUpDate, setCrmActivityFollowUpDate] = useState("");
const [crmActivityAssignedTo, setCrmActivityAssignedTo] = useState("");

// Opportunity form
const [crmOpportunityCustomerId, setCrmOpportunityCustomerId] = useState("");
const [crmOpportunityName, setCrmOpportunityName] = useState("");
const [crmOpportunityProject, setCrmOpportunityProject] = useState("");
const [crmOpportunityLocation, setCrmOpportunityLocation] = useState("");
const [crmOpportunityValue, setCrmOpportunityValue] = useState("");
const [crmOpportunityProbability, setCrmOpportunityProbability] =
  useState("10");
const [crmOpportunityStage, setCrmOpportunityStage] = useState("New Lead");
const [crmOpportunityAwardDate, setCrmOpportunityAwardDate] = useState("");
const [crmOpportunityAssignedTo, setCrmOpportunityAssignedTo] = useState("");
const [crmOpportunityNotes, setCrmOpportunityNotes] = useState("");
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
 const fleetSupervisorSigRef = useRef(null);
  const flraSupervisorSigRef = useRef(null);
const rpasPreflightSigRef = useRef(null);
const rpasPostflightSigRef = useRef(null);

function navigateQaqc(section) {
  window.history.pushState(
    {
      activeTab: "qaqc",
      qaqcSection: section,
    },
    ""
  );

  setActiveTab("qaqc");
  setQaqcSection(section);
}

useEffect(() => {
  function handleBrowserBack(event) {
    if (event.state?.activeTab) {
      setActiveTab(event.state.activeTab);
    }

    if (event.state?.qaqcSection) {
      setQaqcSection(event.state.qaqcSection);
    }
  }

  window.history.replaceState(
    {
      activeTab,
      qaqcSection,
    },
    ""
  );

  window.addEventListener("popstate", handleBrowserBack);

  return () => {
    window.removeEventListener("popstate", handleBrowserBack);
  };
}, []);

 
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
      loadCrmData();
    
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
  const fleetAssetsRes = await fetch(
  `${SUPABASE_URL}/rest/v1/fleet_assets?select=*&order=unit_number.asc`,
  {
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
    },
  }
);

if (fleetAssetsRes.ok) {
  const fleetAssetsData = await fleetAssetsRes.json();
  setFleetAssets(fleetAssetsData);
}

const fleetDefectsRes = await fetch(
  `${SUPABASE_URL}/rest/v1/fleet_defects?select=*&order=created_at.desc`,
  {
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
    },
  }
);

if (fleetDefectsRes.ok) {
  const fleetDefectsData = await fleetDefectsRes.json();
  setFleetDefects(fleetDefectsData);
}

   const siteDocsRes = await fetch(
  `${SUPABASE_URL}/rest/v1/site_documents?select=*&order=created_at.desc`,
  {
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
    },
  }
);

if (siteDocsRes.ok) {
  const siteDocsData = await siteDocsRes.json();
  setSiteDocuments(siteDocsData);
}   

      const flraRes = await fetch(
  `${SUPABASE_URL}/rest/v1/field_flras?select=*&order=created_at.desc`,
  {
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
    },
  }
);

if (flraRes.ok) {
  const flraData = await flraRes.json();
  setFlraRecords(flraData);
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

const { data: qaqcData, error: qaqcError } = await supabase
  .from("qaqc_work_inspections")
  .select("*")
  .order("created_at", { ascending: false });

if (qaqcError) {
  throw qaqcError;
}

setQaqcWorkInspections(qaqcData || []);
            
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
async function loadCrmData() {
  try {
    const [
      customersResult,
      subcontractorsResult,
      activitiesResult,
      opportunitiesResult,
    ] = await Promise.all([
      supabase
        .from("crm_customers")
        .select("*")
        .order("company_name", { ascending: true }),

      supabase
        .from("crm_subcontractors")
        .select("*")
        .order("company_name", { ascending: true }),

      supabase
        .from("crm_activities")
        .select("*")
        .order("activity_date", { ascending: false }),

      supabase
        .from("crm_opportunities")
        .select("*")
        .order("created_at", { ascending: false }),
    ]);

    if (customersResult.error) throw customersResult.error;
    if (subcontractorsResult.error) throw subcontractorsResult.error;
    if (activitiesResult.error) throw activitiesResult.error;
    if (opportunitiesResult.error) throw opportunitiesResult.error;

    setCrmCustomers(customersResult.data || []);
    setCrmSubcontractors(subcontractorsResult.data || []);
    setCrmActivities(activitiesResult.data || []);
    setCrmOpportunities(opportunitiesResult.data || []);
  } catch (error) {
    setMessage(`Could not load CRM records: ${error.message}`);
  }
}

function clearCrmCustomerForm() {
  setEditingCrmCustomerId(null);
  setCrmCustomerCompany("");
  setCrmCustomerType("Customer");
  setCrmCustomerContact("");
  setCrmCustomerTitle("");
  setCrmCustomerPhone("");
  setCrmCustomerEmail("");
  setCrmCustomerCity("");
  setCrmCustomerProvince("");
  setCrmCustomerIndustry("");
  setCrmCustomerStatus("Active");
  setCrmCustomerAssignedTo("");
  setCrmCustomerFollowUp("");
  setCrmCustomerNotes("");
}

function editCrmCustomer(customer) {
  setEditingCrmCustomerId(customer.id);
  setCrmCustomerCompany(customer.company_name || "");
  setCrmCustomerType(customer.customer_type || "Customer");
  setCrmCustomerContact(customer.primary_contact_name || "");
  setCrmCustomerTitle(customer.primary_contact_title || "");
  setCrmCustomerPhone(customer.phone || "");
  setCrmCustomerEmail(customer.email || "");
  setCrmCustomerCity(customer.city || "");
  setCrmCustomerProvince(customer.province_state || "");
  setCrmCustomerIndustry(customer.industry || "");
  setCrmCustomerStatus(customer.status || "Active");
  setCrmCustomerAssignedTo(customer.assigned_to || "");
  setCrmCustomerFollowUp(customer.next_follow_up_date || "");
  setCrmCustomerNotes(customer.notes || "");

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

async function saveCrmCustomer() {
  if (!crmCustomerCompany.trim()) {
    setMessage("Please enter the customer company name.");
    return;
  }

  setLoading(true);
  setMessage("");

  const payload = {
    company_name: crmCustomerCompany.trim(),
    customer_type: crmCustomerType,
    primary_contact_name: crmCustomerContact,
    primary_contact_title: crmCustomerTitle,
    phone: crmCustomerPhone,
    email: crmCustomerEmail,
    city: crmCustomerCity,
    province_state: crmCustomerProvince,
    industry: crmCustomerIndustry,
    status: crmCustomerStatus,
    assigned_to: crmCustomerAssignedTo,
    next_follow_up_date: crmCustomerFollowUp || null,
    notes: crmCustomerNotes,
    updated_at: new Date().toISOString(),
  };

  try {
    if (editingCrmCustomerId) {
      const { error } = await supabase
        .from("crm_customers")
        .update(payload)
        .eq("id", editingCrmCustomerId);

      if (error) throw error;

      setMessage("Customer record updated.");
    } else {
      const { error } = await supabase.from("crm_customers").insert([
        {
          ...payload,
          created_by: user?.email || "",
        },
      ]);

      if (error) throw error;

      setMessage("Customer saved.");
    }

    clearCrmCustomerForm();
    await loadCrmData();
  } catch (error) {
    setMessage(`Could not save customer: ${error.message}`);
  } finally {
    setLoading(false);
  }
}

async function saveCrmSubcontractor() {
  if (!crmSubCompany.trim()) {
    setMessage("Please enter the subcontractor company name.");
    return;
  }

  setLoading(true);
  setMessage("");

  try {
    const { error } = await supabase.from("crm_subcontractors").insert([
      {
        company_name: crmSubCompany.trim(),
        trade_service: crmSubTrade,
        primary_contact_name: crmSubContact,
        phone: crmSubPhone,
        email: crmSubEmail,
        service_area: crmSubServiceArea,
        status: crmSubStatus,
        wcb_number: crmSubWcbNumber,
        insurance_expiry_date: crmSubInsuranceExpiry || null,
        cor_status: crmSubCorStatus || null,
        cor_expiry_date: crmSubCorExpiry || null,
        approved_for_work: crmSubApproved,
        safety_documents_complete: crmSubApproved,
        notes: crmSubNotes,
        created_by: user?.email || "",
      },
    ]);

    if (error) throw error;

    setCrmSubCompany("");
    setCrmSubTrade("");
    setCrmSubContact("");
    setCrmSubPhone("");
    setCrmSubEmail("");
    setCrmSubServiceArea("");
    setCrmSubStatus("Pending Review");
    setCrmSubWcbNumber("");
    setCrmSubInsuranceExpiry("");
    setCrmSubCorStatus("");
    setCrmSubCorExpiry("");
    setCrmSubApproved(false);
    setCrmSubNotes("");

    setMessage("Subcontractor saved.");
    await loadCrmData();
  } catch (error) {
    setMessage(`Could not save subcontractor: ${error.message}`);
  } finally {
    setLoading(false);
  }
}
async function saveCrmActivity() {
  if (!crmActivitySubject.trim()) {
    setMessage("Please enter an activity subject.");
    alert("Please enter an activity subject.");
    return;
  }

  if (!crmActivityCustomerId && !crmActivitySubcontractorId) {
    setMessage("Please select a customer or subcontractor.");
    alert("Please select a customer or subcontractor.");
    return;
  }

  if (crmActivityFollowUpRequired && !crmActivityFollowUpDate) {
    setMessage("Please enter a follow-up date or uncheck Follow-up Required.");
    alert("Please enter a follow-up date or uncheck Follow-up Required.");
    return;
  }

  setLoading(true);
  setMessage("");

  try {
    const payload = {
      customer_id: crmActivityCustomerId || null,
      subcontractor_id: crmActivitySubcontractorId || null,
      contact_name: crmActivityContact,
      activity_type: crmActivityType,
      activity_date: crmActivityDate || null,
      subject: crmActivitySubject.trim(),
      notes: crmActivityNotes,
      outcome: crmActivityOutcome,
      follow_up_required: crmActivityFollowUpRequired,
      follow_up_date: crmActivityFollowUpRequired
        ? crmActivityFollowUpDate
        : null,
      assigned_to: crmActivityAssignedTo,
      created_by: user?.email || "",
    };

    const { error } = await supabase
      .from("crm_activities")
      .insert([payload]);

    if (error) {
      console.error("CRM activity save error:", error);
      alert(`Could not save sales activity: ${error.message}`);
      throw error;
    }

    setCrmActivityCustomerId("");
    setCrmActivitySubcontractorId("");
    setCrmActivityContact("");
    setCrmActivityType("Call");
    setCrmActivityDate(new Date().toISOString().split("T")[0]);
    setCrmActivitySubject("");
    setCrmActivityNotes("");
    setCrmActivityOutcome("");
    setCrmActivityFollowUpRequired(false);
    setCrmActivityFollowUpDate("");
    setCrmActivityAssignedTo("");

    await loadCrmData();

    setMessage("Sales activity saved.");
    alert("Sales activity saved.");
  } catch (error) {
    setMessage(`Could not save sales activity: ${error.message}`);
  } finally {
    setLoading(false);
  }
}

async function saveCrmOpportunity() {
  if (!crmOpportunityCustomerId) {
    setMessage("Please select a customer for this opportunity.");
    return;
  }

  if (!crmOpportunityName.trim()) {
    setMessage("Please enter the opportunity name.");
    return;
  }

  setLoading(true);
  setMessage("");

  try {
    const { error } = await supabase.from("crm_opportunities").insert([
      {
        customer_id: crmOpportunityCustomerId,
        opportunity_name: crmOpportunityName.trim(),
        project_name: crmOpportunityProject,
        project_location: crmOpportunityLocation,
        estimated_value: crmOpportunityValue ? Number(crmOpportunityValue) : 0,
        probability_percent: crmOpportunityProbability
          ? Number(crmOpportunityProbability)
          : 0,
        sales_stage: crmOpportunityStage,
        expected_award_date: crmOpportunityAwardDate || null,
        assigned_to: crmOpportunityAssignedTo,
        notes: crmOpportunityNotes,
        created_by: user?.email || "",
      },
    ]);

    if (error) throw error;

    setCrmOpportunityCustomerId("");
    setCrmOpportunityName("");
    setCrmOpportunityProject("");
    setCrmOpportunityLocation("");
    setCrmOpportunityValue("");
    setCrmOpportunityProbability("10");
    setCrmOpportunityStage("New Lead");
    setCrmOpportunityAwardDate("");
    setCrmOpportunityAssignedTo("");
    setCrmOpportunityNotes("");

    setMessage("Opportunity saved.");
    await loadCrmData();
  } catch (error) {
    setMessage(`Could not save opportunity: ${error.message}`);
  } finally {
    setLoading(false);
  }
}

async function updateCrmOpportunityStage(opportunityId, newStage) {
  setLoading(true);
  setMessage("");

  try {
    const { error } = await supabase
      .from("crm_opportunities")
      .update({
        sales_stage: newStage,
        updated_at: new Date().toISOString(),
      })
      .eq("id", opportunityId);

    if (error) throw error;

    setMessage(`Opportunity moved to ${newStage}.`);
    await loadCrmData();
  } catch (error) {
    setMessage(`Could not update opportunity: ${error.message}`);
  } finally {
    setLoading(false);
  }
}
 async function deleteWorkerRecord(record) {
  const authorizedEmails = [
    "yycrgonzalez@gmail.com",
    "rod.gonzalez@baac.com",
    "rod.gonzalez@baacconstruction.com",
  ];

  const currentEmail = (user?.email || "").toLowerCase();

  if (!authorizedEmails.includes(currentEmail)) {
    alert("You are not authorized to delete records.");
    return;
  }

  const password = window.prompt(
    `Enter the login password for ${currentEmail} to permanently delete this record.`
  );

  if (!password) return;

  const confirmed = window.confirm(
    `Permanently delete this worker form?\n\nProject: ${
      record.project_name || "No Project"
    }\nWorker: ${
      record.worker_name || "Unknown"
    }\n\nThis cannot be undone.`
  );

  if (!confirmed) return;

  setLoading(true);
  setMessage("");

  try {
    const { error: signInError } =
      await supabase.auth.signInWithPassword({
        email: currentEmail,
        password,
      });

    if (signInError) {
      alert("Incorrect password. The record was not deleted.");
      return;
    }

    const { error: deleteError } = await supabase
      .from("records")
      .delete()
      .eq("id", record.id);

    if (deleteError) throw deleteError;

    setRecords((previous) =>
      previous.filter((item) => item.id !== record.id)
    );

    setSelectedRecord(null);
    setMessage("Worker record permanently deleted.");
    alert("Worker record permanently deleted.");
  } catch (error) {
    console.error("Delete worker record error:", error);
    setMessage(`Could not delete record: ${error.message}`);
    alert(`Could not delete record: ${error.message}`);
  } finally {
    setLoading(false);
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

function toggleFlraCheckbox(value, setter) {
  setter((prev) =>
    prev.includes(value)
      ? prev.filter((item) => item !== value)
      : [...prev, value]
  );
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
    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "-");
    const fileName = `${Date.now()}-${safeName}`;

    const { error: uploadError } = await supabase.storage
      .from("hazard-photos")
      .upload(fileName, file, {
        contentType: file.type || "application/octet-stream",
        upsert: true,
      });

    if (uploadError) {
      throw new Error(uploadError.message || "Photo upload failed");
    }

    const { data } = supabase.storage
      .from("hazard-photos")
      .getPublicUrl(fileName);

    uploadedUrls.push(data.publicUrl);
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

async function saveFlraRecord() {
  setLoading(true);
  setMessage("");

  if (!flraProject || !flraDate || !flraSupervisor || !flraWorkScope) {
    setMessage(
      "Please complete required fields: Project, Date, Supervisor / Lead, and Work Scope."
    );
    setLoading(false);
    return;
  }

  try {
    let uploadedPhotoUrls = [];

    if (flraPhotos.length > 0) {
      setMessage("Uploading FLRA photo(s)...");
      uploadedPhotoUrls = await uploadPhotosToSupabase(flraPhotos);
      setMessage("FLRA photo(s) uploaded. Saving FLRA...");
    }

    const payload = {
     project_name: flraProject,
worker_name: flraWorkerName,
flra_date: flraDate || null,
flra_time: flraTime,
location: flraLocation,
supervisor_name: flraSupervisor,
job_number: flraJobNumber,
guest_visitor_name: flraGuestVisitorName,
crew_members: flraCrewMembers,
fire_rating: flraFireRating,
weather: flraWeather,
country: flraCountry,
      
      work_scope: flraWorkScope,
      task_steps: flraTaskSteps,
      hazards_identified: flraHazards,
      critical_risks: flraCriticalRisks,
      controls_required: flraControls,
      ppe_required: flraPpe,
      equipment_used: flraEquipment,

pre_job_hazards: flraPreJobHazards.join(", "),
workers_rights_reviewed: flraWorkersRightsReviewed,
general_hazards: flraGeneralHazards.join(", "),
hazard_task: flraHazardTask,
hazard_hazard: flraHazardHazard,
hazard_risk: flraHazardRisk,
hazard_controls: flraHazardControls,
supervisor_signature: flraSupervisorSignature,
      worker_signatures: flraWorkerSignatures.filter(
  (worker) => worker.name || worker.role || worker.signature
),
      locates_reviewed: flraLocatesReviewed,
      permits_reviewed: flraPermitsReviewed,
      emergency_plan_reviewed: flraEmergencyPlanReviewed,
      muster_point: flraMusterPoint,
      nearest_hospital: flraNearestHospital,

      additional_notes: flraAdditionalNotes,
      completed_by: flraCompletedBy,
      photos: uploadedPhotoUrls.join(", "),
      status: "Submitted",
    };

    const res = await fetch(`${SUPABASE_URL}/rest/v1/field_flras`, {
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
      throw new Error(text || "FLRA save failed");
    }
const savedFlra = await res.json();

if (savedFlra && savedFlra[0]) {
  setFlraRecords((prev) => [savedFlra[0], ...prev]);
}
    setFlraProject("");
    setFlraWorkerName("");
setFlraJobNumber("");
setFlraGuestVisitorName("");
setFlraFireRating("");
setFlraWeather("");
setFlraCountry("");
    setFlraDate("");
    setFlraTime("");
    setFlraLocation("");
    setFlraSupervisor("");
    setFlraCrewMembers("");

    setFlraWorkScope("");
    setFlraTaskSteps("");
    setFlraHazards("");
    setFlraCriticalRisks("");
    setFlraControls("");
    setFlraPpe("");
    setFlraEquipment("");
setFlraPreJobHazards([]);
setFlraWorkersRightsReviewed("");
setFlraGeneralHazards([]);
setFlraHazardTask("");
setFlraHazardHazard("");
setFlraHazardRisk("");
setFlraHazardControls("");
setFlraSupervisorSignature("");
    setFlraWorkerSignatures([{ name: "", role: "", signature: "", signedAt: "" }]);
setFlraResetKey((prev) => prev + 1);
flraSupervisorSigRef.current?.clear();
    setFlraLocatesReviewed("");
    setFlraPermitsReviewed("");
    setFlraEmergencyPlanReviewed("");
    setFlraMusterPoint("");
    setFlraNearestHospital("");

    setFlraAdditionalNotes("");
    setFlraCompletedBy("");
    setFlraPhotos([]);

    setMessage("FLRA submitted.");
    await loadRecords();
  } catch (error) {
    setMessage(`Could not save FLRA: ${error.message}`);
  } finally {
    setLoading(false);
  }
}
  
async function saveSiteDocument() {
  setLoading(true);
  setMessage("");

  if (!siteDocTitle || !siteDocType || !siteDocFile) {
    setMessage("Please complete required fields: Document Title, Document Type, and File.");
    setLoading(false);
    return;
  }

  try {
    setMessage("Uploading site document...");

    const uploadedUrls = await uploadPhotosToSupabase([siteDocFile]);
    const fileUrl = uploadedUrls[0] || "";

    const payload = {
      project_name: siteDocProject,
      document_title: siteDocTitle,
      document_type: siteDocType,
      document_date: siteDocDate || null,
      review_date: siteDocReviewDate || null,
      expiry_date: siteDocExpiryDate || null,
      uploaded_by: siteDocUploadedBy,
      notes: siteDocNotes,
      file_name: siteDocFile.name,
      file_url: fileUrl,
      status: "Active",
    };

    const res = await fetch(`${SUPABASE_URL}/rest/v1/site_documents`, {
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
      throw new Error(text || "Site document save failed");
    }

    setSiteDocProject("");
    setSiteDocTitle("");
    setSiteDocType("");
    setSiteDocDate("");
    setSiteDocReviewDate("");
    setSiteDocExpiryDate("");
    setSiteDocUploadedBy("");
    setSiteDocNotes("");
    setSiteDocFile(null);

    setMessage("Site document saved.");
    await loadRecords();
  } catch (error) {
    setMessage(`Could not save site document: ${error.message}`);
  } finally {
    setLoading(false);
  }
}
async function saveFleetDefect(statusValue = "Open") {
  
  setLoading(true);
  setMessage("");

 if (!fleetUnitNumber || !fleetReportedBy || !fleetDefectIdentified) {
  setMessage(
    "Please complete required fields: Unit #, Reported By, and Defect Identified."
  );
  setLoading(false);
  return;
}

  try {
   let uploadedPhotoUrls = [];

if (fleetPhotos.length > 0) {
  setMessage("Uploading fleet photo(s)...");
  uploadedPhotoUrls = await uploadPhotosToSupabase(fleetPhotos);
  setMessage("Fleet photo(s) uploaded. Saving defect report...");
}

    const payload = {
      unit_number: fleetUnitNumber,
      asset_type: fleetAssetType,
      asset_description: fleetAssetDescription,

      reported_by: fleetReportedBy,
      driver_operator: fleetDriverOperator,
      project_name: fleetProject,
      job_number: fleetJobNumber,
      location: fleetLocation,

      defect_identified: fleetDefectIdentified,
      defect_category: fleetDefectCategory,
      priority: fleetPriority,
      out_of_service: fleetOutOfService,

      assigned_to: fleetAssignedTo,
      due_date: fleetDueDate || null,

      repair_vendor: fleetRepairVendor,
      repair_contact: fleetRepairContact,
      fixed_by: fleetFixedBy,
      fixed_date: fleetFixedDate || null,
      repair_notes: fleetRepairNotes,

      invoice_number: fleetInvoiceNumber,
      receipt_number: fleetReceiptNumber,
      repair_cost: fleetRepairCost,
      paid_status: fleetPaidStatus,
      paid_date: fleetPaidDate || null,

      photos: uploadedPhotoUrls.join(", "),
      supervisor_signoff_name: fleetSupervisorSignoffName,
      supervisor_signature: fleetSupervisorSignature,

      status: statusValue,
      closed_date: statusValue === "Closed" ? new Date().toISOString().split("T")[0] : null,
    };

    const res = await fetch(`${SUPABASE_URL}/rest/v1/fleet_defects`, {
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
      throw new Error(text || "Fleet defect save failed");
    }

    setFleetUnitNumber("");
    setFleetAssetType("");
    setFleetAssetDescription("");

    setFleetReportedBy("");
    setFleetDriverOperator("");
    setFleetProject("");
    setFleetJobNumber("");
    setFleetLocation("");

    setFleetDefectIdentified("");
    setFleetDefectCategory("");
    setFleetPriority("");
    setFleetOutOfService("");

    setFleetAssignedTo("");
    setFleetDueDate("");

    setFleetRepairVendor("");
    setFleetRepairContact("");
    setFleetFixedBy("");
    setFleetFixedDate("");
    setFleetRepairNotes("");

    setFleetInvoiceNumber("");
    setFleetReceiptNumber("");
    setFleetRepairCost("");
    setFleetPaidStatus("");
    setFleetPaidDate("");

    setFleetPhotos([]);
    setFleetSupervisorSignoffName("");
    setFleetSupervisorSignature("");
    setFleetStatus("Open");
    setEditingFleetDefectId(null);
    fleetSupervisorSigRef.current?.clear();

    setMessage("Fleet defect saved.");
    await loadRecords();
  } catch (error) {
    setMessage(`Could not save fleet defect: ${error.message}`);
  } finally {
    setLoading(false);
  }
}

async function updateFleetDefect(statusValue = fleetStatus || "In Progress") {
  if (!editingFleetDefectId) {
    setMessage("Please select a fleet defect to update first.");
    return;
  }

  setLoading(true);
  setMessage("");

  try {
    const payload = {
      asset_type: fleetAssetType,
      asset_description: fleetAssetDescription,

      reported_by: fleetReportedBy,
      driver_operator: fleetDriverOperator,
      project_name: fleetProject,
      job_number: fleetJobNumber,
      location: fleetLocation,

      defect_identified: fleetDefectIdentified,
      defect_category: fleetDefectCategory,
      priority: fleetPriority,
      out_of_service: fleetOutOfService,

      assigned_to: fleetAssignedTo,
      due_date: fleetDueDate || null,

      repair_vendor: fleetRepairVendor,
      repair_contact: fleetRepairContact,
      fixed_by: fleetFixedBy,
      fixed_date: fleetFixedDate || null,
      repair_notes: fleetRepairNotes,

      invoice_number: fleetInvoiceNumber,
      receipt_number: fleetReceiptNumber,
      repair_cost: fleetRepairCost,
      paid_status: fleetPaidStatus,
      paid_date: fleetPaidDate || null,

      supervisor_signoff_name: fleetSupervisorSignoffName,
      supervisor_signature: fleetSupervisorSignature,

      status: statusValue,
      closed_date:
        statusValue === "Closed"
          ? new Date().toISOString().split("T")[0]
          : null,
    };

    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/fleet_defects?id=eq.${editingFleetDefectId}`,
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
      throw new Error(text || "Fleet defect update failed");
    }

    setEditingFleetDefectId(null);
    setFleetStatus("Open");
    setMessage(
      statusValue === "Closed"
        ? "Fleet defect closed."
        : "Fleet defect updated."
    );

    await loadRecords();
  } catch (error) {
    setMessage(`Could not update fleet defect: ${error.message}`);
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

     pilot_certificate_type: rpasPilotCertificateType,
pilot_certificate_number: rpasPilotCertificateNumber,
rpas_weight_category: rpasWeightCategory,
site_authorization_confirmed: rpasSiteAuthorizationConfirmed,
client_approval_confirmed: rpasClientApprovalConfirmed,
controlled_airspace: rpasControlledAirspace,
nav_drone_authorization: rpasNavDroneAuthorization,
notams_checked: rpasNotamsChecked,
nearby_aerodromes_checked: rpasNearbyAerodromesChecked,
max_planned_altitude: rpasMaxPlannedAltitude,
vlos_confirmed: rpasVlosConfirmed,
separation_from_people_confirmed: rpasSeparationFromPeopleConfirmed,
takeoff_landing_zone_confirmed: rpasTakeoffLandingZoneConfirmed,
communication_plan_confirmed: rpasCommunicationPlanConfirmed,
flight_log_recorded: rpasFlightLogRecorded,
imagery_backed_up: rpasImageryBackedUp,
equipment_secured: rpasEquipmentSecured,
supervisor_notified_complete: rpasSupervisorNotifiedComplete,
battery_ids_used: rpasBatteryIdsUsed,

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

setRpasPilotCertificateType("");
setRpasPilotCertificateNumber("");
setRpasWeightCategory("");
setRpasSiteAuthorizationConfirmed("");
setRpasClientApprovalConfirmed("");
setRpasControlledAirspace("");
setRpasNavDroneAuthorization("");
setRpasNotamsChecked("");
setRpasNearbyAerodromesChecked("");
setRpasMaxPlannedAltitude("");
setRpasVlosConfirmed("");
setRpasSeparationFromPeopleConfirmed("");
setRpasTakeoffLandingZoneConfirmed("");
setRpasCommunicationPlanConfirmed("");
setRpasFlightLogRecorded("");
setRpasImageryBackedUp("");
setRpasEquipmentSecured("");
setRpasSupervisorNotifiedComplete("");
setRpasBatteryIdsUsed("");
   
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

async function downloadFlraPdf(item) {
  const doc = new jsPDF();

  doc.setFillColor(15, 47, 102);
  doc.rect(0, 0, 210, 32, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(20);
  doc.text(`${companyName} FLRA`, 14, 18);

  doc.setFontSize(10);
  doc.text("Field Level Risk Assessment / Daily Hazard Assessment", 14, 25);

  doc.setTextColor(0, 0, 0);
  let y = 42;

  const checkPage = (neededSpace = 20) => {
    if (y + neededSpace > 280) {
      doc.addPage();
      y = 20;
    }
  };

  const addSection = (title) => {
    checkPage(18);

    doc.setFillColor(226, 232, 240);
    doc.rect(14, y - 6, 182, 10, "F");
    doc.setTextColor(15, 47, 102);
    doc.setFontSize(13);
    doc.text(title, 16, y);
    doc.setTextColor(0, 0, 0);
    y += 10;
  };

  const addLine = (label, value) => {
    checkPage(12);

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

  const getImageFormat = (base64) => {
    if (String(base64).startsWith("data:image/png")) return "PNG";
    return "JPEG";
  };

  const parseSignatures = (value) => {
    if (!value) return [];

    if (Array.isArray(value)) return value;

    try {
      const parsed = JSON.parse(value);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  };

  addSection("General Information");

  addLine("Project", item.project_name);
  addLine("Worker Name", item.worker_name);
  addLine("Supervisor / Foreman", item.supervisor_name);
  addLine("Date", item.flra_date);
  addLine("Time", item.flra_time);
  addLine("Location", item.location);
  addLine("Job #", item.job_number);
  addLine("Guest / Subcontractor / Visitor", item.guest_visitor_name);
  addLine("Scope of Work for Today", item.work_scope);
  addLine("Nearest Medical Facility", item.nearest_hospital);
  addLine("Muster Location", item.muster_point);
  addLine("Fire Rating", item.fire_rating);
  addLine("Weather", item.weather);
  addLine("Country", item.country);
  addLine("Completed By", item.completed_by);
  addLine("Created", formatDateTime(item.created_at));

  addSection("Pre-Job Hazards");

  addLine("Pre-Job Hazards Selected", item.pre_job_hazards);

  addSection("Workers Rights");

  addLine(
    "Workers have reviewed Right to Know, Right to Participate, and Right to Refuse Unsafe Work",
    item.workers_rights_reviewed
  );

  addSection("General Hazards");

  addLine("General Hazards Selected", item.general_hazards);

  addSection("Critical Risk / Controls");

  addLine("Critical Risk Category", item.critical_risks);
  addLine("Task Steps", item.task_steps);
  addLine("Hazards Identified", item.hazards_identified);
  addLine("Controls Required", item.controls_required);
  addLine("PPE Required", item.ppe_required);
  addLine("Equipment Used", item.equipment_used);

  addSection("Hazard Assessment");

  addLine("Task", item.hazard_task);
  addLine("Hazard", item.hazard_hazard);
  addLine("Risk — Severity + Probability", item.hazard_risk);
  addLine("Controls", item.hazard_controls);

  addSection("Pre-Job Review");

  addLine("Locates Reviewed", item.locates_reviewed);
  addLine("Permits Reviewed", item.permits_reviewed);
  addLine("Emergency Plan Reviewed", item.emergency_plan_reviewed);

  addSection("Additional Notes");

  addLine("Additional Notes", item.additional_notes);
  addLine("Status", item.status);

  const workerSignatures = parseSignatures(item.worker_signatures);

  addSection("Crew Sign-Off");

  if (workerSignatures.length === 0) {
    addLine("Crew Sign-Off", "No worker signatures recorded.");
  }

  for (const worker of workerSignatures) {
    checkPage(35);

    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);

    addLine("Worker", worker.name);
    addLine("Role", worker.role);
    addLine("Signed At", formatDateTime(worker.signedAt));

    if (
      worker.signature &&
      String(worker.signature).startsWith("data:image")
    ) {
      checkPage(40);
      doc.text("Signature:", 14, y);
      y += 4;
      doc.addImage(worker.signature, "PNG", 14, y, 75, 28);
      y += 36;
    }

    y += 4;
  }

  addSection("Supervisor / Foreman Sign-Off");

  addLine("Supervisor / Foreman", item.supervisor_name);

  if (
    item.supervisor_signature &&
    String(item.supervisor_signature).startsWith("data:image")
  ) {
    checkPage(45);
    doc.text("Supervisor Signature:", 14, y);
    y += 4;
    doc.addImage(item.supervisor_signature, "PNG", 14, y, 80, 30);
    y += 38;
  } else {
    addLine("Supervisor Signature", "No supervisor signature recorded.");
  }

  const photoUrls = item.photos
    ? String(item.photos)
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

        checkPage(80);

        doc.addImage(base64, getImageFormat(base64), 14, y, 90, 65);
        y += 75;
      } catch (err) {
        addLine("Photo", "Failed to load");
      }
    }
  }

  doc.save(
    `baac-flra-${item.project_name || "record"}-${item.flra_date || "date"}.pdf`
  );
}
  
async function downloadFleetDefectPdf(item) {
  const doc = new jsPDF();

  doc.setFillColor(15, 47, 102);
  doc.rect(0, 0, 210, 32, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(20);
  doc.text(`${companyName} FLEET DEFECT REPORT`, 14, 18);

  doc.setFontSize(10);
  doc.text("Fleet Defect / Repair Closeout Record", 14, 25);

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

  addSection("Defect Information");

  addLine("Unit #", item.unit_number);
  addLine("Asset Type", item.asset_type);
  addLine("Asset Description", item.asset_description);
  addLine("Reported By", item.reported_by);
  addLine("Driver / Operator", item.driver_operator);
  addLine("Project / Job", item.project_name);
  addLine("Job #", item.job_number);
  addLine("Location", item.location);
  addLine("Defect Identified", item.defect_identified);
  addLine("Defect Category", item.defect_category);
  addLine("Priority", item.priority);
  addLine("Out of Service", item.out_of_service);
  addLine("Status", item.status);
  addLine("Created", formatDateTime(item.created_at));

  addSection("Maintenance / Repair");

  addLine("Assigned To", item.assigned_to);
  addLine("Due Date", item.due_date);
  addLine("Repair Vendor / Company", item.repair_vendor);
  addLine("Repair Contact", item.repair_contact);
  addLine("Fixed By", item.fixed_by);
  addLine("Fixed Date", item.fixed_date);
  addLine("Repair Notes", item.repair_notes);
  addLine("Invoice #", item.invoice_number);
  addLine("Receipt #", item.receipt_number);
  addLine("Repair Cost", item.repair_cost);
  addLine("Paid Status", item.paid_status);
  addLine("Paid Date", item.paid_date);
  addLine("Closed Date", item.closed_date);

  addSection("Supervisor Sign-Off");

  addLine("Supervisor Sign-Off Name", item.supervisor_signoff_name);

  if (
    item.supervisor_signature &&
    String(item.supervisor_signature).startsWith("data:image")
  ) {
    if (y > 230) {
      doc.addPage();
      y = 20;
    }

    doc.text("Supervisor Signature:", 14, y);
    y += 5;
    doc.addImage(item.supervisor_signature, "PNG", 14, y, 80, 30);
    y += 40;
  }

  const photoUrls = item.photos
    ? String(item.photos)
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

        const imageFormat = String(base64).startsWith("data:image/png")
          ? "PNG"
          : "JPEG";

        doc.addImage(base64, imageFormat, 14, y, 90, 65);
        y += 75;
      } catch (err) {
        addLine("Photo", "Failed to load");
      }
    }
  }

  doc.save(`baac-fleet-defect-${item.unit_number || "report"}.pdf`);
}
  
async function downloadRpasPdf(operation) {
  const doc = new jsPDF();

  doc.setFillColor(15, 47, 102);
  doc.rect(0, 0, 210, 32, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(20);
  doc.text(`${companyName} RPAS OPERATIONS CHECKLIST`, 14, 18);

  doc.setFontSize(10);
  doc.text("Pre-Flight / Post-Flight Checklist", 14, 25);

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

  addSection("Flight Information");

  addLine("Project", operation.project_name);
  addLine("Flight Date", operation.flight_date);
  addLine("Pilot in Command", operation.pilot_in_command);
  addLine("Visual Observer", operation.visual_observer);
  addLine("RPAS Make / Model", operation.rpas_make_model);
  addLine("RPAS Registration #", operation.rpas_registration);
  addLine("Operation Type", operation.operation_type);
  addLine("Flight Location", operation.flight_location);
 addSection("Pilot / Authorization");

addLine("Pilot Certificate Type", operation.pilot_certificate_type);
addLine("Pilot Certificate Number", operation.pilot_certificate_number);
addLine("RPAS Weight Category", operation.rpas_weight_category);
addLine("Site Authorization Confirmed", operation.site_authorization_confirmed);
addLine("Client Approval Confirmed", operation.client_approval_confirmed);

addSection("Airspace / Flight Planning");

addLine("Controlled Airspace", operation.controlled_airspace);
addLine("NAV Drone / Authorization Required", operation.nav_drone_authorization);
addLine("NOTAMs Checked", operation.notams_checked);
addLine(
  "Nearby Aerodromes / Heliports Checked",
  operation.nearby_aerodromes_checked
);
addLine("Maximum Planned Altitude", operation.max_planned_altitude);
addLine("VLOS Confirmed", operation.vlos_confirmed);
addLine(
  "Separation From People / Workers Confirmed",
  operation.separation_from_people_confirmed
);
addLine(
  "Takeoff / Landing Zone Confirmed Clear",
  operation.takeoff_landing_zone_confirmed
);
addLine("Communication Plan Confirmed", operation.communication_plan_confirmed);

addSection("Post-Operation Records");

addLine("Flight Log Recorded", operation.flight_log_recorded);
addLine("Imagery / Flight Data Backed Up", operation.imagery_backed_up);
addLine("Equipment Secured After Flight", operation.equipment_secured);
addLine(
  "Supervisor Notified Flight Complete",
  operation.supervisor_notified_complete
);
addLine("Battery IDs Used", operation.battery_ids_used);
  addLine("Status", operation.status);
  addLine("Created", formatDateTime(operation.created_at));

  addSection("Pre-Flight Checklist");

  addLine("Airspace Checked", operation.airspace_checked);
  addLine("Weather Checked", operation.weather_checked);
  addLine("Site Survey Complete", operation.site_survey_complete);
  addLine(
    "Emergency / Flyaway Procedure Reviewed",
    operation.emergency_procedure_reviewed
  );
  addLine("Battery Condition Checked", operation.battery_condition_checked);
  addLine(
    "Propellers / Airframe Checked",
    operation.propellers_airframe_checked
  );
  addLine(
    "Controller / Firmware / Compass / GPS Checked",
    operation.controller_firmware_gps_checked
  );
  addLine("Crew Briefing Complete", operation.crew_briefing_complete);
  addLine("Pre-Flight Notes", operation.preflight_notes);

  if (
    operation.preflight_signature &&
    String(operation.preflight_signature).startsWith("data:image")
  ) {
    if (y > 230) {
      doc.addPage();
      y = 20;
    }

    doc.text("Pre-Flight Pilot Signature:", 14, y);
    y += 5;
    doc.addImage(operation.preflight_signature, "PNG", 14, y, 80, 30);
    y += 40;
  }

  addSection("Post-Flight Checklist");

  addLine("Post-Flight Condition", operation.postflight_condition);
  addLine(
    "Incidents / Damage / Abnormalities",
    operation.incidents_damage_abnormalities
  );
  addLine(
    "Battery Logs / Maintenance Notes",
    operation.battery_logs_maintenance_notes
  );
  addLine("Post-Flight Notes", operation.postflight_notes);

  if (
    operation.postflight_signature &&
    String(operation.postflight_signature).startsWith("data:image")
  ) {
    if (y > 230) {
      doc.addPage();
      y = 20;
    }

    doc.text("Post-Flight Pilot Signature:", 14, y);
    y += 5;
    doc.addImage(operation.postflight_signature, "PNG", 14, y, 80, 30);
    y += 40;
  }

  const photoUrls = operation.photos
    ? String(operation.photos)
        .split(",")
        .map((p) => p.trim())
        .filter(Boolean)
    : [];

  if (photoUrls.length > 0) {
    addSection("Photos / Attachments");

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

        const imageFormat = String(base64).startsWith("data:image/png")
          ? "PNG"
          : "JPEG";

        doc.addImage(base64, imageFormat, 14, y, 90, 65);
        y += 75;
      } catch (err) {
        addLine("Photo", "Failed to load");
      }
    }
  }

  doc.save(`baac-rpas-operation-${operation.flight_date || "report"}.pdf`);
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

function downloadDailyActivityPdf() {
  const doc = new jsPDF();

  const today = new Date().toISOString().split("T")[0];

  doc.setFillColor(15, 47, 102);
  doc.rect(0, 0, 210, 32, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(20);
  doc.text(`${companyName} DAILY ACTIVITY REPORT`, 14, 18);

  doc.setFontSize(10);
  doc.text(`Generated: ${new Date().toLocaleString()}`, 14, 25);

  doc.setTextColor(0, 0, 0);

  let y = 45;

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
    y += 12;
  };

  const addLine = (label, value) => {
    if (y > 270) {
      doc.addPage();
      y = 20;
    }

    doc.setFontSize(11);
    doc.text(`${label}: ${value ?? "-"}`, 14, y);
    y += 8;
  };

  addSection("Today’s Activity");

  addLine("Date", today);
  addLine("Worker Forms Today", todayWorkerRecords.length);
  addLine("Hazards / Observations Today", todayHazardReports.length);
  addLine("Stop Work Today", todayStopWorkRecords.length);
  addLine("RPAS Operations Today", todayRpasOperations.length);
  addLine("Open Corrective Actions", openCorrectiveActions.length);
  addLine("Overdue Corrective Actions", overdueRecords.length);

  addSection("Summary");

  addLine(
    "Report Notes",
    "This report summarizes BAAC Shield activity recorded in the system for the current day."
  );

  doc.save(`baac-daily-activity-report-${today}.pdf`);
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

const dailyActivityStart = new Date(`${dailyActivityDate}T00:00:00`);
const dailyActivityEnd = new Date(`${dailyActivityDate}T23:59:59`);

const isWithinDailyActivityDate = (value) => {
  if (!value) return false;

  const date = new Date(value);

  return date >= dailyActivityStart && date <= dailyActivityEnd;
};
 
const todayWorkerRecords = records.filter((record) => {
  return isWithinDailyActivityDate(record.submitted_at);
});

const todayHazardReports = hazardReports.filter((report) => {
  return isWithinDailyActivityDate(report.created_at || report.submitted_at);
});

const todayStopWorkRecords = records.filter((record) => {
  return record.stop_work === true && isWithinDailyActivityDate(record.submitted_at);
});
const todayRpasOperations = rpasOperations.filter((operation) => {
  return isWithinDailyActivityDate(
    operation.created_at || operation.submitted_at || operation.flight_date
  );
});

const todayToolboxTalks = toolboxTalks.filter((talk) => {
  return isWithinDailyActivityDate(
    talk.talk_date || talk.created_at || talk.submitted_at
  );
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
 const filteredRpasOperations = rpasOperations.filter((operation) => {
  const operationDate = operation.flight_date
    ? new Date(`${operation.flight_date}T00:00:00`)
    : operation.created_at
    ? new Date(operation.created_at)
    : null;

  if (!operationDate) return false;

  const startDate = toolboxStartDateFilter
    ? new Date(`${toolboxStartDateFilter}T00:00:00`)
    : null;

  const endDate = toolboxEndDateFilter
    ? new Date(`${toolboxEndDateFilter}T23:59:59`)
    : null;

  return (
    (!startDate || operationDate >= startDate) &&
    (!endDate || operationDate <= endDate)
  );
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
async function submitQaqcInspection() {
  setLoading(true);
  setMessage("");

  try {
    const uploadedPhotoUrls = await uploadPhotosToSupabase(
      qaqcInspectionPhotos
    );

    const { error } = await supabase
      .from("qaqc_work_inspections")
      .insert([
        {
          project_id: qaqcProjectId,
          inspection_location: qaqcWorksite,
          work_type: qaqcWorkPackage,
          contractor_crew: qaqcSupplier,
          inspection_date: qaqcDeliveryDate || null,
          inspector_name: qaqcReceivedBy,
          inspection_result: qaqcPoNumber,
          work_inspected: qaqcPackingSlip,
          deficiency_details: qaqcDeliveryTicket,
          corrective_action_assigned_to: qaqcCarrierDriver,
          inspection_notes: qaqcManufacturer,
          inspection_status: qaqcStorageLocation,
          photo_urls: uploadedPhotoUrls.join(", "),
          inspector_signature: reviewSupervisorSignature,
        },
      ]);

    if (error) throw error;

   setMessage("QA/QC work inspection submitted successfully.");
    setQaqcProjectId("");
setQaqcWorksite("");
setQaqcWorkPackage("");
setQaqcSupplier("");
setQaqcDeliveryDate("");
setQaqcReceivedBy("");
setQaqcPoNumber("");
setQaqcPackingSlip("");
setQaqcDeliveryTicket("");
setQaqcCarrierDriver("");
setQaqcManufacturer("");
setQaqcStorageLocation("");
setQaqcInspectionPhotos([]);
setReviewSupervisorSignature("");
supervisorSigRef.current?.clear();
    await loadRecords();
alert("QA/QC work inspection submitted successfully.");
  } catch (error) {
setMessage(`Could not submit inspection: ${error.message}`);
alert(`Could not submit inspection: ${error.message}`);
  } finally {
    setLoading(false);
  }
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
  onClick={() => setActiveTab("fleet")}
  style={{
    padding: "10px 14px",
    borderRadius: 10,
    border: "1px solid #cbd5e1",
    background: activeTab === "fleet" ? "#123d82" : "white",
    color: activeTab === "fleet" ? "white" : "#0f172a",
    fontWeight: "bold",
    cursor: "pointer",
  }}
>
 Fleet Defect Report
</button>
    <button
  type="button"
  onClick={() => setActiveTab("siteDocs")}
  style={{
    padding: "10px 14px",
    borderRadius: 10,
    border: "1px solid #cbd5e1",
    background: activeTab === "siteDocs" ? "#123d82" : "white",
    color: activeTab === "siteDocs" ? "white" : "#0f172a",
    fontWeight: "bold",
    cursor: "pointer",
  }}
>
  Field Docs
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
<button
  type="button"
  onClick={() => requestProtectedTab("recordsCenter")}
  style={{
    padding: "10px 14px",
    borderRadius: 10,
    border: "1px solid #cbd5e1",
    background: activeTab === "recordsCenter" ? "#123d82" : "white",
    color: activeTab === "recordsCenter" ? "white" : "#0f172a",
    fontWeight: "bold",
    cursor: "pointer",
  }}
>
  Records Center
</button>
  <button
  type="button"
  onClick={() => setActiveTab("qaqc")}
  style={{
    padding: "10px 14px",
    borderRadius: 10,
    border: "1px solid #cbd5e1",
    background: activeTab === "qaqc" ? "#123d82" : "white",
    color: activeTab === "qaqc" ? "white" : "#0f172a",
    fontWeight: "bold",
    cursor: "pointer",
  }}
>
  QA/QC
</button> 
<button
  type="button"
  onClick={() => setActiveTab("crm")}
  style={{
    padding: "10px 14px",
    borderRadius: 10,
    border: "1px solid #cbd5e1",
    background: activeTab === "crm" ? "#123d82" : "white",
    color: activeTab === "crm" ? "white" : "#0f172a",
    fontWeight: "bold",
    cursor: "pointer",
  }}
>
  CRM
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

{activeTab === "siteDocs" && (
  <div
    style={{
      background: "white",
      padding: 20,
      borderRadius: 16,
      marginBottom: 20,
      boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
    }}
  >
    <h2 style={{ marginTop: 0 }}>Field Docs</h2>
    <p style={{ color: "#64748b", marginTop: -8 }}>
      Choose a field safety form to complete.
    </p>

    <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 20 }}>
      {[
        "FLRA / Daily Risk Assessment",
        "Supervisor Site Inspection",
        "Incident / Near Miss Report",
        "Witness Statement",
        "Equipment Inspection",
        "Document / Audit Evidence",
      ].map((type) => (
        <button
          key={type}
          type="button"
          onClick={() => setFieldDocType(type)}
          style={{
            padding: "10px 14px",
            borderRadius: 999,
            border: "none",
            background: fieldDocType === type ? "#123d82" : "#e2e8f0",
            color: fieldDocType === type ? "white" : "#0f172a",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          {type}
        </button>
      ))}
    </div>

    {!fieldDocType && (
      <div
        style={{
          padding: 16,
          borderRadius: 12,
          background: "#f8fafc",
          border: "1px solid #e2e8f0",
        }}
      >
        Select a form above to begin.
      </div>
    )}

    {fieldDocType === "FLRA / Daily Risk Assessment" && (
      <div>
        <h3>FLRA / Daily Field Level Risk Assessment</h3>

        <div style={{ display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))" }}>
          <div>
            <label>Project *</label>
            <br />
            <input
              value={flraProject}
              onChange={(e) => setFlraProject(e.target.value)}
              style={{ width: "100%", padding: 12, marginTop: 6, borderRadius: 10, border: "1px solid #cbd5e1" }}
            />
          </div>
<div>
  <label>Worker Name *</label>
  <br />
  <input
    value={flraWorkerName}
    onChange={(e) => setFlraWorkerName(e.target.value)}
    style={{ width: "100%", padding: 12, marginTop: 6, borderRadius: 10, border: "1px solid #cbd5e1" }}
  />
</div>
          <div>
            <label>Date *</label>
            <br />
            <input
              type="date"
              value={flraDate}
              onChange={(e) => setFlraDate(e.target.value)}
              style={{ width: "100%", padding: 12, marginTop: 6, borderRadius: 10, border: "1px solid #cbd5e1" }}
            />
          </div>

          <div>
            <label>Time</label>
            <br />
            <input
              value={flraTime}
              onChange={(e) => setFlraTime(e.target.value)}
              placeholder="Example: 7:00 AM"
              style={{ width: "100%", padding: 12, marginTop: 6, borderRadius: 10, border: "1px solid #cbd5e1" }}
            />
          </div>

          <div>
            <label>Location</label>
            <br />
            <input
              value={flraLocation}
              onChange={(e) => setFlraLocation(e.target.value)}
              style={{ width: "100%", padding: 12, marginTop: 6, borderRadius: 10, border: "1px solid #cbd5e1" }}
            />
          </div>
<div>
  <label>Job # *</label>
  <br />
  <input
    value={flraJobNumber}
    onChange={(e) => setFlraJobNumber(e.target.value)}
    style={{ width: "100%", padding: 12, marginTop: 6, borderRadius: 10, border: "1px solid #cbd5e1" }}
  />
</div>

<div>
  <label>Guest / Subcontractor / Visitor Name</label>
  <br />
  <input
    value={flraGuestVisitorName}
    onChange={(e) => setFlraGuestVisitorName(e.target.value)}
    style={{ width: "100%", padding: 12, marginTop: 6, borderRadius: 10, border: "1px solid #cbd5e1" }}
  />
</div>
          <div>
            <label>Supervisor / Lead *</label>
            <br />
            <input
              value={flraSupervisor}
              onChange={(e) => setFlraSupervisor(e.target.value)}
              style={{ width: "100%", padding: 12, marginTop: 6, borderRadius: 10, border: "1px solid #cbd5e1" }}
            />
          </div>

          <div>
            <label>Completed By</label>
            <br />
            <input
              value={flraCompletedBy}
              onChange={(e) => setFlraCompletedBy(e.target.value)}
              style={{ width: "100%", padding: 12, marginTop: 6, borderRadius: 10, border: "1px solid #cbd5e1" }}
            />
          </div>
        </div>
<div>
  <label>Nearest Medical Facility *</label>
  <br />
  <input
    value={flraNearestHospital}
    onChange={(e) => setFlraNearestHospital(e.target.value)}
    style={{ width: "100%", padding: 12, marginTop: 6, borderRadius: 10, border: "1px solid #cbd5e1" }}
  />
</div>

<div>
  <label>Muster Location *</label>
  <br />
  <input
    value={flraMusterPoint}
    onChange={(e) => setFlraMusterPoint(e.target.value)}
    style={{ width: "100%", padding: 12, marginTop: 6, borderRadius: 10, border: "1px solid #cbd5e1" }}
  />
</div>

<div>
  <label>Fire Rating</label>
  <br />
  <input
    value={flraFireRating}
    onChange={(e) => setFlraFireRating(e.target.value)}
    style={{ width: "100%", padding: 12, marginTop: 6, borderRadius: 10, border: "1px solid #cbd5e1" }}
  />
</div>

<div>
  <label>Weather *</label>
  <br />
  <input
    value={flraWeather}
    onChange={(e) => setFlraWeather(e.target.value)}
    style={{ width: "100%", padding: 12, marginTop: 6, borderRadius: 10, border: "1px solid #cbd5e1" }}
  />
</div>

<div>
  <label>Country *</label>
  <br />
  <input
    value={flraCountry}
    onChange={(e) => setFlraCountry(e.target.value)}
    placeholder="Canada"
    style={{ width: "100%", padding: 12, marginTop: 6, borderRadius: 10, border: "1px solid #cbd5e1" }}
  />
</div>
        <div style={{ marginTop: 12 }}>
          <label>Crew Members</label>
          <textarea
            value={flraCrewMembers}
            onChange={(e) => setFlraCrewMembers(e.target.value)}
            placeholder="List crew members"
            style={{ width: "100%", minHeight: 70, padding: 12, marginTop: 6, borderRadius: 10, border: "1px solid #cbd5e1" }}
          />
        </div>

        <h4 style={{ marginTop: 20 }}>Pre-Job Hazards</h4>

        <div style={{ display: "grid", gap: 8, gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
          {[
            "Overhead power",
            "Underground facilities",
            "Locked/tagged out",
            "Working Alone",
            "Ground Disturbance",
            "New/Young Worker",
            "H2S",
            "Confined Space",
            "Driving to/from Site",
            "Facilities",
          ].map((hazard) => (
            <label key={hazard} style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <input
                type="checkbox"
                checked={flraPreJobHazards.includes(hazard)}
                onChange={() => toggleFlraCheckbox(hazard, setFlraPreJobHazards)}
              />
              {hazard}
            </label>
          ))}
        </div>
                    <h4 style={{ marginTop: 20 }}>General Hazards</h4>

        <div style={{ display: "grid", gap: 8, gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
          {[
            "Dry Conditions",
            "Ground Workers",
            "Open Excavation",
            "New to Task",
            "Repetitive Motion",
            "Working in Congested Areas",
            "Traffic Control",
            "Poor Visibility",
            "Flying Objects",
            "Slips / Trips / Falls",
            "Buried Utilities",
            "Weather Conditions",
            "Working from Heights",
            "Smoke",
            "Suspended Loads",
            "Pinch / Crush Points",
            "Fire Potential",
            "Wildlife",
            "Traffic",
            "Moving Parts",
            "Spills",
            "Chemicals",
            "Sharp Edges",
            "Noise",
            "Working with Chemicals",
            "Extreme Temperatures",
            "Electronic Distractions",
            "Narrow Roads",
            "Poor Road / Site Conditions",
            "Congested Worksite",
            "Condition of Tools / Equipment",
            "Awkward Body Positions",
            "Vehicle Walk Around Check",
          ].map((hazard) => (
            <label key={hazard} style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <input
                type="checkbox"
                checked={flraGeneralHazards.includes(hazard)}
                onChange={() => toggleFlraCheckbox(hazard, setFlraGeneralHazards)}
              />
              {hazard}
            </label>
          ))}
        </div>

        <h4 style={{ marginTop: 20 }}>Workers Rights</h4>

        <div
          style={{
            padding: 14,
            borderRadius: 12,
            background: "#f8fafc",
            border: "1px solid #e2e8f0",
            marginBottom: 12,
          }}
        >
          <div style={{ fontWeight: "bold", marginBottom: 8 }}>
            Workers have reviewed and understand:
          </div>

          <ul style={{ marginTop: 0 }}>
            <li>Right to KNOW about workplace hazards</li>
            <li>Right to PARTICIPATE in the safety program</li>
            <li>Right to REFUSE unsafe work</li>
          </ul>

          <label>Workers Rights Reviewed? *</label>
          <br />
          <select
            value={flraWorkersRightsReviewed}
            onChange={(e) => setFlraWorkersRightsReviewed(e.target.value)}
            style={{
              width: "100%",
              padding: 12,
              marginTop: 6,
              borderRadius: 10,
              border: "1px solid #cbd5e1",
              background: "white",
            }}
          >
            <option value="">Select</option>
            <option>Yes</option>
            <option>No</option>
          </select>
        </div>
            
        <div style={{ marginTop: 12 }}>
          <label>Work Scope *</label>
          <textarea
            value={flraWorkScope}
            onChange={(e) => setFlraWorkScope(e.target.value)}
            placeholder="Describe today's work"
            style={{ width: "100%", minHeight: 80, padding: 12, marginTop: 6, borderRadius: 10, border: "1px solid #cbd5e1" }}
          />
        </div>

        <div style={{ display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", marginTop: 12 }}>
          <div>
            <label>Task Steps</label>
            <textarea
              value={flraTaskSteps}
              onChange={(e) => setFlraTaskSteps(e.target.value)}
              style={{ width: "100%", minHeight: 90, padding: 12, marginTop: 6, borderRadius: 10, border: "1px solid #cbd5e1" }}
            />
          </div>

          <div>
            <label>Hazards Identified</label>
            <textarea
              value={flraHazards}
              onChange={(e) => setFlraHazards(e.target.value)}
              style={{ width: "100%", minHeight: 90, padding: 12, marginTop: 6, borderRadius: 10, border: "1px solid #cbd5e1" }}
            />
          </div>

         <div>
  <label>Critical Risk Category</label>
  <br />
  <select
    value={flraCriticalRisks}
    onChange={(e) => setFlraCriticalRisks(e.target.value)}
    style={{
      width: "100%",
      padding: 12,
      marginTop: 6,
      borderRadius: 10,
      border: "1px solid #cbd5e1",
      background: "white",
    }}
  >
    <option value="">Select Critical Risk</option>
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
            <label>Controls Required</label>
            <textarea
              value={flraControls}
              onChange={(e) => setFlraControls(e.target.value)}
              placeholder="Exclusion zones, spotter, PPE, permits, locates, etc."
              style={{ width: "100%", minHeight: 90, padding: 12, marginTop: 6, borderRadius: 10, border: "1px solid #cbd5e1" }}
            />
          </div>
        </div>

        <h4 style={{ marginTop: 20 }}>Hazard Assessment</h4>

        <div style={{ display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
          <div>
            <label>Task *</label>
            <br />
            <input
              value={flraHazardTask}
              onChange={(e) => setFlraHazardTask(e.target.value)}
              style={{ width: "100%", padding: 12, marginTop: 6, borderRadius: 10, border: "1px solid #cbd5e1" }}
            />
          </div>

          <div>
            <label>Hazard *</label>
            <br />
            <input
              value={flraHazardHazard}
              onChange={(e) => setFlraHazardHazard(e.target.value)}
              style={{ width: "100%", padding: 12, marginTop: 6, borderRadius: 10, border: "1px solid #cbd5e1" }}
            />
          </div>

          <div>
            <label>Risk — Severity + Probability</label>
            <br />
            <select
              value={flraHazardRisk}
              onChange={(e) => setFlraHazardRisk(e.target.value)}
              style={{ width: "100%", padding: 12, marginTop: 6, borderRadius: 10, border: "1px solid #cbd5e1", background: "white" }}
            >
              <option value="">Select</option>
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
              <option>Critical</option>
            </select>
          </div>
        </div>

        <div style={{ marginTop: 12 }}>
          <label>Controls *</label>
          <br />
          <textarea
            value={flraHazardControls}
            onChange={(e) => setFlraHazardControls(e.target.value)}
            rows={3}
            style={{ width: "100%", padding: 12, marginTop: 6, borderRadius: 10, border: "1px solid #cbd5e1" }}
          />
        </div>
            
        <div style={{ display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", marginTop: 12 }}>
          <div>
            <label>PPE Required</label>
            <textarea
              value={flraPpe}
              onChange={(e) => setFlraPpe(e.target.value)}
              style={{ width: "100%", minHeight: 70, padding: 12, marginTop: 6, borderRadius: 10, border: "1px solid #cbd5e1" }}
            />
          </div>

          <div>
            <label>Equipment Used</label>
            <textarea
              value={flraEquipment}
              onChange={(e) => setFlraEquipment(e.target.value)}
              style={{ width: "100%", minHeight: 70, padding: 12, marginTop: 6, borderRadius: 10, border: "1px solid #cbd5e1" }}
            />
          </div>
        </div>

        <h4 style={{ marginTop: 20 }}>Pre-Job Review</h4>

        <div style={{ display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
          <div>
            <label>Locates Reviewed?</label>
            <select
              value={flraLocatesReviewed}
              onChange={(e) => setFlraLocatesReviewed(e.target.value)}
              style={{ width: "100%", padding: 12, marginTop: 6, borderRadius: 10, border: "1px solid #cbd5e1" }}
            >
              <option value="">Select</option>
              <option>Yes</option>
              <option>No</option>
              <option>N/A</option>
            </select>
          </div>

          <div>
            <label>Permits Reviewed?</label>
            <select
              value={flraPermitsReviewed}
              onChange={(e) => setFlraPermitsReviewed(e.target.value)}
              style={{ width: "100%", padding: 12, marginTop: 6, borderRadius: 10, border: "1px solid #cbd5e1" }}
            >
              <option value="">Select</option>
              <option>Yes</option>
              <option>No</option>
              <option>N/A</option>
            </select>
          </div>

          <div>
            <label>Emergency Plan Reviewed?</label>
            <select
              value={flraEmergencyPlanReviewed}
              onChange={(e) => setFlraEmergencyPlanReviewed(e.target.value)}
              style={{ width: "100%", padding: 12, marginTop: 6, borderRadius: 10, border: "1px solid #cbd5e1" }}
            >
              <option value="">Select</option>
              <option>Yes</option>
              <option>No</option>
              <option>N/A</option>
            </select>
          </div>

          <div>
            <label>Muster Point</label>
            <input
              value={flraMusterPoint}
              onChange={(e) => setFlraMusterPoint(e.target.value)}
              style={{ width: "100%", padding: 12, marginTop: 6, borderRadius: 10, border: "1px solid #cbd5e1" }}
            />
          </div>

          <div>
            <label>Nearest Hospital</label>
            <input
              value={flraNearestHospital}
              onChange={(e) => setFlraNearestHospital(e.target.value)}
              style={{ width: "100%", padding: 12, marginTop: 6, borderRadius: 10, border: "1px solid #cbd5e1" }}
            />
          </div>
        </div>

        <div style={{ marginTop: 12 }}>
          <label>Additional Notes</label>
          <textarea
            value={flraAdditionalNotes}
            onChange={(e) => setFlraAdditionalNotes(e.target.value)}
            style={{ width: "100%", minHeight: 80, padding: 12, marginTop: 6, borderRadius: 10, border: "1px solid #cbd5e1" }}
          />
        </div>

        <div style={{ marginTop: 20 }}>
          <h4>Crew Sign-Off</h4>

          {flraWorkerSignatures.map((worker, index) => (
            <div
              key={`${flraResetKey}-${index}`}
              style={{
                padding: 14,
                borderRadius: 12,
                border: "1px solid #e2e8f0",
                background: "#f8fafc",
                marginBottom: 12,
              }}
            >
              <div style={{ display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
                <div>
                  <label>Worker Name</label>
                  <br />
                  <input
                    value={worker.name}
                    onChange={(e) => {
                      const updated = [...flraWorkerSignatures];
                      updated[index].name = e.target.value;
                      setFlraWorkerSignatures(updated);
                    }}
                    style={{ width: "100%", padding: 12, marginTop: 6, borderRadius: 10, border: "1px solid #cbd5e1" }}
                  />
                </div>

                <div>
                  <label>Role</label>
                  <br />
                  <input
                    value={worker.role}
                    onChange={(e) => {
                      const updated = [...flraWorkerSignatures];
                      updated[index].role = e.target.value;
                      setFlraWorkerSignatures(updated);
                    }}
                    placeholder="Foreman, Labourer, Operator, Visitor"
                    style={{ width: "100%", padding: 12, marginTop: 6, borderRadius: 10, border: "1px solid #cbd5e1" }}
                  />
                </div>
              </div>

              <div style={{ marginTop: 12 }}>
                <label>Worker Signature</label>
                <AttendeeSignatureBox
                  onSave={(signature) => {
                    const updated = [...flraWorkerSignatures];
                    updated[index].signature = signature;
                    updated[index].signedAt = new Date().toISOString();
                    setFlraWorkerSignatures(updated);
                  }}
                  onClear={() => {
                    const updated = [...flraWorkerSignatures];
                    updated[index].signature = "";
                    updated[index].signedAt = "";
                    setFlraWorkerSignatures(updated);
                  }}
                />
              </div>

              {flraWorkerSignatures.length > 1 && (
                <button
                  type="button"
                  onClick={() => {
                    setFlraWorkerSignatures((prev) =>
                      prev.filter((_, workerIndex) => workerIndex !== index)
                    );
                  }}
                  style={{
                    marginTop: 10,
                    padding: "8px 12px",
                    borderRadius: 10,
                    border: "1px solid #fecaca",
                    background: "#fee2e2",
                    color: "#991b1b",
                    fontWeight: "bold",
                    cursor: "pointer",
                  }}
                >
                  Remove Worker
                </button>
              )}
            </div>
          ))}

          <button
            type="button"
            onClick={() =>
              setFlraWorkerSignatures((prev) => [
                ...prev,
                { name: "", role: "", signature: "", signedAt: "" },
              ])
            }
            style={{
              padding: "10px 14px",
              borderRadius: 10,
              border: "1px solid #123d82",
              background: "white",
              color: "#123d82",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Add Worker
          </button>
        </div>
            
        <div style={{ marginTop: 16 }}>
          <label>Supervisor Signature</label>
          <SignatureBox
            sigRef={flraSupervisorSigRef}
            onSave={setFlraSupervisorSignature}
          />
        </div>
            
        <div style={{ marginTop: 12 }}>
          <label>Photos - JPG or PNG only</label>
          <br />
          <input
            type="file"
            multiple
            accept="image/png,image/jpeg,image/jpg"
            onChange={(e) => setFlraPhotos(Array.from(e.target.files || []))}
          />
        </div>

        <button
          type="button"
          onClick={saveFlraRecord}
          disabled={loading}
          style={{
            marginTop: 16,
            padding: "12px 16px",
            borderRadius: 10,
            border: "none",
            background: "#123d82",
            color: "white",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Submit FLRA
        </button>

        <div style={{ marginTop: 24 }}>
          <h3>Submitted FLRAs</h3>

          {flraRecords.length === 0 ? (
            <p style={{ color: "#64748b" }}>No FLRA records found.</p>
          ) : (
            <div style={{ display: "grid", gap: 10 }}>
              {flraRecords.map((item) => (
                <div
                  key={item.id}
                  style={{
                    padding: 14,
                    borderRadius: 12,
                    border: "1px solid #e2e8f0",
                    background: "#f8fafc",
                  }}
                >
                  <div style={{ fontWeight: "bold", color: "#0f172a" }}>
                    {item.project_name || "No Project"} — {item.flra_date || "-"}
                  </div>

                  <div style={{ fontSize: 13, color: "#475569", marginTop: 4 }}>
                    Supervisor / Lead: {item.supervisor_name || "-"}
                  </div>

                  <div style={{ fontSize: 13, color: "#475569", marginTop: 4 }}>
                    Location: {item.location || "-"}
                  </div>

                  <div style={{ fontSize: 13, color: "#475569", marginTop: 4 }}>
                    Work Scope: {item.work_scope || "-"}
                  </div>

                  <div style={{ fontSize: 13, color: "#475569", marginTop: 4 }}>
                    Critical Risks: {item.critical_risks || "-"}
                  </div>

                  <div style={{ fontSize: 13, color: "#475569", marginTop: 4 }}>
                    Controls: {item.controls_required || "-"}
                  </div>

                  {item.photos && (
                    <div style={{ marginTop: 8 }}>
                      {String(item.photos)
                        .split(",")
                        .map((url, index) => (
                          <a
                            key={url}
                            href={url.trim()}
                            target="_blank"
                            rel="noreferrer"
                            style={{
                              display: "inline-block",
                              marginRight: 10,
                              color: "#123d82",
                              fontWeight: "bold",
                            }}
                          >
                            View Photo {index + 1}
                          </a>
                        ))}
                    </div>
                  )}

                  <div style={{ marginTop: 8 }}>
                    <span
                      style={{
                        display: "inline-block",
                        padding: "5px 10px",
                        borderRadius: 999,
                        background: "#16a34a",
                        color: "white",
                        fontSize: 12,
                        fontWeight: "bold",
                      }}
                    >
                      {item.status || "Submitted"}
                    </span>
                  </div>
                      <div style={{ marginTop: 10 }}>
  <button
    type="button"
    onClick={() => downloadFlraPdf(item)}
    style={{
      padding: "8px 12px",
      borderRadius: 10,
      border: "none",
      background: "#123d82",
      color: "white",
      fontWeight: "bold",
      cursor: "pointer",
    }}
  >
    Download PDF
  </button>
</div>
                </div>
              ))}
            </div>
          )}
        </div>
            
      </div>
    )}
  </div>
)}

{activeTab === "fleet" && (
  <div
    style={{
      display: "grid",
      gap: 16,
      background: "white",
      padding: 18,
      borderRadius: 16,
      boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
    }}
  >
   <h2 style={{ marginTop: 0, color: "#0f2f66" }}>
  Fleet Defect / Repair Report
</h2>
    
    <div
      style={{
        padding: 14,
        border: "1px solid #dbeafe",
        borderRadius: 12,
        background: "#f8fafc",
      }}
    >
      <h3 style={{ marginTop: 0 }}>Fleet Defect / Repair Entry</h3>

      <div style={{ display: "grid", gap: 12 }}>
        <div>
  <label>Unit # *</label>
  <br />
  <select
    value={fleetUnitNumber}
    onChange={(e) => {
      const selectedUnit = e.target.value;
      setFleetUnitNumber(selectedUnit);

      const selectedAsset = fleetAssets.find(
        (asset) => asset.unit_number === selectedUnit
      );

      if (selectedAsset) {
        setFleetAssetType(selectedAsset.asset_type || "");
        setFleetAssetDescription(selectedAsset.description || "");
      }
    }}
    style={{
      width: "100%",
      padding: 12,
      marginTop: 6,
      borderRadius: 10,
      border: "1px solid #cbd5e1",
      background: "white",
    }}
  >
    <option value="">Select unit</option>
    {fleetAssets
      .filter((asset) => asset.status !== "Inactive")
      .map((asset) => (
        <option key={asset.id} value={asset.unit_number}>
          {asset.unit_number}
        </option>
      ))}
  </select>
</div>

        <div>
          <label>Asset Type</label>
          <br />
          <select
            value={fleetAssetType}
            onChange={(e) => setFleetAssetType(e.target.value)}
            style={{
              width: "100%",
              padding: 12,
              marginTop: 6,
              borderRadius: 10,
              border: "1px solid #cbd5e1",
            }}
          >
            <option value="">Select type</option>
            <option value="Truck">Truck</option>
            <option value="Trailer">Trailer</option>
            <option value="Equipment">Equipment</option>
            <option value="Compressor">Compressor</option>
            <option value="Tool">Tool</option>
            <option value="Heavy Machine">Heavy Machine</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label>Asset Description</label>
          <br />
          <input
            value={fleetAssetDescription}
            onChange={(e) => setFleetAssetDescription(e.target.value)}
            placeholder="Example: Ford F-550 service truck"
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
          <label>Reported By</label>
          <br />
          <input
            value={fleetReportedBy}
            onChange={(e) => setFleetReportedBy(e.target.value)}
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
          <label>Driver / Operator</label>
          <br />
          <input
            value={fleetDriverOperator}
            onChange={(e) => setFleetDriverOperator(e.target.value)}
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
          <label>Project / Job</label>
          <br />
          <input
            value={fleetProject}
            onChange={(e) => setFleetProject(e.target.value)}
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
            value={fleetLocation}
            onChange={(e) => setFleetLocation(e.target.value)}
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
          <label>Defect Identified *</label>
          <br />
          <textarea
            value={fleetDefectIdentified}
            onChange={(e) => setFleetDefectIdentified(e.target.value)}
            placeholder="Describe the defect, damage, repair needed, or issue."
            rows={4}
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
            value={fleetPriority}
            onChange={(e) => setFleetPriority(e.target.value)}
            style={{
              width: "100%",
              padding: 12,
              marginTop: 6,
              borderRadius: 10,
              border: "1px solid #cbd5e1",
            }}
          >
            <option value="">Select priority</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
            <option value="Critical">Critical</option>
          </select>
        </div>

        <div>
          <label>Out of Service?</label>
          <br />
          <select
            value={fleetOutOfService}
            onChange={(e) => setFleetOutOfService(e.target.value)}
            style={{
              width: "100%",
              padding: 12,
              marginTop: 6,
              borderRadius: 10,
              border: "1px solid #cbd5e1",
            }}
          >
            <option value="">Select</option>
            <option value="No">No</option>
            <option value="Yes">Yes</option>
          </select>
        </div>

<div>
 <label>Photos - JPG or PNG only</label>
  <br />
  <input
    type="file"
    multiple
accept="image/png,image/jpeg,image/jpg"
    onChange={(e) => setFleetPhotos(Array.from(e.target.files || []))}
    style={{
      width: "100%",
      padding: 12,
      marginTop: 6,
      borderRadius: 10,
      border: "1px solid #cbd5e1",
      background: "white",
    }}
  />

  {fleetPhotos.length > 0 && (
    <p style={{ fontSize: 13, color: "#475569", marginTop: 6 }}>
      {fleetPhotos.length} photo(s) selected.
    </p>
  )}
</div>
 <div
  style={{
    marginTop: 20,
    padding: 14,
    border: "1px solid #cbd5e1",
    borderRadius: 12,
    background: "#f8fafc",
  }}
>
  <h3 style={{ marginTop: 0 }}>Maintenance / Repair Update</h3>

  <div style={{ display: "grid", gap: 12 }}>
    <div>
      <label>Assigned To</label>
      <input
        value={fleetAssignedTo}
        onChange={(e) => setFleetAssignedTo(e.target.value)}
        style={{ width: "100%", padding: 10, marginTop: 4 }}
      />
    </div>

    <div>
      <label>Repair Vendor / Company</label>
      <input
        value={fleetRepairVendor}
        onChange={(e) => setFleetRepairVendor(e.target.value)}
        style={{ width: "100%", padding: 10, marginTop: 4 }}
      />
    </div>

    <div>
      <label>Repair Contact</label>
      <input
        value={fleetRepairContact}
        onChange={(e) => setFleetRepairContact(e.target.value)}
        style={{ width: "100%", padding: 10, marginTop: 4 }}
      />
    </div>

    <div>
      <label>Fixed By</label>
      <input
        value={fleetFixedBy}
        onChange={(e) => setFleetFixedBy(e.target.value)}
        style={{ width: "100%", padding: 10, marginTop: 4 }}
      />
    </div>

    <div>
      <label>Fixed Date</label>
      <input
        type="date"
        value={fleetFixedDate}
        onChange={(e) => setFleetFixedDate(e.target.value)}
        style={{ width: "100%", padding: 10, marginTop: 4 }}
      />
    </div>

    <div>
      <label>Repair Notes</label>
      <textarea
        value={fleetRepairNotes}
        onChange={(e) => setFleetRepairNotes(e.target.value)}
        rows={4}
        style={{ width: "100%", padding: 10, marginTop: 4 }}
      />
    </div>

    <div>
      <label>Invoice #</label>
      <input
        value={fleetInvoiceNumber}
        onChange={(e) => setFleetInvoiceNumber(e.target.value)}
        style={{ width: "100%", padding: 10, marginTop: 4 }}
      />
    </div>

    <div>
      <label>Receipt #</label>
      <input
        value={fleetReceiptNumber}
        onChange={(e) => setFleetReceiptNumber(e.target.value)}
        style={{ width: "100%", padding: 10, marginTop: 4 }}
      />
    </div>

    <div>
      <label>Repair Cost</label>
      <input
        value={fleetRepairCost}
        onChange={(e) => setFleetRepairCost(e.target.value)}
        placeholder="Example: 450.00"
        style={{ width: "100%", padding: 10, marginTop: 4 }}
      />
    </div>

    <div>
      <label>Paid Status</label>
      <select
        value={fleetPaidStatus}
        onChange={(e) => setFleetPaidStatus(e.target.value)}
        style={{ width: "100%", padding: 10, marginTop: 4 }}
      >
        <option value="">Select</option>
        <option value="Not Paid">Not Paid</option>
        <option value="Pending">Pending</option>
        <option value="Paid">Paid</option>
      </select>
    </div>

    <div>
      <label>Paid Date</label>
      <input
        type="date"
        value={fleetPaidDate}
        onChange={(e) => setFleetPaidDate(e.target.value)}
        style={{ width: "100%", padding: 10, marginTop: 4 }}
      />
    </div>

    <div>
      <label>Supervisor Sign-Off Name</label>
      <input
        value={fleetSupervisorSignoffName}
        onChange={(e) => setFleetSupervisorSignoffName(e.target.value)}
        style={{ width: "100%", padding: 10, marginTop: 4 }}
      />
    </div>

    <div>
      <label>Supervisor Signature</label>
      <SignatureBox
        sigRef={fleetSupervisorSigRef}
        onSave={setFleetSupervisorSignature}
      />
    </div>
  </div>
</div>           
        <button
          type="button"
          onClick={() => saveFleetDefect("Open")}
          disabled={loading}
          style={{
            padding: "12px 16px",
            background: "#123d82",
            color: "white",
            border: "none",
            borderRadius: 10,
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Save Fleet Defect
        </button>
            {editingFleetDefectId && (
  <div
    style={{
      display: "flex",
      gap: 10,
      flexWrap: "wrap",
      marginTop: 10,
    }}
  >
    <button
      type="button"
      onClick={() => updateFleetDefect("In Progress")}
      disabled={loading}
      style={{
        padding: "12px 18px",
        background: "#2563eb",
        color: "white",
        border: "none",
        borderRadius: 10,
        fontWeight: "bold",
        cursor: "pointer",
      }}
    >
      Save Update
    </button>

    <button
      type="button"
      onClick={() => updateFleetDefect("Closed")}
      disabled={loading}
      style={{
        padding: "12px 18px",
        background: "#16a34a",
        color: "white",
        border: "none",
        borderRadius: 10,
        fontWeight: "bold",
        cursor: "pointer",
      }}
    >
      Close Defect
    </button>

    <button
      type="button"
      onClick={() => {
        setEditingFleetDefectId(null);
        setFleetStatus("Open");
        setMessage("Fleet update cancelled.");
      }}
      style={{
        padding: "12px 18px",
        background: "#64748b",
        color: "white",
        border: "none",
        borderRadius: 10,
        fontWeight: "bold",
        cursor: "pointer",
      }}
    >
      Cancel Update
    </button>
  </div>
)}
      </div>
    </div>

    <div
      style={{
        padding: 14,
        border: "1px solid #dbeafe",
        borderRadius: 12,
        background: "#f8fafc",
      }}
    >
      <h3 style={{ marginTop: 0 }}>Fleet Defects Register</h3>
<div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 12 }}>
  {["All", "Open", "In Progress", "Closed"].map((filter) => (
    <button
      key={filter}
      type="button"
      onClick={() => setFleetDefectFilter(filter)}
      style={{
        padding: "8px 12px",
        borderRadius: 999,
        border: "none",
        background: fleetDefectFilter === filter ? "#123d82" : "#e2e8f0",
        color: fleetDefectFilter === filter ? "white" : "#0f172a",
        fontWeight: "bold",
        cursor: "pointer",
      }}
    >
      {filter}
    </button>
  ))}
</div>

      {fleetDefects.length === 0 ? (
        <p style={{ color: "#64748b" }}>No fleet defects found.</p>
      ) : (
        <div style={{ display: "grid", gap: 10 }}>
      {fleetDefects
  .filter((item) =>
    fleetDefectFilter === "All"
      ? true
      : (item.status || "Open") === fleetDefectFilter
  )
 .map((item) => (
            <div
              key={item.id}
              style={{
                padding: 12,
                border: "1px solid #cbd5e1",
                borderRadius: 10,
                background: "white",
              }}
            >
              <div style={{ fontWeight: "bold" }}>
                Unit #: {item.unit_number || "-"}
              </div>

              <div style={{ fontSize: 13, color: "#475569" }}>
                Type: {item.asset_type || "-"}
              </div>

              <div style={{ fontSize: 13, color: "#475569" }}>
                Defect: {item.defect_identified || "-"}
              </div>

              <div style={{ fontSize: 13, color: "#475569" }}>
                Assigned To: {item.assigned_to || "-"}
              </div>

              <div style={{ fontSize: 13, color: "#475569" }}>
                Due Date: {item.due_date || "-"}
              </div>

              <div style={{ marginTop: 6 }}>
  <span
    style={{
      display: "inline-block",
      padding: "7px 14px",
      borderRadius: 999,
  fontSize: 14,
      fontWeight: "bold",
      color: "white",
      background:
        item.status === "Closed"
          ? "#16a34a"
          : item.status === "In Progress"
          ? "#2563eb"
          : item.out_of_service === "Yes"
          ? "#dc2626"
          : "#f97316",
    }}
  >
    Status: {item.status || "Open"}
  </span>

  {item.out_of_service === "Yes" && (
    <span
      style={{
        display: "inline-block",
        padding: "4px 10px",
        borderRadius: 999,
        fontSize: 12,
        fontWeight: "bold",
        color: "white",
        background: "#dc2626",
        marginLeft: 8,
      }}
    >
      Out of Service
    </span>
  )}
</div>

<div style={{ fontSize: 13, color: "#475569", marginTop: 6 }}>
  Assigned To: {item.assigned_to || "-"}
</div>

<div style={{ fontSize: 13, color: "#475569" }}>
  Repair Vendor / Company: {item.repair_vendor || "-"}
</div>

<div style={{ fontSize: 13, color: "#475569" }}>
  Fixed By: {item.fixed_by || "-"}
</div>

<div style={{ fontSize: 13, color: "#475569" }}>
  Fixed Date: {item.fixed_date || "-"}
</div>

<div style={{ fontSize: 13, color: "#475569" }}>
  Repair Cost: {item.repair_cost || "-"}
</div>

<div style={{ fontSize: 13, color: "#475569" }}>
  Paid Status: {item.paid_status || "-"}
</div>

<div style={{ fontSize: 13, color: "#475569" }}>
  Paid Date: {item.paid_date || "-"}
</div>

{item.repair_notes && (
  <div style={{ fontSize: 13, color: "#475569", marginTop: 6 }}>
    Repair Notes: {item.repair_notes}
  </div>
)}

                {item.photos && (
  <div style={{ fontSize: 13, color: "#475569", marginTop: 6 }}>
    Photos:{" "}
    {String(item.photos)
      .split(",")
      .map((photo) => photo.trim())
      .filter(Boolean)
      .map((photo, index) => (
        <a
          key={photo}
          href={photo}
          target="_blank"
          rel="noreferrer"
          style={{
            color: "#123d82",
            fontWeight: "bold",
            marginRight: 10,
          }}
        >
          View Photo {index + 1}
        </a>
      ))}
  </div>
)}

<div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 12 }}>
  <button
    type="button"
    onClick={() => downloadFleetDefectPdf(item)}
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

  <button
    type="button"
    onClick={() => {
      setFleetUnitNumber(item.unit_number || "");
      setFleetAssetType(item.asset_type || "");
      setFleetAssetDescription(item.asset_description || "");
      setFleetReportedBy(item.reported_by || "");
      setFleetDriverOperator(item.driver_operator || "");
      setFleetProject(item.project_name || "");
      setFleetJobNumber(item.job_number || "");
      setFleetLocation(item.location || "");
      setFleetDefectIdentified(item.defect_identified || "");
      setFleetDefectCategory(item.defect_category || "");
      setFleetPriority(item.priority || "");
      setFleetOutOfService(item.out_of_service || "");
      setFleetAssignedTo(item.assigned_to || "");
      setFleetDueDate(item.due_date || "");
      setFleetRepairVendor(item.repair_vendor || "");
      setFleetRepairContact(item.repair_contact || "");
      setFleetFixedBy(item.fixed_by || "");
      setFleetFixedDate(item.fixed_date || "");
      setFleetRepairNotes(item.repair_notes || "");
      setFleetInvoiceNumber(item.invoice_number || "");
      setFleetReceiptNumber(item.receipt_number || "");
      setFleetRepairCost(item.repair_cost || "");
      setFleetPaidStatus(item.paid_status || "");
      setFleetPaidDate(item.paid_date || "");
      setFleetStatus(item.status || "Open");
      setEditingFleetDefectId(item.id);

      window.scrollTo({ top: 0, behavior: "smooth" });
    }}
    style={{
      padding: "8px 12px",
      background: "#f97316",
      color: "white",
      border: "none",
      borderRadius: 8,
      fontWeight: "bold",
      cursor: "pointer",
    }}
  >
    Update / Close
  </button>
</div>
    
            </div>
))}
        </div>
      )}
    </div>
  </div>
)}

{activeTab === "rpas" && (
  <div
    key={rpasResetKey}
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
    display: "flex",
    flexWrap: "wrap",
    gap: 10,
    padding: 12,
    border: "1px solid #cbd5e1",
    borderRadius: 12,
    background: "#f8fafc",
  }}
>
  <a
    href="/rpas-jha.pdf"
    download
    style={{
      padding: "10px 14px",
      background: "#123d82",
      color: "white",
      borderRadius: 8,
      fontWeight: "bold",
      textDecoration: "none",
      display: "inline-block",
    }}
  >
    Download RPAS JHA
  </a>

  <a
    href="/rpas-sop.pdf"
    download
    style={{
      padding: "10px 14px",
      background: "#123d82",
      color: "white",
      borderRadius: 8,
      fontWeight: "bold",
      textDecoration: "none",
      display: "inline-block",
    }}
  >
    Download RPAS SOP
  </a>
</div>
    <div
      style={{
        padding: 14,
        border: "1px solid #e2e8f0",
        borderRadius: 12,
        background: "#f8fafc",
      }}
    >
      <h3 style={{ marginTop: 0 }}>Flight Information</h3>
<h4 style={{ marginBottom: 0 }}>Pilot / Authorization</h4>

<label>Pilot Certificate Type</label>
<select
  value={rpasPilotCertificateType}
  onChange={(e) => setRpasPilotCertificateType(e.target.value)}
  style={{
    width: "100%",
    padding: 12,
    marginTop: 6,
    marginBottom: 10,
    borderRadius: 10,
    border: "1px solid #cbd5e1",
  }}
>
  <option value="">Select certificate type</option>
  <option value="Basic">Basic</option>
  <option value="Advanced">Advanced</option>
  <option value="Level 1 Complex">Level 1 Complex</option>
  <option value="N/A">N/A</option>
</select>

<label>Pilot Certificate Number</label>
<input
  value={rpasPilotCertificateNumber}
  onChange={(e) => setRpasPilotCertificateNumber(e.target.value)}
  placeholder="Enter pilot certificate number"
  style={{
    width: "100%",
    padding: 12,
    marginTop: 6,
    marginBottom: 10,
    borderRadius: 10,
    border: "1px solid #cbd5e1",
  }}
/>

<label>RPAS Weight Category</label>
<select
  value={rpasWeightCategory}
  onChange={(e) => setRpasWeightCategory(e.target.value)}
  style={{
    width: "100%",
    padding: 12,
    marginTop: 6,
    marginBottom: 10,
    borderRadius: 10,
    border: "1px solid #cbd5e1",
  }}
>
  <option value="">Select weight category</option>
  <option value="Under 250 g">Under 250 g</option>
  <option value="250 g to 25 kg">250 g to 25 kg</option>
  <option value="Over 25 kg">Over 25 kg</option>
</select>

<label>Site Authorization Confirmed</label>
<select
  value={rpasSiteAuthorizationConfirmed}
  onChange={(e) => setRpasSiteAuthorizationConfirmed(e.target.value)}
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

<label>Client Approval Confirmed</label>
<select
  value={rpasClientApprovalConfirmed}
  onChange={(e) => setRpasClientApprovalConfirmed(e.target.value)}
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

<h4 style={{ marginBottom: 0 }}>Airspace / Flight Planning</h4>

<label>Controlled Airspace?</label>
<select
  value={rpasControlledAirspace}
  onChange={(e) => setRpasControlledAirspace(e.target.value)}
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
  <option value="Unknown">Unknown</option>
</select>

<label>NAV Drone / Authorization Required?</label>
<select
  value={rpasNavDroneAuthorization}
  onChange={(e) => setRpasNavDroneAuthorization(e.target.value)}
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

<label>NOTAMs Checked</label>
<select
  value={rpasNotamsChecked}
  onChange={(e) => setRpasNotamsChecked(e.target.value)}
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

<label>Nearby Aerodromes / Heliports Checked</label>
<select
  value={rpasNearbyAerodromesChecked}
  onChange={(e) => setRpasNearbyAerodromesChecked(e.target.value)}
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

<label>Maximum Planned Altitude</label>
<input
  value={rpasMaxPlannedAltitude}
  onChange={(e) => setRpasMaxPlannedAltitude(e.target.value)}
  placeholder="Example: 120 m AGL"
  style={{
    width: "100%",
    padding: 12,
    marginTop: 6,
    marginBottom: 10,
    borderRadius: 10,
    border: "1px solid #cbd5e1",
  }}
/>

<label>VLOS Confirmed</label>
<select
  value={rpasVlosConfirmed}
  onChange={(e) => setRpasVlosConfirmed(e.target.value)}
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
</select>
 <label>Separation From People / Workers Confirmed</label>
<select
  value={rpasSeparationFromPeopleConfirmed}
  onChange={(e) => setRpasSeparationFromPeopleConfirmed(e.target.value)}
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

<label>Takeoff / Landing Zone Confirmed Clear</label>
<select
  value={rpasTakeoffLandingZoneConfirmed}
  onChange={(e) => setRpasTakeoffLandingZoneConfirmed(e.target.value)}
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

<label>Communication Plan Confirmed</label>
<select
  value={rpasCommunicationPlanConfirmed}
  onChange={(e) => setRpasCommunicationPlanConfirmed(e.target.value)}
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

<h4 style={{ marginBottom: 0 }}>Post-Operation Records</h4>

<label>Flight Log Recorded</label>
<select
  value={rpasFlightLogRecorded}
  onChange={(e) => setRpasFlightLogRecorded(e.target.value)}
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

<label>Imagery / Flight Data Backed Up</label>
<select
  value={rpasImageryBackedUp}
  onChange={(e) => setRpasImageryBackedUp(e.target.value)}
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

<label>Equipment Secured After Flight</label>
<select
  value={rpasEquipmentSecured}
  onChange={(e) => setRpasEquipmentSecured(e.target.value)}
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

<label>Supervisor Notified Flight Complete</label>
<select
  value={rpasSupervisorNotifiedComplete}
  onChange={(e) => setRpasSupervisorNotifiedComplete(e.target.value)}
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

<label>Battery IDs Used</label>
<input
  value={rpasBatteryIdsUsed}
  onChange={(e) => setRpasBatteryIdsUsed(e.target.value)}
  placeholder="Example: BATT-01, BATT-02"
  style={{
    width: "100%",
    padding: 12,
    marginTop: 6,
    marginBottom: 10,
    borderRadius: 10,
    border: "1px solid #cbd5e1",
  }}
/>
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
            gap: 20,
            width: "100%",
            maxWidth: "100%",
            overflowX: "hidden",
            boxSizing: "border-box",
          }}
        >
          <div>
            <h2 style={{ margin: 0 }}>Safety Dashboard</h2>
            <p style={{ marginTop: 6, color: "#64748b" }}>
              Clean overview of field safety activity, open actions, and recent safety documents.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gap: 12,
              gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            }}
          >
            <div style={{ padding: 16, borderRadius: 14, background: "#f8fafc", border: "1px solid #e2e8f0" }}>
              <div style={{ fontSize: 13, color: "#64748b" }}>Worker Forms</div>
              <div style={{ fontSize: 30, fontWeight: "bold", color: "#123d82" }}>{records.length}</div>
            </div>

            <div style={{ padding: 16, borderRadius: 14, background: "#f8fafc", border: "1px solid #e2e8f0" }}>
              <div style={{ fontSize: 13, color: "#64748b" }}>FLRAs Today</div>
              <div style={{ fontSize: 30, fontWeight: "bold", color: "#123d82" }}>
                {
                  flraRecords.filter(
                    (item) => item.flra_date === new Date().toISOString().split("T")[0]
                  ).length
                }
              </div>
            </div>

            <div style={{ padding: 16, borderRadius: 14, background: "#f8fafc", border: "1px solid #e2e8f0" }}>
              <div style={{ fontSize: 13, color: "#64748b" }}>Open Hazards</div>
              <div style={{ fontSize: 30, fontWeight: "bold", color: "#dc2626" }}>
                {
                  hazardReports.filter(
                    (item) => (item.action_status || item.status || "Open") !== "Closed"
                  ).length
                }
              </div>
            </div>

            <div style={{ padding: 16, borderRadius: 14, background: "#f8fafc", border: "1px solid #e2e8f0" }}>
              <div style={{ fontSize: 13, color: "#64748b" }}>Open COR Actions</div>
              <div style={{ fontSize: 30, fontWeight: "bold", color: "#dc2626" }}>
                {corActions.filter((item) => (item.status || "Open") !== "Closed").length}
              </div>
            </div>

            <div style={{ padding: 16, borderRadius: 14, background: "#f8fafc", border: "1px solid #e2e8f0" }}>
              <div style={{ fontSize: 13, color: "#64748b" }}>Open Fleet Defects</div>
              <div style={{ fontSize: 30, fontWeight: "bold", color: "#dc2626" }}>
                {fleetDefects.filter((item) => (item.status || "Open") !== "Closed").length}
              </div>
            </div>
          </div>

          <div
            style={{
              padding: 18,
              borderRadius: 16,
              border: "1px solid #dbeafe",
              background: "#eff6ff",
            }}
          >
            <h3 style={{ marginTop: 0 }}>Field Safety Documents</h3>

            <div style={{ display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
              <div style={{ padding: 14, borderRadius: 12, background: "white", border: "1px solid #dbeafe" }}>
                <div style={{ fontWeight: "bold", color: "#0f172a" }}>FLRA / Daily Risk Assessments</div>
                <div style={{ marginTop: 6, color: "#475569", fontSize: 13 }}>
                  Total: {flraRecords.length} | Today: {
                    flraRecords.filter(
                      (item) => item.flra_date === new Date().toISOString().split("T")[0]
                    ).length
                  }
                </div>
                <button
                  type="button"
                  onClick={() => setActiveTab("siteDocs")}
                  style={{ marginTop: 10, padding: "8px 12px", borderRadius: 10, border: "none", background: "#123d82", color: "white", fontWeight: "bold", cursor: "pointer" }}
                >
                  Open Field Docs
                </button>
              </div>

              <div style={{ padding: 14, borderRadius: 12, background: "white", border: "1px solid #dbeafe" }}>
                <div style={{ fontWeight: "bold", color: "#0f172a" }}>Toolbox / Tailgate Meetings</div>
                <div style={{ marginTop: 6, color: "#475569", fontSize: 13 }}>
                  Total: {toolboxTalks.length}
                </div>
                <button
                  type="button"
                  onClick={() => setActiveTab("toolbox")}
                  style={{ marginTop: 10, padding: "8px 12px", borderRadius: 10, border: "none", background: "#123d82", color: "white", fontWeight: "bold", cursor: "pointer" }}
                >
                  Open Toolbox
                </button>
              </div>

              <div style={{ padding: 14, borderRadius: 12, background: "white", border: "1px solid #dbeafe" }}>
                <div style={{ fontWeight: "bold", color: "#0f172a" }}>Upcoming Field Docs</div>
                <div style={{ marginTop: 6, color: "#475569", fontSize: 13 }}>
                  Site Inspections, Incident Reports, Witness Statements, Equipment Inspections.
                </div>
              </div>
            </div>

            <h4 style={{ marginBottom: 8 }}>Recent FLRAs</h4>

            {flraRecords.length === 0 ? (
              <p style={{ color: "#64748b" }}>No FLRA records found.</p>
            ) : (
              <div style={{ display: "grid", gap: 10 }}>
                {flraRecords.slice(0, 3).map((item) => (
                  <div
                    key={item.id}
                    style={{
                      padding: 14,
                      borderRadius: 12,
                      border: "1px solid #e2e8f0",
                      background: "white",
                    }}
                  >
                    <div style={{ fontWeight: "bold", color: "#0f172a" }}>
                      {item.project_name || "No Project"} — {item.flra_date || "-"}
                    </div>
                    <div style={{ fontSize: 13, color: "#475569", marginTop: 4 }}>
                      Supervisor / Foreman: {item.supervisor_name || "-"}
                    </div>
                    <div style={{ fontSize: 13, color: "#475569", marginTop: 4 }}>
                      Critical Risk: {item.critical_risks || "-"}
                    </div>
                    <button
                      type="button"
                      onClick={() => downloadFlraPdf(item)}
                      style={{ marginTop: 10, padding: "8px 12px", borderRadius: 10, border: "none", background: "#123d82", color: "white", fontWeight: "bold", cursor: "pointer" }}
                    >
                      Download PDF
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div
            style={{
              padding: 18,
              borderRadius: 16,
              border: "1px solid #fee2e2",
              background: "#fff7ed",
            }}
          >
            <h3 style={{ marginTop: 0 }}>Action Tracking</h3>

            <div style={{ display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))" }}>
              <div style={{ padding: 14, borderRadius: 12, background: "white", border: "1px solid #fed7aa" }}>
                <div style={{ fontWeight: "bold" }}>Hazard IDs / Observations</div>
                <div style={{ marginTop: 6, color: "#475569", fontSize: 13 }}>
                  Open: {
                    hazardReports.filter(
                      (item) => (item.action_status || item.status || "Open") !== "Closed"
                    ).length
                  } | Total: {hazardReports.length}
                </div>
                <button
                  type="button"
                  onClick={() => setActiveTab("hazard")}
                  style={{ marginTop: 10, padding: "8px 12px", borderRadius: 10, border: "none", background: "#ea580c", color: "white", fontWeight: "bold", cursor: "pointer" }}
                >
                  Open Hazards
                </button>
              </div>

              <div style={{ padding: 14, borderRadius: 12, background: "white", border: "1px solid #fed7aa" }}>
                <div style={{ fontWeight: "bold" }}>COR Corrective Actions</div>
                <div style={{ marginTop: 6, color: "#475569", fontSize: 13 }}>
                  Open: {corActions.filter((item) => (item.status || "Open") !== "Closed").length} | Total: {corActions.length}
                </div>
                <button
                  type="button"
                  onClick={() => setActiveTab("cor")}
                  style={{ marginTop: 10, padding: "8px 12px", borderRadius: 10, border: "none", background: "#ea580c", color: "white", fontWeight: "bold", cursor: "pointer" }}
                >
                  Open COR Actions
                </button>
              </div>
            </div>
          </div>

          <div
            style={{
              padding: 18,
              borderRadius: 16,
              border: "1px solid #e2e8f0",
              background: "#f8fafc",
            }}
          >
            <h3 style={{ marginTop: 0 }}>Equipment / Fleet</h3>

            <div style={{ display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))" }}>
              <div style={{ padding: 14, borderRadius: 12, background: "white", border: "1px solid #e2e8f0" }}>
                <div style={{ fontWeight: "bold" }}>Fleet Defects</div>
                <div style={{ marginTop: 6, color: "#475569", fontSize: 13 }}>
                  Open: {fleetDefects.filter((item) => (item.status || "Open") !== "Closed").length} | Total: {fleetDefects.length}
                </div>
                <button
                  type="button"
                  onClick={() => setActiveTab("fleet")}
                  style={{ marginTop: 10, padding: "8px 12px", borderRadius: 10, border: "none", background: "#123d82", color: "white", fontWeight: "bold", cursor: "pointer" }}
                >
                  Open Fleet
                </button>
              </div>

              <div style={{ padding: 14, borderRadius: 12, background: "white", border: "1px solid #e2e8f0" }}>
                <div style={{ fontWeight: "bold" }}>Equipment Inspections</div>
                <div style={{ marginTop: 6, color: "#475569", fontSize: 13 }}>
                  Coming soon under Field Docs.
                </div>
              </div>
            </div>
          </div>

          <div
            style={{
              padding: 18,
              borderRadius: 16,
              border: "1px solid #dcfce7",
              background: "#f0fdf4",
            }}
          >
            <h3 style={{ marginTop: 0 }}>Specialty Operations</h3>

            <div style={{ display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))" }}>
              <div style={{ padding: 14, borderRadius: 12, background: "white", border: "1px solid #bbf7d0" }}>
                <div style={{ fontWeight: "bold" }}>RPAS Operations</div>
                <div style={{ marginTop: 6, color: "#475569", fontSize: 13 }}>
                  Total: {rpasOperations.length}
                </div>
                <button
                  type="button"
                  onClick={() => setActiveTab("rpas")}
                  style={{ marginTop: 10, padding: "8px 12px", borderRadius: 10, border: "none", background: "#16a34a", color: "white", fontWeight: "bold", cursor: "pointer" }}
                >
                  Open RPAS
                </button>
              </div>

              <div style={{ padding: 14, borderRadius: 12, background: "white", border: "1px solid #bbf7d0" }}>
                <div style={{ fontWeight: "bold" }}>Document / Audit Evidence</div>
                <div style={{ marginTop: 6, color: "#475569", fontSize: 13 }}>
                  Coming soon under Field Docs.
                </div>
              </div>
            </div>
          </div>

          <div
            style={{
              padding: 18,
              borderRadius: 16,
              border: "1px solid #e2e8f0",
              background: "white",
            }}
          >
            <h3 style={{ marginTop: 0 }}>Recent Worker Forms</h3>

            {records.length === 0 ? (
              <p style={{ color: "#64748b" }}>No worker forms found.</p>
            ) : (
              <div style={{ display: "grid", gap: 10 }}>
                {records.slice(0, 3).map((record) => (
                  <div
                    key={record.id}
                    style={{
                      padding: 14,
                      borderRadius: 12,
                      background: "#f8fafc",
                      border: "1px solid #e2e8f0",
                    }}
                  >
                    <div style={{ fontWeight: "bold" }}>
                      {record.worker_name || "Unknown Worker"} — {record.project_name || "No Project"}
                    </div>
                    <div style={{ fontSize: 13, color: "#475569", marginTop: 4 }}>
                      Critical Risk: {record.critical_risk || "-"}
                    </div>
                    <div style={{ fontSize: 13, marginTop: 4 }}>
                      Status:{" "}
                      <span style={{ color: statusColor(record.status || "Pending Review"), fontWeight: "bold" }}>
                        {record.status || "Pending Review"}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => downloadPdf(record)}
                      style={{ marginTop: 10, padding: "8px 12px", borderRadius: 10, border: "none", background: "#123d82", color: "white", fontWeight: "bold", cursor: "pointer" }}
                    >
                      Download PDF
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
       
{activeTab === "recordsCenter" && (
  <div
    style={{
      background: "white",
      padding: 20,
      borderRadius: 16,
      boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
      display: "grid",
      gap: 18,
      width: "100%",
      boxSizing: "border-box",
    }}
  >
    <div>
      <h2 style={{ margin: 0 }}>Records Center</h2>
      <p style={{ marginTop: 6, color: "#64748b" }}>
        Search, view, and download submitted safety records.
      </p>
    </div>

    <input
      value={recordsCenterSearch}
      onChange={(e) => setRecordsCenterSearch(e.target.value)}
      placeholder="Search by project, worker, supervisor, location, unit, risk, or keyword..."
      style={{
        width: "100%",
        padding: 12,
        borderRadius: 12,
        border: "1px solid #cbd5e1",
        boxSizing: "border-box",
      }}
    />

    <div
      style={{
        display: "grid",
        gap: 12,
        gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
      }}
    >
      {[
        ["Worker Forms", records.length],
        ["FLRAs", flraRecords.length],
        ["Toolbox Talks", toolboxTalks.length],
        ["Hazard Reports", hazardReports.length],
        ["COR Actions", corActions.length],
        ["Fleet Defects", fleetDefects.length],
        ["RPAS Records", rpasOperations.length],
      ].map(([label, count]) => (
        <div
          key={label}
          style={{
            padding: 14,
            borderRadius: 12,
            background: "#f8fafc",
            border: "1px solid #e2e8f0",
          }}
        >
          <div style={{ fontSize: 13, color: "#64748b" }}>{label}</div>
          <div
            style={{
              fontSize: 28,
              fontWeight: "bold",
              color: "#123d82",
            }}
          >
            {count}
          </div>
        </div>
      ))}
    </div>

   <div style={{ display: "grid", gap: 18 }}>
  <section>
    <h3 style={{ marginBottom: 10 }}>Worker Forms</h3>

    <div style={{ display: "grid", gap: 10 }}>
      {records
        .filter((record) => {
          const q = recordsCenterSearch.trim().toLowerCase();

          return (
            !q ||
            record.worker_name?.toLowerCase().includes(q) ||
            record.supervisor_name?.toLowerCase().includes(q) ||
            record.project_name?.toLowerCase().includes(q) ||
            record.task_description?.toLowerCase().includes(q) ||
            record.critical_risk?.toLowerCase().includes(q) ||
            record.status?.toLowerCase().includes(q)
          );
        })
        .slice(0, 10)
        .map((record) => (
          <div
            key={`record-${record.id}`}
            style={{
              padding: 14,
              borderRadius: 12,
              border: "1px solid #e2e8f0",
              background: "#f8fafc",
            }}
          >
            <div style={{ fontWeight: "bold" }}>
              {record.project_name || "No Project"}
            </div>

            <div style={{ marginTop: 4, fontSize: 13, color: "#475569" }}>
              Worker: {record.worker_name || "-"} | Supervisor:{" "}
              {record.supervisor_name || "-"}
            </div>

            <div style={{ marginTop: 4, fontSize: 13, color: "#475569" }}>
              Risk: {record.critical_risk || "-"} | Status:{" "}
              {record.status || "Pending Review"}
            </div>
<div
  style={{
    display: "flex",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 10,
  }}
>
  <button
    type="button"
    onClick={() => downloadPdf(record)}
    style={{
      padding: "8px 12px",
      borderRadius: 10,
      border: "none",
      background: "#123d82",
      color: "white",
      fontWeight: "bold",
      cursor: "pointer",
    }}
  >
    Download PDF
  </button>

  {[
    "yycrgonzalez@gmail.com",
    "rod.gonzalez@baac.com",
    "rod.gonzalez@baacconstruction.com",
  ].includes((user?.email || "").toLowerCase()) && (
    <button
      type="button"
      onClick={() => deleteWorkerRecord(record)}
      disabled={loading}
      style={{
        padding: "8px 12px",
        borderRadius: 10,
        border: "1px solid #dc2626",
        background: "#fff1f2",
        color: "#b91c1c",
        fontWeight: "bold",
        cursor: loading ? "not-allowed" : "pointer",
      }}
    >
      Delete Record
    </button>
  )}
</div>
          </div>
        ))}

      {records.filter((record) => {
        const q = recordsCenterSearch.trim().toLowerCase();

        return (
          !q ||
          record.worker_name?.toLowerCase().includes(q) ||
          record.supervisor_name?.toLowerCase().includes(q) ||
          record.project_name?.toLowerCase().includes(q) ||
          record.task_description?.toLowerCase().includes(q) ||
          record.critical_risk?.toLowerCase().includes(q) ||
          record.status?.toLowerCase().includes(q)
        );
      }).length === 0 && (
        <div style={{ color: "#64748b" }}>No worker forms found.</div>
      )}
    </div>
  </section>

  <section>
    <h3 style={{ marginBottom: 10 }}>FLRA / Daily Risk Assessments</h3>

    <div style={{ display: "grid", gap: 10 }}>
      {flraRecords
        .filter((item) => {
          const q = recordsCenterSearch.trim().toLowerCase();

          return (
            !q ||
            item.project_name?.toLowerCase().includes(q) ||
            item.worker_name?.toLowerCase().includes(q) ||
            item.supervisor_name?.toLowerCase().includes(q) ||
            item.location?.toLowerCase().includes(q) ||
            item.work_scope?.toLowerCase().includes(q) ||
            item.critical_risks?.toLowerCase().includes(q)
          );
        })
        .slice(0, 10)
        .map((item) => (
          <div
            key={`flra-${item.id}`}
            style={{
              padding: 14,
              borderRadius: 12,
              border: "1px solid #bfdbfe",
              background: "#eff6ff",
            }}
          >
            <div style={{ fontWeight: "bold" }}>
              {item.project_name || "No Project"} — {item.flra_date || "-"}
            </div>

            <div style={{ marginTop: 4, fontSize: 13, color: "#475569" }}>
              Worker: {item.worker_name || "-"} | Supervisor:{" "}
              {item.supervisor_name || "-"}
            </div>

            <div style={{ marginTop: 4, fontSize: 13, color: "#475569" }}>
              Location: {item.location || "-"} | Risk:{" "}
              {item.critical_risks || "-"}
            </div>

            <button
              type="button"
              onClick={() => downloadFlraPdf(item)}
              style={{
                marginTop: 10,
                padding: "8px 12px",
                borderRadius: 10,
                border: "none",
                background: "#123d82",
                color: "white",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              Download PDF
            </button>
          </div>
        ))}

      {flraRecords.filter((item) => {
        const q = recordsCenterSearch.trim().toLowerCase();

        return (
          !q ||
          item.project_name?.toLowerCase().includes(q) ||
          item.worker_name?.toLowerCase().includes(q) ||
          item.supervisor_name?.toLowerCase().includes(q) ||
          item.location?.toLowerCase().includes(q) ||
          item.work_scope?.toLowerCase().includes(q) ||
          item.critical_risks?.toLowerCase().includes(q)
        );
      }).length === 0 && (
        <div style={{ color: "#64748b" }}>No FLRA records found.</div>
      )}
    </div>
  </section>

  <section>
    <h3 style={{ marginBottom: 10 }}>Tailgate / Toolbox Talks</h3>

    <div style={{ display: "grid", gap: 10 }}>
      {toolboxTalks
        .filter((talk) => {
          const q = recordsCenterSearch.trim().toLowerCase();

          return (
            !q ||
            talk.project_name?.toLowerCase().includes(q) ||
            talk.supervisor_name?.toLowerCase().includes(q) ||
            talk.location?.toLowerCase().includes(q) ||
            talk.topic?.toLowerCase().includes(q) ||
            talk.discussion_notes?.toLowerCase().includes(q) ||
            talk.status?.toLowerCase().includes(q)
          );
        })
        .slice(0, 10)
        .map((talk) => (
          <div
            key={`toolbox-${talk.id}`}
            style={{
              padding: 14,
              borderRadius: 12,
              border: "1px solid #bbf7d0",
              background: "#f0fdf4",
            }}
          >
            <div style={{ fontWeight: "bold" }}>
              {talk.project_name || "No Project"} — {talk.talk_date || "-"}
            </div>

            <div style={{ marginTop: 4, fontSize: 13, color: "#475569" }}>
              Supervisor: {talk.supervisor_name || "-"} | Location:{" "}
              {talk.location || "-"}
            </div>

            <div style={{ marginTop: 4, fontSize: 13, color: "#475569" }}>
              Topic: {talk.topic || "-"} | Status: {talk.status || "-"}
            </div>

            <button
              type="button"
              onClick={() => downloadToolboxPdf(talk)}
              style={{
                marginTop: 10,
                padding: "8px 12px",
                borderRadius: 10,
                border: "none",
                background: "#16a34a",
                color: "white",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              Download PDF
            </button>
          </div>
        ))}

      {toolboxTalks.filter((talk) => {
        const q = recordsCenterSearch.trim().toLowerCase();

        return (
          !q ||
          talk.project_name?.toLowerCase().includes(q) ||
          talk.supervisor_name?.toLowerCase().includes(q) ||
          talk.location?.toLowerCase().includes(q) ||
          talk.topic?.toLowerCase().includes(q) ||
          talk.discussion_notes?.toLowerCase().includes(q) ||
          talk.status?.toLowerCase().includes(q)
        );
      }).length === 0 && (
        <div style={{ color: "#64748b" }}>No toolbox talks found.</div>
      )}
    </div>
  </section>
        <section>
    <h3 style={{ marginBottom: 10 }}>Hazard Reports</h3>

    <div style={{ display: "grid", gap: 10 }}>
      {hazardReports
        .filter((report) => {
          const q = recordsCenterSearch.trim().toLowerCase();

          return (
            !q ||
            report.project_name?.toLowerCase().includes(q) ||
            report.reported_by?.toLowerCase().includes(q) ||
            report.hazard_category?.toLowerCase().includes(q) ||
            report.hazard_description?.toLowerCase().includes(q) ||
            report.risk_level?.toLowerCase().includes(q) ||
            report.action_status?.toLowerCase().includes(q)
          );
        })
        .slice(0, 10)
        .map((report) => (
          <div
            key={`hazard-${report.id}`}
            style={{
              padding: 14,
              borderRadius: 12,
              border: "1px solid #fed7aa",
              background: "#fff7ed",
            }}
          >
            <div style={{ fontWeight: "bold" }}>
              {report.project_name || "No Project"} —{" "}
              {report.report_type || "Hazard Report"}
            </div>

            <div style={{ marginTop: 4, fontSize: 13, color: "#475569" }}>
              Reported By: {report.reported_by || "-"} | Category:{" "}
              {report.hazard_category || "-"}
            </div>

            <div style={{ marginTop: 4, fontSize: 13, color: "#475569" }}>
              Risk: {report.risk_level || "-"} | Status:{" "}
              {report.action_status || report.status || "Open"}
            </div>

            <div style={{ marginTop: 6, fontSize: 13, color: "#475569" }}>
              {report.hazard_description || "No description"}
            </div>

            <button
              type="button"
              onClick={() => setActiveTab("hazard")}
              style={{
                marginTop: 10,
                padding: "8px 12px",
                borderRadius: 10,
                border: "none",
                background: "#ea580c",
                color: "white",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              Open Hazard Module
            </button>
          </div>
        ))}

      {hazardReports.filter((report) => {
        const q = recordsCenterSearch.trim().toLowerCase();

        return (
          !q ||
          report.project_name?.toLowerCase().includes(q) ||
          report.reported_by?.toLowerCase().includes(q) ||
          report.hazard_category?.toLowerCase().includes(q) ||
          report.hazard_description?.toLowerCase().includes(q) ||
          report.risk_level?.toLowerCase().includes(q) ||
          report.action_status?.toLowerCase().includes(q)
        );
      }).length === 0 && (
        <div style={{ color: "#64748b" }}>No hazard reports found.</div>
      )}
    </div>
  </section>

  <section>
    <h3 style={{ marginBottom: 10 }}>COR Corrective Actions</h3>

    <div style={{ display: "grid", gap: 10 }}>
      {corActions
        .filter((item) => {
          const q = recordsCenterSearch.trim().toLowerCase();

          return (
            !q ||
            item.category?.toLowerCase().includes(q) ||
            item.field_job_number?.toLowerCase().includes(q) ||
            item.field_location?.toLowerCase().includes(q) ||
            item.issue_description?.toLowerCase().includes(q) ||
            item.corrective_action_required?.toLowerCase().includes(q) ||
            item.assigned_to?.toLowerCase().includes(q) ||
            item.status?.toLowerCase().includes(q)
          );
        })
        .slice(0, 10)
        .map((item) => (
          <div
            key={`cor-${item.id}`}
            style={{
              padding: 14,
              borderRadius: 12,
              border: "1px solid #ddd6fe",
              background: "#f5f3ff",
            }}
          >
            <div style={{ fontWeight: "bold" }}>
              {item.category || "COR Corrective Action"}
            </div>

            <div style={{ marginTop: 4, fontSize: 13, color: "#475569" }}>
              Job #: {item.field_job_number || "-"} | Location:{" "}
              {item.field_location || "-"}
            </div>

            <div style={{ marginTop: 4, fontSize: 13, color: "#475569" }}>
              Assigned To: {item.assigned_to || "-"} | Due:{" "}
              {item.target_fix_date || "-"} | Status: {item.status || "Open"}
            </div>

            <div style={{ marginTop: 6, fontSize: 13, color: "#475569" }}>
              {item.issue_description || "No issue description"}
            </div>

            <button
              type="button"
              onClick={() => setActiveTab("cor")}
              style={{
                marginTop: 10,
                padding: "8px 12px",
                borderRadius: 10,
                border: "none",
                background: "#7c3aed",
                color: "white",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              Open COR Module
            </button>
          </div>
        ))}

      {corActions.filter((item) => {
        const q = recordsCenterSearch.trim().toLowerCase();

        return (
          !q ||
          item.category?.toLowerCase().includes(q) ||
          item.field_job_number?.toLowerCase().includes(q) ||
          item.field_location?.toLowerCase().includes(q) ||
          item.issue_description?.toLowerCase().includes(q) ||
          item.corrective_action_required?.toLowerCase().includes(q) ||
          item.assigned_to?.toLowerCase().includes(q) ||
          item.status?.toLowerCase().includes(q)
        );
      }).length === 0 && (
        <div style={{ color: "#64748b" }}>
          No COR corrective actions found.
        </div>
      )}
    </div>
  </section>

  <section>
    <h3 style={{ marginBottom: 10 }}>Fleet Defects</h3>

    <div style={{ display: "grid", gap: 10 }}>
      {fleetDefects
        .filter((item) => {
          const q = recordsCenterSearch.trim().toLowerCase();

          return (
            !q ||
            item.unit_number?.toLowerCase().includes(q) ||
            item.asset_type?.toLowerCase().includes(q) ||
            item.reported_by?.toLowerCase().includes(q) ||
            item.project_name?.toLowerCase().includes(q) ||
            item.location?.toLowerCase().includes(q) ||
            item.defect_identified?.toLowerCase().includes(q) ||
            item.priority?.toLowerCase().includes(q) ||
            item.status?.toLowerCase().includes(q)
          );
        })
        .slice(0, 10)
        .map((item) => (
          <div
            key={`fleet-${item.id}`}
            style={{
              padding: 14,
              borderRadius: 12,
              border: "1px solid #fecaca",
              background: "#fef2f2",
            }}
          >
            <div style={{ fontWeight: "bold" }}>
              Unit {item.unit_number || "-"} — {item.asset_type || "Fleet Asset"}
            </div>

            <div style={{ marginTop: 4, fontSize: 13, color: "#475569" }}>
              Reported By: {item.reported_by || "-"} | Project:{" "}
              {item.project_name || "-"}
            </div>

            <div style={{ marginTop: 4, fontSize: 13, color: "#475569" }}>
              Priority: {item.priority || "-"} | Status:{" "}
              {item.status || "Open"}
            </div>

            <div style={{ marginTop: 6, fontSize: 13, color: "#475569" }}>
              {item.defect_identified || "No defect description"}
            </div>

            <button
              type="button"
              onClick={() => downloadFleetDefectPdf(item)}
              style={{
                marginTop: 10,
                padding: "8px 12px",
                borderRadius: 10,
                border: "none",
                background: "#dc2626",
                color: "white",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              Download PDF
            </button>
          </div>
        ))}

      {fleetDefects.filter((item) => {
        const q = recordsCenterSearch.trim().toLowerCase();

        return (
          !q ||
          item.unit_number?.toLowerCase().includes(q) ||
          item.asset_type?.toLowerCase().includes(q) ||
          item.reported_by?.toLowerCase().includes(q) ||
          item.project_name?.toLowerCase().includes(q) ||
          item.location?.toLowerCase().includes(q) ||
          item.defect_identified?.toLowerCase().includes(q) ||
          item.priority?.toLowerCase().includes(q) ||
          item.status?.toLowerCase().includes(q)
        );
      }).length === 0 && (
        <div style={{ color: "#64748b" }}>No fleet defects found.</div>
      )}
    </div>
  </section>

  <section>
    <h3 style={{ marginBottom: 10 }}>RPAS Operations</h3>

    <div style={{ display: "grid", gap: 10 }}>
      {rpasOperations
        .filter((operation) => {
          const q = recordsCenterSearch.trim().toLowerCase();

          return (
            !q ||
            operation.project_name?.toLowerCase().includes(q) ||
            operation.pilot_in_command?.toLowerCase().includes(q) ||
            operation.visual_observer?.toLowerCase().includes(q) ||
            operation.rpas_make_model?.toLowerCase().includes(q) ||
            operation.operation_type?.toLowerCase().includes(q) ||
            operation.flight_location?.toLowerCase().includes(q) ||
            operation.status?.toLowerCase().includes(q)
          );
        })
        .slice(0, 10)
        .map((operation) => (
          <div
            key={`rpas-${operation.id}`}
            style={{
              padding: 14,
              borderRadius: 12,
              border: "1px solid #bae6fd",
              background: "#f0f9ff",
            }}
          >
            <div style={{ fontWeight: "bold" }}>
              {operation.project_name || "No Project"} —{" "}
              {operation.flight_date || "-"}
            </div>

            <div style={{ marginTop: 4, fontSize: 13, color: "#475569" }}>
              Pilot: {operation.pilot_in_command || "-"} | Observer:{" "}
              {operation.visual_observer || "-"}
            </div>

            <div style={{ marginTop: 4, fontSize: 13, color: "#475569" }}>
              RPAS: {operation.rpas_make_model || "-"} | Location:{" "}
              {operation.flight_location || "-"}
            </div>

            <div style={{ marginTop: 4, fontSize: 13, color: "#475569" }}>
              Operation: {operation.operation_type || "-"} | Status:{" "}
              {operation.status || "-"}
            </div>

            <button
              type="button"
              onClick={() => downloadRpasPdf(operation)}
              style={{
                marginTop: 10,
                padding: "8px 12px",
                borderRadius: 10,
                border: "none",
                background: "#0284c7",
                color: "white",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              Download PDF
            </button>
          </div>
        ))}

      {rpasOperations.filter((operation) => {
        const q = recordsCenterSearch.trim().toLowerCase();

        return (
          !q ||
          operation.project_name?.toLowerCase().includes(q) ||
          operation.pilot_in_command?.toLowerCase().includes(q) ||
          operation.visual_observer?.toLowerCase().includes(q) ||
          operation.rpas_make_model?.toLowerCase().includes(q) ||
          operation.operation_type?.toLowerCase().includes(q) ||
          operation.flight_location?.toLowerCase().includes(q) ||
          operation.status?.toLowerCase().includes(q)
        );
      }).length === 0 && (
        <div style={{ color: "#64748b" }}>No RPAS records found.</div>
      )}
    </div>
  </section>
</div>
</div>
)}

{activeTab === "qaqc" && qaqcSection === "dashboard" && (
  <div
    style={{
      display: "grid",
      gap: 18,
      marginBottom: 24,
    }}
  >
    <section
      style={{
        background: "linear-gradient(135deg, #0f2f63, #123d82)",
        color: "white",
        padding: 24,
        borderRadius: 18,
        boxShadow: "0 4px 18px rgba(15, 47, 99, 0.22)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: 16,
          flexWrap: "wrap",
        }}
      >
        <div>
          <div
            style={{
              fontSize: 13,
              fontWeight: "bold",
              letterSpacing: 1.2,
              opacity: 0.85,
              textTransform: "uppercase",
            }}
          >
            BAAC Shield
          </div>

          <h1
            style={{
              margin: "6px 0 8px",
              fontSize: 30,
            }}
          >
            Quality Assurance / Quality Control
          </h1>

          <div
            style={{
              maxWidth: 760,
              lineHeight: 1.6,
              opacity: 0.92,
            }}
          >
            Project-controlled inspections, testing, deficiencies, approvals,
            client acceptance and invoice-ready quality packages.
          </div>
        </div>

        <div
          style={{
            padding: "8px 12px",
            borderRadius: 999,
            background: "rgba(255,255,255,0.14)",
            border: "1px solid rgba(255,255,255,0.25)",
            fontWeight: "bold",
          }}
        >
          QA/QC Management System
        </div>
      </div>
    </section>

    <section
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))",
        gap: 14,
      }}
    >
      {[
        {
          title: "Open Inspections",
          value: "0",
          description: "Draft and active inspections",
        },
        {
          title: "Hold Points",
          value: "0",
          description: "Work waiting for release",
        },
        {
          title: "Open Deficiencies",
          value: "0",
          description: "Deficiencies and NCRs",
        },
        {
          title: "Client Review",
          value: "0",
          description: "Awaiting client acceptance",
        },
        {
          title: "Invoice Ready",
          value: "0",
          description: "Approved quality packages",
        },
      ].map((card) => (
        <div
          key={card.title}
          style={{
            background: "white",
            padding: 18,
            borderRadius: 16,
            border: "1px solid #e2e8f0",
            boxShadow: "0 2px 10px rgba(15,23,42,0.06)",
          }}
        >
          <div
            style={{
              fontSize: 13,
              color: "#64748b",
              fontWeight: "bold",
              textTransform: "uppercase",
              letterSpacing: 0.5,
            }}
          >
            {card.title}
          </div>

          <div
            style={{
              fontSize: 32,
              fontWeight: "bold",
              color: "#123d82",
              marginTop: 8,
            }}
          >
            {card.value}
          </div>

          <div
            style={{
              color: "#64748b",
              fontSize: 13,
              marginTop: 4,
            }}
          >
            {card.description}
          </div>
        </div>
      ))}
    </section>

    <section
      style={{
        background: "white",
        padding: 20,
        borderRadius: 16,
        border: "1px solid #e2e8f0",
        boxShadow: "0 2px 12px rgba(15,23,42,0.06)",
      }}
    >
      <h2 style={{ marginTop: 0, color: "#0f2f63" }}>
        Start a QA/QC Record
      </h2>

      <p
        style={{
          color: "#64748b",
          marginTop: -4,
          marginBottom: 18,
        }}
      >
        Select the construction discipline to open its inspection and testing
        workflow.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: 16,
        }}
      >
        <button
          type="button"
        onClick={() => navigateQaqc("telecom")}
          style={{
            textAlign: "left",
            padding: 22,
            borderRadius: 16,
            border: "2px solid #2563eb",
            background: "#eff6ff",
            cursor: "pointer",
          }}
        >
          <div
            style={{
              fontSize: 21,
              fontWeight: "bold",
              color: "#123d82",
            }}
          >
            Telecom & Fibre
          </div>

          <div
            style={{
              marginTop: 8,
              color: "#475569",
              lineHeight: 1.5,
            }}
          >
            Material receiving, pathways, cable placement, splicing, OTDR,
            OLTS, equipment installation, testing and closeout.
          </div>
        </button>

        <button
          type="button"
       onClick={() => navigateQaqc("civil")}
          style={{
            textAlign: "left",
            padding: 22,
            borderRadius: 16,
            border: "2px solid #b45309",
            background: "#fff7ed",
            cursor: "pointer",
          }}
        >
          <div
            style={{
              fontSize: 21,
              fontWeight: "bold",
              color: "#92400e",
            }}
          >
            Civil Construction
          </div>

          <div
            style={{
              marginTop: 8,
              color: "#475569",
              lineHeight: 1.5,
            }}
          >
            Excavation, duct banks, structures, backfill, compaction, concrete,
            restoration and testing.
          </div>
        </button>
      </div>
    </section>

    <section
      style={{
        background: "white",
        padding: 20,
        borderRadius: 16,
        border: "1px solid #e2e8f0",
        boxShadow: "0 2px 12px rgba(15,23,42,0.06)",
      }}
    >
      <h2 style={{ marginTop: 0, color: "#0f2f63" }}>
        QA/QC Workflow
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))",
          gap: 10,
        }}
      >
        {[
          "Draft",
          "Internal Review",
          "Deficiency Correction",
          "BAAC Approval",
          "Client Acceptance",
          "Invoice Ready",
          "Closed",
        ].map((stage, index) => (
          <div
            key={stage}
            style={{
              padding: 14,
              borderRadius: 12,
              background: index === 0 ? "#dbeafe" : "#f8fafc",
              border: "1px solid #cbd5e1",
              textAlign: "center",
              fontWeight: "bold",
              color: "#334155",
            }}
          >
            {index + 1}. {stage}
          </div>
        ))}
      </div>
    </section>
  </div>
)}
{activeTab === "qaqc" &&
  qaqcSection === "telecom" &&
  qaqcInspectionType === "" && (
  <div
    style={{
      display: "grid",
      gap: 18,
      marginBottom: 24,
    }}
  >

    <section
      style={{
        background: "white",
        padding: 20,
        borderRadius: 16,
        border: "1px solid #e2e8f0",
        boxShadow: "0 2px 12px rgba(15,23,42,0.06)",
      }}
    >
      <button
        type="button"
        onClick={() => setQaqcSection("dashboard")}
        style={{
          padding: "9px 13px",
          borderRadius: 10,
          border: "1px solid #cbd5e1",
          background: "white",
          color: "#123d82",
          fontWeight: "bold",
          cursor: "pointer",
          marginBottom: 16,
        }}
      >
        ← Back to QA/QC Dashboard
      </button>

      <h1 style={{ margin: "0 0 8px", color: "#0f2f63" }}>
        Telecom & Fibre QA/QC
      </h1>

      <p style={{ color: "#64748b", margin: 0, lineHeight: 1.6 }}>
        Create and manage telecom and fibre inspections, testing, approvals,
        deficiencies and closeout records.
      </p>
    </section>
         <section
  style={{
    background: "white",
    padding: 20,
    borderRadius: 16,
    border: "1px solid #e2e8f0",
    boxShadow: "0 2px 12px rgba(15,23,42,0.06)",
  }}
>
  <h2 style={{ marginTop: 0, color: "#0f2f63" }}>
    Start a Telecom & Fibre Inspection
  </h2>

  <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
      gap: 12,
    }}
  >
    {[
     "Work Inspection",
  "Work Inspection Records",
  "Duct / Pathway Inspection",
  "Cable Placement",
  "Splicing Record",
  "Fibre Testing",
  "Equipment Installation",
  "As-Built / Closeout",
    ].map((inspectionType) => (
      <button
        key={inspectionType}
        type="button"
         onClick={() => {
  if (inspectionType === "Work Inspection") {
    setQaqcInspectionType("work-inspection");
  } else if (inspectionType === "Work Inspection Records") {
    setQaqcInspectionType("work-inspection-records");
  } else {
    alert(`${inspectionType} form is the next build step.`);
  }
}}
        style={{
          textAlign: "left",
          padding: 16,
          borderRadius: 12,
          border: "1px solid #bfdbfe",
          background: "#eff6ff",
          color: "#123d82",
          fontWeight: "bold",
          cursor: "pointer",
        }}
      >
        {inspectionType}
      </button>
    ))}
  </div>
</section>
  </div>
)}

{activeTab === "qaqc" &&
  qaqcSection === "telecom" &&
  qaqcInspectionType === "work-inspection" && (
    <div
      style={{
        display: "grid",
        gap: 18,
        marginBottom: 24,
      }}
    >
      <section
        style={{
          background: "white",
          padding: 20,
          borderRadius: 16,
          border: "1px solid #e2e8f0",
          boxShadow: "0 2px 12px rgba(15,23,42,0.06)",
        }}
      >
        <button
          type="button"
          onClick={() => setQaqcInspectionType("")}
          style={{
            padding: "9px 13px",
            borderRadius: 10,
            border: "1px solid #cbd5e1",
            background: "white",
            color: "#123d82",
            fontWeight: "bold",
            cursor: "pointer",
            marginBottom: 16,
          }}
        >
          ← Back to Telecom Inspections
        </button>

        <h1 style={{ margin: "0 0 8px", color: "#0f2f63" }}>
       Telecom Work Inspection
        </h1>

        <p style={{ color: "#64748b", margin: 0, lineHeight: 1.6 }}>
          Inspect completed telecom and fibre work, record the result,
identify deficiencies, and attach supporting photos.
        </p>
      </section>
           <section
  style={{
    background: "white",
    padding: 20,
    borderRadius: 16,
    border: "1px solid #e2e8f0",
    boxShadow: "0 2px 12px rgba(15,23,42,0.06)",
  }}
>
  <h2 style={{ marginTop: 0, color: "#0f2f63" }}>
Project and Inspection Details
  </h2>

  <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
      gap: 14,
    }}
  >
    <label style={{ display: "grid", gap: 6 }}>
      <span style={{ fontWeight: "bold", color: "#334155" }}>
        Project
      </span>
      <select
        value={qaqcProjectId}
        onChange={(e) => setQaqcProjectId(e.target.value)}
        style={{
          padding: 11,
          borderRadius: 10,
          border: "1px solid #cbd5e1",
          background: "white",
        }}
      >
        <option value="">Select project</option>
        {projects.map((project) => (
          <option key={project.id} value={project.id}>
            {project.name}
          </option>
        ))}
      </select>
    </label>

    <label style={{ display: "grid", gap: 6 }}>
      <span style={{ fontWeight: "bold", color: "#334155" }}>
      Inspection Location
      </span>
      <input
        type="text"
        value={qaqcWorksite}
        onChange={(e) => setQaqcWorksite(e.target.value)}
        placeholder="Enter worksite or delivery location"
        style={{
          padding: 11,
          borderRadius: 10,
          border: "1px solid #cbd5e1",
        }}
      />
    </label>

    <label style={{ display: "grid", gap: 6 }}>
      <span style={{ fontWeight: "bold", color: "#334155" }}>
      Work Type
      </span>
      <input
        type="text"
        value={qaqcWorkPackage}
       onChange={(e) => setQaqcWorkPackage(e.target.value)}
       placeholder="Enter work type or scope inspected"
        style={{
          padding: 11,
          borderRadius: 10,
          border: "1px solid #cbd5e1",
        }}
      />
    </label>

    <label style={{ display: "grid", gap: 6 }}>
      <span style={{ fontWeight: "bold", color: "#334155" }}>
       Contractor / Crew
      </span>
      <input
        type="text"
        value={qaqcSupplier}
        onChange={(e) => setQaqcSupplier(e.target.value)}
       placeholder="Enter contractor or crew name"
        style={{
          padding: 11,
          borderRadius: 10,
          border: "1px solid #cbd5e1",
        }}
      />
    </label>

    <label style={{ display: "grid", gap: 6 }}>
      <span style={{ fontWeight: "bold", color: "#334155" }}>
      Inspection Date
      </span>
      <input
        type="date"
       value={qaqcDeliveryDate}
        onChange={(e) => setQaqcDeliveryDate(e.target.value)}
        style={{
          padding: 11,
          borderRadius: 10,
          border: "1px solid #cbd5e1",
        }}
      />
    </label>

    <label style={{ display: "grid", gap: 6 }}>
      <span style={{ fontWeight: "bold", color: "#334155" }}>
        Received By
      </span>
      <input
        type="text"
        value={qaqcReceivedBy}
        onChange={(e) => setQaqcReceivedBy(e.target.value)}
   placeholder="Enter inspector name"
        style={{
          padding: 11,
          borderRadius: 10,
          border: "1px solid #cbd5e1",
        }}
      />
    </label>
  </div>
</section>
       <section
  style={{
    background: "white",
    padding: 20,
    borderRadius: 16,
    border: "1px solid #e2e8f0",
    boxShadow: "0 2px 12px rgba(15,23,42,0.06)",
  }}
>
  <h2 style={{ marginTop: 0, color: "#0f2f63" }}>
   Work Inspection Results
  </h2>

  <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
      gap: 14,
    }}
  >
    <label style={{ display: "grid", gap: 6 }}>
      <span style={{ fontWeight: "bold", color: "#334155" }}>
       Inspection Result
      </span>
    <select
  value={qaqcPoNumber}
  onChange={(e) => setQaqcPoNumber(e.target.value)}
  style={{
    padding: 11,
    borderRadius: 10,
    border: "1px solid #cbd5e1",
    background: "white",
  }}
>
  <option value="">Select result</option>
  <option value="Pass">Pass</option>
  <option value="Deficiency">Deficiency</option>
  <option value="Pending">Pending</option>
  <option value="Not Applicable">Not Applicable</option>
</select>
    </label>

    <label style={{ display: "grid", gap: 6 }}>
      <span style={{ fontWeight: "bold", color: "#334155" }}>
   Work Inspected
      </span>
      <input
        type="text"
        value={qaqcPackingSlip}
        onChange={(e) => setQaqcPackingSlip(e.target.value)}
placeholder="Describe the work inspected"
        style={{
          padding: 11,
          borderRadius: 10,
          border: "1px solid #cbd5e1",
        }}
      />
    </label>

    <label style={{ display: "grid", gap: 6 }}>
      <span style={{ fontWeight: "bold", color: "#334155" }}>
      Deficiency Details
      </span>
      <input
        type="text"
        value={qaqcDeliveryTicket}
        onChange={(e) => setQaqcDeliveryTicket(e.target.value)}
placeholder="Describe any deficiency or corrective work required"
        style={{
          padding: 11,
          borderRadius: 10,
          border: "1px solid #cbd5e1",
        }}
      />
    </label>

    <label style={{ display: "grid", gap: 6 }}>
      <span style={{ fontWeight: "bold", color: "#334155" }}>
     Corrective Action Assigned To
      </span>
      <input
        type="text"
        value={qaqcCarrierDriver}
        onChange={(e) => setQaqcCarrierDriver(e.target.value)}
  placeholder="Enter person responsible for corrective action"
        style={{
          padding: 11,
          borderRadius: 10,
          border: "1px solid #cbd5e1",
        }}
      />
    </label>

    <label style={{ display: "grid", gap: 6 }}>
      <span style={{ fontWeight: "bold", color: "#334155" }}>
Inspection Notes / Corrective Action
      </span>
      <input
        type="text"
        value={qaqcManufacturer}
        onChange={(e) => setQaqcManufacturer(e.target.value)}
 placeholder="Enter inspection notes and required corrective action"
        style={{
          padding: 11,
          borderRadius: 10,
          border: "1px solid #cbd5e1",
        }}
      />
    </label>

    <label style={{ display: "grid", gap: 6 }}>
      <span style={{ fontWeight: "bold", color: "#334155" }}>
       Inspection Status
      </span>
     <select
  value={qaqcStorageLocation}
  onChange={(e) => setQaqcStorageLocation(e.target.value)}
  style={{
    padding: 11,
    borderRadius: 10,
    border: "1px solid #cbd5e1",
    background: "white",
  }}
>
  <option value="">Select status</option>
  <option value="Open">Open</option>
  <option value="Corrective Action Required">Corrective Action Required</option>
  <option value="Ready for Reinspection">Ready for Reinspection</option>
  <option value="Closed">Closed</option>
</select>
    </label>
  </div>
</section>
  <section
  style={{
    background: "white",
    padding: 20,
    borderRadius: 16,
    border: "1px solid #e2e8f0",
    boxShadow: "0 2px 12px rgba(15,23,42,0.06)",
  }}
>
  <h2 style={{ marginTop: 0, color: "#0f2f63" }}>
    Inspection Photos
  </h2>

  <input
  type="file"
  accept="image/*"
  multiple
onChange={(e) =>
  setQaqcInspectionPhotos(Array.from(e.target.files || []))
}
/>
  {qaqcInspectionPhotos.length > 0 && (
  <p style={{ marginBottom: 0, color: "#475569" }}>
    {qaqcInspectionPhotos.length} photo(s) selected
  </p>
)}
</section>
  <section
  style={{
    background: "white",
    padding: 20,
    borderRadius: 16,
    border: "1px solid #e2e8f0",
    boxShadow: "0 2px 12px rgba(15,23,42,0.06)",
  }}
>
  <h2 style={{ marginTop: 0, color: "#0f2f63" }}>
    Inspector Signature
  </h2>

  <SignatureBox
    sigRef={supervisorSigRef}
    onSave={setReviewSupervisorSignature}
  />
</section>
    <button
  type="button"
  onClick={submitQaqcInspection}
  style={{
    padding: "14px 20px",
    borderRadius: 10,
    border: "none",
    background: "#0f2f63",
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
    cursor: "pointer",
  }}
>
  Submit Inspection
</button>
    </div>
)}

{activeTab === "qaqc" &&
  qaqcSection === "telecom" &&
  qaqcInspectionType === "work-inspection-records" && (
    <div
      style={{
        display: "grid",
        gap: 18,
        marginBottom: 24,
      }}
    >
      <section
        style={{
          background: "white",
          padding: 20,
          borderRadius: 16,
          border: "1px solid #e2e8f0",
          boxShadow: "0 2px 12px rgba(15,23,42,0.06)",
        }}
      >
        <button
          type="button"
          onClick={() => setQaqcInspectionType("")}
          style={{
            padding: "9px 13px",
            borderRadius: 10,
            border: "1px solid #cbd5e1",
            background: "white",
            color: "#123d82",
            fontWeight: "bold",
            cursor: "pointer",
            marginBottom: 16,
          }}
        >
          ← Back to Telecom Inspections
        </button>

        <h1 style={{ margin: "0 0 8px", color: "#0f2f63" }}>
          Work Inspection Records
        </h1>

        <p style={{ color: "#64748b", margin: 0 }}>
          {qaqcWorkInspections.length} inspection record(s)
        </p>
            {selectedQaqcInspection && (
  <div
    style={{
      marginTop: 20,
      padding: 18,
      borderRadius: 14,
      border: "2px solid #123d82",
      background: "#f8fafc",
    }}
  >
    <button
      type="button"
      onClick={() => setSelectedQaqcInspection(null)}
      style={{
        padding: "8px 12px",
        borderRadius: 8,
        border: "1px solid #cbd5e1",
        background: "white",
        color: "#123d82",
        fontWeight: "bold",
        cursor: "pointer",
        marginBottom: 14,
      }}
    >
      Close Full Report
    </button>

    <h2 style={{ margin: "0 0 12px", color: "#0f2f63" }}>
      Full Work Inspection Report
    </h2>

    <p>
      <strong>Project:</strong>{" "}
      {projects.find(
        (project) =>
          String(project.id) === String(selectedQaqcInspection.project_id)
      )?.name ||
        selectedQaqcInspection.project_id ||
        "-"}
    </p>

    <p>
      <strong>Worksite:</strong>{" "}
      {selectedQaqcInspection.inspection_location || "-"}
    </p>

    <p>
      <strong>Work Type:</strong>{" "}
      {selectedQaqcInspection.work_type || "-"}
    </p>

    <p>
      <strong>Inspector:</strong>{" "}
      {selectedQaqcInspection.inspector_name || "-"}
    </p>

    <p>
      <strong>Date:</strong>{" "}
      {selectedQaqcInspection.inspection_date || "-"}
    </p>
<p>
  <strong>Submitted:</strong>{" "}
  {selectedQaqcInspection.created_at
    ? new Date(selectedQaqcInspection.created_at).toLocaleString()
    : "-"}
</p>
    <p>
      <strong>Inspection Result:</strong>{" "}
      {selectedQaqcInspection.inspection_result || "-"}
    </p>

    <p>
      <strong>Status:</strong>{" "}
      {selectedQaqcInspection.inspection_status || "-"}
    </p>
      <p>
  <strong>Contractor / Crew:</strong>{" "}
  {selectedQaqcInspection.contractor_crew || "-"}
</p>

<p>
  <strong>Work Inspected:</strong>{" "}
  {selectedQaqcInspection.work_inspected || "-"}
</p>

<p>
  <strong>Deficiency Details:</strong>{" "}
  {selectedQaqcInspection.deficiency_details || "-"}
</p>

<p>
  <strong>Corrective Action Assigned To:</strong>{" "}
  {selectedQaqcInspection.corrective_action_assigned_to || "-"}
</p>

<p>
  <strong>Inspection Notes:</strong>{" "}
  {selectedQaqcInspection.inspection_notes || "-"}
</p>
  {selectedQaqcInspection.inspector_signature && (
  <div style={{ marginTop: 16 }}>
    <strong>Inspector Signature:</strong>

    <div style={{ marginTop: 10 }}>
      <img
        src={selectedQaqcInspection.inspector_signature}
        alt="Inspector signature"
        style={{
          width: "100%",
          maxWidth: 360,
          borderRadius: 10,
          border: "1px solid #cbd5e1",
          background: "white",
        }}
      />
    </div>
  </div>
)}
{selectedQaqcInspection.photo_urls && (
  <div style={{ marginTop: 16 }}>
    <strong>Inspection Photos:</strong>

    <div
      style={{
        display: "grid",
        gap: 12,
        marginTop: 10,
      }}
    >
      {selectedQaqcInspection.photo_urls
        .split(",")
        .map((photoUrl) => photoUrl.trim())
        .filter(Boolean)
        .map((photoUrl, index) => (
          <img
            key={index}
            src={photoUrl}
            alt={`Inspection photo ${index + 1}`}
            style={{
              width: "100%",
              maxWidth: 420,
              borderRadius: 12,
              border: "1px solid #cbd5e1",
            }}
          />
        ))}
    </div>
  </div>
)}
  </div>
)}
            <div
  style={{
    display: "grid",
    gap: 14,
    marginTop: 20,
  }}
>
  {qaqcWorkInspections.map((inspection) => (
  <div
  key={inspection.id}
  onClick={() => setSelectedQaqcInspection(inspection)}
  style={{
    border: "1px solid #e2e8f0",
    borderRadius: 12,
    padding: 16,
    background: "#f8fafc",
    cursor: "pointer",
  }}
>
      <strong style={{ color: "#0f2f63" }}>
{projects.find(
  (project) => String(project.id) === String(inspection.project_id)
)?.name || inspection.project_id || "No Project"}
      </strong>
<div style={{ marginTop: 8, color: "#334155" }}>
  Worksite: {inspection.inspection_location || "-"}
</div>
  <div style={{ color: "#334155" }}>
  Work Type: {inspection.work_type || "-"}
</div>
      <div style={{ marginTop: 8, color: "#334155" }}>
        Date: {inspection.inspection_date || "-"}
      </div>

      <div style={{ color: "#334155" }}>
        Inspector: {inspection.inspector_name || "-"}
      </div>

      <div style={{ color: "#334155" }}>
        Result: {inspection.inspection_result || "-"}
      </div>

      <div style={{ color: "#334155" }}>
        Status: {inspection.inspection_status || "-"}
      </div>
    </div>
  ))}
</div>
      </section>
    </div>
)}

{activeTab === "crm" && (
  <div
    style={{
      background: "white",
      padding: 20,
      borderRadius: 16,
      boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
      marginBottom: 20,
    }}
  >
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        gap: 12,
        alignItems: "flex-start",
        flexWrap: "wrap",
        marginBottom: 16,
      }}
    >
      <div>
        <h2 style={{ margin: 0 }}>CRM</h2>
        <p style={{ margin: "6px 0 0", color: "#64748b" }}>
          Track customers, subcontractors, sales calls, follow-ups, and
          opportunities.
        </p>
      </div>

      <input
        value={crmSearch}
        onChange={(e) => setCrmSearch(e.target.value)}
        placeholder="Search CRM..."
        style={{
          padding: 10,
          borderRadius: 10,
          border: "1px solid #cbd5e1",
          minWidth: 260,
        }}
      />
    </div>

    <div
      style={{
        display: "flex",
        gap: 10,
        flexWrap: "wrap",
        marginBottom: 18,
      }}
    >
      {[
        ["dashboard", "Dashboard"],
        ["customers", "Customers"],
        ["subcontractors", "Subcontractors"],
        ["activities", "Sales Activities"],
        ["opportunities", "Opportunities"],
      ].map(([sectionKey, label]) => (
        <button
          key={sectionKey}
          type="button"
          onClick={() => setCrmSection(sectionKey)}
          style={{
            padding: "9px 12px",
            borderRadius: 10,
            border: "1px solid #cbd5e1",
            background: crmSection === sectionKey ? "#123d82" : "white",
            color: crmSection === sectionKey ? "white" : "#0f172a",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          {label}
        </button>
      ))}
    </div>

    {crmSection === "dashboard" && (
      <div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: 12,
            marginBottom: 18,
          }}
        >
          <div
            style={{
              border: "1px solid #e2e8f0",
              borderRadius: 14,
              padding: 14,
              background: "#f8fafc",
            }}
          >
            <div style={{ color: "#64748b", fontSize: 13 }}>
              Active Customers
            </div>
            <div style={{ fontSize: 28, fontWeight: "bold" }}>
              {
                crmCustomers.filter(
                  (customer) => customer.status !== "Inactive"
                ).length
              }
            </div>
          </div>

          <div
            style={{
              border: "1px solid #e2e8f0",
              borderRadius: 14,
              padding: 14,
              background: "#f8fafc",
            }}
          >
            <div style={{ color: "#64748b", fontSize: 13 }}>
              Approved Subs
            </div>
            <div style={{ fontSize: 28, fontWeight: "bold" }}>
              {
                crmSubcontractors.filter(
                  (sub) => sub.status === "Approved" || sub.status === "Preferred"
                ).length
              }
            </div>
          </div>

          <div
            style={{
              border: "1px solid #e2e8f0",
              borderRadius: 14,
              padding: 14,
              background: "#f8fafc",
            }}
          >
            <div style={{ color: "#64748b", fontSize: 13 }}>
              Open Opportunities
            </div>
            <div style={{ fontSize: 28, fontWeight: "bold" }}>
              {
                crmOpportunities.filter(
                  (opp) => opp.sales_stage !== "Won" && opp.sales_stage !== "Lost"
                ).length
              }
            </div>
          </div>

          <div
            style={{
              border: "1px solid #e2e8f0",
              borderRadius: 14,
              padding: 14,
              background: "#f8fafc",
            }}
          >
            <div style={{ color: "#64748b", fontSize: 13 }}>
              Pipeline Value
            </div>
            <div style={{ fontSize: 28, fontWeight: "bold" }}>
              $
              {crmOpportunities
                .filter(
                  (opp) => opp.sales_stage !== "Won" && opp.sales_stage !== "Lost"
                )
                .reduce(
                  (sum, opp) => sum + Number(opp.estimated_value || 0),
                  0
                )
                .toLocaleString()}
            </div>
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 14,
          }}
        >
          <div
            style={{
              border: "1px solid #e2e8f0",
              borderRadius: 14,
              padding: 14,
            }}
          >
            <h3 style={{ marginTop: 0 }}>Recent Sales Activities</h3>

            {crmActivities.slice(0, 5).map((activity) => (
              <div
                key={activity.id}
                style={{
                  borderTop: "1px solid #e2e8f0",
                  paddingTop: 10,
                  marginTop: 10,
                }}
              >
                <strong>{activity.activity_type}</strong>
                <div style={{ color: "#64748b", fontSize: 13 }}>
                  {activity.activity_date || "No date"} —{" "}
                  {activity.subject || activity.contact_name || "No subject"}
                </div>
                {activity.outcome && (
                  <div style={{ marginTop: 4 }}>{activity.outcome}</div>
                )}
              </div>
            ))}

            {crmActivities.length === 0 && (
              <div style={{ color: "#64748b" }}>
                No CRM activities entered yet.
              </div>
            )}
          </div>

          <div
            style={{
              border: "1px solid #e2e8f0",
              borderRadius: 14,
              padding: 14,
            }}
          >
            <h3 style={{ marginTop: 0 }}>Open Opportunities</h3>

            {crmOpportunities
              .filter(
                (opp) => opp.sales_stage !== "Won" && opp.sales_stage !== "Lost"
              )
              .slice(0, 5)
              .map((opp) => (
                <div
                  key={opp.id}
                  style={{
                    borderTop: "1px solid #e2e8f0",
                    paddingTop: 10,
                    marginTop: 10,
                  }}
                >
                  <strong>{opp.opportunity_name}</strong>
                  <div style={{ color: "#64748b", fontSize: 13 }}>
                    {opp.sales_stage} — $
                    {Number(opp.estimated_value || 0).toLocaleString()}
                  </div>
                  {opp.project_location && (
                    <div style={{ marginTop: 4 }}>{opp.project_location}</div>
                  )}
                </div>
              ))}

            {crmOpportunities.length === 0 && (
              <div style={{ color: "#64748b" }}>
                No opportunities entered yet.
              </div>
            )}
          </div>
        </div>
      </div>
    )}

   {crmSection === "customers" && (
  <div
    style={{
      display: "grid",
      gridTemplateColumns: "minmax(300px, 420px) 1fr",
      gap: 18,
      alignItems: "start",
    }}
  >
    <div
      style={{
        border: "1px solid #e2e8f0",
        borderRadius: 14,
        padding: 16,
        background: "#f8fafc",
      }}
    >
     <h3 style={{ marginTop: 0 }}>
  {editingCrmCustomerId ? "Edit Customer" : "Add Customer"}
</h3>

      <label style={{ display: "block", marginBottom: 12 }}>
        <strong>Company Name *</strong>
        <input
          value={crmCustomerCompany}
          onChange={(e) => setCrmCustomerCompany(e.target.value)}
          placeholder="Customer company name"
          style={{
            width: "100%",
            marginTop: 5,
            padding: 10,
            borderRadius: 8,
            border: "1px solid #cbd5e1",
            boxSizing: "border-box",
          }}
        />
      </label>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 10,
        }}
      >
        <label>
          <strong>Customer Type</strong>
          <select
            value={crmCustomerType}
            onChange={(e) => setCrmCustomerType(e.target.value)}
            style={{
              width: "100%",
              marginTop: 5,
              padding: 10,
              borderRadius: 8,
              border: "1px solid #cbd5e1",
            }}
          >
            <option>Customer</option>
            <option>Prospect</option>
            <option>General Contractor</option>
            <option>Developer</option>
            <option>Government</option>
            <option>Consultant</option>
            <option>Other</option>
          </select>
        </label>

        <label>
          <strong>Status</strong>
          <select
            value={crmCustomerStatus}
            onChange={(e) => setCrmCustomerStatus(e.target.value)}
            style={{
              width: "100%",
              marginTop: 5,
              padding: 10,
              borderRadius: 8,
              border: "1px solid #cbd5e1",
            }}
          >
            <option>Active</option>
            <option>Inactive</option>
            <option>Prospect</option>
            <option>Former Customer</option>
          </select>
        </label>
      </div>

      <label style={{ display: "block", marginTop: 12 }}>
        <strong>Primary Contact</strong>
        <input
          value={crmCustomerContact}
          onChange={(e) => setCrmCustomerContact(e.target.value)}
          placeholder="Contact name"
          style={{
            width: "100%",
            marginTop: 5,
            padding: 10,
            borderRadius: 8,
            border: "1px solid #cbd5e1",
            boxSizing: "border-box",
          }}
        />
      </label>

      <label style={{ display: "block", marginTop: 12 }}>
        <strong>Contact Title</strong>
        <input
          value={crmCustomerTitle}
          onChange={(e) => setCrmCustomerTitle(e.target.value)}
          placeholder="Project Manager, Owner, Estimator..."
          style={{
            width: "100%",
            marginTop: 5,
            padding: 10,
            borderRadius: 8,
            border: "1px solid #cbd5e1",
            boxSizing: "border-box",
          }}
        />
      </label>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 10,
          marginTop: 12,
        }}
      >
        <label>
          <strong>Phone</strong>
          <input
            value={crmCustomerPhone}
            onChange={(e) => setCrmCustomerPhone(e.target.value)}
            placeholder="Phone"
            style={{
              width: "100%",
              marginTop: 5,
              padding: 10,
              borderRadius: 8,
              border: "1px solid #cbd5e1",
              boxSizing: "border-box",
            }}
          />
        </label>

        <label>
          <strong>Email</strong>
          <input
            type="email"
            value={crmCustomerEmail}
            onChange={(e) => setCrmCustomerEmail(e.target.value)}
            placeholder="Email"
            style={{
              width: "100%",
              marginTop: 5,
              padding: 10,
              borderRadius: 8,
              border: "1px solid #cbd5e1",
              boxSizing: "border-box",
            }}
          />
        </label>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 10,
          marginTop: 12,
        }}
      >
        <label>
          <strong>City</strong>
          <input
            value={crmCustomerCity}
            onChange={(e) => setCrmCustomerCity(e.target.value)}
            placeholder="City"
            style={{
              width: "100%",
              marginTop: 5,
              padding: 10,
              borderRadius: 8,
              border: "1px solid #cbd5e1",
              boxSizing: "border-box",
            }}
          />
        </label>

        <label>
          <strong>Province</strong>
          <input
            value={crmCustomerProvince}
            onChange={(e) => setCrmCustomerProvince(e.target.value)}
            placeholder="Province"
            style={{
              width: "100%",
              marginTop: 5,
              padding: 10,
              borderRadius: 8,
              border: "1px solid #cbd5e1",
              boxSizing: "border-box",
            }}
          />
        </label>
      </div>

      <label style={{ display: "block", marginTop: 12 }}>
        <strong>Industry</strong>
        <input
          value={crmCustomerIndustry}
          onChange={(e) => setCrmCustomerIndustry(e.target.value)}
          placeholder="Construction, utilities, oil and gas..."
          style={{
            width: "100%",
            marginTop: 5,
            padding: 10,
            borderRadius: 8,
            border: "1px solid #cbd5e1",
            boxSizing: "border-box",
          }}
        />
      </label>

      <label style={{ display: "block", marginTop: 12 }}>
        <strong>Assigned To</strong>
        <input
          value={crmCustomerAssignedTo}
          onChange={(e) => setCrmCustomerAssignedTo(e.target.value)}
          placeholder="Employee responsible"
          style={{
            width: "100%",
            marginTop: 5,
            padding: 10,
            borderRadius: 8,
            border: "1px solid #cbd5e1",
            boxSizing: "border-box",
          }}
        />
      </label>

      <label style={{ display: "block", marginTop: 12 }}>
        <strong>Next Follow-up</strong>
        <input
          type="date"
          value={crmCustomerFollowUp}
          onChange={(e) => setCrmCustomerFollowUp(e.target.value)}
          style={{
            width: "100%",
            marginTop: 5,
            padding: 10,
            borderRadius: 8,
            border: "1px solid #cbd5e1",
            boxSizing: "border-box",
          }}
        />
      </label>

      <label style={{ display: "block", marginTop: 12 }}>
        <strong>Notes</strong>
        <textarea
          value={crmCustomerNotes}
          onChange={(e) => setCrmCustomerNotes(e.target.value)}
          placeholder="Customer notes"
          rows={4}
          style={{
            width: "100%",
            marginTop: 5,
            padding: 10,
            borderRadius: 8,
            border: "1px solid #cbd5e1",
            boxSizing: "border-box",
            resize: "vertical",
          }}
        />
      </label>

      <div
  style={{
    display: "flex",
    gap: 8,
    marginTop: 14,
  }}
>
  <button
    type="button"
    onClick={saveCrmCustomer}
    disabled={loading}
    style={{
      flex: 1,
      padding: "11px 14px",
      borderRadius: 10,
      border: "none",
      background: "#123d82",
      color: "white",
      fontWeight: "bold",
      cursor: loading ? "not-allowed" : "pointer",
    }}
  >
    {loading
      ? "Saving..."
      : editingCrmCustomerId
      ? "Update Customer"
      : "Save Customer"}
  </button>

  {editingCrmCustomerId && (
    <button
      type="button"
      onClick={clearCrmCustomerForm}
      disabled={loading}
      style={{
        padding: "11px 14px",
        borderRadius: 10,
        border: "1px solid #cbd5e1",
        background: "white",
        color: "#0f172a",
        fontWeight: "bold",
        cursor: loading ? "not-allowed" : "pointer",
      }}
    >
      Cancel
    </button>
  )}
</div>
   
</div>
   
    <div>
      <h3 style={{ marginTop: 0 }}>
        Customers ({crmCustomers.length})
      </h3>

      {crmCustomers
        .filter((customer) => {
          const search = crmSearch.toLowerCase().trim();

          if (!search) return true;

          return [
            customer.company_name,
            customer.primary_contact_name,
            customer.email,
            customer.phone,
            customer.city,
            customer.industry,
            customer.status,
          ]
            .filter(Boolean)
            .join(" ")
            .toLowerCase()
            .includes(search);
        })
        .map((customer) => (
          <div
            key={customer.id}
            style={{
              border: "1px solid #e2e8f0",
              borderRadius: 14,
              padding: 14,
              marginBottom: 12,
              background: "white",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: 10,
                flexWrap: "wrap",
              }}
            >
              <div>
                <div style={{ fontSize: 18, fontWeight: "bold" }}>
                  {customer.company_name}
                </div>

                <div style={{ color: "#64748b", marginTop: 3 }}>
                  {customer.customer_type || "Customer"} ·{" "}
                  {customer.status || "Active"}
                </div>
              </div>

              {customer.next_follow_up_date && (
                <div
                  style={{
                    background: "#eff6ff",
                    color: "#1d4ed8",
                    borderRadius: 20,
                    padding: "6px 10px",
                    fontSize: 13,
                    height: "fit-content",
                  }}
                >
                  Follow-up: {customer.next_follow_up_date}
                </div>
              )}
            </div>

            <div style={{ marginTop: 10, lineHeight: 1.6 }}>
              {customer.primary_contact_name && (
                <div>
                  <strong>Contact:</strong> {customer.primary_contact_name}
                  {customer.primary_contact_title
                    ? ` — ${customer.primary_contact_title}`
                    : ""}
                </div>
              )}

              {customer.phone && (
                <div>
                  <strong>Phone:</strong> {customer.phone}
                </div>
              )}

              {customer.email && (
                <div>
                  <strong>Email:</strong> {customer.email}
                </div>
              )}

              {(customer.city || customer.province_state) && (
                <div>
                  <strong>Location:</strong>{" "}
                  {[customer.city, customer.province_state]
                    .filter(Boolean)
                    .join(", ")}
                </div>
              )}

              {customer.assigned_to && (
                <div>
                  <strong>Assigned To:</strong> {customer.assigned_to}
                </div>
              )}

              {customer.notes && (
                <div style={{ marginTop: 8 }}>
                  <strong>Notes:</strong> {customer.notes}
                </div>
              )}

<div
  style={{
    display: "flex",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 12,
  }}
>
  <button
    type="button"
    onClick={() => setSelectedCrmCustomerId(customer.id)}
    style={{
      padding: "8px 12px",
      borderRadius: 8,
      border: "none",
      background: "#123d82",
      color: "white",
      fontWeight: "bold",
      cursor: "pointer",
    }}
  >
    Open Customer Record
  </button>

  <button
    type="button"
    onClick={() => editCrmCustomer(customer)}
    style={{
      padding: "8px 12px",
      borderRadius: 8,
      border: "1px solid #123d82",
      background: "white",
      color: "#123d82",
      fontWeight: "bold",
      cursor: "pointer",
    }}
  >
    Edit Customer
  </button>
</div>
               
            </div>
          </div>
        ))}

      {crmCustomers.length === 0 && (
        <div
          style={{
            border: "1px dashed #cbd5e1",
            borderRadius: 14,
            padding: 18,
            color: "#64748b",
          }}
        >
          No customers entered yet.
        </div>
      )}
    </div>
  </div>
)}
{selectedCrmCustomerId &&
  crmCustomers
    .filter((customer) => customer.id === selectedCrmCustomerId)
    .map((customer) => (
      <div
        key={`customer-record-${customer.id}`}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(15, 23, 42, 0.72)",
          zIndex: 9999,
          overflowY: "auto",
          padding: 20,
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: 1050,
            margin: "20px auto",
            background: "white",
            borderRadius: 16,
            padding: 20,
            boxSizing: "border-box",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              gap: 12,
              flexWrap: "wrap",
              borderBottom: "1px solid #e2e8f0",
              paddingBottom: 14,
              marginBottom: 16,
            }}
          >
            <div>
              <h2 style={{ margin: 0 }}>{customer.company_name}</h2>

              <div style={{ color: "#64748b", marginTop: 5 }}>
                {customer.customer_type || "Customer"} ·{" "}
                {customer.status || "Active"}
              </div>
            </div>

            <button
              type="button"
              onClick={() => setSelectedCrmCustomerId(null)}
              style={{
                padding: "8px 12px",
                borderRadius: 8,
                border: "1px solid #cbd5e1",
                background: "white",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              Close
            </button>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: 16,
            }}
          >
            <div
              style={{
                border: "1px solid #e2e8f0",
                borderRadius: 12,
                padding: 15,
                background: "#f8fafc",
              }}
            >
              <h3 style={{ marginTop: 0 }}>Customer Information</h3>

              <div style={{ lineHeight: 1.7 }}>
                <div>
                  <strong>Contact:</strong>{" "}
                  {customer.primary_contact_name || "—"}
                </div>

                <div>
                  <strong>Title:</strong>{" "}
                  {customer.primary_contact_title || "—"}
                </div>

                <div>
                  <strong>Phone:</strong> {customer.phone || "—"}
                </div>

                <div>
                  <strong>Email:</strong> {customer.email || "—"}
                </div>

                <div>
                  <strong>Location:</strong>{" "}
                  {[customer.city, customer.province_state]
                    .filter(Boolean)
                    .join(", ") || "—"}
                </div>

                <div>
                  <strong>Industry:</strong> {customer.industry || "—"}
                </div>

                <div>
                  <strong>Assigned To:</strong>{" "}
                  {customer.assigned_to || "—"}
                </div>

                <div>
                  <strong>Next Follow-up:</strong>{" "}
                  {customer.next_follow_up_date || "—"}
                </div>
              </div>

              {customer.notes && (
                <div
                  style={{
                    marginTop: 12,
                    padding: 12,
                    background: "white",
                    borderRadius: 8,
                    whiteSpace: "pre-wrap",
                  }}
                >
                  <strong>Customer Notes</strong>
                  <div style={{ marginTop: 5 }}>{customer.notes}</div>
                </div>
              )}

              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 8,
                  marginTop: 14,
                }}
              >
                <button
                  type="button"
                  onClick={() => {
                    setSelectedCrmCustomerId(null);
                    editCrmCustomer(customer);
                  }}
                  style={{
                    padding: "8px 12px",
                    borderRadius: 8,
                    border: "1px solid #123d82",
                    background: "white",
                    color: "#123d82",
                    fontWeight: "bold",
                    cursor: "pointer",
                  }}
                >
                  Edit Customer
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setCrmActivityCustomerId(customer.id);
                    setCrmActivitySubcontractorId("");
                    setCrmActivityContact(
                      customer.primary_contact_name || ""
                    );
                    setCrmActivityType("Note");
                    setCrmActivitySubject("");
                    setCrmActivityNotes("");
                    setCrmActivityOutcome("");
                    setCrmActivityFollowUpRequired(false);
                    setCrmActivityFollowUpDate("");
                    setSelectedCrmCustomerId(null);
                    setCrmSection("activities");
                  }}
                  style={{
                    padding: "8px 12px",
                    borderRadius: 8,
                    border: "none",
                    background: "#123d82",
                    color: "white",
                    fontWeight: "bold",
                    cursor: "pointer",
                  }}
                >
                  Add Note
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setCrmActivityCustomerId(customer.id);
                    setCrmActivitySubcontractorId("");
                    setCrmActivityContact(
                      customer.primary_contact_name || ""
                    );
                    setCrmActivityType("Email");
                    setCrmActivitySubject("");
                    setCrmActivityNotes("");
                    setCrmActivityOutcome("");
                    setCrmActivityFollowUpRequired(false);
                    setCrmActivityFollowUpDate("");
                    setSelectedCrmCustomerId(null);
                    setCrmSection("activities");
                  }}
                  style={{
                    padding: "8px 12px",
                    borderRadius: 8,
                    border: "none",
                    background: "#0f766e",
                    color: "white",
                    fontWeight: "bold",
                    cursor: "pointer",
                  }}
                >
                  Paste Email
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setCrmActivityCustomerId(customer.id);
                    setCrmActivitySubcontractorId("");
                    setCrmActivityContact(
                      customer.primary_contact_name || ""
                    );
                    setCrmActivityType("Follow-up");
                    setCrmActivitySubject("");
                    setCrmActivityNotes("");
                    setCrmActivityOutcome("");
                    setCrmActivityFollowUpRequired(true);
                    setCrmActivityFollowUpDate("");
                    setSelectedCrmCustomerId(null);
                    setCrmSection("activities");
                  }}
                  style={{
                    padding: "8px 12px",
                    borderRadius: 8,
                    border: "none",
                    background: "#b45309",
                    color: "white",
                    fontWeight: "bold",
                    cursor: "pointer",
                  }}
                >
                  Add Follow-up
                </button>
              </div>
            </div>

            <div
              style={{
                border: "1px solid #e2e8f0",
                borderRadius: 12,
                padding: 15,
              }}
            >
              <h3 style={{ marginTop: 0 }}>
                Opportunities (
                {
                  crmOpportunities.filter(
                    (opportunity) =>
                      opportunity.customer_id === customer.id
                  ).length
                }
                )
              </h3>

              {crmOpportunities
                .filter(
                  (opportunity) =>
                    opportunity.customer_id === customer.id
                )
                .map((opportunity) => (
                  <div
                    key={opportunity.id}
                    style={{
                      border: "1px solid #e2e8f0",
                      borderRadius: 10,
                      padding: 12,
                      marginBottom: 10,
                    }}
                  >
                    <div style={{ fontWeight: "bold" }}>
                      {opportunity.opportunity_name}
                    </div>

                    <div style={{ color: "#64748b", marginTop: 3 }}>
                      {opportunity.sales_stage || "New Lead"}
                    </div>

                    <div style={{ marginTop: 7 }}>
                      <strong>Value:</strong> $
                      {Number(
                        opportunity.estimated_value || 0
                      ).toLocaleString()}
                    </div>

                    <div>
                      <strong>Probability:</strong>{" "}
                      {Number(opportunity.probability_percent || 0)}%
                    </div>

                    {opportunity.expected_award_date && (
                      <div>
                        <strong>Expected Award:</strong>{" "}
                        {opportunity.expected_award_date}
                      </div>
                    )}

                    {opportunity.notes && (
                      <div
                        style={{
                          marginTop: 7,
                          whiteSpace: "pre-wrap",
                        }}
                      >
                        {opportunity.notes}
                      </div>
                    )}
                  </div>
                ))}

              {crmOpportunities.filter(
                (opportunity) =>
                  opportunity.customer_id === customer.id
              ).length === 0 && (
                <div style={{ color: "#64748b" }}>
                  No opportunities recorded.
                </div>
              )}
            </div>
          </div>

          <div
            style={{
              border: "1px solid #e2e8f0",
              borderRadius: 12,
              padding: 15,
              marginTop: 16,
            }}
          >
            <h3 style={{ marginTop: 0 }}>
              Activity and Communication History (
              {
                crmActivities.filter(
                  (activity) => activity.customer_id === customer.id
                ).length
              }
              )
            </h3>

            {crmActivities
              .filter(
                (activity) => activity.customer_id === customer.id
              )
              .map((activity) => (
                <div
                  key={activity.id}
                  style={{
                    borderLeft: "4px solid #123d82",
                    background: "#f8fafc",
                    borderRadius: 8,
                    padding: 12,
                    marginBottom: 10,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      gap: 10,
                      flexWrap: "wrap",
                    }}
                  >
                    <div style={{ fontWeight: "bold" }}>
                      {activity.activity_type || "Activity"} —{" "}
                      {activity.subject}
                    </div>

                    <div style={{ color: "#64748b", fontSize: 13 }}>
                      {activity.activity_date || activity.created_at}
                    </div>
                  </div>

                  {activity.contact_name && (
                    <div style={{ marginTop: 5 }}>
                      <strong>Contact:</strong> {activity.contact_name}
                    </div>
                  )}

                  {activity.notes && (
                    <div
                      style={{
                        marginTop: 8,
                        whiteSpace: "pre-wrap",
                      }}
                    >
                      {activity.notes}
                    </div>
                  )}

                  {activity.outcome && (
                    <div style={{ marginTop: 8 }}>
                      <strong>Outcome:</strong> {activity.outcome}
                    </div>
                  )}

                  {activity.follow_up_required && (
                    <div
                      style={{
                        marginTop: 8,
                        color:
                          activity.follow_up_date &&
                          activity.follow_up_date <
                            new Date().toISOString().split("T")[0]
                            ? "#b91c1c"
                            : "#b45309",
                        fontWeight: "bold",
                      }}
                    >
                      Follow-up required
                      {activity.follow_up_date
                        ? `: ${activity.follow_up_date}`
                        : ""}
                    </div>
                  )}

                  <div
                    style={{
                      marginTop: 8,
                      color: "#64748b",
                      fontSize: 12,
                    }}
                  >
                    Added by {activity.created_by || "Unknown user"}
                  </div>
                </div>
              ))}

            {crmActivities.filter(
              (activity) => activity.customer_id === customer.id
            ).length === 0 && (
              <div style={{ color: "#64748b" }}>
                No emails, notes, calls, meetings, or follow-ups recorded.
              </div>
            )}
          </div>
        </div>
      </div>
    ))}
{crmSection === "subcontractors" && (
  <div
    style={{
      display: "grid",
      gridTemplateColumns: "minmax(300px, 420px) 1fr",
      gap: 18,
      alignItems: "start",
    }}
  >
    <div
      style={{
        border: "1px solid #e2e8f0",
        borderRadius: 14,
        padding: 16,
        background: "#f8fafc",
      }}
    >
      <h3 style={{ marginTop: 0 }}>Add Subcontractor</h3>

      <label style={{ display: "block", marginBottom: 12 }}>
        <strong>Company Name *</strong>
        <input
          value={crmSubCompany}
          onChange={(e) => setCrmSubCompany(e.target.value)}
          placeholder="Subcontractor company name"
          style={{
            width: "100%",
            marginTop: 5,
            padding: 10,
            borderRadius: 8,
            border: "1px solid #cbd5e1",
            boxSizing: "border-box",
          }}
        />
      </label>

      <label style={{ display: "block", marginBottom: 12 }}>
        <strong>Trade / Service</strong>
        <input
          value={crmSubTrade}
          onChange={(e) => setCrmSubTrade(e.target.value)}
          placeholder="Electrical, excavation, trucking..."
          style={{
            width: "100%",
            marginTop: 5,
            padding: 10,
            borderRadius: 8,
            border: "1px solid #cbd5e1",
            boxSizing: "border-box",
          }}
        />
      </label>

      <label style={{ display: "block", marginBottom: 12 }}>
        <strong>Primary Contact</strong>
        <input
          value={crmSubContact}
          onChange={(e) => setCrmSubContact(e.target.value)}
          placeholder="Contact name"
          style={{
            width: "100%",
            marginTop: 5,
            padding: 10,
            borderRadius: 8,
            border: "1px solid #cbd5e1",
            boxSizing: "border-box",
          }}
        />
      </label>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 10,
          marginBottom: 12,
        }}
      >
        <label>
          <strong>Phone</strong>
          <input
            value={crmSubPhone}
            onChange={(e) => setCrmSubPhone(e.target.value)}
            placeholder="Phone"
            style={{
              width: "100%",
              marginTop: 5,
              padding: 10,
              borderRadius: 8,
              border: "1px solid #cbd5e1",
              boxSizing: "border-box",
            }}
          />
        </label>

        <label>
          <strong>Email</strong>
          <input
            type="email"
            value={crmSubEmail}
            onChange={(e) => setCrmSubEmail(e.target.value)}
            placeholder="Email"
            style={{
              width: "100%",
              marginTop: 5,
              padding: 10,
              borderRadius: 8,
              border: "1px solid #cbd5e1",
              boxSizing: "border-box",
            }}
          />
        </label>
      </div>

      <label style={{ display: "block", marginBottom: 12 }}>
        <strong>Service Area</strong>
        <input
          value={crmSubServiceArea}
          onChange={(e) => setCrmSubServiceArea(e.target.value)}
          placeholder="Calgary, Alberta-wide, Western Canada..."
          style={{
            width: "100%",
            marginTop: 5,
            padding: 10,
            borderRadius: 8,
            border: "1px solid #cbd5e1",
            boxSizing: "border-box",
          }}
        />
      </label>

      <label style={{ display: "block", marginBottom: 12 }}>
        <strong>Status</strong>
        <select
          value={crmSubStatus}
          onChange={(e) => setCrmSubStatus(e.target.value)}
          style={{
            width: "100%",
            marginTop: 5,
            padding: 10,
            borderRadius: 8,
            border: "1px solid #cbd5e1",
          }}
        >
          <option>Pending Review</option>
          <option>Approved</option>
          <option>Preferred</option>
          <option>Inactive</option>
          <option>Do Not Use</option>
        </select>
      </label>

      <label style={{ display: "block", marginBottom: 12 }}>
        <strong>WCB Number</strong>
        <input
          value={crmSubWcbNumber}
          onChange={(e) => setCrmSubWcbNumber(e.target.value)}
          placeholder="WCB account number"
          style={{
            width: "100%",
            marginTop: 5,
            padding: 10,
            borderRadius: 8,
            border: "1px solid #cbd5e1",
            boxSizing: "border-box",
          }}
        />
      </label>

      <label style={{ display: "block", marginBottom: 12 }}>
        <strong>Insurance Expiry</strong>
        <input
          type="date"
          value={crmSubInsuranceExpiry}
          onChange={(e) => setCrmSubInsuranceExpiry(e.target.value)}
          style={{
            width: "100%",
            marginTop: 5,
            padding: 10,
            borderRadius: 8,
            border: "1px solid #cbd5e1",
            boxSizing: "border-box",
          }}
        />
      </label>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 10,
          marginBottom: 12,
        }}
      >
        <label>
          <strong>COR Status</strong>
          <select
            value={crmSubCorStatus}
            onChange={(e) => setCrmSubCorStatus(e.target.value)}
            style={{
              width: "100%",
              marginTop: 5,
              padding: 10,
              borderRadius: 8,
              border: "1px solid #cbd5e1",
            }}
          >
            <option value="">Select</option>
            <option>COR</option>
            <option>SECOR</option>
            <option>In Progress</option>
            <option>Expired</option>
            <option>Not Certified</option>
            <option>Not Provided</option>
          </select>
        </label>

        <label>
          <strong>COR Expiry</strong>
          <input
            type="date"
            value={crmSubCorExpiry}
            onChange={(e) => setCrmSubCorExpiry(e.target.value)}
            style={{
              width: "100%",
              marginTop: 5,
              padding: 10,
              borderRadius: 8,
              border: "1px solid #cbd5e1",
              boxSizing: "border-box",
            }}
          />
        </label>
      </div>

      <label
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          marginBottom: 12,
        }}
      >
        <input
          type="checkbox"
          checked={crmSubApproved}
          onChange={(e) => setCrmSubApproved(e.target.checked)}
        />
        <strong>Approved for Work</strong>
      </label>

      <label style={{ display: "block" }}>
        <strong>Notes</strong>
        <textarea
          value={crmSubNotes}
          onChange={(e) => setCrmSubNotes(e.target.value)}
          placeholder="Qualifications, pricing, performance, restrictions..."
          rows={4}
          style={{
            width: "100%",
            marginTop: 5,
            padding: 10,
            borderRadius: 8,
            border: "1px solid #cbd5e1",
            boxSizing: "border-box",
            resize: "vertical",
          }}
        />
      </label>

      <button
        type="button"
        onClick={saveCrmSubcontractor}
        disabled={loading}
        style={{
          width: "100%",
          marginTop: 14,
          padding: "11px 14px",
          borderRadius: 10,
          border: "none",
          background: "#123d82",
          color: "white",
          fontWeight: "bold",
          cursor: loading ? "not-allowed" : "pointer",
        }}
      >
        {loading ? "Saving..." : "Save Subcontractor"}
      </button>
    </div>

    <div>
      <h3 style={{ marginTop: 0 }}>
        Subcontractors ({crmSubcontractors.length})
      </h3>

      {crmSubcontractors
        .filter((sub) => {
          const search = crmSearch.toLowerCase().trim();

          if (!search) return true;

          return [
            sub.company_name,
            sub.trade_service,
            sub.primary_contact_name,
            sub.email,
            sub.phone,
            sub.service_area,
            sub.status,
            sub.wcb_number,
            sub.cor_status,
          ]
            .filter(Boolean)
            .join(" ")
            .toLowerCase()
            .includes(search);
        })
        .map((sub) => (
          <div
            key={sub.id}
            style={{
              border: "1px solid #e2e8f0",
              borderRadius: 14,
              padding: 14,
              marginBottom: 12,
              background: "white",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: 10,
                flexWrap: "wrap",
              }}
            >
              <div>
                <div style={{ fontSize: 18, fontWeight: "bold" }}>
                  {sub.company_name}
                </div>

                <div style={{ color: "#64748b", marginTop: 3 }}>
                  {sub.trade_service || "Trade not entered"} ·{" "}
                  {sub.status || "Pending Review"}
                </div>
              </div>

              <div
                style={{
                  background: sub.approved_for_work ? "#dcfce7" : "#fef3c7",
                  color: sub.approved_for_work ? "#166534" : "#92400e",
                  borderRadius: 20,
                  padding: "6px 10px",
                  fontSize: 13,
                  height: "fit-content",
                }}
              >
                {sub.approved_for_work ? "Approved for Work" : "Not Approved"}
              </div>
            </div>

            <div style={{ marginTop: 10, lineHeight: 1.6 }}>
              {sub.primary_contact_name && (
                <div>
                  <strong>Contact:</strong> {sub.primary_contact_name}
                </div>
              )}

              {sub.phone && (
                <div>
                  <strong>Phone:</strong> {sub.phone}
                </div>
              )}

              {sub.email && (
                <div>
                  <strong>Email:</strong> {sub.email}
                </div>
              )}

              {sub.service_area && (
                <div>
                  <strong>Service Area:</strong> {sub.service_area}
                </div>
              )}

              {sub.wcb_number && (
                <div>
                  <strong>WCB:</strong> {sub.wcb_number}
                </div>
              )}

              {sub.insurance_expiry_date && (
                <div>
                  <strong>Insurance Expiry:</strong>{" "}
                  {sub.insurance_expiry_date}
                </div>
              )}

              {sub.cor_status && (
                <div>
                  <strong>COR Status:</strong> {sub.cor_status}
                  {sub.cor_expiry_date
                    ? ` — Expires ${sub.cor_expiry_date}`
                    : ""}
                </div>
              )}

              {sub.notes && (
                <div style={{ marginTop: 8 }}>
                  <strong>Notes:</strong> {sub.notes}
                </div>
              )}
            </div>
          </div>
        ))}

      {crmSubcontractors.length === 0 && (
        <div
          style={{
            border: "1px dashed #cbd5e1",
            borderRadius: 14,
            padding: 18,
            color: "#64748b",
          }}
        >
          No subcontractors entered yet.
        </div>
      )}
    </div>
  </div>
)}

{crmSection === "activities" && (
  <div
    style={{
      display: "grid",
      gridTemplateColumns: "minmax(300px, 420px) 1fr",
      gap: 18,
      alignItems: "start",
    }}
  >
    <div
      style={{
        border: "1px solid #e2e8f0",
        borderRadius: 14,
        padding: 16,
        background: "#f8fafc",
      }}
    >
      <h3 style={{ marginTop: 0 }}>Add Sales Activity</h3>

      <label style={{ display: "block", marginBottom: 12 }}>
        <strong>Customer</strong>
        <select
          value={crmActivityCustomerId}
          onChange={(e) => {
            setCrmActivityCustomerId(e.target.value);

            if (e.target.value) {
              setCrmActivitySubcontractorId("");
            }
          }}
          style={{
            width: "100%",
            marginTop: 5,
            padding: 10,
            borderRadius: 8,
            border: "1px solid #cbd5e1",
          }}
        >
          <option value="">Select customer</option>

          {crmCustomers.map((customer) => (
            <option key={customer.id} value={customer.id}>
              {customer.company_name}
            </option>
          ))}
        </select>
      </label>

      <label style={{ display: "block", marginBottom: 12 }}>
        <strong>Subcontractor</strong>
        <select
          value={crmActivitySubcontractorId}
          onChange={(e) => {
            setCrmActivitySubcontractorId(e.target.value);

            if (e.target.value) {
              setCrmActivityCustomerId("");
            }
          }}
          style={{
            width: "100%",
            marginTop: 5,
            padding: 10,
            borderRadius: 8,
            border: "1px solid #cbd5e1",
          }}
        >
          <option value="">Select subcontractor</option>

          {crmSubcontractors.map((sub) => (
            <option key={sub.id} value={sub.id}>
              {sub.company_name}
            </option>
          ))}
        </select>
      </label>

      <label style={{ display: "block", marginBottom: 12 }}>
        <strong>Contact Person</strong>
        <input
          value={crmActivityContact}
          onChange={(e) => setCrmActivityContact(e.target.value)}
          placeholder="Person contacted"
          style={{
            width: "100%",
            marginTop: 5,
            padding: 10,
            borderRadius: 8,
            border: "1px solid #cbd5e1",
            boxSizing: "border-box",
          }}
        />
      </label>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 10,
          marginBottom: 12,
        }}
      >
        <label>
          <strong>Activity Type</strong>
          <select
            value={crmActivityType}
            onChange={(e) => setCrmActivityType(e.target.value)}
            style={{
              width: "100%",
              marginTop: 5,
              padding: 10,
              borderRadius: 8,
              border: "1px solid #cbd5e1",
            }}
          >
            <option>Call</option>
            <option>Email</option>
            <option>Meeting</option>
            <option>Site Visit</option>
            <option>Quote</option>
            <option>Proposal</option>
            <option>Follow-up</option>
            <option>Networking</option>
            <option>Other</option>
          </select>
        </label>

        <label>
          <strong>Activity Date</strong>
          <input
            type="date"
            value={crmActivityDate}
            onChange={(e) => setCrmActivityDate(e.target.value)}
            style={{
              width: "100%",
              marginTop: 5,
              padding: 10,
              borderRadius: 8,
              border: "1px solid #cbd5e1",
              boxSizing: "border-box",
            }}
          />
        </label>
      </div>

      <label style={{ display: "block", marginBottom: 12 }}>
        <strong>Subject *</strong>
        <input
          value={crmActivitySubject}
          onChange={(e) => setCrmActivitySubject(e.target.value)}
          placeholder="Discussed upcoming tender"
          style={{
            width: "100%",
            marginTop: 5,
            padding: 10,
            borderRadius: 8,
            border: "1px solid #cbd5e1",
            boxSizing: "border-box",
          }}
        />
      </label>

      <label style={{ display: "block", marginBottom: 12 }}>
        <strong>Notes</strong>
        <textarea
          value={crmActivityNotes}
          onChange={(e) => setCrmActivityNotes(e.target.value)}
          placeholder="Conversation details, pricing discussed, concerns, commitments..."
          rows={5}
          style={{
            width: "100%",
            marginTop: 5,
            padding: 10,
            borderRadius: 8,
            border: "1px solid #cbd5e1",
            boxSizing: "border-box",
            resize: "vertical",
          }}
        />
      </label>

      <label style={{ display: "block", marginBottom: 12 }}>
        <strong>Outcome</strong>
        <input
          value={crmActivityOutcome}
          onChange={(e) => setCrmActivityOutcome(e.target.value)}
          placeholder="Send estimate, call again, meeting booked..."
          style={{
            width: "100%",
            marginTop: 5,
            padding: 10,
            borderRadius: 8,
            border: "1px solid #cbd5e1",
            boxSizing: "border-box",
          }}
        />
      </label>

      <label style={{ display: "block", marginBottom: 12 }}>
        <strong>Assigned To</strong>
        <input
          value={crmActivityAssignedTo}
          onChange={(e) => setCrmActivityAssignedTo(e.target.value)}
          placeholder="Person responsible for next action"
          style={{
            width: "100%",
            marginTop: 5,
            padding: 10,
            borderRadius: 8,
            border: "1px solid #cbd5e1",
            boxSizing: "border-box",
          }}
        />
      </label>

      <label
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          marginBottom: 12,
        }}
      >
        <input
          type="checkbox"
          checked={crmActivityFollowUpRequired}
          onChange={(e) => {
            setCrmActivityFollowUpRequired(e.target.checked);

            if (!e.target.checked) {
              setCrmActivityFollowUpDate("");
            }
          }}
        />
        <strong>Follow-up Required</strong>
      </label>

      {crmActivityFollowUpRequired && (
        <label style={{ display: "block", marginBottom: 12 }}>
          <strong>Follow-up Date</strong>
          <input
            type="date"
            value={crmActivityFollowUpDate}
            onChange={(e) => setCrmActivityFollowUpDate(e.target.value)}
            style={{
              width: "100%",
              marginTop: 5,
              padding: 10,
              borderRadius: 8,
              border: "1px solid #cbd5e1",
              boxSizing: "border-box",
            }}
          />
        </label>
      )}

      <button
        type="button"
        onClick={saveCrmActivity}
        disabled={loading}
        style={{
          width: "100%",
          marginTop: 8,
          padding: "11px 14px",
          borderRadius: 10,
          border: "none",
          background: "#123d82",
          color: "white",
          fontWeight: "bold",
          cursor: loading ? "not-allowed" : "pointer",
        }}
      >
        {loading ? "Saving..." : "Save Sales Activity"}
      </button>
    </div>

    <div>
      <h3 style={{ marginTop: 0 }}>
        Sales Activities ({crmActivities.length})
      </h3>

      {crmActivities
        .filter((activity) => {
          const customer = crmCustomers.find(
            (item) => item.id === activity.customer_id
          );

          const subcontractor = crmSubcontractors.find(
            (item) => item.id === activity.subcontractor_id
          );

          const search = crmSearch.toLowerCase().trim();

          if (!search) return true;

          return [
            customer?.company_name,
            subcontractor?.company_name,
            activity.contact_name,
            activity.activity_type,
            activity.subject,
            activity.notes,
            activity.outcome,
            activity.assigned_to,
          ]
            .filter(Boolean)
            .join(" ")
            .toLowerCase()
            .includes(search);
        })
        .map((activity) => {
          const customer = crmCustomers.find(
            (item) => item.id === activity.customer_id
          );

          const subcontractor = crmSubcontractors.find(
            (item) => item.id === activity.subcontractor_id
          );

          const companyName =
            customer?.company_name ||
            subcontractor?.company_name ||
            "Unassigned company";

          const followUpOverdue =
            activity.follow_up_required &&
            activity.follow_up_date &&
            activity.follow_up_date <
              new Date().toISOString().split("T")[0];

          return (
            <div
              key={activity.id}
              style={{
                border: "1px solid #e2e8f0",
                borderRadius: 14,
                padding: 14,
                marginBottom: 12,
                background: "white",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: 10,
                  flexWrap: "wrap",
                }}
              >
                <div>
                  <div style={{ fontSize: 18, fontWeight: "bold" }}>
                    {activity.subject}
                  </div>

                  <div style={{ color: "#64748b", marginTop: 3 }}>
                    {companyName} · {activity.activity_type} ·{" "}
                    {activity.activity_date || "No date"}
                  </div>
                </div>

                {activity.follow_up_required && (
                  <div
                    style={{
                      background: followUpOverdue ? "#fee2e2" : "#fef3c7",
                      color: followUpOverdue ? "#991b1b" : "#92400e",
                      borderRadius: 20,
                      padding: "6px 10px",
                      fontSize: 13,
                      height: "fit-content",
                    }}
                  >
                    {followUpOverdue ? "Overdue: " : "Follow-up: "}
                    {activity.follow_up_date || "Date not set"}
                  </div>
                )}
              </div>

              <div style={{ marginTop: 10, lineHeight: 1.6 }}>
                {activity.contact_name && (
                  <div>
                    <strong>Contact:</strong> {activity.contact_name}
                  </div>
                )}

                {activity.notes && (
                  <div>
                    <strong>Notes:</strong> {activity.notes}
                  </div>
                )}

                {activity.outcome && (
                  <div>
                    <strong>Outcome:</strong> {activity.outcome}
                  </div>
                )}

                {activity.assigned_to && (
                  <div>
                    <strong>Assigned To:</strong> {activity.assigned_to}
                  </div>
                )}
              </div>
            </div>
          );
        })}

      {crmActivities.length === 0 && (
        <div
          style={{
            border: "1px dashed #cbd5e1",
            borderRadius: 14,
            padding: 18,
            color: "#64748b",
          }}
        >
          No sales activities entered yet.
        </div>
      )}
    </div>
  </div>
)}

{crmSection === "opportunities" && (
  <div
    style={{
      display: "grid",
      gridTemplateColumns: "minmax(300px, 420px) 1fr",
      gap: 18,
      alignItems: "start",
    }}
  >
    <div
      style={{
        border: "1px solid #e2e8f0",
        borderRadius: 14,
        padding: 16,
        background: "#f8fafc",
      }}
    >
      <h3 style={{ marginTop: 0 }}>Add Opportunity</h3>

      <label style={{ display: "block", marginBottom: 12 }}>
        <strong>Customer *</strong>
        <select
          value={crmOpportunityCustomerId}
          onChange={(e) => setCrmOpportunityCustomerId(e.target.value)}
          style={{
            width: "100%",
            marginTop: 5,
            padding: 10,
            borderRadius: 8,
            border: "1px solid #cbd5e1",
          }}
        >
          <option value="">Select customer</option>

          {crmCustomers.map((customer) => (
            <option key={customer.id} value={customer.id}>
              {customer.company_name}
            </option>
          ))}
        </select>
      </label>

      <label style={{ display: "block", marginBottom: 12 }}>
        <strong>Opportunity Name *</strong>
        <input
          value={crmOpportunityName}
          onChange={(e) => setCrmOpportunityName(e.target.value)}
          placeholder="Project, tender, or opportunity name"
          style={{
            width: "100%",
            marginTop: 5,
            padding: 10,
            borderRadius: 8,
            border: "1px solid #cbd5e1",
            boxSizing: "border-box",
          }}
        />
      </label>

      <label style={{ display: "block", marginBottom: 12 }}>
        <strong>Project / Tender Name</strong>
        <input
          value={crmOpportunityProject}
          onChange={(e) => setCrmOpportunityProject(e.target.value)}
          placeholder="Project or tender reference"
          style={{
            width: "100%",
            marginTop: 5,
            padding: 10,
            borderRadius: 8,
            border: "1px solid #cbd5e1",
            boxSizing: "border-box",
          }}
        />
      </label>

      <label style={{ display: "block", marginBottom: 12 }}>
        <strong>Location</strong>
        <input
          value={crmOpportunityLocation}
          onChange={(e) => setCrmOpportunityLocation(e.target.value)}
          placeholder="City, site, region..."
          style={{
            width: "100%",
            marginTop: 5,
            padding: 10,
            borderRadius: 8,
            border: "1px solid #cbd5e1",
            boxSizing: "border-box",
          }}
        />
      </label>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 10,
          marginBottom: 12,
        }}
      >
        <label>
          <strong>Estimated Value</strong>
          <input
            type="number"
            value={crmOpportunityValue}
            onChange={(e) => setCrmOpportunityValue(e.target.value)}
            placeholder="250000"
            style={{
              width: "100%",
              marginTop: 5,
              padding: 10,
              borderRadius: 8,
              border: "1px solid #cbd5e1",
              boxSizing: "border-box",
            }}
          />
        </label>

        <label>
          <strong>Probability %</strong>
          <input
            type="number"
            value={crmOpportunityProbability}
            onChange={(e) => setCrmOpportunityProbability(e.target.value)}
            placeholder="10"
            min="0"
            max="100"
            style={{
              width: "100%",
              marginTop: 5,
              padding: 10,
              borderRadius: 8,
              border: "1px solid #cbd5e1",
              boxSizing: "border-box",
            }}
          />
        </label>
      </div>

      <label style={{ display: "block", marginBottom: 12 }}>
        <strong>Sales Stage</strong>
        <select
          value={crmOpportunityStage}
          onChange={(e) => setCrmOpportunityStage(e.target.value)}
          style={{
            width: "100%",
            marginTop: 5,
            padding: 10,
            borderRadius: 8,
            border: "1px solid #cbd5e1",
          }}
        >
          <option>New Lead</option>
          <option>Contacted</option>
          <option>Qualified</option>
          <option>Estimating</option>
          <option>Proposal Submitted</option>
          <option>Negotiation</option>
          <option>Won</option>
          <option>Lost</option>
        </select>
      </label>

      <label style={{ display: "block", marginBottom: 12 }}>
        <strong>Expected Award Date</strong>
        <input
          type="date"
          value={crmOpportunityAwardDate}
          onChange={(e) => setCrmOpportunityAwardDate(e.target.value)}
          style={{
            width: "100%",
            marginTop: 5,
            padding: 10,
            borderRadius: 8,
            border: "1px solid #cbd5e1",
            boxSizing: "border-box",
          }}
        />
      </label>

      <label style={{ display: "block", marginBottom: 12 }}>
        <strong>Assigned To</strong>
        <input
          value={crmOpportunityAssignedTo}
          onChange={(e) => setCrmOpportunityAssignedTo(e.target.value)}
          placeholder="Estimator, sales lead, manager..."
          style={{
            width: "100%",
            marginTop: 5,
            padding: 10,
            borderRadius: 8,
            border: "1px solid #cbd5e1",
            boxSizing: "border-box",
          }}
        />
      </label>

      <label style={{ display: "block" }}>
        <strong>Notes</strong>
        <textarea
          value={crmOpportunityNotes}
          onChange={(e) => setCrmOpportunityNotes(e.target.value)}
          placeholder="Scope, pricing notes, competition, client needs, next steps..."
          rows={5}
          style={{
            width: "100%",
            marginTop: 5,
            padding: 10,
            borderRadius: 8,
            border: "1px solid #cbd5e1",
            boxSizing: "border-box",
            resize: "vertical",
          }}
        />
      </label>

      <button
        type="button"
        onClick={saveCrmOpportunity}
        disabled={loading}
        style={{
          width: "100%",
          marginTop: 14,
          padding: "11px 14px",
          borderRadius: 10,
          border: "none",
          background: "#123d82",
          color: "white",
          fontWeight: "bold",
          cursor: loading ? "not-allowed" : "pointer",
        }}
      >
        {loading ? "Saving..." : "Save Opportunity"}
      </button>
    </div>

    <div>
      <h3 style={{ marginTop: 0 }}>
        Opportunities ({crmOpportunities.length})
      </h3>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
          gap: 10,
          marginBottom: 14,
        }}
      >
        {[
          "New Lead",
          "Contacted",
          "Qualified",
          "Estimating",
          "Proposal Submitted",
          "Negotiation",
          "Won",
          "Lost",
        ].map((stage) => {
          const stageOpps = crmOpportunities.filter(
            (opp) => opp.sales_stage === stage
          );

          const stageValue = stageOpps.reduce(
            (sum, opp) => sum + Number(opp.estimated_value || 0),
            0
          );

          return (
            <div
              key={stage}
              style={{
                border: "1px solid #e2e8f0",
                borderRadius: 12,
                padding: 10,
                background: "white",
              }}
            >
              <div style={{ fontWeight: "bold" }}>{stage}</div>
              <div style={{ color: "#64748b", fontSize: 13 }}>
                {stageOpps.length} opps
              </div>
              <div style={{ marginTop: 4, fontWeight: "bold" }}>
                ${stageValue.toLocaleString()}
              </div>
            </div>
          );
        })}
      </div>

      {crmOpportunities
        .filter((opp) => {
          const customer = crmCustomers.find(
            (item) => item.id === opp.customer_id
          );

          const search = crmSearch.toLowerCase().trim();

          if (!search) return true;

          return [
            customer?.company_name,
            opp.opportunity_name,
            opp.project_name,
            opp.project_location,
            opp.sales_stage,
            opp.assigned_to,
            opp.notes,
          ]
            .filter(Boolean)
            .join(" ")
            .toLowerCase()
            .includes(search);
        })
        .map((opp) => {
          const customer = crmCustomers.find(
            (item) => item.id === opp.customer_id
          );

          const weightedValue =
            (Number(opp.estimated_value || 0) *
              Number(opp.probability_percent || 0)) /
            100;

          return (
            <div
              key={opp.id}
              style={{
                border: "1px solid #e2e8f0",
                borderRadius: 14,
                padding: 14,
                marginBottom: 12,
                background: "white",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: 10,
                  flexWrap: "wrap",
                }}
              >
                <div>
                  <div style={{ fontSize: 18, fontWeight: "bold" }}>
                    {opp.opportunity_name}
                  </div>

                  <div style={{ color: "#64748b", marginTop: 3 }}>
                    {customer?.company_name || "Customer not found"} ·{" "}
                    {opp.sales_stage || "New Lead"}
                  </div>
                </div>

                <div
                  style={{
                    background:
                      opp.sales_stage === "Won"
                        ? "#dcfce7"
                        : opp.sales_stage === "Lost"
                        ? "#fee2e2"
                        : "#eff6ff",
                    color:
                      opp.sales_stage === "Won"
                        ? "#166534"
                        : opp.sales_stage === "Lost"
                        ? "#991b1b"
                        : "#1d4ed8",
                    borderRadius: 20,
                    padding: "6px 10px",
                    fontSize: 13,
                    height: "fit-content",
                  }}
                >
                  {opp.sales_stage || "New Lead"}
                </div>
              </div>

              <div style={{ marginTop: 10, lineHeight: 1.6 }}>
                {opp.project_name && (
                  <div>
                    <strong>Project:</strong> {opp.project_name}
                  </div>
                )}

                {opp.project_location && (
                  <div>
                    <strong>Location:</strong> {opp.project_location}
                  </div>
                )}

                <div>
                  <strong>Estimated Value:</strong> $
                  {Number(opp.estimated_value || 0).toLocaleString()}
                </div>

                <div>
                  <strong>Probability:</strong>{" "}
                  {Number(opp.probability_percent || 0)}%
                </div>

                <div>
                  <strong>Weighted Value:</strong> $
                  {Math.round(weightedValue).toLocaleString()}
                </div>

                {opp.expected_award_date && (
                  <div>
                    <strong>Expected Award:</strong>{" "}
                    {opp.expected_award_date}
                  </div>
                )}

                {opp.assigned_to && (
                  <div>
                    <strong>Assigned To:</strong> {opp.assigned_to}
                  </div>
                )}

                {opp.notes && (
                  <div style={{ marginTop: 8 }}>
                    <strong>Notes:</strong> {opp.notes}
                  </div>
                )}
              </div>

              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 8,
                  marginTop: 12,
                }}
              >
                {[
                  "New Lead",
                  "Contacted",
                  "Qualified",
                  "Estimating",
                  "Proposal Submitted",
                  "Negotiation",
                  "Won",
                  "Lost",
                ].map((stage) => (
                  <button
                    key={stage}
                    type="button"
                    onClick={() => updateCrmOpportunityStage(opp.id, stage)}
                    disabled={loading || opp.sales_stage === stage}
                    style={{
                      padding: "7px 10px",
                      borderRadius: 8,
                      border:
                        opp.sales_stage === stage
                          ? "1px solid #123d82"
                          : "1px solid #cbd5e1",
                      background:
                        opp.sales_stage === stage ? "#123d82" : "white",
                      color: opp.sales_stage === stage ? "white" : "#0f172a",
                      cursor:
                        loading || opp.sales_stage === stage
                          ? "not-allowed"
                          : "pointer",
                      fontSize: 12,
                      fontWeight: "bold",
                    }}
                  >
                    {stage}
                  </button>
                ))}
              </div>
            </div>
          );
        })}

      {crmOpportunities.length === 0 && (
        <div
          style={{
            border: "1px dashed #cbd5e1",
            borderRadius: 14,
            padding: 18,
            color: "#64748b",
          }}
        >
          No opportunities entered yet.
        </div>
      )}
    </div>
  </div>
)}
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
