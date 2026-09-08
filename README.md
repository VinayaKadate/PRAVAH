# PRAVAH (MAITRI 2.0 Single Window Clearance)

This repository contains the full-stack monorepo for the PRAVAH / UdyogSetu portal.

## 🚀 Current Project Status: Backend Database Integration

We have successfully built the **frontend UI architecture** using React and Tailwind CSS, and we have scaffolded the **FastAPI backend**. We are currently in the process of integrating the real Database to replace the frontend's `mockData.js`.

### ✅ Phases Completed (Frontend + Basic API Routes)
The following features currently have their UI built and their backend API routes scaffolded (awaiting Database connection):
* **Phase 5:** Service Catalogue, Applications & Tracking (Services Available, Services Applied)
* **Phase 7:** Support & Grievances (Incentive Calculator, Grievance Submission)
* **Phase 9:** Dashboard (Investor Analytics, Charts)
* **Phase 18:** AI Query Assistant (ChatBot widget)

---

## 👥 Task Delegation: What Other Team Members Should Start

While the Database integration is being finalized, **other team members can immediately start building the Frontend UI and Backend APIs for the following unstarted phases:**

### 1. Phase 1: Onboarding & Identity
* **What to build:** Registration form (OTP, Business Profile), Login screen, and JWT Auth backend logic.
* **Why it's important:** Every other module depends on having a logged-in user and a Business Profile.

### 2. Phase 2: Factory & Plot Setup
* **What to build:** Forms to add/edit Factory Units and MIDC Plot Registrations.
* **Why it's important:** Services applications need to be linked to a specific Factory Unit.

### 3. Phase 3: Document Repository
* **What to build:** "Document Drive" UI for uploading and managing certificates/documents.
* **Why it's important:** We need this before we can attach real documents to applications.

### 4. Phase 4: Investor Wizard
* **What to build:** Multi-section questionnaire that derives a list of required approvals.
* **Why it's important:** It's the core flow for a new investor to figure out what they need to apply for.

### 5. Phase 6: CAF & Payment History
* **What to build:** Common Application Form (CAF) generation and a Payment History table.

*(Please refer to `phases (1).md` in the root for the detailed PRD and "Definition of Done" for each phase!)*

---

## How to run locally

**Frontend:**
```bash
cd frontend
npm install
npm run dev
```

**Backend:**
```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload
```
