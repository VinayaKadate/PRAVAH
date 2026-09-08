import React, { useState } from "react";
import { Loader2, CircleAlert, Check, Clock } from "lucide-react";
import { SectionHead } from "../../../components/common/SectionHead";
import { Btn } from "../../../components/common/Btn";
import { C } from "../../../constants/theme";
import apiClient from "../../../api/client";

export function ServicesApplied() {
  const [id, setId] = useState("");
  const [state, setState] = useState("idle"); 
  const [trackingData, setTrackingData] = useState(null);

  const search = async () => {
    const v = id.trim();
    if (!v || v.length < 6) {
      setState("notfound");
      return;
    }
    setState("loading");
    try {
      const res = await apiClient.get(`/applications/${v}/track`);
      setTrackingData(res.data.tracking_stages);
      setState("found");
    } catch (err) {
      setState("notfound");
    }
  };

  return (
    <div className="px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <SectionHead
          eyebrow="Real-time status"
          title="Track your application to the officer's desk"
          sub="Enter the acknowledgement number printed on your submission receipt. Any ID of six characters or more will show a sample file."
        />

        <div className="flex flex-col sm:flex-row gap-2 p-2 rounded mb-8" style={{ background: C.white, border: `1px solid ${C.line}` }}>
          <input
            value={id}
            onChange={(e) => setId(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && search()}
            placeholder="e.g. MTR/2026/LAB/0084213"
            className="flex-1 px-3 py-2.5 text-sm focus:outline-none"
            style={{ color: C.ink }}
          />
          <Btn variant="navy" onClick={search}>Track application</Btn>
        </div>

        {state === "loading" && (
          <div className="p-10 rounded flex items-center justify-center gap-3" style={{ background: C.white, border: `1px solid ${C.line}` }}>
            <Loader2 size={18} color={C.navy} className="animate-spin" />
            <span className="text-sm" style={{ color: C.slate }}>Fetching status from the department server…</span>
          </div>
        )}

        {state === "notfound" && (
          <div className="p-5 rounded flex items-start gap-3" style={{ background: "#FEF2F2", border: "1px solid #FCA5A5" }}>
            <CircleAlert size={18} color="#B91C1C" className="mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-semibold" style={{ color: "#7F1D1D" }}>No application found for that number.</p>
              <p className="text-sm mt-1" style={{ color: "#991B1B" }}>
                Check the acknowledgement receipt — the number starts with MTR and is at least six characters.
              </p>
            </div>
          </div>
        )}

        {state === "found" && trackingData && (
          <div className="rounded overflow-hidden" style={{ background: C.white, border: `1px solid ${C.line}` }}>
            <div className="p-6 grid sm:grid-cols-3 gap-4" style={{ borderBottom: `1px solid ${C.line}` }}>
              {[
                ["Service", "Factory licence (Section 6)"],
                ["Applicant", "Sahyadri Precision Components Pvt. Ltd."],
                ["Submitted on", "18 August 2026"],
              ].map(([k, v]) => (
                <div key={k}>
                  <div className="text-xs mb-1" style={{ color: C.slate }}>{k}</div>
                  <div className="text-sm font-semibold" style={{ color: C.ink }}>{v}</div>
                </div>
              ))}
            </div>

            <div className="p-6">
              {trackingData.map((s, i) => {
                const isCompleted = s.status === "completed";
                const active = s.status === "in_progress";
                const color = isCompleted ? C.green : active ? C.saffron : C.line;
                return (
                  <div key={s.name} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                        style={{ background: isCompleted || active ? color : C.white, border: `2px solid ${color}` }}
                      >
                        {isCompleted
                          ? <Check size={15} color={C.white} />
                          : <span className="text-xs font-bold" style={{ color: active ? C.white : C.slate }}>{i + 1}</span>}
                      </div>
                      {i < trackingData.length - 1 && (
                        <div className="w-0.5 flex-1 my-1" style={{ background: isCompleted ? C.green : C.line, minHeight: "2.25rem" }} />
                      )}
                    </div>
                    <div className="pb-6 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-sm font-semibold" style={{ color: isCompleted || active ? C.ink : C.slate }}>
                          {s.name}
                        </span>
                        {active && (
                          <span className="text-xs px-2 py-0.5 rounded font-semibold" style={{ background: C.saffronLight, color: C.saffron }}>
                            In progress
                          </span>
                        )}
                      </div>
                      <p className="text-sm mt-0.5" style={{ color: C.slate }}>{s.desc}</p>
                      {(isCompleted || active) && (
                        <p className="text-xs mt-1" style={{ color: C.slate }}>
                          Day {s.days} · statutory limit {s.days + 7} days
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}

              <div className="p-4 rounded flex items-start gap-3" style={{ background: C.bg }}>
                <Clock size={17} color={C.navy} className="mt-0.5 shrink-0" />
                <p className="text-sm" style={{ color: C.slate }}>
                  If a stage exceeds its statutory limit, the file escalates automatically to the next authority
                  and you can raise a grievance against the delay from this screen.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
