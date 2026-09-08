import { Landmark } from "lucide-react";
import { C } from "../data.js";

export function Footer({ setPage }) {
  const cols = [
    {
      h: "Statutory & Acts",
      items: [
        "Maharashtra Trade & Investment Facilitation Act",
        "Right to Public Services Act (RTS)",
        "Industrial Policy 2019 Guidelines",
        "Package Scheme of Incentives (PSI 2019)",
        "Ease of Doing Business Reforms (BRAP)",
      ],
    },
    {
      h: "Key Departments",
      items: [
        "Directorate of Industries",
        "Maharashtra Industrial Development Corp (MIDC)",
        "Maharashtra Pollution Control Board (MPCB)",
        "Labour Department & DISH",
        "State Electricity Distribution Co. (MSEDCL)",
      ],
    },
    {
      h: "Investor Resources",
      items: [
        "Single Window Clearances SOP",
        "Industrial Land Bank & GIS Portal",
        "EV & Semiconductor Sector Policy",
        "Green Hydrogen Policy 2023",
        "Right to Information (RTI)",
      ],
    },
  ];

  return (
    <footer id="maitri-footer" style={{ background: C.navyDeep }} className="px-4 pt-12 pb-6 mt-12 text-white">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-9 h-9 rounded flex items-center justify-center shadow" style={{ background: C.saffron }}>
              <Landmark size={18} color={C.white} />
            </div>
            <span className="text-xl font-bold tracking-tight">MAITRI</span>
          </div>
          <p className="text-sm leading-relaxed mb-4 text-slate-300">
            Maharashtra Industry, Trade and Investment Facilitation Cell, Directorate of Industries,
            Government of Maharashtra.
          </p>
          <button
            id="footer-contact-link"
            onClick={() => {
              setPage("contact");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="text-sm font-semibold hover:underline cursor-pointer"
            style={{ color: C.saffron }}
          >
            Contact the investor desk &rarr;
          </button>
        </div>

        {cols.map((c) => (
          <div key={c.h}>
            <h4 className="font-bold text-sm mb-3 text-white tracking-wide uppercase">{c.h}</h4>
            <ul className="space-y-1.5">
              {c.items.map((i) => (
                <li key={i}>
                  <span
                    className="text-sm text-slate-300 hover:text-white cursor-pointer transition-colors"
                    onClick={() => {
                      setPage("services");
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                  >
                    {i}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div
        className="max-w-7xl mx-auto mt-10 pt-5 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-slate-400"
        style={{ borderTop: "1px solid rgba(255,255,255,0.14)" }}
      >
        <p className="text-center md:text-left">
          © {new Date().getFullYear()} Government of Maharashtra. Content managed by the Directorate of Industries.
        </p>
        <p className="tabular-nums">
          Total Portal Inquiries: 4,18,27,336 &nbsp;|&nbsp; Version 2.0
        </p>
      </div>
    </footer>
  );
}
