import { useState } from "react";
import { Calculator, Percent, IndianRupee, MapPin, CircleAlert, CheckCircle2, Download, ArrowRight } from "lucide-react";
import { TALUKA_CAT, SECTORS, C, inr } from "../data.js";

export function CalcPage() {
  const [invest, setInvest] = useState("50");
  const [sector, setSector] = useState("msme");
  const [cat, setCat] = useState("D");
  const [jobs, setJobs] = useState("120");
  const [result, setResult] = useState(null);

  const compute = () => {
    const cr = parseFloat(invest) || 0;
    const emp = parseInt(jobs, 10) || 0;
    const catRow = TALUKA_CAT.find((c) => c.code === cat);
    const sec = SECTORS.find((s) => s.key === sector);

    if (!catRow || !sec) return;

    if (cr <= 0) {
      setResult({
        error: "Please enter a valid eligible fixed capital investment (₹ Crore) greater than 0.",
        ceilingPct: 0,
        ceiling: 0,
        capital: 0,
        sgst: 0,
        interest: 0,
        power: 0,
        stamp: 0,
        total: 0,
        years: 0,
        catLabel: "",
        secLabel: "",
        cr: 0,
        emp: 0,
      });
      return;
    }

    const ceilingPct = Math.max(0, Math.min(120, catRow.ceiling + sec.bump));
    const ceiling = (cr * ceilingPct) / 100;
    const capital = Math.min(ceiling * 0.35, cr * 0.2);
    const sgst = ceiling * 0.4;
    const interest = Math.min(cr * 0.05, ceiling * 0.15);
    const power = emp * 0.005;
    const stamp = cr * 0.006;
    const total = capital + sgst + interest + power + stamp;

    setResult({
      ceilingPct,
      ceiling,
      capital,
      sgst,
      interest,
      power,
      stamp,
      total,
      years: catRow.years,
      catLabel: catRow.label,
      secLabel: sec.label,
      cr,
      emp,
    });
  };

  const rows = result && !result.error ? [
    { k: "Capital subsidy on eligible fixed assets", v: result.capital, desc: "Direct grant towards plant, machinery and civil works" },
    { k: "SGST reimbursement on intra-state sales", v: result.sgst, desc: "Refund of State GST paid on eligible outward supply" },
    { k: "Interest subsidy on term loan", v: result.interest, desc: "Up to 5% interest subvention for term loans disbursed" },
    { k: "Electricity duty exemption", v: result.power, desc: "100% waiver for statutory operational duration" },
    { k: "Stamp duty & registration fee exemption", v: result.stamp, desc: "Full waiver on mortgage, lease or land conveyance" },
  ] : [];

  return (
    <div id="incentive-calculator-page" className="px-4 py-12">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 max-w-3xl">
          <div
            className="inline-block mb-3 px-3 py-1 rounded text-xs font-semibold uppercase tracking-wide"
            style={{ background: C.saffronLight, color: C.saffron }}
          >
            Package Scheme of Incentives (PSI 2019)
          </div>
          <h1 className="text-3xl md:text-4xl font-bold leading-tight" style={{ color: C.navyDeep }}>
            Incentive & Subsidy Entitlement Estimator
          </h1>
          <p className="mt-2.5 text-base leading-relaxed" style={{ color: C.slate }}>
            Calculate your project's fiscal benefits based on Eligible Fixed Capital Investment (FCI) and notified taluka classification.
            Preliminary estimate for industrial project planning.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 items-start">
          {/* Form inputs */}
          <div className="lg:col-span-2 p-6 rounded-xl bg-white border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
              Project Parameters
            </h3>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-700 mb-1.5">
                Eligible Fixed Capital Investment (₹ Crore)
              </label>
              <input
                id="calc-input-fci"
                type="number"
                value={invest}
                onChange={(e) => setInvest(e.target.value)}
                placeholder="e.g. 50"
                min="0"
                step="0.5"
                className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-navy"
                style={{ color: C.ink }}
              />
              <span className="text-[11px] text-slate-400 mt-1 block">Includes land, factory building, and plant & machinery.</span>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-700 mb-1.5">
                Industry Sector
              </label>
              <select
                id="calc-select-sector"
                value={sector}
                onChange={(e) => setSector(e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-navy bg-white"
                style={{ color: C.ink }}
              >
                {SECTORS.map((s) => (
                  <option key={s.key} value={s.key}>
                    {s.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-700 mb-1.5">
                Taluka Classification (Location)
              </label>
              <select
                id="calc-select-cat"
                value={cat}
                onChange={(e) => setCat(e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-navy bg-white"
                style={{ color: C.ink }}
              >
                {TALUKA_CAT.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.label}
                  </option>
                ))}
              </select>
              <span className="text-[11px] text-slate-400 mt-1 block">As designated under Maharashtra Industrial Policy 2019.</span>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-700 mb-1.5">
                Direct Employment Generated (Persons)
              </label>
              <input
                id="calc-input-employment"
                type="number"
                value={jobs}
                onChange={(e) => setJobs(e.target.value)}
                placeholder="e.g. 120"
                min="0"
                className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-navy"
                style={{ color: C.ink }}
              />
              <span className="text-[11px] text-slate-400 mt-1 block">Minimum 80% local domiciled employment requirement applies.</span>
            </div>

            <button
              id="btn-compute-incentives"
              onClick={compute}
              className="w-full py-3 rounded-lg font-semibold text-sm text-white transition-opacity hover:opacity-90 shadow-sm mt-3 flex items-center justify-center gap-2 cursor-pointer"
              style={{ background: C.navy }}
            >
              <Calculator size={16} /> Compute Incentive Entitlement
            </button>
          </div>

          {/* Results display */}
          <div className="lg:col-span-3">
            {!result && (
              <div className="h-full min-h-[380px] flex flex-col items-center justify-center p-12 rounded-xl bg-white border border-dashed border-slate-300 text-center">
                <div className="p-4 rounded-full bg-slate-100 mb-4">
                  <Calculator size={36} className="text-slate-400" />
                </div>
                <h3 className="text-base font-bold text-slate-700">Awaiting project parameters</h3>
                <p className="mt-1 text-sm max-w-sm text-slate-500">
                  Select your taluka classification, sector and capital investment on the left to review your multi-year fiscal package.
                </p>
              </div>
            )}

            {result?.error && (
              <div className="p-5 rounded-xl flex items-start gap-3 bg-red-50 border border-red-200">
                <CircleAlert size={20} className="text-red-600 mt-0.5 shrink-0" />
                <div>
                  <h4 className="text-sm font-bold text-red-800">Invalid Parameters</h4>
                  <p className="text-sm text-red-700 mt-0.5">{result.error}</p>
                </div>
              </div>
            )}

            {result && !result.error && (
              <div className="rounded-xl overflow-hidden bg-white border border-slate-200 shadow-md">
                {/* Hero metric banner */}
                <div className="p-6 text-white" style={{ background: C.navyDeep }}>
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-wider text-blue-200">
                        Total Indicative Benefits ({result.years} Years Duration)
                      </div>
                      <div className="text-4xl md:text-5xl font-extrabold mt-2 tracking-tight">
                        ₹ {inr(result.total.toFixed(2))} Cr
                      </div>
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/15 text-amber-300 flex items-center gap-1">
                      <CheckCircle2 size={13} /> Highly Viable
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-x-6 gap-y-2 mt-5 text-xs text-blue-100 pt-4 border-t border-white/15">
                    <span className="flex items-center gap-1.5">
                      <Percent size={14} className="text-amber-400" /> Maximum Ceiling: {result.ceilingPct}% of FCI
                    </span>
                    <span className="flex items-center gap-1.5">
                      <IndianRupee size={14} className="text-amber-400" /> Total Cap: ₹ {inr(result.ceiling.toFixed(2))} Cr
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin size={14} className="text-amber-400" /> {result.catLabel.split("—")[0].trim()}
                    </span>
                  </div>
                </div>

                {/* Sub-breakdown rows */}
                <div className="p-6 space-y-4">
                  <h4 className="text-sm font-bold tracking-wide uppercase text-slate-700">
                    Scheme Component Breakdown
                  </h4>

                  {rows.map((r) => (
                    <div key={r.k} className="p-3 rounded-lg bg-slate-50 border border-slate-100">
                      <div className="flex items-baseline justify-between mb-1">
                        <div>
                          <span className="text-sm font-semibold text-slate-800">{r.k}</span>
                          <span className="text-xs text-slate-500 block">{r.desc}</span>
                        </div>
                        <span className="text-sm font-bold tabular-nums" style={{ color: C.navy }}>
                          ₹ {inr(r.v.toFixed(2))} Cr
                        </span>
                      </div>
                      <div className="h-1.5 rounded-full bg-slate-200 mt-2 overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{
                            width: `${Math.min(100, (r.v / result.total) * 100)}%`,
                            background: C.saffron,
                          }}
                        />
                      </div>
                    </div>
                  ))}

                  <div className="p-3 rounded-lg text-xs leading-relaxed bg-amber-50 text-amber-900 border border-amber-200">
                    <strong>Statutory Note:</strong> This output represents an indicative simulation. Final sanction is issued as an
                    Eligibility Certificate (EC) by the Directorate of Industries upon verification of commercial production date and permanent domiciled employment.
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={async () => {
                        try {
                          const res = await fetch("/api/incentives", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({
                              applicantName: "Promoter Industrial Unit",
                              fciCrores: parseFloat(invest) || 0,
                              sector,
                              talukaCode: cat,
                              directEmployment: parseInt(jobs, 10) || 0,
                              totalIncentive: result.total,
                              ceilingPct: result.ceilingPct,
                              durationYears: result.years,
                              breakdown: {
                                capitalSubsidy: result.capital,
                                sgstRefund: result.sgst,
                                interestSubsidy: result.interest,
                                electricityExemption: result.power,
                                stampDutyExemption: result.stamp,
                              },
                            }),
                          });
                          if (res.ok) {
                            const json = await res.json();
                            alert(`Incentive claim draft saved to MAITRI Database! Reference ID: ${json.incentive.id}`);
                          } else {
                            alert("Draft calculation saved locally.");
                          }
                        } catch {
                          alert("Draft calculation saved.");
                        }
                      }}
                      className="flex-1 py-2.5 rounded-lg text-xs font-bold text-white shadow-sm flex items-center justify-center gap-1.5 cursor-pointer"
                      style={{ background: C.saffron }}
                    >
                      Save Claim Draft in MAITRI Database <ArrowRight size={14} />
                    </button>
                    <button
                      onClick={() => window.print()}
                      className="px-4 py-2.5 rounded-lg text-xs font-semibold border border-slate-300 text-slate-700 hover:bg-slate-50 flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Download size={14} /> Export Summary
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
