import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  INITIAL_FACTORY_UNITS,
  INITIAL_COMPLIANCES,
  INITIAL_PAYMENTS,
  INITIAL_QUERIES,
  INITIAL_PUBLIC_CONSULTATIONS,
  INITIAL_SCHEMES,
  INITIAL_APPLICATIONS,
  INITIAL_DOCUMENTS,
  INITIAL_AUDIT_LOGS,
  INITIAL_FRAUD_ALERTS,
  INITIAL_USERS
} from "../data/mockData";
import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";
import { ChatBot } from "../components/chatbot/ChatBot";
import { FONT, C } from "../constants/theme";
import { AuthProvider } from "../contexts/AuthContext";
import { TranslationProvider } from "../contexts/TranslationContext";

import { Home } from "../features/home/pages/Home";
import { About } from "../pages/About";
import { ServicesAvailable } from "../features/services/pages/ServicesAvailable";
import { ServicesApplied } from "../features/applications/pages/ServicesApplied";
import { ApplyService } from "../features/applications/pages/ApplyService";
import { IncentiveCalculator } from "../features/incentives/pages/IncentiveCalculator";
import { Grievances } from "../features/grievances/pages/Grievances";
import { InvestorDashboard } from "../features/dashboard/pages/InvestorDashboard";
import { AuthenticatedLayout } from "../components/layout/AuthenticatedLayout";
import { useAuth } from "../contexts/AuthContext";
import { Outlet, Navigate } from "react-router-dom";
import { Contact } from "../pages/Contact";
import { Login } from "../pages/Login";
import { Register } from "../pages/Register";
import { MyBusiness } from "../features/business/pages/MyBusiness";
import { DocumentDrive } from "../features/documents/pages/DocumentDrive";
import { OfficerLayout } from "../features/officer/layout/OfficerLayout";
import { OfficerDashboard } from "../features/officer/pages/OfficerDashboard";
import { FactoryUnits } from "../features/business/pages/FactoryUnits";
import { InvestorWizard } from "../features/applications/pages/InvestorWizard";
import { PaymentsHistory } from "../features/dashboard/pages/PaymentsHistory";
import { DepartmentQueries } from "../features/grievances/pages/DepartmentQueries";
import { PublicConsultations } from "../features/home/pages/PublicConsultations";
import { AuditLogs } from "../features/dashboard/pages/AuditLogs";
import { FraudRadar } from "../features/officer/pages/FraudRadar";
// A wrapper to enforce authentication
function PrivateRoute() {
  const { currentUser, loading } = useAuth();
  if (loading) return null;
  return currentUser ? <AuthenticatedLayout /> : <Navigate to="/login" />;
}

// A layout for public pages
function PublicLayout({ a11y, setA11y }) {
  return (
    <>
      <Header a11y={a11y} setA11y={setA11y} />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

function AppRoutes() {
  const [a11y, setA11y] = useState({ font: 0, invert: false, links: false });

  const fs = a11y.font === 1 ? "17px" : a11y.font === 2 ? "18px" : "16px";
  const a11yClass = `${a11y.invert ? "invert hue-rotate-180" : ""} ${a11y.links ? "underline" : ""}`;

  const mockState = {
    factoryUnits: INITIAL_FACTORY_UNITS,
    compliances: INITIAL_COMPLIANCES,
    applications: INITIAL_APPLICATIONS,
    documents: INITIAL_DOCUMENTS
  };

  return (
    <BrowserRouter>
      <div 
        className={`min-h-screen flex flex-col font-sans antialiased ${a11yClass}`}
        style={{ fontFamily: FONT, fontSize: fs, background: C.white, color: C.ink }}
      >
        <Routes>
          {/* Public Routes */}
          <Route element={<PublicLayout a11y={a11y} setA11y={setA11y} />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>

          {/* Officer Routes */}
          <Route path="/officer" element={<PrivateRoute><OfficerLayout /></PrivateRoute>}>
            <Route index element={<OfficerDashboard />} />
            <Route path="fraud" element={<FraudRadar alerts={INITIAL_FRAUD_ALERTS} />} />
          </Route>

          {/* Private Routes (Sidebar Layout) */}
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<InvestorDashboard state={mockState} activeUser={INITIAL_USERS['user_1']} />} />
            <Route path="/business" element={<MyBusiness />} />
            <Route path="/drive" element={<DocumentDrive />} />
            <Route path="/services" element={<ServicesAvailable />} />
            <Route path="/apply" element={<ApplyService />} />
            <Route path="/track" element={<ServicesApplied />} />
            <Route path="/calc" element={<IncentiveCalculator schemes={INITIAL_SCHEMES} />} />
            <Route path="/grievance" element={<Grievances />} />
            <Route path="/factory" element={<FactoryUnits units={INITIAL_FACTORY_UNITS} />} />
            <Route path="/wizard" element={<InvestorWizard />} />
            <Route path="/payments" element={<PaymentsHistory payments={INITIAL_PAYMENTS} />} />
            <Route path="/queries" element={<DepartmentQueries queries={INITIAL_QUERIES} />} />
            <Route path="/consultations" element={<PublicConsultations consultations={INITIAL_PUBLIC_CONSULTATIONS} />} />
            <Route path="/audit" element={<AuditLogs logs={INITIAL_AUDIT_LOGS} />} />
          </Route>
        </Routes>
        <ChatBot />
      </div>
    </BrowserRouter>
  );
}


export function App() {
  return (
    <TranslationProvider>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </TranslationProvider>
  );
}
