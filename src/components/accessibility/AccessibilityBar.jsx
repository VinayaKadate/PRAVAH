import React from "react";
import { Type, Eye, Link2, Globe } from "lucide-react";

export function AccessibilityBar({ a11y, setA11y, lang, setLang }) {
  const cycleFont = () => setA11y({ ...a11y, font: a11y.font >= 2 ? 0 : a11y.font + 1 });
  const item = "flex items-center gap-1.5 px-2 py-1 rounded hover:bg-white hover:bg-opacity-15";
  return (
    <div className="flex items-center gap-1 text-xs" style={{ color: "#DCE7F2" }}>
      <button className={item} onClick={cycleFont} title="Change text size">
        <Type size={14} /> A{a11y.font === 0 ? "" : a11y.font === 1 ? "+" : "++"}
      </button>
      <button
        className={item}
        onClick={() => setA11y({ ...a11y, invert: !a11y.invert })}
        title="High contrast"
      >
        <Eye size={14} /> Contrast
      </button>
      <button
        className={item}
        onClick={() => setA11y({ ...a11y, links: !a11y.links })}
        title="Highlight links"
      >
        <Link2 size={14} /> Links
      </button>
      <span style={{ opacity: 0.4 }}>|</span>
      <button
        className={item}
        onClick={() => setLang(lang === "en" ? "mr" : "en")}
      >
        <Globe size={14} /> {lang === "en" ? "मराठी" : "English"}
      </button>
    </div>
  );
}
