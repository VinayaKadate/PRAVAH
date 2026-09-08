export const C = {
  navy: "#0B3C6E",
  navyDeep: "#062A4F",
  navySoft: "#12508F",
  saffron: "#E87722",
  saffronLight: "#FFF1E4",
  green: "#137A46",
  greenLight: "#E8F4EE",
  ink: "#152230",
  slate: "#5C6B7A",
  bg: "#F3F6F9",
  line: "#D9E1E9",
  white: "#FFFFFF",
};

export const FONT = `"Segoe UI", "Noto Sans", "Noto Sans Devanagari", system-ui, -apple-system, Arial, sans-serif`;

export const T = {
  en: {
    govt: "Government of Maharashtra",
    dept: "Industries, Energy, Labour & Mining Department",
    brand: "MAITRI",
    brandFull: "Maharashtra Industry, Trade and Investment Facilitation Cell",
    nav: {
      home: "Home",
      about: "About Us",
      services: "Services",
      track: "Track Application",
      calc: "Incentive Calculator",
      grievance: "Grievance",
      dashboard: "Dashboard",
      contact: "Contact Us",
    },
    login: "Login",
    register: "New investor registration",
    heroKicker: "Single Window Clearance System",
    heroTitle: "Every approval your project needs, on one portal.",
    heroSub:
      "Apply for licences, permissions and registrations across 16 departments, track each file to the officer's desk, and claim the incentives you qualify for.",
    searchPh: "Search a service — factory licence, fire NOC, consent to establish…",
    searchBtn: "Search services",
    quick: "Frequently used",
  },
  mr: {
    govt: "महाराष्ट्र शासन",
    dept: "उद्योग, ऊर्जा, कामगार व खनिकर्म विभाग",
    brand: "मैत्री",
    brandFull: "महाराष्ट्र उद्योग, व्यापार व गुंतवणूक सुविधा कक्ष",
    nav: {
      home: "मुख्यपृष्ठ",
      about: "आमच्याविषयी",
      services: "सेवा",
      track: "अर्ज स्थिती",
      calc: "प्रोत्साहन गणक",
      grievance: "तक्रार",
      dashboard: "डॅशबोर्ड",
      contact: "संपर्क",
    },
    login: "लॉगिन",
    register: "नवीन गुंतवणूकदार नोंदणी",
    heroKicker: "एक खिडकी मंजुरी प्रणाली",
    heroTitle: "प्रकल्पासाठी लागणाऱ्या सर्व मंजुऱ्या, एकाच पोर्टलवर.",
    heroSub:
      "१६ विभागांच्या परवानग्या व नोंदणीसाठी अर्ज करा, प्रत्येक फाईल अधिकाऱ्याच्या टेबलपर्यंत ट्रॅक करा आणि पात्र प्रोत्साहन मिळवा.",
    searchPh: "सेवा शोधा — कारखाना परवाना, अग्निशमन ना-हरकत…",
    searchBtn: "सेवा शोधा",
    quick: "वारंवार वापरल्या जाणाऱ्या",
  },
};

export const STATS = [
  { value: 119, suffix: "", label: "Services integrated" },
  { value: 16, suffix: "", label: "Departments onboarded" },
  { value: 368219, suffix: "", label: "Applications received" },
  { value: 352297, suffix: "", label: "Applications disposed" },
];

export const SERVICE_GROUPS = [
  {
    dept: "Directorate of Industries",
    count: 14,
    items: [
      "Udyog Aadhaar acknowledgement",
      "Entrepreneurs Memorandum Part-II",
      "Incentive eligibility certificate",
      "Registration under PSI 2019",
      "Stamp duty exemption certificate",
      "Electricity duty concession verification",
    ],
  },
  {
    dept: "MIDC",
    count: 12,
    items: [
      "Plot allotment in industrial areas",
      "Building plan approval",
      "Water connection application",
      "Transfer of industrial lease",
      "No-objection for mortgage",
    ],
  },
  {
    dept: "Maharashtra Pollution Control Board",
    count: 9,
    items: [
      "Consent to Establish (CTE)",
      "Consent to Operate (CTO)",
      "Hazardous waste authorisation",
      "Renewal of consent",
      "Bio-medical waste management",
    ],
  },
  {
    dept: "Directorate of Fire Services",
    count: 6,
    items: [
      "Provisional fire NOC",
      "Final fire NOC",
      "Renewal of fire NOC",
      "High-rise safety clearance",
    ],
  },
  {
    dept: "Labour Department",
    count: 15,
    items: [
      "Factory plan approval",
      "Factory licence (Section 6)",
      "Contract labour licence",
      "Shops & establishment registration",
      "Boiler registration & inspection",
    ],
  },
  {
    dept: "MSEDCL",
    count: 8,
    items: [
      "New HT power connection",
      "Load enhancement",
      "Electricity duty exemption",
      "Open access power transmission",
    ],
  },
  {
    dept: "Revenue Department",
    count: 11,
    items: [
      "NA (Non-Agricultural) permission",
      "Land use conversion under Section 42",
      "Tenure conversion clearance",
      "Zone confirmation certificate",
    ],
  },
  {
    dept: "Urban Development",
    count: 10,
    items: [
      "Development permission",
      "Commencement certificate",
      "Occupancy certificate",
      "Drainage & sewerage connection",
    ],
  },
];

export const TALUKA_CAT = [
  { code: "A", label: "A — Developed (Mumbai, Thane, Pune city belt)", ceiling: 0, years: 0 },
  { code: "B", label: "B — Moderately developed", ceiling: 30, years: 7 },
  { code: "C", label: "C — Less developed", ceiling: 40, years: 7 },
  { code: "D", label: "D — Least developed", ceiling: 50, years: 10 },
  { code: "D+", label: "D+ — Highly underdeveloped", ceiling: 70, years: 10 },
  { code: "NID", label: "No-industry district (Gadchiroli, Hingoli, etc.)", ceiling: 80, years: 10 },
  { code: "NAX", label: "Naxalism affected area (Special package)", ceiling: 100, years: 10 },
];

export const SECTORS = [
  { key: "msme", label: "MSME manufacturing", bump: 0 },
  { key: "large", label: "Large scale industrial unit", bump: -5 },
  { key: "mega", label: "Mega / Ultra-mega project", bump: 10 },
  { key: "textile", label: "Textile & apparel", bump: 5 },
  { key: "agro", label: "Agro & food processing", bump: 5 },
  { key: "ev", label: "Electric vehicles & components", bump: 10 },
  { key: "gh2", label: "Green hydrogen & renewables", bump: 15 },
  { key: "electronics", label: "Electronics & semiconductors", bump: 10 },
];

export const TRACK_STAGES = [
  { name: "Application submitted", desc: "Common application form received and fee paid", days: 0 },
  { name: "Scrutiny at nodal desk", desc: "MAITRI nodal officer checks completeness", days: 2 },
  { name: "Department processing", desc: "Forwarded to Labour Dept — Joint Director (Industrial Safety)", days: 7 },
  { name: "Site inspection", desc: "Inspection scheduled and report uploaded", days: 12 },
  { name: "Approval issued", desc: "Digitally signed certificate available for download", days: 21 },
];

export const SECTOR_INVEST = [
  { name: "Engineering", value: 82400 },
  { name: "Chemicals", value: 61200 },
  { name: "Textiles", value: 38900 },
  { name: "Food proc.", value: 34100 },
  { name: "Electronics", value: 29600 },
  { name: "Auto & EV", value: 71800 },
];

export const MONTHLY = [
  { m: "Apr", received: 24100, disposed: 22600 },
  { m: "May", received: 26800, disposed: 25400 },
  { m: "Jun", received: 29300, disposed: 27900 },
  { m: "Jul", received: 31200, disposed: 30100 },
  { m: "Aug", received: 33600, disposed: 32200 },
  { m: "Sep", received: 35900, disposed: 34800 },
];

export const REGION_SPLIT = [
  { name: "Pune division", value: 31 },
  { name: "Konkan division", value: 26 },
  { name: "Nashik division", value: 17 },
  { name: "Nagpur division", value: 14 },
  { name: "Chhatrapati Sambhajinagar", value: 12 },
];

export const PIE_COLORS = ["#0B3C6E", "#12508F", "#E87722", "#137A46", "#7A8CA0"];

export const inr = (n) => {
  const num = typeof n === "string" ? parseFloat(n) : n;
  if (isNaN(num)) return "0";
  return new Intl.NumberFormat("en-IN", { maximumFractionDigits: 2 }).format(num);
};
