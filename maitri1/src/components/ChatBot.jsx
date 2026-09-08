import { useState, useEffect, useRef } from "react";
import { Bot, X, Send, Loader2, MessageSquare, Sparkles } from "lucide-react";
import { C } from "../data.js";

export function ChatBot() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState([
    {
      role: "assistant",
      text: "Namaskar! I am your MAITRI AI Assistant. I can assist you with 119 industrial permissions across 16 departments, PSI 2019 subsidies, MIDC plots, MPCB clearances, and application tracking. How can I help your project today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs, open]);

  const send = async (overrideText) => {
    const text = (overrideText ?? input).trim();
    if (!text || busy) return;

    const next = [...msgs, { role: "user", text }];
    setMsgs(next);
    if (!overrideText) setInput("");
    setBusy(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });

      if (!res.ok) {
        throw new Error(`Server returned ${res.status}`);
      }

      const data = await res.json();
      const reply = data.reply?.trim() || "Thank you for your query. For specialized assistance, please contact the MAITRI helpdesk on 1800 120 8040.";
      setMsgs([...next, { role: "assistant", text: reply }]);
    } catch {
      setMsgs([
        ...next,
        {
          role: "assistant",
          text: "Under Maharashtra PSI 2019 and single-window rules, approvals are processed through designated nodal officers within statutory SLA days. For real-time help, contact the toll-free helpdesk at 1800 120 8040 (Mon–Sat, 9:45 AM – 6:15 PM).",
        },
      ]);
    } finally {
      setBusy(false);
    }
  };

  const quickPrompts = [
    "What incentives apply for MSME in D+ taluka?",
    "How to get MPCB Consent to Establish (CTE)?",
    "How to apply for an MIDC industrial plot?",
    "Statutory days for factory licence?",
  ];

  return (
    <>
      {open && (
        <div
          id="maitri-chatbot-window"
          className="fixed z-50 rounded-lg overflow-hidden flex flex-col shadow-2xl border border-slate-200"
          style={{
            right: "1rem",
            bottom: "5rem",
            width: "min(23rem, calc(100vw - 2rem))",
            height: "min(32rem, calc(100vh - 8rem))",
            background: C.white,
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3.5" style={{ background: C.navyDeep }}>
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 rounded-full" style={{ background: "rgba(232,119,34,0.2)" }}>
                <Bot size={18} color={C.saffron} />
              </div>
              <div>
                <div className="text-sm font-bold text-white flex items-center gap-1.5">
                  MAITRI Assistant <Sparkles size={12} color={C.saffron} />
                </div>
                <div className="text-xs" style={{ color: "#95BBDD" }}>
                  Active 24/7 · Single Window Support
                </div>
              </div>
            </div>
            <button
              id="btn-close-chatbot"
              onClick={() => setOpen(false)}
              className="text-slate-300 hover:text-white p-1 rounded transition-colors cursor-pointer"
              aria-label="Close assistant"
            >
              <X size={18} />
            </button>
          </div>

          {/* Conversation history */}
          <div className="flex-1 overflow-y-auto p-3 space-y-3" style={{ background: C.bg }}>
            {msgs.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className="px-3.5 py-2.5 rounded-lg text-sm leading-relaxed shadow-sm"
                  style={{
                    maxWidth: "86%",
                    background: m.role === "user" ? C.navy : C.white,
                    color: m.role === "user" ? C.white : C.ink,
                    border: m.role === "user" ? "none" : `1px solid ${C.line}`,
                    whiteSpace: "pre-wrap",
                  }}
                >
                  {m.text}
                </div>
              </div>
            ))}
            {busy && (
              <div className="flex items-center gap-2 text-xs px-2 py-1 text-slate-500">
                <Loader2 size={14} className="animate-spin text-navy" /> Assistant is consulting guidelines…
              </div>
            )}
            <div ref={endRef} />
          </div>

          {/* Quick suggestions if few messages */}
          {msgs.length <= 2 && (
            <div className="p-2 border-t border-slate-200 bg-white">
              <div className="text-[11px] font-semibold text-slate-500 px-1 mb-1.5 flex items-center gap-1">
                <MessageSquare size={11} /> Suggested inquiries:
              </div>
              <div className="flex flex-wrap gap-1.5">
                {quickPrompts.map((q) => (
                  <button
                    key={q}
                    onClick={() => send(q)}
                    className="text-[11px] px-2 py-1 rounded bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors text-left cursor-pointer"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input strip */}
          <div className="flex items-center gap-2 p-2.5 border-t border-slate-200 bg-white">
            <input
              id="chatbot-input-field"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="Ask about approvals, PSI 2019, MPCB..."
              className="flex-1 px-3 py-2 text-sm rounded border border-slate-200 focus:outline-none focus:border-navy"
              style={{ color: C.ink }}
            />
            <button
              id="chatbot-send-btn"
              onClick={() => send()}
              disabled={busy || !input.trim()}
              className="p-2.5 rounded text-white shadow-sm transition-opacity disabled:opacity-50 cursor-pointer"
              style={{ background: C.saffron }}
              aria-label="Send message"
            >
              <Send size={15} />
            </button>
          </div>
        </div>
      )}

      {/* Floating Action Button */}
      <button
        id="btn-toggle-chatbot"
        onClick={() => setOpen(!open)}
        className="fixed z-50 flex items-center gap-2 px-4 py-3 rounded-full font-semibold text-sm shadow-lg transition-transform hover:scale-105 active:scale-95 cursor-pointer"
        style={{
          right: "1.25rem",
          bottom: "1.25rem",
          background: C.saffron,
          color: C.white,
        }}
        aria-label="Open AI Assistant"
      >
        {open ? <X size={18} /> : <Bot size={18} />}
        <span>{open ? "Close" : "Ask MAITRI AI"}</span>
      </button>
    </>
  );
}
