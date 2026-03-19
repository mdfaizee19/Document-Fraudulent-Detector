import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { supabase } from "../supabase";

/* ---------------- ICONS (UNCHANGED) ---------------- */

const HomeIcon = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
    <polyline points="9 22 9 12 15 12 15 22"/>
  </svg>
);

const ListIcon = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="8" x2="21" y1="6" y2="6"/>
    <line x1="8" x2="21" y1="12" y2="12"/>
    <line x1="8" x2="21" y1="18" y2="18"/>
    <line x1="3" x2="3.01" y1="6" y2="6"/>
    <line x1="3" x2="3.01" y1="12" y2="12"/>
    <line x1="3" x2="3.01" y1="18" y2="18"/>
  </svg>
);

const LogoutIcon = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
    <polyline points="16 17 21 12 16 7"/>
    <line x1="21" x2="9" y1="12" y2="12"/>
  </svg>
);

/* ---------------- LOGO ---------------- */

const DemeterLogo = () => (
  <div className="flex items-center justify-center p-6 border-b border-neutral-200">
    <img
      src="/assets/logo_demeter.webp"
      alt="Demeter"
      className="w-10 h-10 mr-3 object-contain"
    />
    <h1 className="text-xl font-serif font-semibold text-neutral-900">
      DEMETER
    </h1>
  </div>
);

/* ---------------- NAV ITEM ---------------- */

const NavItem = ({ icon: Icon, label, isActive, onClick }) => (
  <div
    onClick={onClick}
    className={`flex items-center space-x-3 p-3 mx-3 rounded-md cursor-pointer font-serif text-sm transition-colors
      ${
        isActive
          ? "bg-neutral-100 text-neutral-900 font-semibold"
          : "text-neutral-600 hover:bg-neutral-100"
      }`}
  >
    <Icon />
    <span>{label}</span>
  </div>
);

/* ---------------- SIDEBAR ---------------- */

const Sidebar = ({ activeView, setActiveView }) => {
  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/login";
  };

  return (
    <div className="w-64 bg-white border-r border-neutral-200 flex flex-col h-full font-serif">
      <DemeterLogo />

      <div className="flex flex-col space-y-1 flex-grow mt-2">
        <NavItem icon={HomeIcon} label="Home" isActive={activeView === "home"} onClick={() => setActiveView("home")} />
        <NavItem icon={ListIcon} label="Pending Inspections" isActive={activeView === "list"} onClick={() => setActiveView("list")} />
          <NavItem
  icon={ListIcon}
  label="Flagged Submissions"
  isActive={activeView === "flagged"}
  onClick={() => setActiveView("flagged")}
/>

<NavItem
  icon={ListIcon}
  label="Verified Exporters"
  isActive={activeView === "verified"}
  onClick={() => setActiveView("verified")}
/>

<NavItem
  icon={ListIcon}
  label="Inspection History"
  isActive={activeView === "history"}
  onClick={() => setActiveView("history")}
/>

      </div>

      <div className="p-4 border-t border-neutral-200">
        <NavItem icon={LogoutIcon} label="Logout" isActive={false} onClick={handleLogout} />
      </div>
    </div>
  );
};
const VERIFIED_EXPORTERS = [
  { id: "VE-01", name: "Tata Global Exports Ltd", country: "India", products: ["Tea", "Coffee"], status: "ACTIVE" },
  { id: "VE-02", name: "Reliance Agro Exports", country: "India", products: ["Rice"], status: "ACTIVE" },
  { id: "VE-03", name: "ITC International Trade", country: "India", products: ["Spices"], status: "ACTIVE" },
  { id: "VE-04", name: "LT Foods (Daawat)", country: "India", products: ["Basmati Rice"], status: "ACTIVE" },
  { id: "VE-05", name: "KRBL Global Foods", country: "India", products: ["Rice"], status: "ACTIVE" },
  { id: "VE-06", name: "Olam India Exports", country: "India", products: ["Cashew"], status: "ACTIVE" },
  { id: "VE-07", name: "Adani Agri Logistics", country: "India", products: ["Wheat"], status: "ACTIVE" },
  { id: "VE-08", name: "Godrej Agrovet", country: "India", products: ["Oilseeds"], status: "ACTIVE" },
  { id: "VE-09", name: "Mahindra Farm Division", country: "India", products: ["Vegetables"], status: "ACTIVE" },
  { id: "VE-10", name: "Amul International", country: "India", products: ["Dairy"], status: "ACTIVE" },
  { id: "VE-11", name: "Britannia Exports", country: "India", products: ["Bakery"], status: "ACTIVE" },
  { id: "VE-12", name: "Parle Agro Exports", country: "India", products: ["Beverages"], status: "ACTIVE" },
  { id: "VE-13", name: "Marico Global Trade", country: "India", products: ["Edible Oils"], status: "ACTIVE" },
  { id: "VE-14", name: "HUL Export Division", country: "India", products: ["Packaged Foods"], status: "ACTIVE" },
  { id: "VE-15", name: "UPL Agro Solutions", country: "India", products: ["Agro Chemicals"], status: "ACTIVE" }
];

const INSPECTION_HISTORY = [
  { id: "INSP-01", exporter: "LT Foods (Daawat)", decision: "APPROVED", inspector: "QA-102", date: "2024-11-20" },
  { id: "INSP-02", exporter: "KRBL Global Foods", decision: "REJECTED", inspector: "QA-101", date: "2024-11-18" },
  { id: "INSP-03", exporter: "Olam India Exports", decision: "APPROVED", inspector: "QA-104", date: "2024-11-15" }
];

const FLAGGED_SUBMISSIONS = [
  { id: "SUB-901", exporter: "Eastern Spice Traders", issue: "Low Trust Score", trust: 41 },
  { id: "SUB-902", exporter: "GreenField Organics", issue: "HS Code Mismatch", trust: 48 },
  { id: "SUB-903", exporter: "New Horizon Agro", issue: "Repeated Rejection", trust: 52 }
];

/* ---------------- VIEWS ---------------- */

const HomeView = () => (
  <div className="flex flex-col items-center justify-center h-full text-center p-12 font-serif">
    <h2 className="text-3xl font-semibold text-neutral-900 mb-4">
      QA Inspection Console
    </h2>

    <p className="text-neutral-700 max-w-2xl mb-10">
      This console is used by authorized QA inspectors to review exporter submissions,
      validate shipment documentation, and issue or deny verifiable credentials.
      All inspection actions performed here are logged and auditable.
    </p>

    <div className="max-w-3xl text-left space-y-6 text-sm text-neutral-700">

      <div>
        <h3 className="font-semibold text-neutral-900 mb-1">
          Pending Inspections
        </h3>
        <p>
          Review new exporter submissions awaiting inspection. Each submission includes
          exporter details, shipment information, and a system-generated trust score.
          Manual verification is mandatory before approval.
        </p>
      </div>

      <div>
        <h3 className="font-semibold text-neutral-900 mb-1">
          Flagged Submissions
        </h3>
        <p>
          Submissions automatically flagged due to low trust scores, inconsistencies,
          or prior inspection history. These require heightened scrutiny and should not
          be approved without supporting evidence.
        </p>
      </div>

      <div>
        <h3 className="font-semibold text-neutral-900 mb-1">
          Verified Exporters
        </h3>
        <p>
          Reference list of exporters with active verifiable credentials. Inspectors
          should consult this list to ensure consistency in decisions and identify
          repeat exporters or previously approved entities.
        </p>
      </div>

      <div>
        <h3 className="font-semibold text-neutral-900 mb-1">
          Inspection History
        </h3>
        <p>
          Historical record of completed inspections, including approvals and rejections.
          This serves as an audit trail and may be used for internal review or regulatory
          reporting.
        </p>
      </div>

      <div className="pt-4 border-t border-neutral-200">
        <h3 className="font-semibold text-neutral-900 mb-1">
          Inspection Guidelines
        </h3>
        <p>
          Inspectors must ensure that exporter identity, shipment data, and supporting
          documents are complete and consistent. Trust scores are advisory only and do
          not replace manual judgment. Approval should be granted only when all required
          criteria are satisfied.
        </p>
      </div>
    </div>
  </div>
);


const PendingListView = ({ list, approve }) => (
  <div className="p-8 font-serif">
    <h2 className="text-2xl font-semibold mb-6 text-neutral-900">
      Pending Submissions
    </h2>

    <div className="space-y-4">
      {list.map((item) => (
        <div
          key={item.id}
          className="border border-neutral-200 p-5 rounded-md"
        >
          <div className="grid grid-cols-2 md:grid-cols-3 gap-y-2 mb-4 text-sm">
            <span className="text-neutral-500">Exporter</span>
            <span className="font-medium text-neutral-800 col-span-2 md:col-span-1">
              {item.structured?.exporter?.name || "N/A"}
            </span>

            <span className="text-neutral-500">Product</span>
            <span className="font-medium text-neutral-800 col-span-2 md:col-span-1">
              {item.structured?.shipment?.productName || "N/A"}
            </span>

            <span className="text-neutral-500">Trust Score</span>
            <span className="font-medium text-neutral-800 col-span-2 md:col-span-1">
              {item.structured?.trustScore ?? "N/A"}
            </span>
          </div>

          <div className="flex gap-4 pt-4 border-t border-neutral-200">
            <Link to={`/qa/review/${item.id}`}>
              <button className="border border-neutral-900 px-4 py-2 rounded-md text-sm hover:bg-neutral-100">
                View Details
              </button>
            </Link>

            <button
              className="bg-neutral-900 text-white px-4 py-2 rounded-md text-sm hover:bg-neutral-800"
              onClick={() => approve(item.id)}
            >
              Approve
            </button>
          </div>
        </div>
      ))}

      {list.length === 0 && (
        <div className="border border-neutral-200 rounded-md p-10 text-center">
          <p className="text-neutral-700 font-medium">
            No pending inspections.
          </p>
          <p className="text-neutral-500 text-sm mt-1">
            New submissions will appear here automatically.
          </p>
        </div>
      )}
    </div>
  </div>
);
const FlaggedSubmissionsView = () => (
  <div className="p-8 font-serif">
    <h2 className="text-2xl font-semibold mb-6 text-neutral-900">
      Flagged Submissions
    </h2>

    <div className="space-y-4">
      {FLAGGED_SUBMISSIONS.map(f => (
        <div key={f.id} className="border border-neutral-200 p-5 rounded-md text-sm">
          <p><span className="text-neutral-500">Exporter:</span> {f.exporter}</p>
          <p><span className="text-neutral-500">Issue:</span> {f.issue}</p>
          <p><span className="text-neutral-500">Trust Score:</span> {f.trust}</p>
        </div>
      ))}
    </div>
  </div>
);

const VerifiedExportersView = () => (
  <div className="p-8 font-serif">
    <h2 className="text-2xl font-semibold mb-6 text-neutral-900">
      Verified Exporters
    </h2>

    <div className="space-y-4">
      {VERIFIED_EXPORTERS.map(v => (
        <div key={v.id} className="border border-neutral-200 p-5 rounded-md text-sm">
          <p className="font-medium text-neutral-800">{v.name}</p>
          <p className="text-neutral-600">{v.country}</p>
          <p className="text-neutral-600">
            Products: {v.products.join(", ")}
          </p>
          <p className="text-neutral-500 text-xs">Status: {v.status}</p>
        </div>
      ))}
    </div>
  </div>
);

const InspectionHistoryView = () => (
  <div className="p-8 font-serif">
    <h2 className="text-2xl font-semibold mb-6 text-neutral-900">
      Inspection History
    </h2>

    <div className="space-y-4">
      {INSPECTION_HISTORY.map(h => (
        <div key={h.id} className="border border-neutral-200 p-5 rounded-md text-sm">
          <p><span className="text-neutral-500">Exporter:</span> {h.exporter}</p>
          <p><span className="text-neutral-500">Decision:</span> {h.decision}</p>
          <p><span className="text-neutral-500">Inspector:</span> {h.inspector}</p>
          <p><span className="text-neutral-500">Date:</span> {h.date}</p>
        </div>
      ))}
    </div>
  </div>
);

/* ---------------- MAIN ---------------- */

export default function QADashboard() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeView, setActiveView] = useState("list");

  function load() {
    setLoading(true);
    axios.get("http://localhost:4000/qa/list")
      .then((res) => setList(res.data))
      .catch((error) => console.error("Error fetching QA list:", error))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    load();
  }, []);

  async function approve(id) {
    if (!window.confirm("Are you sure you want to approve this submission?")) {
      return;
    }

    const res = await axios.post("http://localhost:4000/qa/approve", { id });

    if (res.data.success) {
      alert("Submission approved.");
      load();
    } else {
      alert("Approval failed.");
    }
  }

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center h-full">
          <p className="font-serif text-neutral-600">Loading pending inspections…</p>
        </div>
      );
    }

switch (activeView) {
  case "home":
    return <HomeView />;
  case "list":
    return <PendingListView list={list} approve={approve} />;
  case "flagged":
    return <FlaggedSubmissionsView />;
  case "verified":
    return <VerifiedExportersView />;
  case "history":
    return <InspectionHistoryView />;
  default:
    return <PendingListView list={list} approve={approve} />;
}

  };

  return (
    <div className="flex h-screen bg-white">
      <Sidebar activeView={activeView} setActiveView={setActiveView} />

      <div className="flex-1 overflow-auto bg-white">
        {renderContent()}
      </div>
    </div>
  );
}
