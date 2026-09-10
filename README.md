# PRAVAH (MAITRI 2.0 Single Window Clearance)

This repository contains the full-stack monorepo for the PRAVAH / UdyogSetu portal.

## 🚀 Current Project Status & Phase Tracking

We are tracking progress against the `phases (1).md` master document. 

### ✅ Completed or Nearly Completed Phases

* **Phase 1: Onboarding & Identity** (Mostly Complete)
  * *Done:* Registration form, Login screen, Business Profile data collection, and robust Firebase JWT Authentication via FastAPI.
  * *Remaining:* Email/Mobile OTP provider integration, Encrypted storage for Aadhaar/PAN.
* **Phase 11: Document Pre-Validation & OCR Auto-Validator** (Completed!)
  * *Done:* Implemented full EasyOCR and PyMuPDF pipeline in FastAPI (`ocr_service.py`). Includes real-time validation for Name Matching, Expiry Checks (Regex), and Signature presence against the logged-in user's Business Profile. The frontend `InlineDocumentUpload.jsx` provides instant ✅/❌ feedback.

### 🔄 In Progress (UI Built, Pending DB Integration)

* **Phase 0: Foundation & Infrastructure**
  * *Done:* Monorepo structure, React/Tailwind frontend, FastAPI backend, base Auth scaffold.
  * *Remaining:* PostgreSQL DB setup, Cloudinary integration, Docker deployment, full RBAC roles.
* **Phase 5: Service Catalogue, Applications & Tracking**
  * *Done:* UI for Services Available and Services Applied, backend API routes scaffolded.
  * *Remaining:* Full DB integration, dynamic service-specific forms.
* **Phase 7: Support, Grievance, Incentive Calculator**
  * *Done:* UI for Grievances and Incentive Calculator.
  * *Remaining:* Real DB connection and sentiment analysis logic.
* **Phase 9: Dashboard (Landing Analytics)**
  * *Done:* UI built with stat tiles and charts. Partial integration with Firestore.
  * *Remaining:* Real data aggregation across all modules.
* **Phase 18: AI Query Assistant**
  * *Done:* ChatBot UI widget scaffolded.
  * *Remaining:* NLP/LLM integration for conversational queries.

### ❌ Not Started (Needs Immediate Attention)

* **Phase 2: Factory & Plot Setup** - Need forms for Factory Units and MIDC Plot registration.
* **Phase 3: Document Repository** - Need the centralized "Document Drive" UI for global document management.
* **Phase 4: Investor Wizard** - Need the multi-section questionnaire to derive required approvals.
* **Phase 6: CAF & Payment History** - Need Common Application Form generation and payment history UI.
* **Phase 8: Account & Delegation Settings** - Need Transactional User RBAC and delegation.
* **Phase 10: AI Approval Roadmap** - Need dependency graph engine and sequencing logic.
* **Phase 12: SLA Risk & Delay Prediction** - Need risk engine and scoring logic.
* **Phase 13: Post-Approval Compliance Calendar** - Need automated compliance task generation.
* **Phase 14: Regulatory Change Impact Engine** - Need regulatory notification matching.
* **Phase 15: Incentive Readiness & Scenario Planner** - Need AI analysis on top of the Phase 7 calculator.
* **Phase 16: Dashboard Next-Best-Action Banner** - Need priority action surfacing in Dashboard.
* **Phase 17: Sentiment-Linked Grievance Triage** - Need negative sentiment escalation logic.
* **Phase 19: Officer SLA Dashboard** - Need officer views and workload balancer.
* **Phase 20: Duplicate / Fraud Detection** - Need matching/near-matching detection.
* **Phase 21: District/Sector Bottleneck Heatmap** - Need geographic/sectoral delay visualization.
* **Phase 22: Real Integrations & Launch Readiness** - Need Payment Gateway, SMS, Docker load testing.

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
2. Install the necessary packages:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
   *The frontend should now be running at `http://localhost:5173`. Open this URL in your browser to view the application!*

> **Note on Environment Variables**: We are currently in the development phase, so the `.env` file has intentionally been pushed to the repository so you can clone and run it immediately. `firebase-credentials.json` is ignored for security purposes. Before deploying to production, all secrets must be removed from the repository.
