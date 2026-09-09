import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Landmark, Menu, X, ChevronRight, LogOut, User } from "lucide-react";
import { C } from "../../constants/theme";
import { T } from "../../constants/translations";
import { Btn } from "../common/Btn";
import { AccessibilityBar } from "../accessibility/AccessibilityBar";
import { useAuth } from "../../contexts/AuthContext";

export function Header({ lang, setLang, a11y, setA11y }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const t = T[lang];
  const { isAuthenticated, user, logout } = useAuth();
  
  const links = [
    ["", t.nav.home], 
    ["about", t.nav.about], 
    ["services", t.nav.services],
    ["track", t.nav.track], 
    ["calc", t.nav.calc], 
    ["grievance", t.nav.grievance],
    ["dashboard", t.nav.dashboard], 
    ["contact", t.nav.contact],
  ];

  const go = (path) => { 
    navigate(`/${path}`); 
    setOpen(false); 
    window.scrollTo(0, 0); 
  };

  const handleLogout = async () => {
    await logout();
    navigate("/");
    setOpen(false);
  };

  const currentPath = location.pathname.substring(1);

  return (
    <header className="sticky top-0 z-40">
      {/* tricolour hairline */}
      <div className="flex h-1">
        <div className="flex-1" style={{ background: C.saffron }} />
        <div className="flex-1" style={{ background: C.white }} />
        <div className="flex-1" style={{ background: C.green }} />
      </div>

      {/* govt strip */}
      <div style={{ background: C.navyDeep }} className="px-4 py-1.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          <span className="text-xs font-medium" style={{ color: "#C9DBEC" }}>
            {t.govt} &nbsp;·&nbsp; {t.dept}
          </span>
          <div className="hidden md:block">
            <AccessibilityBar a11y={a11y} setA11y={setA11y} lang={lang} setLang={setLang} />
          </div>
        </div>
      </div>

      {/* brand row */}
      <div style={{ background: C.white, borderBottom: `1px solid ${C.line}` }} className="px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <button onClick={() => go("")} className="flex items-center gap-3 text-left">
            <div
              className="w-11 h-11 rounded flex items-center justify-center shrink-0"
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
                  className="text-xs font-bold px-1.5 py-0.5 rounded"
                  style={{ background: C.saffronLight, color: C.saffron }}
                >
                  2.0
                </span>
              </div>
              <div className="text-xs leading-tight" style={{ color: C.slate }}>
                {t.brandFull}
              </div>
            </div>
          </button>

          <div className="hidden lg:flex items-center gap-2">
            {isAuthenticated ? (
              <>
                <div className="flex items-center gap-2 px-3 py-2 rounded" style={{ background: C.bg }}>
                  <User size={16} color={C.navy} />
                  <span className="text-sm font-medium" style={{ color: C.ink }}>
                    {user?.display_name || user?.email || "User"}
                  </span>
                  <span className="text-xs px-1.5 py-0.5 rounded font-semibold" style={{ background: C.saffronLight, color: C.saffron }}>
                    {user?.role || "investor"}
                  </span>
                </div>
                <Btn variant="ghost" onClick={handleLogout}>
                  <span className="flex items-center gap-1.5">
                    <LogOut size={14} /> Logout
                  </span>
                </Btn>
              </>
            ) : (
              <>
                <Btn variant="ghost" onClick={() => go("login")}>{t.login}</Btn>
                <Btn onClick={() => go("register")}>{t.register}</Btn>
              </>
            )}
          </div>

          <button className="lg:hidden p-2" onClick={() => setOpen(!open)} aria-label="Menu">
            {open ? <X size={22} color={C.navy} /> : <Menu size={22} color={C.navy} />}
          </button>
        </div>
      </div>

      {/* nav */}
      <nav style={{ background: C.navy }} className="hidden lg:block">
        <div className="max-w-7xl mx-auto flex px-4">
          {links.map(([k, label]) => (
            <button
              key={k}
              onClick={() => go(k)}
              className="px-4 py-3 text-sm font-medium transition-colors"
              style={{
                color: currentPath === k ? C.white : "#BFD4E8",
                background: currentPath === k ? C.navySoft : "transparent",
                borderBottom: currentPath === k ? `3px solid ${C.saffron}` : "3px solid transparent",
              }}
            >
              {label}
            </button>
          ))}
        </div>
      </nav>

      {/* mobile drawer */}
      {open && (
        <div className="lg:hidden" style={{ background: C.navy }}>
          <div className="px-4 py-2">
            <AccessibilityBar a11y={a11y} setA11y={setA11y} lang={lang} setLang={setLang} />
          </div>
          {links.map(([k, label]) => (
            <button
              key={k}
              onClick={() => go(k)}
              className="w-full text-left px-5 py-3 text-sm font-medium flex items-center justify-between"
              style={{
                color: currentPath === k ? C.saffron : "#D6E4F0",
                borderTop: `1px solid ${C.navySoft}`,
              }}
            >
              {label} <ChevronRight size={16} />
            </button>
          ))}
          <div className="p-4 flex gap-2" style={{ borderTop: `1px solid ${C.navySoft}` }}>
            {isAuthenticated ? (
              <>
                <div className="flex-1 flex items-center gap-2 px-3 py-2 rounded" style={{ background: "rgba(255,255,255,0.1)" }}>
                  <User size={14} color="#D6E4F0" />
                  <span className="text-sm text-white truncate">{user?.display_name || user?.email}</span>
                </div>
                <Btn variant="ghost" onClick={handleLogout} className="shrink-0">Logout</Btn>
              </>
            ) : (
              <>
                <Btn variant="ghost" onClick={() => go("login")} className="flex-1">{t.login}</Btn>
                <Btn onClick={() => go("register")} className="flex-1">{t.register}</Btn>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
