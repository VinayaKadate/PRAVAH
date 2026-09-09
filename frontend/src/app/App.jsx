import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";
import { ChatBot } from "../components/chatbot/ChatBot";
import { FONT, C } from "../constants/theme";
import { AuthProvider, useAuth } from "../contexts/AuthContext";

import { Home } from "../features/home/pages/Home";
import { About } from "../pages/About";
import { Login } from "../pages/Login";
import { Register } from "../pages/Register";
import { ServicesAvailable } from "../features/services/pages/ServicesAvailable";
import { ServicesApplied } from "../features/applications/pages/ServicesApplied";
import { IncentiveCalculator } from "../features/incentives/pages/IncentiveCalculator";
import { Grievances } from "../features/grievances/pages/Grievances";
import { InvestorDashboard } from "../features/dashboard/pages/InvestorDashboard";
import { Contact } from "../pages/Contact";

/**
 * Wraps a route that requires authentication.
 * Redirects to /login if not authenticated.
 */
function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <div
          className="w-8 h-8 border-3 rounded-full animate-spin"
          style={{ borderColor: C.line, borderTopColor: C.navy }}
        />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

function AppRoutes({ lang }) {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Home lang={lang} />} />
      <Route path="/about" element={<About />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/services" element={<ServicesAvailable />} />
      <Route path="/contact" element={<Contact />} />

      {/* Protected routes */}
      <Route
        path="/track"
        element={
          <ProtectedRoute>
            <ServicesApplied />
          </ProtectedRoute>
        }
      />
      <Route
        path="/calc"
        element={
          <ProtectedRoute>
            <IncentiveCalculator />
          </ProtectedRoute>
        }
      />
      <Route
        path="/grievance"
        element={
          <ProtectedRoute>
            <Grievances />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <InvestorDashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export function App() {
  const [lang, setLang] = useState("en");
  const [a11y, setA11y] = useState({ font: 0, invert: false, links: false });

  const fs = a11y.font === 1 ? "17px" : a11y.font === 2 ? "18px" : "16px";
  const a11yClass = `${a11y.invert ? "invert hue-rotate-180" : ""} ${a11y.links ? "underline" : ""}`;

  return (
    <BrowserRouter>
      <AuthProvider>
        <div
          className={`min-h-screen flex flex-col font-sans antialiased ${a11yClass}`}
          style={{ fontFamily: FONT, fontSize: fs, background: C.white, color: C.ink }}
        >
          <Header lang={lang} setLang={setLang} a11y={a11y} setA11y={setA11y} />

          <main className="flex-1">
            <AppRoutes lang={lang} />
          </main>

          <Footer />
          <ChatBot />
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}
