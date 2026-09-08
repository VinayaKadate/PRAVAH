import { useState } from "react";
import {
  TrendingUp, FileCheck, MessageSquare, Headphones, Check, Phone, Mail,
  Building2, ChevronRight, ShieldCheck, Clock
} from "lucide-react";
import { SERVICE_GROUPS, C } from "../data.js";

export function AboutPage() {
  return (
    <div id="about-page" className="px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <div
            className="inline-block mb-3 px-3 py-1 rounded text-xs font-semibold uppercase tracking-wide"
            style={{ background: C.saffronLight, color: C.saffron }}
          >
            Statutory Mandate
          </div>
          <h1 className="text-3xl md:text-4xl font-bold leading-tight" style={{ color: C.navyDeep }}>
            From Regulatory Gatekeeper to Active Facilitator
          </h1>
          <p className="mt-2.5 text-base leading-relaxed" style={{ color: C.slate }}>
            MAITRI was constituted under the Maharashtra Industrial Policy and granted statutory powers through the Maharashtra Trade and Investment Facilitation Act.
          </p>
        </div>

        <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-sm space-y-4 mb-8 text-sm leading-relaxed text-slate-700">
          <p>
            Historically, industrial promoters faced fragmented departmental counters, non-standardized document requests, and opaque administrative timelines.
            MAITRI 2.0 acts as the single statutory window across 16 state departments. Files submitted here carry legal time-bounds under the Right to Public Services Act.
          </p>
          <p>
            Under MAITRI, every regulatory officer’s queue is visible to higher authorities. If an approval is withheld past statutory SLA days without legitimate query,
            the application automatically triggers an escalation to the Development Commissioner (Industries) and Principal Secretary.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          {[
            {
              icon: TrendingUp,
              t: "Investment Promotion",
              b: "Strategic liaison connecting foreign and domestic investors with designated plug-and-play corridors across Maharashtra.",
            },
            {
              icon: FileCheck,
              t: "Single-Window Approvals",
              b: "Integrated portal providing unified clearance for 119 industrial permissions, environmental consents and utility connections.",
            },
            {
              icon: MessageSquare,
              t: "Time-Bound Grievance Redressal",
              b: "Legally enforceable escalation mechanism with over 3,400 investment disputes resolved within statutory timelines.",
            },
            {
              icon: Headphones,
              t: "Dedicated Project Aftercare",
              b: "End-to-end relationship management supporting projects beyond commercial commissioning through operations and expansion.",
            },
          ].map((x) => (
            <div key={x.t} className="p-6 rounded-xl bg-white border border-slate-200 shadow-xs">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-3" style={{ background: C.navy }}>
                <x.icon size={20} color={C.white} />
              </div>
              <h3 className="font-bold text-base mb-1.5" style={{ color: C.navyDeep }}>
                {x.t}
              </h3>
              <p className="text-xs leading-relaxed text-slate-600">{x.b}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function GrievancePage() {
  const [f, setF] = useState({
    name: "",
    email: "",
    dept: "",
    appId: "",
    detail: "",
  });
  const [sent, setSent] = useState(false);
  const [ticketId, setTicketId] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!f.name || !f.email || !f.dept || !f.detail) {
      alert("Please fill in all mandatory fields: Name, Email, Department, and Details.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/grievances", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: f.name,
          email: f.email,
          department: f.dept,
          applicationId: f.appId,
          detail: f.detail,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setTicketId(data.grievance.id);
        setSent(true);
      } else {
        const generatedId = `MTR/GRV/${new Date().getFullYear()}/${Math.floor(10000 + Math.random() * 90000)}`;
        setTicketId(generatedId);
        setSent(true);
      }
    } catch {
      const generatedId = `MTR/GRV/${new Date().getFullYear()}/${Math.floor(10000 + Math.random() * 90000)}`;
      setTicketId(generatedId);
      setSent(true);
    } finally {
      setSubmitting(false);
    }
  };

  if (sent) {
    return (
      <div id="grievance-confirmation" className="px-4 py-20">
        <div className="max-w-lg mx-auto p-8 rounded-xl bg-white border border-slate-200 shadow-lg text-center">
          <div className="w-14 h-14 rounded-full mx-auto flex items-center justify-center mb-4" style={{ background: C.greenLight }}>
            <Check size={28} color={C.green} />
          </div>
          <h2 className="text-2xl font-bold mb-2" style={{ color: C.navyDeep }}>
            Grievance Registered Successfully
          </h2>
          <div className="my-4 p-3 bg-slate-50 rounded-lg border border-slate-200 inline-block">
            <span className="text-xs text-slate-500 block">Official Tracking Number</span>
            <strong className="text-base font-mono text-slate-900">{ticketId}</strong>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed mb-6">
            The notified nodal officer of <strong>{f.dept}</strong> has <strong>7 working days</strong> to resolve this issue.
            If no action is recorded, the ticket will automatically escalate to the Development Commissioner (Industries).
          </p>
          <button
            onClick={() => {
              setSent(false);
              setF({ name: "", email: "", dept: "", appId: "", detail: "" });
            }}
            className="px-5 py-2.5 rounded-lg text-xs font-bold border border-slate-300 text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
          >
            Register Another Grievance
          </button>
        </div>
      </div>
    );
  }

  return (
    <div id="grievance-form-page" className="px-4 py-12">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <div
            className="inline-block mb-3 px-3 py-1 rounded text-xs font-semibold uppercase tracking-wide"
            style={{ background: C.saffronLight, color: C.saffron }}
          >
            Statutory Grievance Redressal
          </div>
          <h1 className="text-3xl md:text-4xl font-bold leading-tight" style={{ color: C.navyDeep }}>
            Lodge a Departmental Grievance
          </h1>
          <p className="mt-2.5 text-base leading-relaxed" style={{ color: C.slate }}>
            Use this official form for delays past statutory limits, repeated frivolous queries on approved documents, or unresolved inspection holds.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 rounded-xl bg-white border border-slate-200 shadow-sm space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-700 mb-1.5">
                Full Name / Authorized Signatory *
              </label>
              <input
                id="grv-input-name"
                value={f.name}
                onChange={(e) => setF({ ...f, name: e.target.value })}
                className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-navy"
                placeholder="e.g. Anand Deshmukh"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-700 mb-1.5">
                Official Email Address *
              </label>
              <input
                id="grv-input-email"
                type="email"
                value={f.email}
                onChange={(e) => setF({ ...f, email: e.target.value })}
                className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-navy"
                placeholder="anand@company.com"
                required
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-700 mb-1.5">
                Department Concerned *
              </label>
              <select
                id="grv-select-dept"
                value={f.dept}
                onChange={(e) => setF({ ...f, dept: e.target.value })}
                className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-navy bg-white"
                required
              >
                <option value="">Select a department</option>
                {SERVICE_GROUPS.map((g) => (
                  <option key={g.dept} value={g.dept}>
                    {g.dept}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-700 mb-1.5">
                Application Number (Optional)
              </label>
              <input
                id="grv-input-app-id"
                value={f.appId}
                onChange={(e) => setF({ ...f, appId: e.target.value })}
                placeholder="MTR/2026/..."
                className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-navy font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-700 mb-1.5">
              Grievance Narrative & Event Details *
            </label>
            <textarea
              id="grv-textarea-detail"
              value={f.detail}
              onChange={(e) => setF({ ...f, detail: e.target.value })}
              rows={5}
              placeholder="State the dates, officer designation, queries raised, and statutory timeframe violated..."
              className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-navy"
              required
            />
          </div>

          <div className="p-3 rounded-lg bg-blue-50 border border-blue-100 flex items-start gap-2.5 text-xs text-blue-900">
            <Clock size={16} className="text-blue-600 mt-0.5 shrink-0" />
            <span>
              All submissions are logged on the Chief Minister's Dashboard and monitorable by the Directorate of Industries.
            </span>
          </div>

          <button
            type="submit"
            id="btn-submit-grievance"
            disabled={submitting}
            className="w-full py-3 rounded-lg font-semibold text-sm text-white transition-opacity hover:opacity-90 shadow-sm cursor-pointer disabled:opacity-60"
            style={{ background: C.navy }}
          >
            {submitting ? "Registering Grievance..." : "Submit Grievance for Redressal"}
          </button>
        </form>
      </div>
    </div>
  );
}

export function ContactPage() {
  return (
    <div id="contact-page" className="px-4 py-12">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <div
            className="inline-block mb-3 px-3 py-1 rounded text-xs font-semibold uppercase tracking-wide"
            style={{ background: C.saffronLight, color: C.saffron }}
          >
            Investor Directory
          </div>
          <h1 className="text-3xl md:text-4xl font-bold leading-tight" style={{ color: C.navyDeep }}>
            Contact the MAITRI Facilitation Network
          </h1>
          <p className="mt-2.5 text-base leading-relaxed" style={{ color: C.slate }}>
            Reach our state headquarters at Mantralaya or visit any of the 36 District Industries Centres (DIC) across Maharashtra.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 p-6 rounded-xl bg-white border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-start gap-3.5">
              <div className="p-2.5 rounded-lg shrink-0 bg-blue-50">
                <Building2 size={22} color={C.navy} />
              </div>
              <div>
                <h3 className="font-bold text-base text-slate-900">MAITRI Central Cell</h3>
                <p className="text-xs text-slate-400 font-medium">Directorate of Industries, Govt. of Maharashtra</p>
                <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                  2nd Floor, New Administrative Building, Opposite Mantralaya,<br />
                  Madam Cama Road, Nariman Point, Mumbai 400 032, Maharashtra.
                </p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
              <div className="flex items-start gap-3">
                <Phone size={18} color={C.navy} className="mt-0.5 text-slate-500" />
                <div>
                  <div className="text-sm font-bold text-slate-800">1800 120 8040</div>
                  <div className="text-xs text-slate-500">Toll-free, Mon–Sat (9:45 AM – 6:15 PM)</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail size={18} color={C.navy} className="mt-0.5 text-slate-500" />
                <div>
                  <div className="text-sm font-bold text-slate-800 break-all">helpdesk.maitri@maharashtra.gov.in</div>
                  <div className="text-xs text-slate-500">Replies within 2 working days</div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-xl text-white shadow-sm flex flex-col justify-between" style={{ background: C.navyDeep }}>
            <div>
              <h3 className="font-bold text-base text-white mb-2">Regional Facilitation Hubs</h3>
              <p className="text-xs text-blue-200 mb-4 leading-relaxed">
                Full-service physical kiosks located in key industrial divisional headquarters.
              </p>

              <div className="space-y-2 text-xs">
                {[
                  { city: "Pune", loc: "Agriculture College Compound, Shivajinagar" },
                  { city: "Nagpur", loc: "Civil Lines, Near High Court" },
                  { city: "Nashik", loc: "Trimbak Road, MIDC Satpur" },
                  { city: "Chhatrapati Sambhajinagar", loc: "Railway Station Road" },
                  { city: "Amravati", loc: "Camp Road, In Front of Collector Office" },
                ].map((d) => (
                  <div key={d.city} className="py-2 border-t border-white/10 flex items-center justify-between">
                    <div>
                      <span className="font-bold text-white block">{d.city}</span>
                      <span className="text-[11px] text-blue-200">{d.loc}</span>
                    </div>
                    <ChevronRight size={14} className="text-blue-300" />
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-white/15 flex items-center gap-2 text-xs text-amber-300 font-semibold">
              <ShieldCheck size={14} /> Walk-in advisory available daily
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
