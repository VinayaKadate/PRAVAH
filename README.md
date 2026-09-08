<<<<<<< HEAD
# PRAVAH
=======
# PRAVAH (MAITRI 2.0 Single Window Clearance)

This repository contains the full-stack monorepo for the PRAVAH / UdyogSetu portal.

## Current Project Status: API Integration Phase

We have successfully built the **frontend UI architecture** using React and Tailwind CSS. The UI currently relies on hardcoded mock data for demonstrations. 

Our **next phase** is to build the backend (FastAPI) APIs to replace this mock data and make the frontend fully dynamic, without adding any new frontend screens right now. 

---

## Required APIs for the Current Frontend 

To make the existing frontend components fully functional, we need to build the following APIs based on the PRD Phase document:

### 1. Service Catalogue (Phase 5)
* **Endpoint:** `GET /api/services`
* **Purpose:** Returns the `SERVICE_GROUPS` (departments and their available services).
* **Used in:** Services Available page.

### 2. Application Tracking (Phase 5)
* **Endpoint:** `GET /api/applications/{application_id}/track`
* **Purpose:** Returns the current timeline and progress milestones (`TRACK_STAGES`).
* **Used in:** Services Applied (Tracking Modal).

### 3. Incentive Calculator (Phase 7)
* **Endpoint:** `GET /api/incentives/params`
* **Purpose:** Returns the lookup data for the calculator (`TALUKA_CAT` and `SECTORS`).
* **Endpoint:** `POST /api/incentives/calculate`
* **Purpose:** Takes the user's investment input and returns the estimated eligible subsidies.
* **Used in:** Incentive Calculator page.

### 4. Grievance Redressal (Phase 7)
* **Endpoint:** `POST /api/grievances`
* **Purpose:** Accepts grievance submissions (Name, Email, Dept, Issue).
* **Used in:** Grievances page.

### 5. Dashboard Analytics (Phase 9)
* **Endpoint:** `GET /api/dashboard/stats`
* **Purpose:** Returns aggregated data for `STATS`, `MONTHLY` trends, `REGION_SPLIT`, and `SECTOR_INVEST`.
* **Used in:** Dashboard page charts and counters.

### 6. AI Query Assistant (Phase 18)
* **Endpoint:** `POST /api/chat`
* **Purpose:** Accepts the user's prompt and returns the AI's response.
* **Used in:** ChatBot floating widget.

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
>>>>>>> zaki
