import React, { useState, useEffect, useRef } from "react";
import { Bot, X, Send, Loader2 } from "lucide-react";
import { C } from "../../constants/theme";

export function ChatBot() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState([
    { role: "assistant", text: "Namaskar. I can help with services, eligibility, documents and timelines on MAITRI. What are you setting up?" },
  ]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const endRef = useRef(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs, open]);

  const send = async () => {
    const text = input.trim();
    if (!text || busy) return;
    const next = [...msgs, { role: "user", text }];
    setMsgs(next);
    setInput("");
    setBusy(true);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-6",
          max_tokens: 1000,
          system:
            "You are the MAITRI 2.0 helpdesk assistant for the Government of Maharashtra's single-window investment portal. Answer questions about industrial approvals, PSI 2019 incentives, taluka classifications, MIDC plots, pollution consent, factory licences and application tracking. Be brief (under 90 words), plain-spoken and practical. If something needs a real officer, say so and give the helpline 1800 120 8040. Do not invent specific case numbers.",
          messages: next.map((m) => ({ role: m.role === "user" ? "user" : "assistant", content: m.text })),
        }),
      });
      const data = await res.json();
      const reply = data.content.filter((b) => b.type === "text").map((b) => b.text).join("\n").trim();
      setMsgs([...next, { role: "assistant", text: reply || "I could not fetch that. Please call 1800 120 8040." }]);
    } catch {
      setMsgs([...next, {
        role: "assistant",
        text: "The assistant is unreachable right now. For anything urgent, the helpdesk is on 1800 120 8040, Monday to Saturday.",
      }]);
    }
    setBusy(false);
  };

  return (
    <>
      {open && (
        <div
          className="fixed z-50 rounded overflow-hidden flex flex-col"
          style={{
            right: "1rem", bottom: "5rem", width: "min(22rem, calc(100vw - 2rem))",
            height: "min(28rem, calc(100vh - 8rem))", background: C.white,
            border: `1px solid ${C.line}`, boxShadow: "0 12px 32px rgba(6,42,79,0.22)",
          }}
        >
          <div className="flex items-center justify-between px-4 py-3" style={{ background: C.navyDeep }}>
            <div className="flex items-center gap-2">
              <Bot size={18} color={C.saffron} />
              <div>
                <div className="text-sm font-bold" style={{ color: C.white }}>MAITRI assistant</div>
                <div className="text-xs" style={{ color: "#8FB4D4" }}>Available round the clock</div>
              </div>
            </div>
            <button onClick={() => setOpen(false)} aria-label="Close chat">
              <X size={18} color="#8FB4D4" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-3" style={{ background: C.bg }}>
            {msgs.map((m, i) => (
              <div key={i} className={`mb-2.5 flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className="px-3 py-2 rounded text-sm leading-relaxed"
                  style={{
                    maxWidth: "85%",
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
              <div className="flex items-center gap-2 text-xs px-1" style={{ color: C.slate }}>
                <Loader2 size={13} className="animate-spin" /> Typing…
              </div>
            )}
            <div ref={endRef} />
          </div>

          <div className="flex items-center gap-2 p-2" style={{ borderTop: `1px solid ${C.line}` }}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="Ask about eligibility or documents"
              className="flex-1 px-3 py-2 text-sm focus:outline-none"
              style={{ color: C.ink }}
            />
            <button
              onClick={send}
              disabled={busy}
              className="p-2 rounded"
              style={{ background: C.saffron, opacity: busy ? 0.6 : 1 }}
              aria-label="Send message"
            >
              <Send size={16} color={C.white} />
            </button>
          </div>
        </div>
      )}

      <button
        onClick={() => setOpen(!open)}
        className="fixed z-50 flex items-center gap-2 px-4 py-3 rounded-full font-semibold text-sm"
        style={{
          right: "1rem", bottom: "1.25rem", background: C.navyDeep, color: C.white,
          boxShadow: "0 8px 20px rgba(6,42,79,0.4)",
        }}
      >
        {open ? <X size={18} /> : <Bot size={18} />}
        {!open && <span className="hidden sm:inline">Ask MAITRI</span>}
      </button>
    </>
  );
}
