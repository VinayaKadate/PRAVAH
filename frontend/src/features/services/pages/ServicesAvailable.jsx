import React, { useState } from "react";
import { Search, CircleAlert, ChevronRight } from "lucide-react";
import { SectionHead } from "../../../components/common/SectionHead";
import { C } from "../../../constants/theme";
import { SERVICE_GROUPS } from "../../../constants/mockData";

export function ServicesAvailable() {
  const [q, setQ] = useState("");
  const groups = SERVICE_GROUPS.filter(
    (g) =>
      g.dept.toLowerCase().includes(q.toLowerCase()) ||
      g.items.some((i) => i.toLowerCase().includes(q.toLowerCase()))
  );
  
  return (
    <div className="px-4 py-12">
      <div className="max-w-7xl mx-auto">
        <SectionHead
          eyebrow="119 services · 16 departments"
          title="Services you can apply for"
          sub="Every service below is filed, tracked and delivered through MAITRI. Nothing here needs a visit to the department."
        />
        <div className="flex items-center gap-2 mb-8 p-2 rounded max-w-xl" style={{ background: C.white, border: `1px solid ${C.line}` }}>
          <Search size={18} color={C.slate} className="ml-2" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Filter by department or service name"
            className="w-full py-2 text-sm focus:outline-none"
            style={{ color: C.ink }}
          />
        </div>

        {groups.length === 0 ? (
          <div className="p-10 rounded text-center" style={{ background: C.white, border: `1px solid ${C.line}` }}>
            <CircleAlert size={28} color={C.slate} className="mx-auto mb-3" />
            <p className="text-sm" style={{ color: C.slate }}>
              No service matches that term. Try the department name, or call the helpdesk on 1800 120 8040.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-5">
            {groups.map((g) => (
              <div key={g.dept} className="rounded overflow-hidden" style={{ background: C.white, border: `1px solid ${C.line}` }}>
                <div className="flex items-center justify-between px-5 py-3" style={{ background: C.navy }}>
                  <span className="font-semibold text-sm" style={{ color: C.white }}>{g.dept}</span>
                  <span className="text-xs px-2 py-0.5 rounded" style={{ background: C.saffron, color: C.white }}>
                    {g.count} services
                  </span>
                </div>
                <div className="p-5">
                  {g.items.map((i) => (
                    <div key={i} className="flex items-center justify-between py-2" style={{ borderBottom: `1px solid ${C.bg}` }}>
                      <span className="text-sm" style={{ color: C.ink }}>{i}</span>
                      <button className="text-xs font-semibold" style={{ color: C.saffron }}>Apply</button>
                    </div>
                  ))}
                  <button className="mt-3 text-xs font-semibold flex items-center gap-1" style={{ color: C.navy }}>
                    View all {g.count} <ChevronRight size={13} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
