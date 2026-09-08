import React, { useState, useEffect } from "react";
import { ResponsiveContainer, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Line, PieChart, Pie, Cell, BarChart, Bar } from "recharts";
import { SectionHead } from "../../../components/common/SectionHead";
import { C, inr } from "../../../constants/theme";
import apiClient from "../../../api/client";

const PIE_COLORS = ["#FF9933", "#000080", "#138808", "#8FB4D4", "#A9C5DC"];

import { Loader2 } from "lucide-react";

export function InvestorDashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    apiClient.get("/dashboard/stats")
      .then(res => setData(res.data))
      .catch(err => console.error(err));
  }, []);

  const panel = "p-5 rounded";
  const ps = { background: C.white, border: `1px solid ${C.line}` };

  if (!data) {
    return (
      <div className="px-4 py-32 flex flex-col items-center justify-center min-h-[60vh]">
        <Loader2 className="animate-spin mb-4" color={C.navy} size={40} />
        <p className="text-slate-500">Loading live dashboard metrics...</p>
      </div>
    );
  }

  return (
    <div className="px-4 py-12" style={{ background: C.bg }}>
      <div className="max-w-7xl mx-auto">
        <SectionHead
          eyebrow="Public dashboard"
          title="Investment & clearance metrics"
          sub="MAITRI tracks every application and investment intent to maintain transparency over department performance."
        />

        <div className="grid lg:grid-cols-2 gap-6">
          <div className={panel} style={ps}>
            <div className="flex items-end justify-between mb-6">
              <div>
                <h3 className="font-bold text-sm" style={{ color: C.navyDeep }}>Approvals trajectory</h3>
                <p className="text-xs" style={{ color: C.slate }}>Applications received vs disposed (YTD)</p>
              </div>
              <div className="flex gap-4 text-xs font-semibold">
                <span className="flex items-center gap-1.5" style={{ color: C.navy }}>
                  <span className="w-2 h-2 rounded-full" style={{ background: C.navy }} /> Received
                </span>
                <span className="flex items-center gap-1.5" style={{ color: C.saffron }}>
                  <span className="w-2 h-2 rounded-full" style={{ background: C.saffron }} /> Disposed
                </span>
              </div>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data.monthly_trends} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={C.line} />
                  <XAxis dataKey="m" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: C.slate }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: C.slate }} tickFormatter={(v) => (v / 1000).toFixed(0) + "k"} />
                  <Tooltip
                    contentStyle={{ borderRadius: 4, border: `1px solid ${C.line}`, fontSize: 12 }}
                    cursor={{ stroke: C.line, strokeWidth: 1, strokeDasharray: "4 4" }}
                  />
                  <Line type="monotone" dataKey="received" stroke={C.navy} strokeWidth={2} dot={{ r: 3, fill: C.navy }} activeDot={{ r: 5 }} />
                  <Line type="monotone" dataKey="disposed" stroke={C.saffron} strokeWidth={2} dot={{ r: 3, fill: C.saffron }} activeDot={{ r: 5 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            <div className={panel} style={ps}>
              <h3 className="font-bold text-sm mb-1" style={{ color: C.navyDeep }}>Regional intent</h3>
              <p className="text-xs mb-4" style={{ color: C.slate }}>% of total MoUs signed</p>
              <div className="h-44">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={data.region_split} cx="50%" cy="50%" innerRadius={35} outerRadius={60} paddingAngle={2} dataKey="value" stroke="none">
                      {data.region_split.map((e, i) => (
                        <Cell key={`cell-${i}`} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ borderRadius: 4, border: `1px solid ${C.line}`, fontSize: 12 }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {data.region_split.map((r, i) => (
                  <div key={r.name} className="flex items-center gap-1.5 text-xs">
                    <span className="w-2 h-2 rounded-full shrink-0" style={{ background: PIE_COLORS[i % PIE_COLORS.length] }} />
                    <span className="truncate" style={{ color: C.slate }}>{r.name.split(" ")[0]}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className={panel} style={ps}>
              <h3 className="font-bold text-sm mb-1" style={{ color: C.navyDeep }}>Top sectors</h3>
              <p className="text-xs mb-4" style={{ color: C.slate }}>FDI equity inflow (₹ cr)</p>
              <div className="h-56">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data.sector_investments} layout="vertical" margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke={C.line} />
                    <XAxis type="number" hide />
                    <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: C.ink }} width={70} />
                    <Tooltip cursor={{ fill: C.bg }} contentStyle={{ borderRadius: 4, border: `1px solid ${C.line}`, fontSize: 12 }} formatter={(v) => "₹ " + inr(v) + " cr"} />
                    <Bar dataKey="value" fill={C.navy} radius={[0, 2, 2, 0]} barSize={16}>
                      {data.sector_investments.map((e, i) => (
                        <Cell key={`cell-${i}`} fill={i === 0 ? C.saffron : C.navy} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
