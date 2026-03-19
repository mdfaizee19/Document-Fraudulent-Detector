import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../supabase";

export default function ExporterNavbar() {
  const navigate = useNavigate();

  const logout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  return (
    <nav className="flex items-center justify-between px-10 py-4 border-b bg-white">
      <img src="/assets/logo_demeter.webp" className="w-28" />

      <div className="flex gap-8 font-medium">
        <Link to="/upload">Upload</Link>
        <Link to="/status">Status</Link>
        <Link to="/exporters">Exporters</Link>
        <Link to="/download-qr">Download QR</Link>
      </div>

      <button
        onClick={logout}
        className="bg-purple-600 text-white px-4 py-2 rounded"
      >
        Logout
      </button>
    </nav>
  );
}
