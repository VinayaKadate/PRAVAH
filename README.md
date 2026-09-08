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

## 🛠️ How to Run Locally

### Prerequisites
1. **Node.js**: Download and install from [nodejs.org](https://nodejs.org/) (needed for the frontend).
2. **Python**: Download and install Python 3.10+ from [python.org/downloads/](https://www.python.org/downloads/). During installation, **make sure to check the box that says "Add python.exe to PATH"**.

### Step 1: Start the Backend (FastAPI)
The backend requires Python and runs the API that the frontend connects to.
1. Open a terminal and navigate to the backend folder:
   ```bash
   cd backend
   ```
2. (Optional but recommended) Create and activate a virtual environment:
   ```bash
   python -m venv venv
   # On Windows:
   venv\Scripts\activate
   # On Mac/Linux:
   source venv/bin/activate
   ```
3. Install the required Python packages:
   ```bash
   pip install -r requirements.txt
   ```
4. Start the server using Uvicorn:
   ```bash
   python -m uvicorn app.main:app --reload
   ```
   *The backend should now be running at `http://127.0.0.1:8000`.*

### Step 2: Start the Frontend (React)
The frontend requires Node.js and npm.
1. Open a **second, separate terminal** and navigate to the frontend folder:
   ```bash
   cd frontend
   ```
2. Install the necessary packages (including Axios):
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
   *The frontend should now be running at `http://localhost:5173`. Open this URL in your browser to view the application!*

> **Note on Environment Variables**: We are currently in the development phase, so the `.env` and `firebase-credentials.json` files have intentionally been pushed to the repository so you can clone and run it immediately. Before deploying to production, these must be added to `.gitignore` and removed from the repository.
