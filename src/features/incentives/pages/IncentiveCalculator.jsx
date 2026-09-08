import React, { useState } from "react";
import { Calculator, CircleAlert, Percent, IndianRupee, MapPin } from "lucide-react";
import { SectionHead } from "../../../components/common/SectionHead";
import { Field } from "../../../components/common/Field";
import { Btn } from "../../../components/common/Btn";
import { C, inr, inputCls, inputStyle } from "../../../constants/theme";
import { TALUKA_CAT, SECTORS } from "../../../constants/mockData";

export function IncentiveCalculator() {
  const [invest, setInvest] = useState("50");
  const [sector, setSector] = useState("msme");
  const [cat, setCat] = useState("D");
  const [jobs, setJobs] = useState("120");
  const [result, setResult] = useState(null);

  const compute = () => {
    const cr = parseFloat(invest) || 0;
    const emp = parseInt(jobs) || 0;
    const catRow = TALUKA_CAT.find((c) => c.code === cat);
    const sec = SECTORS.find((s) => s.key === sector);
    if (cr <= 0) { setResult({ error: "Enter the eligible fixed capital investment to continue." }); return; }

    const ceilingPct = Math.max(0, Math.min(120, catRow.ceiling + sec.bump));
    const ceiling = (cr * ceilingPct) / 100;
    const capital = Math.min(ceiling * 0.35, cr * 0.2);
    const sgst = ceiling * 0.4;
    const interest = Math.min(cr * 0.05, ceiling * 0.15);
    const power = emp * 0.005;
    const stamp = cr * 0.006;
    const total = capital + sgst + interest + power + stamp;

    setResult({
      ceilingPct, ceiling, capital, sgst, interest, power, stamp, total,
      years: catRow.years, catLabel: catRow.label, secLabel: sec.label, cr, emp,
    });
  };

  const rows = result && !result.error ? [
    { k: "Capital subsidy on fixed assets", v: result.capital },
    { k: "SGST refund on local sales", v: result.sgst },
    { k: "Interest subsidy on term loan", v: result.interest },
    { k: "Electricity duty exemption", v: result.power },
    { k: "Stamp duty exemption", v: result.stamp },
  ] : [];

  return (
    <div className="px-4 py-12">
      <div className="max-w-7xl mx-auto">
        <SectionHead
          eyebrow="Package Scheme of Incentives"
          title="Estimate what your project qualifies for"
          sub="An indicative working based on eligible fixed capital investment and taluka classification. The eligibility certificate issued by the Directorate of Industries is what finally governs your entitlement."
        />

        <div className="grid lg:grid-cols-5 gap-6">
          <div className="lg:col-span-2 p-6 rounded" style={{ background: C.white, border: `1px solid ${C.line}` }}>
            <Field label="Eligible fixed capital investment (₹ crore)" hint="Land, building, plant and machinery">
              <input
                type="number" value={invest} onChange={(e) => setInvest(e.target.value)}
                className={inputCls} style={inputStyle} min="0"
              />
            </Field>
            <Field label="Sector">
              <select value={sector} onChange={(e) => setSector(e.target.value)} className={inputCls} style={inputStyle}>
                {SECTORS.map((s) => <option key={s.key} value={s.key}>{s.label}</option>)}
              </select>
            </Field>
            <Field label="Taluka classification" hint="As notified under PSI 2019">
              <select value={cat} onChange={(e) => setCat(e.target.value)} className={inputCls} style={inputStyle}>
                {TALUKA_CAT.map((c) => <option key={c.code} value={c.code}>{c.label}</option>)}
              </select>
            </Field>
            <Field label="Direct employment generated">
              <input
                type="number" value={jobs} onChange={(e) => setJobs(e.target.value)}
                className={inputCls} style={inputStyle} min="0"
              />
            </Field>
            <Btn variant="navy" onClick={compute} className="w-full mt-2">Calculate incentives</Btn>
          </div>

          <div className="lg:col-span-3">
            {!result && (
              <div className="h-full flex flex-col items-center justify-center p-12 rounded text-center" style={{ background: C.white, border: `1px dashed ${C.line}` }}>
                <Calculator size={30} color={C.slate} />
                <p className="mt-4 text-sm max-w-xs" style={{ color: C.slate }}>
                  Fill in the project details on the left and the estimate appears here.
                </p>
              </div>
            )}

            {result?.error && (
              <div className="p-5 rounded flex items-start gap-3" style={{ background: "#FEF2F2", border: "1px solid #FCA5A5" }}>
                <CircleAlert size={18} color="#B91C1C" className="mt-0.5 shrink-0" />
                <p className="text-sm" style={{ color: "#7F1D1D" }}>{result.error}</p>
              </div>
            )}

            {result && !result.error && (
              <div className="rounded overflow-hidden" style={{ background: C.white, border: `1px solid ${C.line}` }}>
                <div className="p-6" style={{ background: C.navyDeep }}>
                  <div className="text-sm" style={{ color: "#A9C5DC" }}>Indicative incentive over {result.years} years</div>
                  <div className="text-4xl font-bold mt-1" style={{ color: C.white }}>
                    ₹ {inr(result.total.toFixed(2))} cr
                  </div>
                  <div className="flex flex-wrap gap-x-6 gap-y-1 mt-4 text-xs" style={{ color: "#A9C5DC" }}>
                    <span className="flex items-center gap-1.5"><Percent size={13} /> Ceiling {result.ceilingPct}% of investment</span>
                    <span className="flex items-center gap-1.5"><IndianRupee size={13} /> Cap ₹ {inr(result.ceiling.toFixed(2))} cr</span>
                    <span className="flex items-center gap-1.5"><MapPin size={13} /> {result.catLabel.split("—")[0].trim()} taluka</span>
                  </div>
                </div>

                <div className="p-6">
                  <h4 className="text-sm font-bold mb-3" style={{ color: C.navyDeep }}>Break-up</h4>
                  {rows.map((r) => (
                    <div key={r.k} className="mb-3">
                      <div className="flex items-baseline justify-between mb-1">
                        <span className="text-sm" style={{ color: C.ink }}>{r.k}</span>
                        <span className="text-sm font-semibold tabular-nums" style={{ color: C.navyDeep }}>
                          ₹ {inr(r.v.toFixed(2))} cr
                        </span>
                      </div>
                      <div className="h-1.5 rounded" style={{ background: C.bg }}>
                        <div
                          className="h-1.5 rounded"
                          style={{ width: `${Math.min(100, (r.v / result.total) * 100)}%`, background: C.saffron }}
                        />
                      </div>
                    </div>
                  ))}
                  <div className="mt-5 p-3 rounded text-xs leading-relaxed" style={{ background: C.bg, color: C.slate }}>
                    This is an estimate for planning only. Final entitlement depends on the eligibility certificate,
                    the date of commercial production and compliance with employment conditions under PSI 2019.
                  </div>
                  <Btn variant="primary" className="w-full mt-4">Start incentive application</Btn>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
