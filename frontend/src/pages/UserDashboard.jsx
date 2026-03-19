import { useEffect, useState } from "react";
import { supabase } from "../supabase";
import axios from "axios";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";

/* ---------------- ICONS (UNCHANGED) ---------------- */
const DUMMY_APPROVED_EXPORTERS = [
  { id: "ex-1", status: "APPROVED", structured: { exporter: { name: "Tata International Limited" } }, qr_url: "#" },
  { id: "ex-2", status: "APPROVED", structured: { exporter: { name: "Adani Wilmar Exports" } }, qr_url: "#" },
  { id: "ex-3", status: "APPROVED", structured: { exporter: { name: "Reliance Global Trade Pvt. Ltd." } }, qr_url: "#" },
  { id: "ex-4", status: "APPROVED", structured: { exporter: { name: "Mahindra Overseas Trading Ltd." } }, qr_url: "#" },
  { id: "ex-5", status: "APPROVED", structured: { exporter: { name: "ITC International Trade Division" } }, qr_url: "#" },
  { id: "ex-6", status: "APPROVED", structured: { exporter: { name: "Godrej Agrovet Exports" } }, qr_url: "#" },
  { id: "ex-7", status: "APPROVED", structured: { exporter: { name: "UPL Limited – Agri Exports" } }, qr_url: "#" },
  { id: "ex-8", status: "APPROVED", structured: { exporter: { name: "JSW Global Tradecorp" } }, qr_url: "#" },
  { id: "ex-9", status: "APPROVED", structured: { exporter: { name: "Kirloskar Exports Pvt. Ltd." } }, qr_url: "#" },
  { id: "ex-10", status: "APPROVED", structured: { exporter: { name: "Amul Global Exports" } }, qr_url: "#" },
  { id: "ex-11", status: "APPROVED", structured: { exporter: { name: "Vedanta Aluminium Exports" } }, qr_url: "#" },
  { id: "ex-12", status: "APPROVED", structured: { exporter: { name: "Grasim Industries – Export Unit" } }, qr_url: "#" },
  { id: "ex-13", status: "APPROVED", structured: { exporter: { name: "Essar Global Trade" } }, qr_url: "#" },
  { id: "ex-14", status: "APPROVED", structured: { exporter: { name: "Larsen & Toubro Export Division" } }, qr_url: "#" },
  { id: "ex-15", status: "APPROVED", structured: { exporter: { name: "Olam India Exports Pvt. Ltd." } }, qr_url: "#" }
];


const HomeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
    <polyline points="9 22 9 12 15 12 15 22"/>
  </svg>
);

const UploadIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
    <polyline points="17 8 12 3 7 8"/>
    <line x1="12" x2="12" y1="3" y2="15"/>
  </svg>
);

const StatusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
);

const ExportersIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);

const QrIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect width="7" height="7" x="3" y="3" rx="1"/>
    <rect width="7" height="7" x="14" y="3" rx="1"/>
    <rect width="7" height="7" x="3" y="14" rx="1"/>
    <path d="M21 15h-2a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2z"/>
  </svg>
);

const LogoutIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
    <div className="w-64 bg-white border-r border-neutral-200 flex flex-col h-full">
      <DemeterLogo />

      <div className="flex flex-col space-y-1 flex-grow mt-2">
        <NavItem icon={HomeIcon} label="Home" isActive={activeView === "home"} onClick={() => setActiveView("home")} />

        <Link to="/upload">
          <NavItem icon={UploadIcon} label="Upload Documents" isActive={false} onClick={() => {}} />
        </Link>

        <NavItem icon={StatusIcon} label="Verification Status" isActive={activeView === "status"} onClick={() => setActiveView("status")} />
        <NavItem icon={ExportersIcon} label="Approved Exporters" isActive={activeView === "approved"} onClick={() => setActiveView("approved")} />
        <NavItem icon={QrIcon} label="Download Credential QR" isActive={activeView === "qr"} onClick={() => setActiveView("qr")} />
      </div>

      <div className="p-4 border-t border-neutral-200">
        <NavItem icon={LogoutIcon} label="Logout" isActive={false} onClick={handleLogout} />
      </div>
    </div>
  );
};

/* ---------------- VIEWS ---------------- */

const HomeView = () => (
  <div className="flex flex-col items-center justify-center h-full text-center p-12 font-serif">
    <h2 className="text-4xl font-semibold text-neutral-900 mb-4">
      Digital Verification for Exporters and Importers
    </h2>

    <p className="text-lg text-neutral-700 max-w-2xl mb-10">
      Demeter provides a secure workflow for submitting export documentation,
      tracking verification status, and receiving verifiable credentials issued
      after quality assurance inspection.
    </p>

    <div className="max-w-3xl text-left space-y-6 text-sm text-neutral-700">

      <div>
        <h3 className="font-semibold text-neutral-900 mb-1">
          Document Submission
        </h3>
        <p>
          Upload exporter identity details, shipment information, and supporting
          documents required for verification. Each submission is uniquely tracked
          throughout the review process.
        </p>
      </div>

      <div>
        <h3 className="font-semibold text-neutral-900 mb-1">
          Verification Status
        </h3>
        <p>
          Monitor the real-time status of your submissions, including pending
          inspection, approval, or rejection. Status updates reflect decisions
          made by authorized QA inspectors.
        </p>
      </div>

      <div>
        <h3 className="font-semibold text-neutral-900 mb-1">
          Verifiable Credentials
        </h3>
        <p>
          Once approved, Demeter issues a cryptographically verifiable credential
          representing the approved shipment or exporter status. Credentials can
          be shared and verified independently using QR codes.
        </p>
      </div>

      <div>
        <h3 className="font-semibold text-neutral-900 mb-1">
          Transparency and Trust
        </h3>
        <p>
          Demeter does not auto-approve submissions. All credentials are issued
          only after manual inspection. This ensures trust, auditability, and
          acceptance by trade partners and regulators.
        </p>
      </div>
    </div>
  </div>
);

const VerificationStatusView = ({ mySubs }) => (
  <div className="p-8 font-serif">
    <h2 className="text-2xl font-semibold mb-6 text-neutral-900">
      My Submissions
    </h2>

    {mySubs.length === 0 && (
      <p className="text-neutral-600">No submissions found.</p>
    )}

    <div className="space-y-4">
      {mySubs.map((s) => (
        <div key={s.id} className="border border-neutral-200 p-5 rounded-md flex justify-between items-center">
          <div>
            <p className="text-sm font-medium text-neutral-800">
              Submission ID: <span className="text-neutral-500">{s.id.substring(0, 8)}…</span>
            </p>
            <p className="mt-1 text-sm text-neutral-600">
              Status: <span className="font-semibold">{s.status}</span>
            </p>
          </div>

          {s.qr_url && (
            <a href={s.qr_url} target="_blank" rel="noopener noreferrer" className="text-sm underline text-neutral-700">
              View Certificate
            </a>
          )}
        </div>
      ))}
    </div>
  </div>
);

const ApprovedExportersView = ({ verified }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = verified.filter(v =>
    v.structured.exporter.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8 font-serif">
      <h2 className="text-2xl font-semibold mb-6 text-neutral-900">
        Approved Exporters
      </h2>

      <input
        type="text"
        placeholder="Search by exporter name"
        className="w-full p-3 mb-6 border border-neutral-300 rounded-md text-sm"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="space-y-4">
        {filtered.map(v => (
          <div key={v.id} className="border border-neutral-200 p-5 rounded-md flex justify-between items-center">
            <p className="text-sm font-medium text-neutral-800">
              {v.structured.exporter.name}
            </p>
            <a href={v.qr_url} target="_blank" rel="noopener noreferrer" className="text-sm underline">
              Verify QR
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

const DownloadQrView = ({ mySubs }) => {
  const approved = mySubs.filter(s => s.status === "APPROVED" && s.qr_url);

  return (
    <div className="p-8 font-serif">
      <h2 className="text-2xl font-semibold mb-6 text-neutral-900">
        Download Credential QR
      </h2>

      <div className="space-y-4">
        {approved.map(s => (
          <div key={s.id} className="border border-neutral-200 p-5 rounded-md flex justify-between items-center">
            <span className="text-sm text-neutral-700">
              Credential {s.id.substring(0, 8)}…
            </span>
            <a href={s.qr_url} download className="text-sm underline">
              Download
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ---------------- MAIN ---------------- */

export default function UserDashboard() {
  const [mySubs, setMySubs] = useState([]);
  const [verified, setVerified] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeView, setActiveView] = useState("home");

  useEffect(() => {
    async function load() {
      setLoading(true);
      const u = await supabase.auth.getUser();
      const uid = u.data.user.id;

      const a = await axios.get(`http://localhost:4000/exporter/my/${uid}`);
      const b = await axios.get("http://localhost:4000/exporter/verified");

      setMySubs(a.data);
      setVerified(b.data?.length ? b.data : DUMMY_APPROVED_EXPORTERS);
      setLoading(false);
    }

    load();
  }, []);

  const renderContent = () => {
    if (loading) {
  return <Loader />;
  }


    switch (activeView) {
      case "status": return <VerificationStatusView mySubs={mySubs} />;
      case "approved": return <ApprovedExportersView verified={verified} />;
      case "qr": return <DownloadQrView mySubs={mySubs} />;
      default: return <HomeView />;
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
