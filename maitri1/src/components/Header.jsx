import { useState } from "react";
import { Landmark, Menu, X, Type, Eye, Link2, Globe, ChevronRight } from "lucide-react";
import { C, T } from "../data.js";

export function Header({ page, setPage, lang, setLang, a11y, setA11y }) {
  const [open, setOpen] = useState(false);
  const t = T[lang];

  const links = [
    ["home", t.nav.home],
    ["about", t.nav.about],
    ["services", t.nav.services],
    ["track", t.nav.track],
    ["calc", t.nav.calc],
    ["grievance", t.nav.grievance],
    ["dashboard", t.nav.dashboard],
    ["contact", t.nav.contact],
  ];

  const go = (k) => {
    setPage(k);
    setOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const cycleFont = () => {
    setA11y((prev) => ({ ...prev, font: prev.font >= 2 ? 0 : prev.font + 1 }));
  };

  return (
    <header id="maitri-header" className="sticky top-0 z-40 shadow-sm">
      {/* Indian National Tricolour Stripe */}
      <div className="flex h-1.5 w-full">
        <div className="flex-1" style={{ background: C.saffron }} />
        <div className="flex-1" style={{ background: C.white }} />
        <div className="flex-1" style={{ background: C.green }} />
      </div>

      {/* Govt strip & accessibility toolbar */}
      <div style={{ background: C.navyDeep }} className="px-4 py-1.5 border-b border-white/10">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          <span className="text-xs font-medium tracking-wide" style={{ color: "#D3E4F4" }}>
            {t.govt} &nbsp;·&nbsp; {t.dept}
          </span>
          <div className="flex items-center gap-2 text-xs" style={{ color: "#DCE7F2" }}>
            <button
              id="btn-a11y-text-size"
              className="flex items-center gap-1.5 px-2 py-1 rounded hover:bg-white/15 transition-colors cursor-pointer"
              onClick={cycleFont}
              title="Change text size"
            >
              <Type size={13} /> A{a11y.font === 0 ? "" : a11y.font === 1 ? "+" : "++"}
            </button>
            <button
              id="btn-a11y-contrast"
              className="flex items-center gap-1.5 px-2 py-1 rounded hover:bg-white/15 transition-colors cursor-pointer"
              onClick={() => setA11y((prev) => ({ ...prev, invert: !prev.invert }))}
              title="Toggle high contrast"
            >
              <Eye size={13} /> Contrast
            </button>
            <button
              id="btn-a11y-links"
              className="flex items-center gap-1.5 px-2 py-1 rounded hover:bg-white/15 transition-colors cursor-pointer"
              onClick={() => setA11y((prev) => ({ ...prev, links: !prev.links }))}
              title="Highlight hyperlinks"
            >
              <Link2 size={13} /> Links
            </button>
            <span className="opacity-40 select-none">|</span>
            <button
              id="btn-lang-toggle"
              className="flex items-center gap-1.5 px-2 py-1 rounded hover:bg-white/15 transition-colors font-medium cursor-pointer"
              onClick={() => setLang(lang === "en" ? "mr" : "en")}
              title="Switch language"
            >
              <Globe size={13} /> {lang === "en" ? "मराठी" : "English"}
            </button>
          </div>
        </div>
      </div>

      {/* Brand row */}
      <div style={{ background: C.white, borderBottom: `1px solid ${C.line}` }} className="px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <button
            id="brand-logo-btn"
            onClick={() => go("home")}
            className="flex items-center gap-3 text-left group cursor-pointer"
          >
            <div
              className="w-11 h-11 rounded-md flex items-center justify-center shrink-0 shadow-inner transition-transform group-hover:scale-105"
              style={{ background: C.navy }}
            >
              <Landmark size={22} color={C.white} />
            </div>
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-xl font-bold tracking-tight" style={{ color: C.navyDeep }}>
                  {t.brand}
                </span>
                <span
                  className="text-xs font-bold px-1.5 py-0.5 rounded uppercase tracking-wider"
                  style={{ background: C.saffronLight, color: C.saffron }}
                >
                  2.0
                </span>
              </div>
              <div className="text-xs font-medium leading-tight line-clamp-1" style={{ color: C.slate }}>
                {t.brandFull}
              </div>
            </div>
          </button>

          <div className="hidden lg:flex items-center gap-3">
            <button
              id="btn-investor-login"
              onClick={() => go("track")}
              className="px-4 py-2 rounded text-sm font-semibold transition-colors hover:bg-slate-100 cursor-pointer"
              style={{ border: `1px solid ${C.line}`, color: C.navy }}
            >
              {t.login}
            </button>
            <button
              id="btn-investor-register"
              onClick={() => go("services")}
              className="px-4 py-2 rounded text-sm font-semibold transition-opacity hover:opacity-90 shadow-sm cursor-pointer"
              style={{ background: C.saffron, color: C.white }}
            >
              {t.register}
            </button>
          </div>

          <button
            id="btn-mobile-nav-toggle"
            className="lg:hidden p-2 rounded hover:bg-slate-100 cursor-pointer"
            onClick={() => setOpen(!open)}
            aria-label="Toggle navigation menu"
          >
            {open ? <X size={22} color={C.navy} /> : <Menu size={22} color={C.navy} />}
          </button>
        </div>
      </div>

      {/* Primary navigation */}
      <nav id="main-nav-bar" style={{ background: C.navy }} className="hidden lg:block border-t border-navySoft">
        <div className="max-w-7xl mx-auto flex px-4">
          {links.map(([k, label]) => {
            const active = page === k;
            return (
              <button
                key={k}
                id={`nav-link-${k}`}
                onClick={() => go(k)}
                className="px-4 py-3 text-sm font-medium transition-colors hover:text-white cursor-pointer"
                style={{
                  color: active ? C.white : "#C3D8EB",
                  background: active ? C.navySoft : "transparent",
                  borderBottom: active ? `3px solid ${C.saffron}` : "3px solid transparent",
                }}
              >
                {label}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Mobile Drawer */}
      {open && (
        <div id="mobile-nav-drawer" className="lg:hidden" style={{ background: C.navyDeep }}>
          <div className="p-3 border-b border-navySoft/40">
            <button
              onClick={() => setLang(lang === "en" ? "mr" : "en")}
              className="w-full flex items-center justify-center gap-2 py-2 rounded text-xs font-semibold cursor-pointer"
              style={{ background: "rgba(255,255,255,0.1)", color: C.white }}
            >
              <Globe size={14} /> Switch to {lang === "en" ? "मराठी (Marathi)" : "English"}
            </button>
          </div>
          {links.map(([k, label]) => (
            <button
              key={k}
              id={`mobile-nav-link-${k}`}
              onClick={() => go(k)}
              className="w-full text-left px-5 py-3 text-sm font-medium flex items-center justify-between transition-colors hover:bg-navySoft/30 cursor-pointer"
              style={{
                color: page === k ? C.saffron : "#D6E4F0",
                borderBottom: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              {label} <ChevronRight size={16} />
            </button>
          ))}
          <div className="p-4 flex gap-2 border-t border-navySoft/60">
            <button
              onClick={() => go("track")}
              className="flex-1 py-2.5 rounded text-sm font-semibold text-center cursor-pointer"
              style={{ background: C.white, color: C.navy }}
            >
              {t.login}
            </button>
            <button
              onClick={() => go("services")}
              className="flex-1 py-2.5 rounded text-sm font-semibold text-center cursor-pointer"
              style={{ background: C.saffron, color: C.white }}
            >
              {t.register}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
