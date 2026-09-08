import { useState, useEffect } from "react";
import { C, FONT } from "./data.js";
import { Header } from "./components/Header.jsx";
import { Footer } from "./components/Footer.jsx";
import { ChatBot } from "./components/ChatBot.jsx";
import { Hero, StatsBand, Features, WhyMaharashtra, Notices } from "./components/HomeSections.jsx";
import { ServicesPage } from "./components/ServicesPage.jsx";
import { CalcPage } from "./components/CalcPage.jsx";
import { TrackPage } from "./components/TrackPage.jsx";
import { DashboardPage } from "./components/DashboardPage.jsx";
import { AboutPage, GrievancePage, ContactPage } from "./components/OtherPages.jsx";

export default function App() {
  const [page, setPage] = useState("home");
  const [lang, setLang] = useState("en");
  const [a11y, setA11y] = useState({ font: 0, invert: false, links: false });

  useEffect(() => {
    const sizes = ["16px", "18px", "20px"];
    document.documentElement.style.fontSize = sizes[a11y.font];
    return () => {
      document.documentElement.style.fontSize = "";
    };
  }, [a11y.font]);

  return (
    <div
      id="maitri-app-root"
      style={{
        fontFamily: FONT,
        background: C.bg,
        minHeight: "100vh",
        filter: a11y.invert ? "invert(1) hue-rotate(180deg)" : "none",
      }}
      className="flex flex-col text-slate-800 antialiased"
    >
      {a11y.links && (
        <style>{`a, button { text-decoration: underline !important; text-underline-offset: 2px; }`}</style>
      )}

      <Header
        page={page}
        setPage={setPage}
        lang={lang}
        setLang={setLang}
        a11y={a11y}
        setA11y={setA11y}
      />

      <main id="main-content-region" className="flex-1">
        {page === "home" && (
          <>
            <Hero lang={lang} setPage={setPage} />
            <StatsBand />
            <Features setPage={setPage} />
            <WhyMaharashtra />
            <Notices setPage={setPage} />
          </>
        )}
        {page === "about" && <AboutPage />}
        {page === "services" && <ServicesPage setPage={setPage} />}
        {page === "track" && <TrackPage setPage={setPage} />}
        {page === "calc" && <CalcPage />}
        {page === "grievance" && <GrievancePage />}
        {page === "dashboard" && <DashboardPage />}
        {page === "contact" && <ContactPage />}
      </main>

      <Footer setPage={setPage} />
      <ChatBot />
    </div>
  );
}
