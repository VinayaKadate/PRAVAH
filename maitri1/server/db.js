import fs from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");
const DB_FILE = path.join(DATA_DIR, "maitri_db.json");

const INITIAL_DATA = {
  meta: {
    lastUpdated: new Date().toISOString(),
    version: "2.0.0",
  },
  applications: [
    {
      id: "MTR/2026/LAB/0084213",
      service: "Factory Licence (Section 6, Factories Act)",
      department: "Labour Department",
      applicantName: "Sahyadri Precision Components Pvt. Ltd.",
      entityType: "Private Limited",
      sector: "Engineering & Auto Components",
      taluka: "Chakan Industrial Area (Zone D+)",
      district: "Pune",
      submittedAt: "2026-08-18T05:54:00.000Z",
      status: "processing",
      currentStageIndex: 2,
      currentDesk: "Joint Director (Industrial Safety & Health), Pune Division",
      statutoryDeadlineDays: 21,
      elapsedDays: 7,
      remarks: "Site plan scrutinized. Site inspection scheduled for physical verification.",
      documents: ["Building Plan Approval", "Machinery Layout Blueprint", "Udyam Certificate"],
    },
    {
      id: "MTR/2026/PCB/0019241",
      service: "Consent to Establish (CTE) - Orange Category",
      department: "Maharashtra Pollution Control Board",
      applicantName: "Vidarbha Agro Bio-Tech Limited",
      entityType: "Public Limited",
      sector: "Agro & Food Processing",
      taluka: "Butibori (Zone D)",
      district: "Nagpur",
      submittedAt: "2026-08-25T10:15:00.000Z",
      status: "scrutiny",
      currentStageIndex: 1,
      currentDesk: "Sub-Regional Officer, MPCB Nagpur-II",
      statutoryDeadlineDays: 45,
      elapsedDays: 4,
      remarks: "Effluent Treatment Plant (ETP) capacity validation underway.",
      documents: ["ETP Schematic", "Raw Material Mass Balance", "Water Budget Assessment"],
    },
    {
      id: "MTR/2026/MID/004512",
      service: "Allotment of Industrial Plot",
      department: "MIDC",
      applicantName: "Maratha Renewable Power Solutions LLP",
      entityType: "Limited Liability Partnership",
      sector: "Green Hydrogen & Renewables",
      taluka: "Shendra-Bidkin Industrial Park (Zone D+)",
      district: "Chhatrapati Sambhajinagar",
      submittedAt: "2026-08-05T08:30:00.000Z",
      status: "approved",
      currentStageIndex: 4,
      currentDesk: "Regional Officer, MIDC Chhatrapati Sambhajinagar",
      statutoryDeadlineDays: 30,
      elapsedDays: 19,
      remarks: "Offer letter issued. Digital lease agreement executed.",
      documents: ["Detailed Project Report", "Net Worth Certificate", "Board Resolution"],
    },
    {
      id: "MTR/2026/FIR/009182",
      service: "Provisional Fire NOC",
      department: "Directorate of Fire Services",
      applicantName: "Konkan Logistics & Warehousing Corp",
      entityType: "Private Limited",
      sector: "Logistics & Warehousing",
      taluka: "Panvel Industrial Corridor (Zone B)",
      district: "Raigad",
      submittedAt: "2026-08-28T14:20:00.000Z",
      status: "inspection",
      currentStageIndex: 3,
      currentDesk: "Divisional Fire Officer, Konkan Bhavan",
      statutoryDeadlineDays: 14,
      elapsedDays: 9,
      remarks: "Hydrant and smoke management systems undergoing physical testing.",
      documents: ["Fire Architecture Drawings", "Sprinkler Hydraulic Calculation"],
    },
    {
      id: "MTR/2026/ELC/003419",
      service: "High Tension (HT) Power Connection (11kV)",
      department: "MSEDCL",
      applicantName: "Deccan Semiconductor Technologies",
      entityType: "Private Limited",
      sector: "Electronics & Semiconductors",
      taluka: "Talegaon MIDC (Zone C)",
      district: "Pune",
      submittedAt: "2026-08-30T09:00:00.000Z",
      status: "submitted",
      currentStageIndex: 0,
      currentDesk: "Superintending Engineer, MSEDCL Pune Rural",
      statutoryDeadlineDays: 15,
      elapsedDays: 1,
      remarks: "Application received and demand note generated.",
      documents: ["Single Line Diagram", "Transformer Technical Specifications"],
    },
  ],
  grievances: [
    {
      id: "MTR/GRV/2026/07741",
      name: "Rameshwar Kulkarni",
      email: "r.kulkarni@sahyadricomp.com",
      department: "Labour Department",
      applicationId: "MTR/2026/LAB/0084213",
      detail: "Factory licence inspection delayed past initial notice period. Requested expeditious sign-off.",
      status: "under_investigation",
      filedAt: "2026-08-31T11:00:00.000Z",
      targetResolutionDate: "2026-09-07T11:00:00.000Z",
      nodalOfficerRemark: "Assigned to Joint Director for priority site visit on 04-Sep-2026.",
    },
  ],
  incentives: [
    {
      id: "MTR/INC/2026/001",
      applicantName: "Sahyadri Precision Components",
      fciCrores: 50,
      sector: "msme",
      talukaCode: "D",
      directEmployment: 120,
      totalIncentive: 23.55,
      ceilingPct: 50,
      durationYears: 10,
      calculatedAt: "2026-08-20T12:00:00.000Z",
      breakdown: {
        capitalSubsidy: 8.75,
        sgstRefund: 10.0,
        interestSubsidy: 2.5,
        electricityExemption: 0.6,
        stampDutyExemption: 0.3,
      },
    },
  ],
};

class MaitriDatabase {
  constructor() {
    this.data = this.loadData();
  }

  loadData() {
    try {
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }
      if (!fs.existsSync(DB_FILE)) {
        fs.writeFileSync(DB_FILE, JSON.stringify(INITIAL_DATA, null, 2), "utf-8");
        return INITIAL_DATA;
      }
      const raw = fs.readFileSync(DB_FILE, "utf-8");
      return JSON.parse(raw);
    } catch (e) {
      console.error("Failed to load MAITRI database from disk, falling back to initial seed:", e);
      return INITIAL_DATA;
    }
  }

  persist() {
    try {
      this.data.meta.lastUpdated = new Date().toISOString();
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }
      fs.writeFileSync(DB_FILE, JSON.stringify(this.data, null, 2), "utf-8");
    } catch (e) {
      console.error("Failed to persist MAITRI database to disk:", e);
    }
  }

  // Applications
  getApplications() {
    return this.data.applications;
  }

  getApplicationById(id) {
    if (!id) return undefined;
    const clean = id.trim().toUpperCase();
    return this.data.applications.find((a) => a.id.toUpperCase() === clean);
  }

  createApplication(app) {
    const year = new Date().getFullYear();
    const prefixMap = {
      "Labour Department": "LAB",
      "Maharashtra Pollution Control Board": "PCB",
      "MIDC": "MID",
      "Directorate of Fire Services": "FIR",
      "MSEDCL": "ELC",
      "Directorate of Industries": "IND",
      "Revenue Department": "REV",
      "Urban Development": "URB",
    };
    const pfx = prefixMap[app.department] || "GEN";
    const randomNum = Math.floor(100000 + Math.random() * 900000);
    const id = `MTR/${year}/${pfx}/${randomNum}`;

    const newApp = {
      ...app,
      id,
      submittedAt: new Date().toISOString(),
      status: "submitted",
      currentStageIndex: 0,
      elapsedDays: 0,
    };

    this.data.applications.unshift(newApp);
    this.persist();
    return newApp;
  }

  escalateApplication(id, reason) {
    if (!id) return null;
    const clean = id.trim().toUpperCase();
    const app = this.data.applications.find((a) => a.id.toUpperCase() === clean);
    if (!app) return null;

    app.remarks = `[STATUTORY RTS ESCALATION] Escalated to Appellate Authority (Development Commissioner of Industries) on ${new Date().toLocaleDateString("en-IN")}. Reason: ${reason || "Statutory timeline exceeded at desk without justifiable query."}`;
    app.currentDesk = "Appellate Authority & Development Commissioner (Industries), Mantralaya, Mumbai";
    this.persist();
    return app;
  }

  updateApplicationStage(id, stageIndex, remarks, status) {
    if (!id) return null;
    const clean = id.trim().toUpperCase();
    const app = this.data.applications.find((a) => a.id.toUpperCase() === clean);
    if (!app) return null;

    const deskStages = [
      "Common Application Form Scrutiny Desk (MAITRI Cell)",
      `Sub-Regional Nodal Officer, ${app.department}`,
      `Technical Evaluation Committee, ${app.department}`,
      `Field Joint Inspection Team, ${app.district} Division`,
      `Competent Sanctioning Authority, ${app.department}`,
    ];

    app.currentStageIndex = Math.min(Math.max(stageIndex, 0), 4);
    app.currentDesk = deskStages[app.currentStageIndex];
    if (remarks) app.remarks = remarks;
    if (status) app.status = status;
    else if (app.currentStageIndex === 4) app.status = "approved";
    else if (app.currentStageIndex === 3) app.status = "inspection";
    else if (app.currentStageIndex >= 1) app.status = "processing";

    this.persist();
    return app;
  }

  // Grievances
  getGrievances() {
    return this.data.grievances;
  }

  getGrievanceById(id) {
    if (!id) return undefined;
    const clean = id.trim().toUpperCase();
    return this.data.grievances.find((g) => g.id.toUpperCase() === clean);
  }

  createGrievance(grv) {
    const year = new Date().getFullYear();
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    const id = `MTR/GRV/${year}/${randomNum}`;

    const target = new Date();
    target.setDate(target.getDate() + 7);

    const newGrv = {
      id,
      name: grv.name,
      email: grv.email,
      department: grv.department,
      applicationId: grv.applicationId,
      detail: grv.detail,
      status: "registered",
      filedAt: new Date().toISOString(),
      targetResolutionDate: target.toISOString(),
      nodalOfficerRemark: `Assigned to Nodal Officer, ${grv.department} for time-bound scrutiny under RTS Act.`,
    };

    this.data.grievances.unshift(newGrv);
    this.persist();
    return newGrv;
  }

  // Incentive calculations
  getIncentives() {
    return this.data.incentives;
  }

  createIncentive(claim) {
    const randomNum = Math.floor(100 + Math.random() * 900);
    const id = `MTR/INC/${new Date().getFullYear()}/${randomNum}`;

    const newClaim = {
      ...claim,
      id,
      calculatedAt: new Date().toISOString(),
    };

    this.data.incentives.unshift(newClaim);
    this.persist();
    return newClaim;
  }

  // Dashboard Aggregates
  getStats() {
    const totalApps = 368219 + this.data.applications.length - 5;
    const disposedApps = 352297 + this.data.applications.filter((a) => a.status === "approved").length - 1;
    const grievancesTotal = 3452 + this.data.grievances.length - 1;
    const grievancesResolved = 3410 + this.data.grievances.filter((g) => g.status === "resolved").length;

    return {
      totalApplications: totalApps,
      disposedApplications: disposedApps,
      activeInProcessing: totalApps - disposedApps,
      disposalRate: ((disposedApps / totalApps) * 100).toFixed(1),
      totalGrievances: grievancesTotal,
      resolvedGrievances: grievancesResolved,
      grievanceResolutionRate: ((grievancesResolved / grievancesTotal) * 100).toFixed(1),
      totalIncentiveClaims: this.data.incentives.length,
      sampleApplications: this.data.applications.slice(0, 10),
    };
  }
}

export const maitriDb = new MaitriDatabase();
