import { useState } from "react";
import { Search, ChevronRight, FileCheck, ExternalLink, X, ShieldCheck, Database, Check } from "lucide-react";
import { SERVICE_GROUPS, C } from "../data.js";

export function ServicesPage({ setPage }) {
  const [q, setQ] = useState("");
  const [activeDept, setActiveDept] = useState("all");
  const [selectedService, setSelectedService] = useState(null);

  // CAF submission modal state
  const [isCafOpen, setIsCafOpen] = useState(false);
  const [cafForm, setCafForm] = useState({
    applicantName: "",
    entityType: "Private Limited",
    sector: "Engineering & Auto Components",
    district: "Pune",
    taluka: "Chakan Industrial Area (Zone D+)",
  });
  const [submitting, setSubmitting] = useState(false);
  const [createdAppId, setCreatedAppId] = useState(null);

  const departments = ["all", ...SERVICE_GROUPS.map((g) => g.dept)];

  const filteredGroups = SERVICE_GROUPS.filter((g) => {
    const matchesDept = activeDept === "all" || g.dept === activeDept;
    const query = q.toLowerCase();
    const matchesQuery =
      g.dept.toLowerCase().includes(query) ||
      g.items.some((i) => i.toLowerCase().includes(query));
    return matchesDept && matchesQuery;
  });

  const handleOpenCaf = () => {
    setIsCafOpen(true);
    setCreatedAppId(null);
  };

  const handleSubmitCaf = async (e) => {
    e.preventDefault();
    if (!selectedService || !cafForm.applicantName) return;

    setSubmitting(true);
    try {
      const res = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service: selectedService.item,
          department: selectedService.dept,
          applicantName: cafForm.applicantName,
          entityType: cafForm.entityType,
          sector: cafForm.sector,
          district: cafForm.district,
          taluka: cafForm.taluka,
          statutoryDeadlineDays: 21,
          currentDesk: `Nodal Scrutiny Officer, ${selectedService.dept}`,
          documents: [
            "Common Application Form (CAF-I)",
            "Identity Proof & Board Resolution",
            "Land Allotment Letter / Registered Lease",
            "Detailed Project Report",
          ],
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setCreatedAppId(data.application.id);
      } else {
        alert("Failed to save application to MAITRI database. Please try again.");
      }
    } catch {
      alert("Network error while connecting to MAITRI database.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div id="services-page" className="px-4 py-12">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 max-w-3xl">
          <div
            className="inline-block mb-3 px-3 py-1 rounded text-xs font-semibold uppercase tracking-wide"
            style={{ background: C.saffronLight, color: C.saffron }}
          >
            119 Services · 16 Departments · Connected to MAITRI DB
          </div>
          <h1 className="text-3xl md:text-4xl font-bold leading-tight" style={{ color: C.navyDeep }}>
            Notified Clearances & Statutory Services
          </h1>
          <p className="mt-2.5 text-base leading-relaxed" style={{ color: C.slate }}>
            Every service below is integrated into MAITRI's Common Application Form (CAF). File directly to the state database, attach verified digital credentials, and track your dossier directly to the approval authority.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between mb-8">
          <div
            className="flex items-center gap-2 px-3 py-2.5 rounded-lg border border-slate-200 bg-white shadow-sm flex-1 max-w-lg"
          >
            <Search size={18} className="text-slate-400 shrink-0" />
            <input
              id="services-search-input"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search by keyword, department, or NOC type..."
              className="w-full text-sm text-slate-800 placeholder-slate-400 focus:outline-none"
            />
            {q && (
              <button onClick={() => setQ("")} className="text-xs text-slate-400 hover:text-slate-600 cursor-pointer">
                Clear
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-xl">
            <span className="text-xs font-semibold text-slate-500 whitespace-nowrap">Filter Dept:</span>
            {departments.map((d) => (
              <button
                key={d}
                onClick={() => setActiveDept(d)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium whitespace-nowrap transition-colors border cursor-pointer ${
                  activeDept === d
                    ? "bg-navy text-white border-navy"
                    : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                }`}
              >
                {d === "all" ? "All Departments (16)" : d.split(" ")[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Grid of Department Groups */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGroups.map((g) => (
            <div
              key={g.dept}
              className="p-5 rounded-xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between hover:border-slate-300 transition-colors"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <h2 className="font-bold text-base leading-snug" style={{ color: C.navyDeep }}>
                    {g.dept}
                  </h2>
                  <span
                    className="text-xs font-bold px-2 py-0.5 rounded-full shrink-0"
                    style={{ background: C.saffronLight, color: C.saffron }}
                  >
                    {g.count} Services
                  </span>
                </div>

                <div className="space-y-1.5 my-3">
                  {g.items.map((item) => (
                    <button
                      key={item}
                      onClick={() => setSelectedService({ dept: g.dept, item })}
                      className="w-full text-left p-2 rounded text-xs text-slate-700 hover:bg-blue-50/70 hover:text-blue-900 flex items-center justify-between group transition-colors cursor-pointer"
                    >
                      <span className="line-clamp-1">{item}</span>
                      <ChevronRight size={13} className="text-slate-400 group-hover:text-blue-700 shrink-0 ml-1" />
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                <span>RTS Act Notified</span>
                <span className="font-medium text-emerald-700">Digital Sign-off</span>
              </div>
            </div>
          ))}
        </div>

        {/* Modal: Service Details */}
        {selectedService && !isCafOpen && (
          <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-xl max-w-lg w-full border border-slate-200 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
              <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between" style={{ background: C.navy }}>
                <h3 className="font-bold text-sm text-white flex items-center gap-2">
                  <ShieldCheck size={16} /> Statutory Clearance Overview
                </h3>
                <button
                  onClick={() => setSelectedService(null)}
                  className="text-slate-300 hover:text-white p-1 rounded cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <div className="text-xs font-semibold uppercase text-slate-400">Department</div>
                  <div className="text-sm font-bold text-slate-800">{selectedService.dept}</div>
                </div>

                <div>
                  <div className="text-xs font-semibold uppercase text-slate-400">Service Title</div>
                  <div className="text-base font-bold text-blue-900">{selectedService.item}</div>
                </div>

                <div className="grid grid-cols-2 gap-3 p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs">
                  <div>
                    <span className="text-slate-500 block">Statutory SLA:</span>
                    <strong className="text-slate-800">7 to 21 Days</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Application Mode:</span>
                    <strong className="text-emerald-700 font-semibold">100% Online (Paperless)</strong>
                  </div>
                </div>

                <div>
                  <div className="text-xs font-semibold text-slate-600 mb-2">Mandatory Documents Required:</div>
                  <ul className="text-xs space-y-1.5 text-slate-600 list-disc list-inside">
                    <li>Valid Udyog Aadhaar / Udyam Registration Certificate</li>
                    <li>Land Title / MIDC Allotment Letter / Registered Lease Deed</li>
                    <li>Detailed Project Report (DPR) & Process Flowchart</li>
                    <li>Site Layout & Architecture Plan certified by registered architect</li>
                  </ul>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center gap-3">
                  <button
                    onClick={handleOpenCaf}
                    className="flex-1 py-2.5 rounded font-semibold text-xs text-white transition-opacity hover:opacity-90 flex items-center justify-center gap-1.5 cursor-pointer"
                    style={{ background: C.saffron }}
                  >
                    <ExternalLink size={14} /> Submit CAF Application (Save to DB)
                  </button>
                  <button
                    onClick={() => setSelectedService(null)}
                    className="px-4 py-2.5 rounded font-semibold text-xs border border-slate-200 text-slate-700 hover:bg-slate-50 cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modal: Common Application Form Submission to MAITRI Database */}
        {selectedService && isCafOpen && (
          <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-xl max-w-lg w-full border border-slate-200 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
              <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between" style={{ background: C.navy }}>
                <h3 className="font-bold text-sm text-white flex items-center gap-2">
                  <Database size={16} /> MAITRI CAF Application Entry
                </h3>
                <button
                  onClick={() => {
                    setIsCafOpen(false);
                    setSelectedService(null);
                  }}
                  className="text-slate-300 hover:text-white p-1 rounded cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              {createdAppId ? (
                <div className="p-6 text-center space-y-4">
                  <div className="w-14 h-14 rounded-full mx-auto flex items-center justify-center" style={{ background: C.greenLight }}>
                    <Check size={28} color={C.green} />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold" style={{ color: C.navyDeep }}>
                      File Registered in MAITRI Database
                    </h4>
                    <p className="text-xs text-slate-500 mt-1">
                      Your Common Application Form has been permanently recorded and assigned to the departmental scrutiny desk.
                    </p>
                  </div>

                  <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200 inline-block font-mono text-sm font-bold text-slate-900">
                    {createdAppId}
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row gap-2">
                    {setPage && (
                      <button
                        onClick={() => {
                          setIsCafOpen(false);
                          setSelectedService(null);
                          setPage("track");
                        }}
                        className="flex-1 py-2.5 rounded-lg text-xs font-bold text-white shadow-sm cursor-pointer"
                        style={{ background: C.navy }}
                      >
                        Track File Now
                      </button>
                    )}
                    <button
                      onClick={() => {
                        setIsCafOpen(false);
                        setSelectedService(null);
                      }}
                      className="px-4 py-2.5 rounded-lg text-xs font-semibold border border-slate-200 text-slate-700 hover:bg-slate-50 cursor-pointer"
                    >
                      Done
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmitCaf} className="p-6 space-y-4">
                  <div className="p-3 bg-blue-50/70 border border-blue-100 rounded-lg text-xs text-blue-900">
                    <span className="font-bold block">{selectedService.item}</span>
                    <span className="text-[11px] text-blue-700">{selectedService.dept}</span>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                      Promoter / Entity Name *
                    </label>
                    <input
                      required
                      value={cafForm.applicantName}
                      onChange={(e) => setCafForm({ ...cafForm, applicantName: e.target.value })}
                      placeholder="e.g. Sahyadri Precision Engineering Pvt. Ltd."
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-navy"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                        Entity Type
                      </label>
                      <select
                        value={cafForm.entityType}
                        onChange={(e) => setCafForm({ ...cafForm, entityType: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs bg-white focus:outline-none focus:border-navy"
                      >
                        <option value="Private Limited">Private Limited</option>
                        <option value="Public Limited">Public Limited</option>
                        <option value="Limited Liability Partnership">LLP</option>
                        <option value="Partnership Firm">Partnership Firm</option>
                        <option value="Proprietorship">Proprietorship</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                        Sector
                      </label>
                      <select
                        value={cafForm.sector}
                        onChange={(e) => setCafForm({ ...cafForm, sector: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs bg-white focus:outline-none focus:border-navy"
                      >
                        <option value="Engineering & Auto Components">Engineering & Auto</option>
                        <option value="Agro & Food Processing">Agro & Food</option>
                        <option value="Chemicals & Petrochemicals">Chemicals</option>
                        <option value="Pharmaceuticals & Biotech">Pharma & Biotech</option>
                        <option value="Electronics & Semiconductors">Electronics</option>
                        <option value="Green Hydrogen & Renewables">Green Renewables</option>
                        <option value="Logistics & Warehousing">Logistics</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                        District
                      </label>
                      <select
                        value={cafForm.district}
                        onChange={(e) => setCafForm({ ...cafForm, district: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs bg-white focus:outline-none focus:border-navy"
                      >
                        <option value="Pune">Pune</option>
                        <option value="Thane">Thane</option>
                        <option value="Raigad">Raigad</option>
                        <option value="Nagpur">Nagpur</option>
                        <option value="Nashik">Nashik</option>
                        <option value="Chhatrapati Sambhajinagar">Chhatrapati Sambhajinagar</option>
                        <option value="Solapur">Solapur</option>
                        <option value="Amravati">Amravati</option>
                        <option value="Kolhapur">Kolhapur</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                        Taluka / Industrial Area
                      </label>
                      <input
                        value={cafForm.taluka}
                        onChange={(e) => setCafForm({ ...cafForm, taluka: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs focus:outline-none focus:border-navy"
                        placeholder="e.g. Chakan MIDC"
                      />
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center gap-3">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="flex-1 py-2.5 rounded font-semibold text-xs text-white transition-opacity hover:opacity-90 flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-60"
                      style={{ background: C.navy }}
                    >
                      {submitting ? "Saving to MAITRI Database..." : "Register Application in Database"}
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsCafOpen(false)}
                      className="px-4 py-2.5 rounded font-semibold text-xs border border-slate-200 text-slate-700 hover:bg-slate-50 cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
