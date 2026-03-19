import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { supabase } from "../supabase"; // Assuming you need supabase for logout

// --- START: ICON PLACEHOLDERS ---
const HomeIcon = ({ className = "w-5 h-5" }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>);
const ListIcon = ({ className = "w-5 h-5" }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" x2="21" y1="6" y2="6"/><line x1="8" x2="21" y1="12" y2="12"/><line x1="8" x2="21" y1="18" y2="18"/><line x1="3" x2="3.01" y1="6" y2="6"/><line x1="3" x2="3.01" y1="12" y2="12"/><line x1="3" x2="3.01" y1="18" y2="18"/></svg>);
const LogoutIcon = ({ className = "w-5 h-5" }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>);
// --- END: ICON PLACEHOLDERS ---

// A simple component to render the main title/logo area
const DemeterLogo = ({ text = "DEMETER" }) => (
    <div className="flex items-center justify-center p-6 border-b border-gray-100 mb-4">
        {/* Placeholder for Demeter Logo (circular) */}
        <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center mr-3">
            <span className="text-white font-bold text-lg">D</span>
        </div>
        <h1 className="text-2xl font-extrabold text-gray-900">{text}</h1>
    </div>
);

// Navigation Item Component
const NavItem = ({ icon: Icon, label, isActive, onClick }) => (
    <div
        className={`flex items-center space-x-3 p-3 cursor-pointer rounded-lg transition-colors duration-200 mx-2 ${
            isActive
                ? "bg-indigo-50 text-indigo-700 font-semibold"
                : "text-gray-600 hover:bg-gray-100 hover:text-gray-800"
        }`}
        onClick={onClick}
    >
        <Icon />
        <span>{label}</span>
    </div>
);

// Sidebar Component
const Sidebar = ({ activeView, setActiveView }) => {
    const handleLogout = async () => {
        await supabase.auth.signOut();
        window.location.href = "/login"; // Redirect to login page
    };

    return (
        <div className="w-64 bg-white border-r border-gray-100 flex flex-col h-full">
            <DemeterLogo />

            <div className="flex flex-col space-y-2 flex-grow">
                <NavItem
                    icon={HomeIcon}
                    label="Home"
                    isActive={activeView === "home"}
                    onClick={() => setActiveView("home")}
                />
                <NavItem
                    icon={ListIcon}
                    label="Pending Inspections"
                    isActive={activeView === "list"}
                    onClick={() => setActiveView("list")}
                />
            </div>

            <div className="p-4 border-t border-gray-100">
                <NavItem
                    icon={LogoutIcon}
                    label="Logout"
                    isActive={false}
                    onClick={handleLogout}
                />
            </div>
        </div>
    );
};


// --- CONTENT VIEW COMPONENTS ---

const HomeView = () => (
    <div className="flex flex-col items-center justify-center h-full text-center p-10">
        <h2 className="text-5xl font-extrabold text-gray-900 leading-tight">
            Demeter for QA Inspector
        </h2>
        <p className="mt-4 text-xl text-gray-500 max-w-lg">
            Streamline the verification process to save time from manual document verification.
        </p>
    </div>
);

const PendingListView = ({ list, approve }) => (
  <div className="p-8">
    <h2 className="text-3xl font-bold mb-6 text-gray-800">Pending Submissions for Review</h2>
    
    <div className="space-y-4">
      {list.map((item) => (
        <div
          key={item.id}
          className="bg-white p-5 rounded-xl shadow-md border border-gray-100 transition duration-300 hover:shadow-lg"
        >
          <div className="grid grid-cols-2 md:grid-cols-3 gap-y-2 mb-3">
            <p className="text-sm text-gray-500">Exporter:</p>
            <p className="font-semibold text-gray-800 col-span-2 md:col-span-1">{item.structured?.exporter?.name || 'N/A'}</p>

            <p className="text-sm text-gray-500">Product:</p>
            <p className="font-semibold text-gray-800 col-span-2 md:col-span-1">{item.structured?.shipment?.productName || 'N/A'}</p>

            <p className="text-sm text-gray-500">Trust Score:</p>
            <p className="font-semibold text-blue-600 col-span-2 md:col-span-1">{item.structured?.trustScore || 'N/A'}</p>
          </div>

          <div className="flex gap-4 mt-5 pt-3 border-t border-gray-100">
            <Link to={`/qa/review/${item.id}`}>
              <button className="bg-gray-800 text-white px-5 py-2 rounded-lg font-medium hover:bg-gray-900 transition-colors">
                View Details
              </button>
            </Link>

            <button
              className="bg-green-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors"
              onClick={() => approve(item.id)}
            >
              Approve
            </button>
          </div>
        </div>
      ))}

      {list.length === 0 && (
        <div className="text-center p-10 bg-gray-50 rounded-xl">
          <p className="text-xl text-gray-600">🎉 No pending inspections right now.</p>
          <p className="text-gray-500 mt-2">Check back later for new submissions.</p>
        </div>
      )}
    </div>
  </div>
);


// --- MAIN DASHBOARD COMPONENT ---

export default function QADashboard() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  // Default to 'list' view so the inspector can immediately see their work,
  // but allow switching to 'home'.
  const [activeView, setActiveView] = useState("list"); 

  function load() {
    setLoading(true);
    axios.get("http://localhost:4000/qa/list")
      .then((res) => {
        setList(res.data);
      })
      .catch(error => {
          console.error("Error fetching QA list:", error);
      })
      .finally(() => {
          setLoading(false);
      });
  }

  useEffect(() => {
    load();
  }, []);

  async function approve(id) {
    // Show a confirmation dialog for better UX
    if (!window.confirm("Are you sure you want to Approve this submission?")) {
        return;
    }

    const res = await axios.post("http://localhost:4000/qa/approve", { id });

    if (res.data.success) {
      alert("Submission Approved Successfully!");
      load(); // Reload list to remove the approved item
    } else {
        alert("Approval failed.");
    }
  }

  // Logic to render the correct content view
  const renderContent = () => {
    if (loading) {
        return (
            <div className="flex items-center justify-center h-full">
                <p className="text-xl text-gray-500">Loading pending inspection list...</p>
            </div>
        );
    }
    
    switch (activeView) {
      case "home":
        return <HomeView />;
      case "list":
        return <PendingListView list={list} approve={approve} />;
      default:
        return <PendingListView list={list} approve={approve} />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
        
        {/* Sidebar Navigation */}
        <Sidebar activeView={activeView} setActiveView={setActiveView} />

        {/* Main Content Area */}
        <div className="flex-1 overflow-auto p-4">
            <div className="h-full bg-white rounded-xl shadow-lg">
                {renderContent()}
            </div>
        </div>
    </div>
  );
}