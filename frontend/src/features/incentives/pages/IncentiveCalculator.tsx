import React, { useState } from 'react';
import { Award, Calculator, CheckCircle, Sparkles } from 'lucide-react';
export const IncentiveCalculator = ({ schemes, _onApplyForScheme }) => {
  const [investmentCr, setInvestmentCr] = useState(450);
  const [talukaCategory, setTalukaCategory] = useState('C');
  const [employment, setEmployment] = useState(1200);
  const [projectType, setProjectType] = useState('Manufacturing');
  const [hasScStPromoter, setHasScStPromoter] = useState(false);

  // Compute PSI 2019 / 2024 Incentives
  const calculations = React.useMemo(() => {
    // Determine category: Micro (<1Cr), Small (1-10Cr), Medium (10-50Cr), Large (50-500Cr), Mega (>500Cr)
    let unitScale = 'Large Industrial Project';
    if (investmentCr < 1) unitScale = 'Micro Enterprise';
    else if (investmentCr <= 10) unitScale = 'Small Enterprise';
    else if (investmentCr <= 50) unitScale = 'Medium Enterprise';
    else if (investmentCr > 500) unitScale = 'Mega / Ultra Mega Project';

    // SGST reimbursement percentage & period based on taluka
    let sgstPercent = 60;
    let tenureYears = 7;
    let capPercent = 80;

    if (talukaCategory === 'A') {
      sgstPercent = 0; // Not eligible in developed taluka
      tenureYears = 0;
      capPercent = 0;
    } else if (talukaCategory === 'B') {
      sgstPercent = 50;
      tenureYears = 7;
      capPercent = 60;
    } else if (talukaCategory === 'C') {
      sgstPercent = 75;
      tenureYears = 7;
      capPercent = 80;
    } else if (talukaCategory === 'D') {
      sgstPercent = 90;
      tenureYears = 9;
      capPercent = 100;
    } else if (talukaCategory === 'D+') {
      sgstPercent = 100;
      tenureYears = 10;
      capPercent = 100;
    }

    // Estimated cumulative SGST refund (assuming ~4% gross sales on capital base)
    const annualEstimatedSgstCr = (investmentCr * 0.4) * 0.09; // Est 9% state GST
    const annualRefundCr = annualEstimatedSgstCr * (sgstPercent / 100);
    const totalPotentialRefundCr = Math.min(annualRefundCr * tenureYears, investmentCr * (capPercent / 100));

    // Electricity Duty Exemption
    const electricityDutySavingsCr = unitScale.includes('Large') || unitScale.includes('Mega') 
      ? 12.8 
      : 1.5;

    // Interest Subsidy (5% for MSME / SC-ST)
    const interestSubsidyCr = (hasScStPromoter || unitScale.includes('Micro') || unitScale.includes('Small'))
      ? (investmentCr * 0.05 * 5)
      : 0;

    return {
      unitScale,
      sgstPercent,
      tenureYears,
      capPercent,
      totalPotentialRefundCr: totalPotentialRefundCr.toFixed(1),
      electricityDutySavingsCr: electricityDutySavingsCr.toFixed(1),
      interestSubsidyCr: interestSubsidyCr.toFixed(1),
      totalBenefitValueCr: (totalPotentialRefundCr + electricityDutySavingsCr + interestSubsidyCr).toFixed(1)
    };
  }, [investmentCr, talukaCategory, hasScStPromoter]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-blue-600 font-bold text-xs uppercase tracking-wider mb-1">
            <Award size={16} />
            <span>Government Benefit & Scheme Readiness (UdyogSetu Feature #6)</span>
          </div>
          <h2 className="text-2xl font-black text-slate-900">Package Scheme of Incentives (PSI) Calculator</h2>
          <p className="text-slate-600 text-xs mt-1">
            Instant statutory calculation of Gross SGST refund (IPS), electricity duty waiver, and capital subsidy under Maharashtra Industrial Policy.
          </p>
        </div>

        <div className="bg-blue-50 border border-blue-200 p-4 rounded-xl text-xs text-blue-950 font-bold">
          <span className="block text-[10px] text-blue-600 uppercase">Estimated Total State Subsidy</span>
          <span className="text-2xl font-black text-blue-900">₹ {calculations.totalBenefitValueCr} Crores</span>
        </div>
      </div>

      {/* Simulator Inputs & Results Bento Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Input Parameters */}
        <div className="lg:col-span-1 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="font-extrabold text-sm text-slate-900 flex items-center">
            <Calculator size={16} className="mr-2 text-blue-600" />
            Project Parameters
          </h3>

          <div>
            <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
              <span>Proposed Capital Investment</span>
              <span className="text-blue-600 font-black">₹ {investmentCr} Crores</span>
            </div>
            <input
              type="range"
              min={5}
              max={1000}
              step={25}
              value={investmentCr}
              onChange={(e) => setInvestmentCr(Number(e.target.value))}
              className="w-full accent-blue-600"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Taluka Classification (Group)</label>
            <select
              value={talukaCategory}
              onChange={(e) => setTalukaCategory(e.target.value )}
              className="w-full border border-slate-300 rounded-xl p-2.5 text-xs font-bold bg-white"
            >
              <option value="A">Group A - Highly Developed (MMR, Pune City) - No IPS</option>
              <option value="B">Group B - Moderately Developed (Thane, Pimpri)</option>
              <option value="C">Group C - Developing (Chakan, Dindori, Waluj) - 75% SGST</option>
              <option value="D">Group D - Less Developed (Khed, Sinnar, Baramati) - 90% SGST</option>
              <option value="D+">Group D+ - Least Developed / Naxal Affected - 100% SGST</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Direct Employment</label>
            <input
              type="number"
              value={employment}
              onChange={(e) => setEmployment(Number(e.target.value))}
              className="w-full border border-slate-300 rounded-xl p-2.5 text-xs font-bold bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Industry Vertical</label>
            <select
              value={projectType}
              onChange={(e) => setProjectType(e.target.value )}
              className="w-full border border-slate-300 rounded-xl p-2.5 text-xs font-bold bg-white"
            >
              <option value="Manufacturing">Manufacturing & Engineering</option>
              <option value="Agro-processing">Agro & Food Processing (Additional 10% IPS)</option>
              <option value="IT / Electronics">IT, Data Centers & Electronics</option>
            </select>
          </div>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="font-bold text-slate-700">SC/ST / Women Promoter?</span>
            <input
              type="checkbox"
              checked={hasScStPromoter}
              onChange={(e) => setHasScStPromoter(e.target.checked)}
              className="w-4 h-4 text-blue-600 rounded"
            />
          </div>
        </div>

        {/* Calculated Breakdown */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-gradient-to-br from-slate-900 to-indigo-950 text-white p-6 sm:p-8 rounded-2xl shadow-sm space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-wider font-bold text-indigo-300">Classified Tier</span>
                <h3 className="text-xl font-black">{calculations.unitScale}</h3>
              </div>
              <span className="bg-indigo-500/30 text-indigo-200 border border-indigo-400/30 text-xs font-black px-3 py-1 rounded-full">
                Group {talukaCategory} Taluka
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm border border-white/10">
                <span className="text-[10px] text-indigo-200 block font-bold">Gross SGST Refund (IPS)</span>
                <span className="text-xl font-black text-white">₹ {calculations.totalPotentialRefundCr} Cr</span>
                <span className="text-[10px] text-emerald-400 block mt-1">Over {calculations.tenureYears} Years</span>
              </div>

              <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm border border-white/10">
                <span className="text-[10px] text-indigo-200 block font-bold">Electricity Duty Exemption</span>
                <span className="text-xl font-black text-white">₹ {calculations.electricityDutySavingsCr} Cr</span>
                <span className="text-[10px] text-indigo-200 block mt-1">100% Waiver for 7 Yrs</span>
              </div>

              <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm border border-white/10">
                <span className="text-[10px] text-indigo-200 block font-bold">Interest Subsidy (MSME/Spec)</span>
                <span className="text-xl font-black text-white">₹ {calculations.interestSubsidyCr} Cr</span>
                <span className="text-[10px] text-indigo-200 block mt-1">@ 5% on Term Loans</span>
              </div>
            </div>

            <div className="text-xs text-indigo-200 bg-indigo-900/50 p-3 rounded-xl border border-indigo-700/50 flex items-start space-x-2">
              <Sparkles size={16} className="text-amber-400 flex-shrink-0 mt-0.5" />
              <span>
                <strong>UdyogSetu AI Recommendation:</strong> File Form 1 eligibility application concurrently with your 
                Factory Building Plan Approval (APP-1004) to prevent delay in commercial production validation.
              </span>
            </div>
          </div>

          {/* Scheme Readiness Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {schemes.map((s) => (
              <div key={s.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wide">{s.category}</span>
                    <h4 className="font-extrabold text-sm text-slate-900 leading-snug">{s.title}</h4>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase ${
                    s.status === 'eligible' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {s.matchScore}% Match
                  </span>
                </div>

                <p className="text-xs text-slate-600">{s.benefit}</p>

                {s.reasons && s.reasons.length > 0 && (
                  <div className="space-y-1 bg-slate-50 p-2.5 rounded-xl text-[11px] text-slate-700 font-medium">
                    {s.reasons.map((r, i) => (
                      <div key={i} className="flex items-start space-x-1.5">
                        <CheckCircle size={12} className="text-emerald-600 flex-shrink-0 mt-0.5" />
                        <span>{r}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
