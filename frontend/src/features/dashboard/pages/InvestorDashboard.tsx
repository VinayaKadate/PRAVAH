import React, { useState, useMemo } from 'react';
import { 
  CheckCircle, Clock, FileText, Upload, Calendar, 
  ChevronRight, Building, Sparkles, Bell, ArrowRight, ShieldCheck, 
  Award, AlertTriangle, CheckCircle2, X, Send, ChevronDown, 
  Factory, Check
} from 'lucide-react';



export const InvestorDashboard = ({
  state,
  activeUser,
  setCurrentView,
  onOpenAssistant,
  _onOpenCAF,
  onUploadFireNOC,
  lang = 'en',
  setLang,
  onSwitchUser,
  setActiveRole,
  onLogout,
  onOpenTrack
}) => {
  // Factory/Business Unit selection state
  const factoryUnits = state.factoryUnits || [];
  const [selectedUnitId, setSelectedUnitId] = useState(
    factoryUnits[0]?.id || 'UNIT-PUN-01'
  );
  const [unitDropdownOpen, setUnitDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  // Take Action: Upload Fire NOC Modal state
  const [actionModalOpen, setActionModalOpen] = useState(false);
  const [uploadStep, setUploadStep] = useState('idle');
  const [isFireNOCUploaded, setIsFireNOCUploaded] = useState(false);

  // AI Prompt Floating widget state
  const [floatingAiInput, setFloatingAiInput] = useState('');

  const activeUnit = useMemo(() => {
    const fUnits = state.factoryUnits || [];
    return fUnits.find((u) => u.id === selectedUnitId) || fUnits[0] || {
      unitName: 'Chakan Assembly Line IV (EV & Commercial)',
      midcArea: 'Chakan Industrial Phase II',
      plotNumber: 'Plot E-14/2',
      district: 'Pune',
      category: 'Red'
    };
  }, [state.factoryUnits, selectedUnitId]);

  // Notifications List
  const notifications = useMemo(() => [
    {
      id: 'notif-1',
      title: 'Action Needed: Fire NOC Missing',
      desc: 'Blocking DISH Factory Plan (DISH-PLN-01) and MPCB Consent to Establish.',
      time: '15 mins ago',
      level: 'critical'
    },
    {
      id: 'notif-2',
      title: 'SLA Risk: MPCB CTE Scrutiny',
      desc: '4 days remaining on RTS statutory clock (Day 26 of 30).',
      time: '2 hours ago',
      level: 'warning'
    },
    {
      id: 'notif-3',
      title: 'MIDC Possession Confirmed',
      desc: 'Plot E-14/2 demarcation order registered successfully.',
      time: 'Yesterday',
      level: 'success'
    }
  ], []);

  // Compute 4 Intelligence Areas Stats
  const intelligenceStats = useMemo(() => {
    // 1. Applications
    const active = state.applications.filter((a) => a.status === 'pending' || a.status === 'scrutiny').length;
    const atRisk = state.applications.filter((a) => a.status === 'action_required' || a.status === 'rejected').length;
    const completed = state.applications.filter((a) => a.status === 'approved').length;

    // 2. Documents
    const healthy = state.documents.filter((d) => d.status === 'verified').length;
    const needsAttention = state.documents.filter((d) => d.status === 'rejected' || (d.issues && d.issues.length > 0)).length;
    const missing = isFireNOCUploaded ? 0 : 1; // Fire NOC is the critical missing document

    // 3. Compliance
    const overdue = state.compliances ? state.compliances.filter((c) => c.status === 'overdue').length : 0;

    return {
      apps: { active: active || 3, atRisk: atRisk || 1, completed: completed || 2 },
      docs: { healthy: healthy || 4, needsAttention: needsAttention || 1, missing: missing },
      compliance: { upcomingDeadline: 'Form V Environmental Return (30 Sep)', overdueCount: overdue },
      opportunities: {
        scheme: 'PSI 2019 (Zone C)',
        incentives: '₹ 22.5 Cr Capital Subsidy',
        regulatory: 'DISH Plan Self-Certification GR'
      }
    };
  }, [state, isFireNOCUploaded]);

  // Handle Take Action upload completion
  const handleCompleteUpload = () => {
    setUploadStep('validating');
    setTimeout(() => {
      setUploadStep('completed');
      setIsFireNOCUploaded(true);
      if (onUploadFireNOC) {
        onUploadFireNOC();
      }
    }, 1200);
  };

  return (
    <div id="industrial-command-dashboard" className="w-full max-w-[1440px] mx-auto space-y-6 text-slate-900">
      
      {/* ========================================================================= */}
      {/* 3. MY INDUSTRIAL JOURNEY — HORIZONTAL VISUAL PIPELINE                      */}
      {/* ========================================================================= */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-7 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <h2 className="text-sm font-extrabold uppercase tracking-wider text-slate-900">
              My Industrial Journey
            </h2>
            <span className="text-xs text-slate-400">• Standard Maharashtra RTS Industrial Setup Pipeline</span>
          </div>
          <button 
            onClick={() => setCurrentView('roadmap')}
            className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center space-x-1"
          >
            <span>Full Dependency Map</span>
            <ChevronRight size={14} />
          </button>
        </div>

        {/* Horizontal Linear Pipeline */}
        <div className="relative pt-3 pb-2 overflow-x-auto">
          <div className="min-w-[760px] flex items-center justify-between relative">
            
            {/* Connecting Baseline */}
            <div className="absolute top-5 left-8 right-8 h-1 bg-slate-100 z-0"></div>
            
            {/* Completed Line Progress */}
            <div 
              className="absolute top-5 left-8 h-1 bg-emerald-500 z-0 transition-all duration-500"
              style={{ width: isFireNOCUploaded ? '50%' : '35%' }}
            ></div>

            {/* Stage 1: Business Setup */}
            <div className="relative z-10 flex flex-col items-center text-center space-y-1.5 w-28">
              <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold shadow-md ring-4 ring-white">
                <Check size={18} className="stroke-[3]" />
              </div>
              <p className="text-xs font-black text-slate-900">Business Setup</p>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                Completed
              </span>
              <span className="text-[10px] text-slate-400">MIDC Plot Allotted</span>
            </div>

            {/* Stage 2: Documents */}
            <div className="relative z-10 flex flex-col items-center text-center space-y-1.5 w-28">
              <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold shadow-md ring-4 ring-white">
                <Check size={18} className="stroke-[3]" />
              </div>
              <p className="text-xs font-black text-slate-900">Documents</p>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                5/6 Verified
              </span>
              <span className="text-[10px] text-slate-400">Vault & DSC Check</span>
            </div>

            {/* Stage 3: Approvals (Active / Blocked) */}
            <div className="relative z-10 flex flex-col items-center text-center space-y-1.5 w-28">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold shadow-md ring-4 ring-white transition-colors ${
                isFireNOCUploaded ? 'bg-blue-600 text-white' : 'bg-amber-500 text-white ring-amber-100'
              }`}>
                {isFireNOCUploaded ? <Clock size={18} /> : <AlertTriangle size={18} />}
              </div>
              <p className="text-xs font-black text-slate-900">Approvals</p>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                isFireNOCUploaded 
                  ? 'bg-blue-50 text-blue-700 border-blue-200' 
                  : 'bg-amber-50 text-amber-800 border-amber-300 animate-pulse'
              }`}>
                {isFireNOCUploaded ? 'Scrutiny Active' : 'Action Needed'}
              </span>
              <span className="text-[10px] text-slate-400">
                {isFireNOCUploaded ? 'DISH & MPCB' : 'Fire NOC Blocked'}
              </span>
            </div>

            {/* Stage 4: Inspection */}
            <div className="relative z-10 flex flex-col items-center text-center space-y-1.5 w-28">
              <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-400 border border-slate-300 flex items-center justify-center font-bold ring-4 ring-white">
                <Building size={16} />
              </div>
              <p className="text-xs font-semibold text-slate-500">Inspection</p>
              <span className="text-[10px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                Queued
              </span>
              <span className="text-[10px] text-slate-400">Joint Site Visit</span>
            </div>

            {/* Stage 5: Decision */}
            <div className="relative z-10 flex flex-col items-center text-center space-y-1.5 w-28">
              <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-400 border border-slate-300 flex items-center justify-center font-bold ring-4 ring-white">
                <ShieldCheck size={16} />
              </div>
              <p className="text-xs font-semibold text-slate-500">Decision</p>
              <span className="text-[10px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                Pending
              </span>
              <span className="text-[10px] text-slate-400">Sanction / Grant</span>
            </div>

            {/* Stage 6: Compliance */}
            <div className="relative z-10 flex flex-col items-center text-center space-y-1.5 w-28">
              <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-400 border border-slate-300 flex items-center justify-center font-bold ring-4 ring-white">
                <Calendar size={16} />
              </div>
              <p className="text-xs font-semibold text-slate-500">Compliance</p>
              <span className="text-[10px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                Ongoing
              </span>
              <span className="text-[10px] text-slate-400">Form V & Returns</span>
            </div>

          </div>
        </div>
      </div>


      {/* ========================================================================= */}
      {/* 4. BELOW THE HERO — 4 COMPACT INTELLIGENCE AREAS                           */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
        
        {/* Area 1: APPLICATIONS */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:border-slate-300 transition-all flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center space-x-2 text-slate-900 font-black text-xs uppercase tracking-wider">
                <FileText size={15} className="text-blue-600" />
                <span>Applications</span>
              </div>
              <span className="text-[10px] font-bold text-slate-400">Clearance Pipeline</span>
            </div>

            <div className="mt-4 space-y-3 text-xs">
              <div className="flex items-center justify-between p-2 rounded-lg bg-blue-50/70 border border-blue-100">
                <span className="text-slate-700 font-semibold">Active</span>
                <span className="font-black text-blue-800 text-sm">{intelligenceStats.apps.active}</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-amber-50/80 border border-amber-200">
                <span className="text-slate-800 font-semibold flex items-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mr-1.5"></span>
                  At Risk
                </span>
                <span className="font-black text-amber-800 text-sm">{intelligenceStats.apps.atRisk}</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100">
                <span className="text-slate-600 font-medium">Completed</span>
                <span className="font-black text-emerald-700 text-sm">{intelligenceStats.apps.completed}</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setCurrentView('applications')}
            className="mt-4 pt-3 border-t border-slate-100 text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center justify-between w-full"
          >
            <span>View All Applications</span>
            <ChevronRight size={14} />
          </button>
        </div>

        {/* Area 2: DOCUMENTS */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:border-slate-300 transition-all flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center space-x-2 text-slate-900 font-black text-xs uppercase tracking-wider">
                <ShieldCheck size={15} className="text-emerald-600" />
                <span>Documents</span>
              </div>
              <span className="text-[10px] font-bold text-slate-400">Vault Health</span>
            </div>

            <div className="mt-4 space-y-3 text-xs">
              <div className="flex items-center justify-between p-2 rounded-lg bg-emerald-50/70 border border-emerald-100">
                <span className="text-slate-700 font-semibold">Healthy (300 DPI)</span>
                <span className="font-black text-emerald-800 text-sm">{intelligenceStats.docs.healthy}</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100">
                <span className="text-slate-700 font-semibold">Needs Attention</span>
                <span className="font-black text-amber-700 text-sm">{intelligenceStats.docs.needsAttention}</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-red-50/70 border border-red-100">
                <span className="text-slate-800 font-semibold flex items-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 mr-1.5"></span>
                  Missing
                </span>
                <span className="font-black text-red-700 text-sm">{intelligenceStats.docs.missing}</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setCurrentView('docs')}
            className="mt-4 pt-3 border-t border-slate-100 text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center justify-between w-full"
          >
            <span>Open Document Vault</span>
            <ChevronRight size={14} />
          </button>
        </div>

        {/* Area 3: COMPLIANCE */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:border-slate-300 transition-all flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center space-x-2 text-slate-900 font-black text-xs uppercase tracking-wider">
                <Calendar size={15} className="text-indigo-600" />
                <span>Compliance</span>
              </div>
              <span className="text-[10px] font-bold text-slate-400">Statutory RTS</span>
            </div>

            <div className="mt-4 space-y-3 text-xs">
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                <span className="text-[10px] uppercase font-bold text-slate-400">Upcoming Deadline</span>
                <p className="font-extrabold text-slate-900 text-xs mt-0.5 truncate">
                  {intelligenceStats.compliance.upcomingDeadline}
                </p>
                <p className="text-[11px] text-slate-500 mt-0.5">MPCB Water & Air Act filing</p>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-emerald-50/70 border border-emerald-100">
                <span className="text-slate-700 font-semibold">Overdue Items</span>
                <span className="font-black text-emerald-800 text-sm">
                  {intelligenceStats.compliance.overdueCount} (Zero Overdue)
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setCurrentView('calendar')}
            className="mt-4 pt-3 border-t border-slate-100 text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center justify-between w-full"
          >
            <span>Compliance Calendar</span>
            <ChevronRight size={14} />
          </button>
        </div>

        {/* Area 4: OPPORTUNITIES */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:border-slate-300 transition-all flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center space-x-2 text-slate-900 font-black text-xs uppercase tracking-wider">
                <Award size={15} className="text-amber-600" />
                <span>Opportunities</span>
              </div>
              <span className="text-[10px] font-bold text-slate-400">Subsidies & GR</span>
            </div>

            <div className="mt-4 space-y-2 text-xs">
              <div className="p-2 rounded-lg bg-amber-50/60 border border-amber-100">
                <span className="text-[10px] uppercase font-bold text-amber-800">Eligible Scheme</span>
                <p className="font-bold text-slate-900 truncate">{intelligenceStats.opportunities.scheme}</p>
                <p className="text-[11px] text-emerald-700 font-black">{intelligenceStats.opportunities.incentives}</p>
              </div>
              <div className="p-2 rounded-lg bg-slate-50 border border-slate-100">
                <span className="text-[10px] uppercase font-bold text-slate-400">New Regulatory Change</span>
                <p className="font-bold text-slate-800 truncate">{intelligenceStats.opportunities.regulatory}</p>
              </div>
            </div>
          </div>

          <button
            onClick={() => setCurrentView('incentive_calc')}
            className="mt-4 pt-3 border-t border-slate-100 text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center justify-between w-full"
          >
            <span>Calculate PSI Subsidies</span>
            <ChevronRight size={14} />
          </button>
        </div>

      </div>





      {/* ========================================================================= */}
      {/* MODAL: TAKE ACTION — UPLOAD FIRE NOC DOCUMENT                               */}
      {/* ========================================================================= */}
      {actionModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-5 animate-in fade-in zoom-in-95 duration-200">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-lg bg-amber-500 text-slate-950 flex items-center justify-center font-black">
                  <Upload size={18} />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-slate-900">
                    Upload Fire NOC Document
                  </h3>
                  <p className="text-xs text-slate-500">
                    Required to clear bottleneck for 2 waiting clearances
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  setActionModalOpen(false);
                  setUploadStep('idle');
                }}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-800 hover:bg-slate-100"
              >
                <X size={18} />
              </button>
            </div>

            {uploadStep === 'idle' && (
              <div className="space-y-4">
                {/* Upload Zone */}
                <div 
                  onClick={handleCompleteUpload}
                  className="border-2 border-dashed border-slate-300 hover:border-amber-500 bg-slate-50/70 hover:bg-amber-50/30 rounded-2xl p-6 text-center cursor-pointer transition-all"
                >
                  <div className="w-12 h-12 mx-auto rounded-full bg-white shadow-xs border border-slate-200 flex items-center justify-center text-slate-600 mb-2">
                    <Upload size={22} className="text-amber-600" />
                  </div>
                  <p className="text-xs font-bold text-slate-800">
                    Click to attach Provisional / Final Fire NOC (PDF)
                  </p>
                  <p className="text-[11px] text-slate-500 mt-1">
                    Auto-scanned for 300 DPI vector clarity & Chief Fire Officer DSC
                  </p>
                  <div className="mt-3 inline-flex items-center space-x-1 text-[11px] text-amber-700 bg-amber-100/70 px-2.5 py-1 rounded-md font-semibold">
                    <span>Sample: MH_FIRE_NOC_PUN_2026.pdf (1.4 MB)</span>
                  </div>
                </div>

                {/* Approvals to be unblocked */}
                <div className="bg-slate-50 rounded-xl p-3 border border-slate-200 text-xs space-y-1.5">
                  <span className="font-bold text-slate-900 block">Approvals that will be unlocked:</span>
                  <div className="flex items-center space-x-2 text-slate-700">
                    <CheckCircle2 size={13} className="text-emerald-600" />
                    <span>Factory Building Plan Approval (DISH-PLN-01)</span>
                  </div>
                  <div className="flex items-center space-x-2 text-slate-700">
                    <CheckCircle2 size={13} className="text-emerald-600" />
                    <span>MPCB Consent to Establish (MPCB-CTE-01)</span>
                  </div>
                </div>

                <div className="flex items-center justify-end space-x-3 pt-2">
                  <button
                    onClick={() => setActionModalOpen(false)}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleCompleteUpload}
                    className="px-5 py-2.5 rounded-xl text-xs font-extrabold text-slate-950 bg-amber-400 hover:bg-amber-300 shadow-md transition-all flex items-center space-x-2"
                  >
                    <span>Upload & Verify with AI</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            )}

            {uploadStep === 'validating' && (
              <div className="py-8 text-center space-y-3">
                <div className="w-12 h-12 mx-auto rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center">
                  <Sparkles size={24} className="text-blue-600 animate-spin" />
                </div>
                <p className="text-sm font-black text-slate-900">
                  UdyogSetu AI Scanning Document Integrity...
                </p>
                <p className="text-xs text-slate-500 max-w-xs mx-auto">
                  Validating 300 DPI vector clarity, Chief Fire Officer digital signature, and MIDC survey matching.
                </p>
              </div>
            )}

            {uploadStep === 'completed' && (
              <div className="py-6 text-center space-y-4">
                <div className="w-12 h-12 mx-auto rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <CheckCircle size={28} />
                </div>
                <div className="space-y-1">
                  <h4 className="text-base font-black text-slate-900">
                    Fire NOC Successfully Verified!
                  </h4>
                  <p className="text-xs text-slate-600 max-w-sm mx-auto">
                    The document has been securely stamped into your Vault. Statutory scrutiny has resumed for DISH and MPCB.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setActionModalOpen(false);
                    setUploadStep('idle');
                  }}
                  className="px-6 py-2.5 rounded-xl text-xs font-extrabold text-white bg-slate-900 hover:bg-slate-800 shadow transition-all"
                >
                  Return to Dashboard
                </button>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
};
