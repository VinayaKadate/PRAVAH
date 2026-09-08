import React, { useState } from "react";
import { Check } from "lucide-react";
import { SectionHead } from "../../../components/common/SectionHead";
import { Field } from "../../../components/common/Field";
import { Btn } from "../../../components/common/Btn";
import { C, inputCls, inputStyle } from "../../../constants/theme";
import { SERVICE_GROUPS } from "../../../constants/mockData";

export function Grievances() {
  const [f, setF] = useState({ name: "", email: "", dept: "", appId: "", detail: "" });
  const [sent, setSent] = useState(false);
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });

  if (sent) {
    return (
      <div className="px-4 py-20">
        <div className="max-w-lg mx-auto p-8 rounded text-center" style={{ background: C.white, border: `1px solid ${C.line}` }}>
          <div className="w-12 h-12 rounded-full mx-auto flex items-center justify-center mb-4" style={{ background: C.greenLight }}>
            <Check size={24} color={C.green} />
          </div>
          <h2 className="text-xl font-bold mb-2" style={{ color: C.navyDeep }}>Grievance registered</h2>
          <p className="text-sm mb-1" style={{ color: C.slate }}>
            Reference number <strong style={{ color: C.ink }}>MTR/GRV/2026/07741</strong>
          </p>
          <p className="text-sm mb-6" style={{ color: C.slate }}>
            The nodal officer has seven working days to respond. If that lapses, it escalates to the Development
            Commissioner (Industries).
          </p>
          <Btn variant="outline" onClick={() => { setSent(false); setF({ name: "", email: "", dept: "", appId: "", detail: "" }); }}>
            Register another grievance
          </Btn>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 py-12">
      <div className="max-w-2xl mx-auto">
        <SectionHead
          eyebrow="Grievance redressal"
          title="Raise an issue against a department"
          sub="Use this for delays past the statutory timeline, repeated queries on the same document, or a rejection you believe is unfounded."
        />
        <div className="p-6 rounded" style={{ background: C.white, border: `1px solid ${C.line}` }}>
          <div className="grid sm:grid-cols-2 gap-x-5">
            <Field label="Your name">
              <input value={f.name} onChange={set("name")} className={inputCls} style={inputStyle} />
            </Field>
            <Field label="Email">
              <input type="email" value={f.email} onChange={set("email")} className={inputCls} style={inputStyle} />
            </Field>
            <Field label="Department concerned">
              <select value={f.dept} onChange={set("dept")} className={inputCls} style={inputStyle}>
                <option value="">Select a department</option>
                {SERVICE_GROUPS.map((g) => <option key={g.dept} value={g.dept}>{g.dept}</option>)}
              </select>
            </Field>
            <Field label="Application number" hint="Optional">
              <input value={f.appId} onChange={set("appId")} className={inputCls} style={inputStyle} placeholder="MTR/2026/…" />
            </Field>
          </div>
          <Field label="What happened" hint="Dates, officer designation and what you were told help resolve it faster.">
            <textarea value={f.detail} onChange={set("detail")} rows={5} className={inputCls} style={inputStyle} />
          </Field>
          <Btn variant="navy" onClick={() => setSent(true)} className="w-full">Submit grievance</Btn>
        </div>
      </div>
    </div>
  );
}
