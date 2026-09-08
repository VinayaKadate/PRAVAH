import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";
import { ChatBot } from "../components/chatbot/ChatBot";
import { FONT, C } from "../constants/theme";

import { Home } from "../features/home/pages/Home";
import { About } from "../pages/About";
import { ServicesAvailable } from "../features/services/pages/ServicesAvailable";
import { ServicesApplied } from "../features/applications/pages/ServicesApplied";
import { IncentiveCalculator } from "../features/incentives/pages/IncentiveCalculator";
import { Grievances } from "../features/grievances/pages/Grievances";
import { InvestorDashboard } from "../features/dashboard/pages/InvestorDashboard";
import { Contact } from "../pages/Contact";

export function App() {
  const [lang, setLang] = useState("en");
  const [a11y, setA11y] = useState({ font: 0, invert: false, links: false });

  const fs = a11y.font === 1 ? "17px" : a11y.font === 2 ? "18px" : "16px";
  const a11yClass = `${a11y.invert ? "invert hue-rotate-180" : ""} ${a11y.links ? "underline" : ""}`;

  return (
    <BrowserRouter>
      <div 
        className={`min-h-screen flex flex-col font-sans antialiased ${a11yClass}`}
        style={{ fontFamily: FONT, fontSize: fs, background: C.white, color: C.ink }}
      >
        <Header lang={lang} setLang={setLang} a11y={a11y} setA11y={setA11y} />
        
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home lang={lang} />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<ServicesAvailable />} />
            <Route path="/track" element={<ServicesApplied />} />
            <Route path="/calc" element={<IncentiveCalculator />} />
            <Route path="/grievance" element={<Grievances />} />
            <Route path="/dashboard" element={<InvestorDashboard />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>

        <Footer />
        <ChatBot />
      </div>
    </BrowserRouter>
  );
}
