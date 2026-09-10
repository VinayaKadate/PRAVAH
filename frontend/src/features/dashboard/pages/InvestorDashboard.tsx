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
      {/* 1. TOP HEADER                                                             */}
      {/* ========================================================================= */}
      <div className="bg-white border border-slate-200/90 rounded-2xl shadow-sm px-6 py-4 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        
        {/* Left: MAITRI + UdyogSetu Branding */}
        <div className="flex items-center space-x-3.5">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-slate-900 via-indigo-950 to-blue-900 flex items-center justify-center text-white font-black text-xl shadow-md border border-slate-800">
            M
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-lg font-black tracking-tight text-slate-950">MAITRI</span>
              <span className="text-slate-300 font-light">|</span>
              <span className="text-sm font-extrabold text-blue-700 tracking-tight flex items-center">
                <Sparkles size={14} className="mr-1 text-indigo-600" />
                UdyogSetu AI
              </span>
              <span className="hidden sm:inline-flex bg-slate-100 text-slate-700 text-[10px] font-bold px-2 py-0.5 rounded border border-slate-200">
                Command Center
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium">
              Govt. of Maharashtra • Single Window Clearance System (RTS Act 2015)
            </p>
          </div>
        </div>

        {/* Center: Business/Factory Selector */}
        <div className="relative">
          <button
            onClick={() => setUnitDropdownOpen(!unitDropdownOpen)}
            className="w-full sm:w-auto flex items-center space-x-3 bg-slate-50 hover:bg-slate-100 border border-slate-300/80 rounded-xl px-4 py-2 text-left transition-all shadow-xs group"
          >
            <div className="w-7 h-7 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center flex-shrink-0">
              <Factory size={15} />
            </div>
            <div className="text-xs pr-2">
              <div className="flex items-center space-x-1.5">
                <span className="font-extrabold text-slate-900 max-w-[220px] truncate">
                  {activeUnit.unitName}
                </span>
                <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-red-100 text-red-800 border border-red-200">
                  {activeUnit.category} Category
                </span>
              </div>
              <p className="text-[11px] text-slate-500 truncate max-w-[240px]">
                {activeUnit.midcArea} • {activeUnit.plotNumber}
              </p>
            </div>
            <ChevronDown size={14} className="text-slate-400 group-hover:text-slate-700 transition-colors" />
          </button>

          {/* Unit Dropdown Menu */}
          {unitDropdownOpen && (
            <div className="absolute left-0 mt-2 w-80 bg-white border border-slate-200 rounded-xl shadow-xl z-40 p-2 space-y-1">
              <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Active Industrial Facilities
              </div>
              {factoryUnits.map((u) => (
                <button
                  key={u.id}
                  onClick={() => {
                    setSelectedUnitId(u.id);
                    setUnitDropdownOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs transition-colors flex items-start justify-between ${
                    u.id === selectedUnitId ? 'bg-blue-50 text-blue-900 font-bold' : 'hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <div>
                    <p className="font-bold">{u.unitName}</p>
                    <p className="text-[11px] text-slate-500">{u.midcArea} • {u.plotNumber}</p>
                  </div>
                  {u.id === selectedUnitId && <Check size={14} className="text-blue-600 mt-1" />}
                </button>
              ))}
              <div className="border-t border-slate-100 pt-1 mt-1">
                <button
                  onClick={() => {
                    setUnitDropdownOpen(false);
                    setCurrentView('factory_units');
                  }}
                  className="w-full text-left px-3 py-1.5 text-xs text-blue-600 hover:text-blue-800 font-bold flex items-center space-x-1.5"
                >
                  <span>+ Manage All Industrial Units</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right: Notifications, Language, Profile */}
        <div className="flex items-center space-x-3">
          
          {/* Notifications Popover */}
          <div className="relative">
            <button
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              className="relative p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors"
              title="Statutory Alerts & Notifications"
            >
              <Bell size={18} />
              <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-600 rounded-full ring-2 ring-white animate-pulse"></span>
            </button>

            {notificationsOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white border border-slate-200 rounded-xl shadow-xl z-40 p-3 space-y-2">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <span className="text-xs font-bold text-slate-900">Statutory Notifications</span>
                  <span className="text-[10px] font-extrabold bg-red-100 text-red-800 px-1.5 py-0.2 rounded">
                    2 Action Items
                  </span>
                </div>
                <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                  {notifications.map((n) => (
                    <div key={n.id} className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900">{n.title}</span>
                        <span className="text-[10px] text-slate-400">{n.time}</span>
                      </div>
                      <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">{n.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Language Toggle */}
          {setLang && (
            <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs">
              {['en', 'mr', 'hi'].map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`px-2 py-1 rounded-lg font-bold text-[11px] transition-all ${
                    lang === l ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  {l.toUpperCase()}
                </button>
              ))}
            </div>
          )}

          {/* User Profile Summary with Dropdown */}
          <div className="relative">
            <button
              onClick={() => setProfileMenuOpen(!profileMenuOpen)}
              className="flex items-center space-x-2 pl-2 border-l border-slate-200 hover:bg-slate-50 p-1.5 rounded-xl transition-colors text-left"
            >
              <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xs shadow-xs">
                {activeUser.name ? activeUser.name.charAt(0) : 'T'}
              </div>
              <div className="hidden xl:block text-left text-xs">
                <p className="font-bold text-slate-900 leading-tight truncate max-w-[140px]">
                  {activeUser.name}
                </p>
                <p className="text-[10px] text-slate-500 truncate max-w-[140px]">
                  {activeUser.designation || 'Industrialist'}
                </p>
              </div>
              <ChevronDown size={14} className="text-slate-400" />
            </button>

            {profileMenuOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white border border-slate-200 rounded-2xl shadow-xl z-50 p-2 space-y-1 text-xs">
                <div className="px-3 py-2 border-b border-slate-100">
                  <p className="font-extrabold text-slate-900">{activeUser.name}</p>
                  <p className="text-[11px] text-slate-500">{activeUser.email || 'corporate@maitri.gov.in'}</p>
                  <p className="text-[10px] text-blue-700 font-bold mt-1 bg-blue-50 px-2 py-0.5 rounded inline-block">
                    {activeUser.industry}
                  </p>
                </div>

                {onSwitchUser && (
                  <button
                    onClick={() => {
                      onSwitchUser();
                      setProfileMenuOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 rounded-xl hover:bg-slate-50 text-slate-700 font-semibold flex items-center justify-between"
                  >
                    <span>Switch Corporate Entity</span>
                    <span className="text-[10px] text-slate-400 font-mono">Tata / Bharat</span>
                  </button>
                )}

                {setActiveRole && (
                  <>
                    <div className="border-t border-slate-100 my-1 pt-1">
                      <p className="px-3 py-1 text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
                        Switch View Persona
                      </p>
                      <button
                        onClick={() => {
                          setActiveRole('officer');
                          setCurrentView('officer_queue');
                          setProfileMenuOpen(false);
                        }}
                        className="w-full text-left px-3 py-1.5 rounded-xl hover:bg-amber-50 text-amber-900 font-bold flex items-center space-x-2"
                      >
                        <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                        <span>Officer Smart Queue</span>
                      </button>
                      <button
                        onClick={() => {
                          setActiveRole('admin');
                          setCurrentView('admin_workspace');
                          setProfileMenuOpen(false);
                        }}
                        className="w-full text-left px-3 py-1.5 rounded-xl hover:bg-emerald-50 text-emerald-900 font-bold flex items-center space-x-2"
                      >
                        <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                        <span>State Platform Admin</span>
                      </button>
                    </div>
                  </>
                )}

                <div className="border-t border-slate-100 my-1 pt-1 space-y-1">
                  {onOpenTrack && (
                    <button
                      onClick={() => {
                        onOpenTrack();
                        setProfileMenuOpen(false);
                      }}
                      className="w-full text-left px-3 py-1.5 rounded-xl hover:bg-slate-50 text-slate-700 font-semibold"
                    >
                      Track Any Clearance
                    </button>
                  )}
                  <button
                    onClick={() => {
                      setCurrentView('public_home');
                      setProfileMenuOpen(false);
                    }}
                    className="w-full text-left px-3 py-1.5 rounded-xl hover:bg-slate-50 text-slate-700 font-semibold"
                  >
                    Public Single Window Home
                  </button>
                  {onLogout && (
                    <button
                      onClick={() => {
                        onLogout();
                        setProfileMenuOpen(false);
                      }}
                      className="w-full text-left px-3 py-1.5 rounded-xl hover:bg-red-50 text-red-600 font-bold"
                    >
                      Sign Out
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

      </div>


      {/* ========================================================================= */}
      {/* 2. HERO / "DO THIS NOW" — LARGE DOMINANT TOP SECTION                       */}
      {/* ========================================================================= */}
      <div className="relative bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white rounded-3xl p-8 sm:p-10 shadow-2xl border border-slate-800 overflow-hidden">
        
        {/* Subtle Decorative Precision Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none opacity-40"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 space-y-7">
          
          {/* Top Label & Urgency Beacon */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center space-x-3">
              <span className="flex items-center space-x-2 bg-amber-400/15 border border-amber-400/40 text-amber-300 text-xs font-black px-3.5 py-1 rounded-full uppercase tracking-wider">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping"></span>
                <span>DO THIS NOW</span>
              </span>
              <span className="text-xs font-mono text-slate-400">
                CRITICAL STATUTORY BOTTLENECK
              </span>
            </div>

            {/* SLA Risk Indicator */}
            <div className="flex items-center space-x-2 bg-red-950/70 border border-red-500/40 text-red-200 px-3.5 py-1 rounded-full text-xs font-semibold shadow-xs">
              <AlertTriangle size={13} className="text-red-400" />
              <span>SLA Risk: MPCB CTE deadline in 4 days (RTS Day 26/30)</span>
            </div>
          </div>

          {/* Hero Core Action Question & Action Button */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 py-2">
            <div className="max-w-3xl space-y-3">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
                {isFireNOCUploaded ? "Fire NOC Document Uploaded" : "Upload Fire NOC document"}
              </h1>
              
              <p className="text-slate-300 text-base sm:text-lg font-medium leading-relaxed">
                {isFireNOCUploaded ? (
                  <span className="text-emerald-300 flex items-center space-x-2">
                    <CheckCircle2 size={20} className="text-emerald-400" />
                    <span>2 approvals are now unblocked and undergoing statutory officer scrutiny.</span>
                  </span>
                ) : (
                  <>
                    <strong className="text-white font-extrabold">2 approvals are waiting for this document:</strong>{" "}
                    Directorate of Industrial Safety (DISH-PLN-01) & MPCB Consent to Establish.
                  </>
                )}
              </p>

              {/* Blocked Approvals Micro-Badges */}
              {!isFireNOCUploaded && (
                <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
                  <span className="bg-slate-800/90 border border-slate-700/80 text-slate-300 px-3 py-1 rounded-lg flex items-center space-x-1.5 font-mono">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                    <span>DISH Building Plan (DISH-PLN-01)</span>
                  </span>
                  <span className="bg-slate-800/90 border border-slate-700/80 text-slate-300 px-3 py-1 rounded-lg flex items-center space-x-1.5 font-mono">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                    <span>MPCB Consent to Establish (MPCB-CTE-01)</span>
                  </span>
                </div>
              )}
            </div>

            {/* Primary Dominant CTA */}
            <div className="flex-shrink-0 flex flex-col sm:flex-row lg:flex-col items-start lg:items-end gap-3">
              {isFireNOCUploaded ? (
                <button
                  onClick={() => setCurrentView('applications')}
                  className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-base px-8 py-4 rounded-2xl shadow-xl transition-all flex items-center justify-center space-x-2.5"
                >
                  <CheckCircle size={20} />
                  <span>View Processing Queue</span>
                </button>
              ) : (
                <button
                  onClick={() => setActionModalOpen(true)}
                  className="w-full sm:w-auto bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 text-slate-950 font-black text-base px-8 py-4 rounded-2xl shadow-xl hover:shadow-amber-400/20 transition-all transform hover:-translate-y-0.5 flex items-center justify-center space-x-3 cursor-pointer"
                >
                  <Upload size={20} className="stroke-[2.5]" />
                  <span>Take Action</span>
                  <ArrowRight size={18} />
                </button>
              )}
              <span className="text-[11px] text-slate-400 font-medium">
                {isFireNOCUploaded ? "Verified with Chief Fire Officer digital seal" : "Estimated resolution time: ~2 minutes"}
              </span>
            </div>
          </div>

          {/* Journey Progress & Current Stage Ribbon */}
          <div className="pt-4 border-t border-slate-800/80 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs">
            <div className="flex items-center space-x-3">
              <span className="text-slate-400 font-semibold">Overall Journey Progress:</span>
              <div className="w-44 bg-slate-800 rounded-full h-2.5 overflow-hidden border border-slate-700">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-emerald-400 h-full rounded-full transition-all duration-500"
                  style={{ width: isFireNOCUploaded ? '75%' : '68%' }}
                ></div>
              </div>
              <span className="font-mono font-bold text-emerald-400">
                {isFireNOCUploaded ? '75% Complete' : '68% Complete'}
              </span>
            </div>

            <div className="flex items-center space-x-2 text-slate-300">
              <span className="text-slate-500 font-semibold">Current Stage:</span>
              <span className="font-bold text-white bg-slate-800/80 px-2.5 py-1 rounded-md border border-slate-700">
                Stage 3 of 6: Pre-Establishment Statutory Clearances
              </span>
            </div>
          </div>

        </div>
      </div>


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
      {/* 5. RIGHT-SIDE / PERSISTENT FLOATING AI: "Ask UdyogSetu"                    */}
      {/* ========================================================================= */}
      <div className="fixed bottom-6 right-6 z-40 max-w-sm w-full sm:w-88">
        <div className="bg-slate-900 text-white rounded-2xl p-4 shadow-2xl border border-slate-700/80 backdrop-blur-md">
          <div className="flex items-center justify-between pb-2.5 border-b border-slate-800">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-xs shadow-xs">
                <Sparkles size={13} />
              </div>
              <span className="font-extrabold text-xs tracking-tight">Ask UdyogSetu</span>
            </div>
            <span className="text-[10px] font-mono text-blue-300 bg-blue-950 px-1.5 py-0.2 rounded border border-blue-800">
              Gemini 3.8
            </span>
          </div>

          <p className="text-[11px] text-slate-400 mt-2 font-medium">
            Ask any question regarding your current bottlenecks or approvals:
          </p>

          {/* Prompt Suggestion Chips */}
          <div className="mt-2.5 space-y-1.5">
            <button
              onClick={() => onOpenAssistant("What should I do next to unblock my industrial approvals?")}
              className="w-full text-left text-[11px] font-semibold text-slate-200 hover:text-white bg-slate-800/80 hover:bg-slate-800 px-2.5 py-1.5 rounded-lg border border-slate-700/70 transition-colors flex items-center justify-between group"
            >
              <span>"What should I do next?"</span>
              <ArrowRight size={12} className="text-slate-400 group-hover:text-white group-hover:translate-x-0.5 transition-transform" />
            </button>

            <button
              onClick={() => onOpenAssistant("Why is my MPCB CTE application delayed and how to resolve the SLA risk?")}
              className="w-full text-left text-[11px] font-semibold text-slate-200 hover:text-white bg-slate-800/80 hover:bg-slate-800 px-2.5 py-1.5 rounded-lg border border-slate-700/70 transition-colors flex items-center justify-between group"
            >
              <span>"Why is my application delayed?"</span>
              <ArrowRight size={12} className="text-slate-400 group-hover:text-white group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {/* Inline Input Bar */}
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              if (floatingAiInput.trim()) {
                onOpenAssistant(floatingAiInput);
                setFloatingAiInput('');
              }
            }}
            className="mt-3 flex items-center space-x-1.5"
          >
            <input
              type="text"
              value={floatingAiInput}
              onChange={(e) => setFloatingAiInput(e.target.value)}
              placeholder="Ask anything about Maharashtra clearances..."
              className="flex-1 bg-slate-950 text-white text-xs px-3 py-2 rounded-xl border border-slate-700 focus:outline-none focus:border-blue-500 placeholder-slate-500"
            />
            <button
              type="submit"
              className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors"
              title="Submit to UdyogSetu AI"
            >
              <Send size={13} />
            </button>
          </form>
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
