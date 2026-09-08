import { useState, useEffect, useRef } from "react";
import {
  Search, ShieldCheck, Factory, Calculator, Clock, ChevronRight, FileCheck,
  Landmark, Check, TrendingUp, Users, Zap, MessageSquare, Bot, Headphones,
  Phone, Mail
} from "lucide-react";
import { C, T, STATS, inr } from "../data.js";

function useCountUp(target, run) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!run) return;
    let raf;
    let start = null;
    const dur = 1400;
    const step = (t) => {
      if (!start) start = t;
      const p = Math.min((t - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, run]);
  return n;
}

export function Hero({ lang, setPage }) {
  const t = T[lang];
  const [q, setQ] = useState("");

  const handleSearch = (e) => {
    if (e) e.preventDefault();
    setPage("services");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section
      id="home-hero-section"
      style={{
        background: `linear-gradient(115deg, ${C.navyDeep} 0%, ${C.navy} 55%, ${C.navySoft} 100%)`,
      }}
      className="px-4 py-16 text-white"
    >
      <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-7">
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-4 text-xs font-semibold"
            style={{ background: "rgba(232,119,34,0.22)", color: "#FFB877", border: "1px solid rgba(232,119,34,0.3)" }}
          >
            <ShieldCheck size={14} /> {t.heroKicker}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4 tracking-tight">
            {t.heroTitle}
          </h1>
          <p className="text-base md:text-lg leading-relaxed mb-7 text-blue-100 max-w-xl">
            {t.heroSub}
          </p>

          {/* Search bar */}
          <form
            onSubmit={handleSearch}
            className="flex flex-col sm:flex-row gap-2 p-2 rounded-lg bg-white shadow-xl max-w-xl"
          >
            <div className="flex items-center gap-2 flex-1 px-3">
              <Search size={19} className="text-slate-400 shrink-0" />
              <input
                id="hero-service-search"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder={t.searchPh}
                className="w-full py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none"
              />
            </div>
            <button
              type="submit"
              id="btn-hero-search-services"
              className="px-6 py-2.5 rounded font-semibold text-sm transition-opacity hover:opacity-90 shadow cursor-pointer"
              style={{ background: C.saffron, color: C.white }}
            >
              {t.searchBtn}
            </button>
          </form>

          {/* Frequently used tags */}
          <div className="mt-5 flex flex-wrap items-center gap-2">
            <span className="text-xs text-blue-200">{t.quick}:</span>
            {["Factory licence", "Consent to establish", "Fire NOC", "NA permission", "MIDC plot"].map((s) => (
              <button
                key={s}
                onClick={() => {
                  setPage("services");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="text-xs px-2.5 py-1 rounded transition-colors hover:bg-white/20 cursor-pointer"
                style={{ background: "rgba(255,255,255,0.12)", color: "#E0EDF8" }}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Start Here Card */}
        <div className="lg:col-span-5">
          <div
            className="rounded-xl p-6 backdrop-blur-sm shadow-2xl border"
            style={{ background: "rgba(255,255,255,0.08)", borderColor: "rgba(255,255,255,0.18)" }}
          >
            <h3 className="text-lg font-bold mb-1 text-white">Start Here</h3>
            <p className="text-sm mb-5 text-blue-200">
              Key workflows most industrial investors initiate first.
            </p>

            <div className="space-y-3">
              {[
                {
                  icon: Factory,
                  title: "Register your project",
                  body: "Common Application Form (CAF) covering 16 departments.",
                  go: "services",
                },
                {
                  icon: Calculator,
                  title: "Check your incentives",
                  body: "Capital subsidy, SGST refund, duty exemptions under PSI 2019.",
                  go: "calc",
                },
                {
                  icon: Clock,
                  title: "Track a pending file",
                  body: "Desk-level officer tracking with statutory SLA indicators.",
                  go: "track",
                },
              ].map((x) => (
                <button
                  key={x.title}
                  id={`hero-card-${x.go}`}
                  onClick={() => {
                    setPage(x.go);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="w-full flex items-start gap-3.5 p-3.5 rounded-lg text-left transition-all hover:bg-white/15 group cursor-pointer"
                  style={{ border: "1px solid rgba(255,255,255,0.15)" }}
                >
                  <div className="p-2.5 rounded-md shrink-0 shadow-sm transition-transform group-hover:scale-105" style={{ background: C.saffron }}>
                    <x.icon size={18} color={C.white} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-white group-hover:text-amber-200 transition-colors">
                      {x.title}
                    </div>
                    <div className="text-xs text-blue-200 mt-0.5 leading-relaxed">
                      {x.body}
                    </div>
                  </div>
                  <ChevronRight size={17} className="text-blue-300 mt-1 shrink-0 transition-transform group-hover:translate-x-0.5" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StatTile({ value, label, icon: Icon, run }) {
  const n = useCountUp(value, run);
  return (
    <div className="flex items-start gap-3.5 p-3 rounded-lg hover:bg-slate-50 transition-colors">
      <div className="p-3 rounded-lg shrink-0 shadow-sm" style={{ background: C.greenLight }}>
        <Icon size={22} color={C.green} />
      </div>
      <div>
        <div className="text-2xl md:text-3xl font-bold tabular-nums tracking-tight" style={{ color: C.navyDeep }}>
          {inr(n)}
        </div>
        <div className="text-sm font-medium mt-0.5" style={{ color: C.slate }}>
          {label}
        </div>
      </div>
    </div>
  );
}

export function StatsBand() {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setSeen(true), { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const icons = [FileCheck, Landmark, FileCheck, Check];

  return (
    <section ref={ref} id="stats-band" className="px-4 py-8 border-b" style={{ background: C.white, borderColor: C.line }}>
      <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6">
        {STATS.map((s, idx) => (
          <StatTile key={s.label} value={s.value} label={s.label} icon={icons[idx]} run={seen} />
        ))}
      </div>
    </section>
  );
}

export function Features({ setPage }) {
  const featuresList = [
    {
      icon: FileCheck,
      title: "Single-window approvals",
      body: "One application, one set of verified documents. The portal automatically routes files to every regulatory department.",
      action: "services",
    },
    {
      icon: Clock,
      title: "Desk-level tracking",
      body: "Transparently observe which nodal officer holds your file, days elapsed, and statutory SLA limits.",
      action: "track",
    },
    {
      icon: Calculator,
      title: "Incentive calculator",
      body: "Input investment size and taluka location to view capital subsidy, SGST refunds and electricity exemptions.",
      action: "calc",
    },
    {
      icon: MessageSquare,
      title: "Grievance redressal",
      body: "Lodge issues directly against delays. Cases automatically escalate if unresolved within 7 working days.",
      action: "grievance",
    },
    {
      icon: Bot,
      title: "24/7 AI assistant",
      body: "Query regulatory eligibility, required attachments, or approval workflows in conversational English or Marathi.",
      action: "home",
    },
    {
      icon: Headphones,
      title: "Investor handholding",
      body: "Dedicated relationship managers facilitate projects from land scouting through commissioning and aftercare.",
      action: "contact",
    },
  ];

  return (
    <section id="features-section" className="px-4 py-16">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10 max-w-3xl">
          <div className="inline-block mb-3 px-3 py-1 rounded text-xs font-semibold tracking-wide uppercase" style={{ background: C.saffronLight, color: C.saffron }}>
            System Capabilities
          </div>
          <h2 className="text-3xl font-bold leading-tight" style={{ color: C.navyDeep }}>
            Built to eliminate counter visits and regulatory bottlenecks
          </h2>
          <p className="mt-2.5 text-base leading-relaxed" style={{ color: C.slate }}>
            MAITRI 2.0 transforms industrial administration with transparent, accountable workflows governed by the Maharashtra Trade and Investment Facilitation Act.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuresList.map((f) => (
            <div
              key={f.title}
              className="p-6 rounded-xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="w-11 h-11 rounded-lg flex items-center justify-center mb-4 shadow-sm" style={{ background: C.navy }}>
                  <f.icon size={20} color={C.white} />
                </div>
                <h3 className="font-bold text-base mb-2" style={{ color: C.navyDeep }}>
                  {f.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: C.slate }}>
                  {f.body}
                </p>
              </div>

              <button
                onClick={() => {
                  setPage(f.action);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="mt-5 text-xs font-bold inline-flex items-center gap-1 hover:underline cursor-pointer"
                style={{ color: C.saffron }}
              >
                Explore capability <ChevronRight size={13} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function WhyMaharashtra() {
  const points = [
    { icon: TrendingUp, k: "₹32.4 lakh crore", v: "Largest Gross State Domestic Product (GSDP) contributing ~14% of India's GDP" },
    { icon: Factory, k: "289 industrial areas", v: "MIDC estates equipped with plug-and-play plots, CETPs, and reliable utilities" },
    { icon: Users, k: "1.2 crore workforce", v: "Premier manufacturing, electronics, and technical engineering talent pipeline" },
    { icon: Zap, k: "Surplus industrial power", v: "Uninterrupted 24/7 supply with duty exemption and subsidized tariffs in D/D+ talukas" },
  ];

  return (
    <section id="why-maharashtra" className="px-4 py-16" style={{ background: C.navyDeep }}>
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Why leading global investors choose Maharashtra
          </h2>
          <p className="text-base leading-relaxed mb-6 text-blue-100 max-w-xl">
            Maharashtra leads the country in industrial gross output, foreign direct investment (FDI), and manufacturing exports.
            MAITRI single-window clearance guarantees that statutory approvals progress as rapidly as your business demands.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="#stats-band"
              className="px-5 py-2.5 rounded font-semibold text-sm transition-opacity hover:opacity-90 shadow"
              style={{ background: C.saffron, color: C.white }}
            >
              View portal performance
            </a>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {points.map((p) => (
            <div
              key={p.k}
              className="p-5 rounded-lg border backdrop-blur-sm"
              style={{ background: "rgba(255,255,255,0.06)", borderColor: "rgba(255,255,255,0.14)" }}
            >
              <p.icon size={22} color={C.saffron} />
              <div className="text-lg font-bold mt-3 text-white">{p.k}</div>
              <div className="text-xs mt-1.5 leading-relaxed text-blue-200">{p.v}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Notices({ setPage }) {
  const items = [
    { tag: "Circular", date: "02 Sep 2026", text: "Extension of PSI 2019 incentive registration window for industrial units in D+ talukas" },
    { tag: "Notification", date: "28 Aug 2026", text: "Consent to Operate (CTO) renewal fully integrated online under MPCB charter" },
    { tag: "Integration", date: "19 Aug 2026", text: "Ten additional Urban Development services onboarded onto the common clearance ledger" },
    { tag: "Advisory", date: "11 Aug 2026", text: "Legacy MAITRI 1.0 files must be linked with investor Aadhaar/PAN for automated migration" },
  ];

  return (
    <section id="notices-section" className="px-4 py-16">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="mb-6">
            <h3 className="text-2xl font-bold" style={{ color: C.navyDeep }}>
              Government Notices & Circulars
            </h3>
            <p className="text-sm text-slate-500 mt-1">
              Latest statutory updates from the Directorate of Industries and nodal authorities.
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden divide-y divide-slate-100">
            {items.map((i) => (
              <div key={i.text} className="flex flex-col sm:flex-row sm:items-center gap-3 p-4 hover:bg-slate-50 transition-colors">
                <span
                  className="text-xs font-semibold px-2.5 py-1 rounded text-center shrink-0 self-start"
                  style={{ background: C.greenLight, color: C.green, minWidth: "6.5rem" }}
                >
                  {i.tag}
                </span>
                <span className="text-sm flex-1 font-medium" style={{ color: C.ink }}>
                  {i.text}
                </span>
                <span className="text-xs font-mono text-slate-400 shrink-0">
                  {i.date}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Investor Helpdesk Card */}
        <div>
          <div className="mb-6">
            <h3 className="text-2xl font-bold" style={{ color: C.navyDeep }}>
              Investor Helpdesk
            </h3>
            <p className="text-sm text-slate-500 mt-1">
              Direct officer assistance for project inquiries.
            </p>
          </div>

          <div className="p-6 rounded-xl border border-slate-200 bg-white shadow-sm space-y-5">
            <div className="flex items-start gap-3.5">
              <div className="p-2.5 rounded-lg shrink-0 bg-blue-50">
                <Phone size={20} color={C.navy} />
              </div>
              <div>
                <div className="text-sm font-bold text-slate-800">1800 120 8040</div>
                <div className="text-xs text-slate-500 mt-0.5">Toll-free, Mon–Sat, 9:45 AM to 6:15 PM</div>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="p-2.5 rounded-lg shrink-0 bg-blue-50">
                <Mail size={20} color={C.navy} />
              </div>
              <div>
                <div className="text-sm font-bold text-slate-800 break-all">helpdesk.maitri@maharashtra.gov.in</div>
                <div className="text-xs text-slate-500 mt-0.5">Formal email replies within two working days</div>
              </div>
            </div>

            <button
              onClick={() => {
                setPage("grievance");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="w-full py-2.5 rounded-lg border font-semibold text-sm transition-colors hover:bg-slate-50 cursor-pointer"
              style={{ borderColor: C.navy, color: C.navy }}
            >
              Raise a departmental ticket
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
