import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import { maitriDb } from "./server/db.js";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

let aiClient = null;
function getAI() {
  if (!aiClient && process.env.GEMINI_API_KEY) {
    aiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

function getFallbackAnswer(query) {
  const q = (query || "").toLowerCase();
  if (q.includes("incentive") || q.includes("psi") || q.includes("subsidy")) {
    return "Under Maharashtra's Package Scheme of Incentives (PSI 2019), benefits include capital subsidy up to 100% of eligible fixed capital investment in backward talukas (D, D+, NID, Naxal affected), SGST refund for 7–10 years, interest subsidy (5%), electricity duty exemption, and stamp duty waivers. Check the Incentive Calculator tab for instant estimates.";
  }
  if (q.includes("taluka") || q.includes("category") || q.includes("zone")) {
    return "Talukas are grouped under PSI 2019 into: A (developed - Mumbai/Thane/Pune city), B & C (moderately developed - 30-40% ceiling), D & D+ (least developed - 50-70% ceiling, 10-year term), and NID/Naxal affected (up to 80-100% ceiling). Backward regions like Vidarbha and Marathwada receive highest subsidies.";
  }
  if (q.includes("mpcb") || q.includes("pollution") || q.includes("consent") || q.includes("cte") || q.includes("cto")) {
    return "Maharashtra Pollution Control Board (MPCB) requires Consent to Establish (CTE) before beginning construction and Consent to Operate (CTO) before commissioning. Both are 100% online through MAITRI with auto-routing to MPCB officers.";
  }
  if (q.includes("midc") || q.includes("land") || q.includes("plot")) {
    return "MIDC industrial plot allotment, water connections, and building plan approvals are integrated into MAITRI. Investors can browse plug-and-play plots across 289 industrial areas and track all clearances under statutory SLA timelines.";
  }
  if (q.includes("labour") || q.includes("factory") || q.includes("license") || q.includes("licence")) {
    return "Factory Plan Approval and Factory Licence (under Section 6 of the Factories Act, 1948) are processed via MAITRI with online inspection scheduling and digital certificate downloads within 21 statutory days.";
  }
  if (q.includes("track") || q.includes("status") || q.includes("delay")) {
    return "Track your file on MAITRI using your MTR receipt number in the 'Track Application' tab. If processing exceeds the statutory limit (e.g. 7–21 days depending on service), the case auto-escalates and you can file an instant grievance.";
  }
  return "Namaskar! MAITRI provides single-window clearance for 119 services across 16 Maharashtra government departments. You can submit applications, track desk-level status, calculate PSI 2019 incentives, or file grievances. For dedicated officer assistance, contact our toll-free helpline at 1800 120 8040 (Mon–Sat, 9:45 AM – 6:15 PM).";
}

// API Routes
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", service: "MAITRI 2.0 API & Database (React.js)" });
});

// MAITRI Database API: Applications
app.get("/api/applications", (_req, res) => {
  try {
    const apps = maitriDb.getApplications();
    res.json({ applications: apps });
  } catch (e) {
    res.status(500).json({ error: "Failed to fetch applications" });
  }
});

app.get("/api/applications/:id", (req, res) => {
  try {
    const appRecord = maitriDb.getApplicationById(req.params.id);
    if (!appRecord) {
      return res.status(404).json({ error: "Application not found", id: req.params.id });
    }
    res.json({ application: appRecord });
  } catch (e) {
    res.status(500).json({ error: "Failed to fetch application" });
  }
});

app.post("/api/applications", (req, res) => {
  try {
    const { service, department, applicantName, entityType, sector, taluka, district, statutoryDeadlineDays, currentDesk, documents } = req.body;
    if (!service || !department || !applicantName) {
      return res.status(400).json({ error: "Service, department, and applicantName are required" });
    }

    const created = maitriDb.createApplication({
      service,
      department,
      applicantName,
      entityType: entityType || "Private Limited",
      sector: sector || "General Manufacturing",
      taluka: taluka || "Industrial Zone",
      district: district || "Maharashtra",
      statutoryDeadlineDays: statutoryDeadlineDays || 21,
      currentDesk: currentDesk || `Nodal Desk, ${department}`,
      documents: Array.isArray(documents) ? documents : ["Common Application Form", "Identity & Land Documents"],
    });

    res.status(201).json({ application: created });
  } catch (e) {
    res.status(500).json({ error: "Failed to create application" });
  }
});

// Statutory RTS Escalation under Maharashtra Right to Public Services Act
app.post("/api/applications/:id/escalate", (req, res) => {
  try {
    const { reason } = req.body;
    const updated = maitriDb.escalateApplication(req.params.id, reason);
    if (!updated) {
      return res.status(404).json({ error: "Application not found" });
    }
    res.json({ success: true, application: updated, message: "Escalated under Maharashtra Right to Public Services Act" });
  } catch (e) {
    res.status(500).json({ error: "Failed to escalate application" });
  }
});

// Department Desk Workflow Movement
app.put("/api/applications/:id/stage", (req, res) => {
  try {
    const { stageIndex, remarks, status } = req.body;
    if (stageIndex === undefined) {
      return res.status(400).json({ error: "stageIndex is required" });
    }
    const updated = maitriDb.updateApplicationStage(req.params.id, Number(stageIndex), remarks, status);
    if (!updated) {
      return res.status(404).json({ error: "Application not found" });
    }
    res.json({ success: true, application: updated });
  } catch (e) {
    res.status(500).json({ error: "Failed to update application stage" });
  }
});

// Statutory Services Directory API
app.get("/api/services", (_req, res) => {
  try {
    const services = [
      {
        dept: "Directorate of Industries",
        count: 14,
        items: [
          "Udyog Aadhaar acknowledgement",
          "Entrepreneurs Memorandum Part-II",
          "Incentive eligibility certificate",
          "Registration under PSI 2019",
          "Stamp duty exemption certificate",
          "Electricity duty concession verification",
        ],
      },
      {
        dept: "MIDC",
        count: 12,
        items: [
          "Plot allotment in industrial areas",
          "Building plan approval",
          "Water connection application",
          "Transfer of industrial lease",
          "No-objection for mortgage",
        ],
      },
      {
        dept: "Maharashtra Pollution Control Board",
        count: 9,
        items: [
          "Consent to Establish (CTE)",
          "Consent to Operate (CTO)",
          "Hazardous waste authorisation",
          "Renewal of consent",
          "Bio-medical waste management",
        ],
      },
      {
        dept: "Directorate of Fire Services",
        count: 6,
        items: [
          "Provisional fire NOC",
          "Final fire NOC",
          "Renewal of fire licence",
          "Approval of fire fighting scheme",
        ],
      },
      {
        dept: "Labour Department & DISH",
        count: 8,
        items: [
          "Factory licence under Factories Act",
          "Registration under Shops & Establishments",
          "Contract labour registration",
          "Boiler registration and inspection",
        ],
      },
      {
        dept: "MSEDCL",
        count: 5,
        items: [
          "High Tension (HT) power connection",
          "Low Tension (LT) industrial connection",
          "Load enhancement approval",
          "Open access permission",
        ],
      },
      {
        dept: "Revenue Department",
        count: 11,
        items: [
          "Non-agricultural (NA) permission (Sec 44)",
          "Land valuation certificate",
          "Search report and title clearance",
          "Stamp duty calculation endorsement",
        ],
      },
      {
        dept: "Urban Development & Town Planning",
        count: 8,
        items: [
          "Development permission in municipal limits",
          "Zone conversion verification",
          "Layout sanction for mega projects",
        ],
      },
    ];
    res.json({ totalServices: 119, totalDepartments: 16, departments: services });
  } catch (e) {
    res.status(500).json({ error: "Failed to fetch services catalog" });
  }
});

// MAITRI Database API: Grievances
app.get("/api/grievances", (_req, res) => {
  try {
    const grvs = maitriDb.getGrievances();
    res.json({ grievances: grvs });
  } catch (e) {
    res.status(500).json({ error: "Failed to fetch grievances" });
  }
});

app.get("/api/grievances/:id", (req, res) => {
  try {
    const grv = maitriDb.getGrievanceById(req.params.id);
    if (!grv) {
      return res.status(404).json({ error: "Grievance ticket not found" });
    }
    res.json({ grievance: grv });
  } catch (e) {
    res.status(500).json({ error: "Failed to fetch grievance" });
  }
});

app.post("/api/grievances", (req, res) => {
  try {
    const { name, email, department, applicationId, detail } = req.body;
    if (!name || !email || !department || !detail) {
      return res.status(400).json({ error: "Name, email, department, and detail are required" });
    }

    const created = maitriDb.createGrievance({
      name,
      email,
      department,
      applicationId,
      detail,
    });

    res.status(201).json({ grievance: created });
  } catch (e) {
    res.status(500).json({ error: "Failed to register grievance" });
  }
});

// MAITRI Database API: Incentives
app.get("/api/incentives", (_req, res) => {
  try {
    const claims = maitriDb.getIncentives();
    res.json({ incentives: claims });
  } catch (e) {
    res.status(500).json({ error: "Failed to fetch incentives" });
  }
});

app.post("/api/incentives", (req, res) => {
  try {
    const { applicantName, fciCrores, sector, talukaCode, directEmployment, totalIncentive, ceilingPct, durationYears, breakdown } = req.body;
    if (!fciCrores || !sector || !talukaCode) {
      return res.status(400).json({ error: "fciCrores, sector, and talukaCode are required" });
    }

    const created = maitriDb.createIncentive({
      applicantName: applicantName || "Promoter Entity",
      fciCrores: Number(fciCrores),
      sector,
      talukaCode,
      directEmployment: Number(directEmployment || 0),
      totalIncentive: Number(totalIncentive || 0),
      ceilingPct: Number(ceilingPct || 0),
      durationYears: Number(durationYears || 7),
      breakdown: breakdown || {
        capitalSubsidy: 0,
        sgstRefund: 0,
        interestSubsidy: 0,
        electricityExemption: 0,
        stampDutyExemption: 0,
      },
    });

    res.status(201).json({ incentive: created });
  } catch (e) {
    res.status(500).json({ error: "Failed to save incentive draft" });
  }
});

// MAITRI Database API: Aggregate Portal Statistics
app.get("/api/stats", (_req, res) => {
  try {
    const stats = maitriDb.getStats();
    res.json(stats);
  } catch (e) {
    res.status(500).json({ error: "Failed to compute stats" });
  }
});

app.post("/api/chat", async (req, res) => {
  try {
    const { messages } = req.body;
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Invalid messages array" });
    }

    const lastUserMessage = [...messages].reverse().find((m) => m.role === "user")?.text || "";

    const ai = getAI();
    if (ai) {
      try {
        const conversationHistory = messages
          .map((m) => `${m.role === "user" ? "User" : "Assistant"}: ${m.text}`)
          .join("\n");
        const prompt = `Conversation:\n${conversationHistory}\n\nPlease respond to the user's latest query. Keep the response under 90 words, plain-spoken, practical, and helpful. Mention helpline 1800 120 8040 if real officer intervention is needed.`;

        const response = await ai.models.generateContent({
          model: "gemini-3.8-flash",
          contents: prompt,
          config: {
            systemInstruction:
              "You are the MAITRI 2.0 helpdesk assistant for the Government of Maharashtra's single-window investment portal. Answer questions about industrial approvals, PSI 2019 incentives, taluka classifications, MIDC plots, pollution consent, factory licences and application tracking. Be concise (under 90 words), plain-spoken, polite, and practical. If something needs an officer, mention the helpline 1800 120 8040. Do not invent specific case numbers.",
          },
        });

        const reply = response.text?.trim() || getFallbackAnswer(lastUserMessage);
        return res.json({ reply });
      } catch (err) {
        console.error("Gemini API call failed, using fallback:", err);
        return res.json({ reply: getFallbackAnswer(lastUserMessage) });
      }
    } else {
      return res.json({ reply: getFallbackAnswer(lastUserMessage) });
    }
  } catch (e) {
    console.error("Chat error:", e);
    return res.status(500).json({ error: "Failed to process chat message" });
  }
});

// Start server with Vite middleware in dev or static serving in production
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`MAITRI 2.0 Server running on http://localhost:${PORT}`);
  });
}

startServer();
