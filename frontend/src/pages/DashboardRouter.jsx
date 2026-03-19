import { useEffect, useState } from "react";
import { supabase } from "../supabase";
import { useNavigate } from "react-router-dom";
import UserDashboard from "./UserDashboard";

export default function DashboardRouter() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function run() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        navigate("/login", { replace: true });
        return;
      }

      const role = localStorage.getItem("role");

      // 🚨 THIS WAS THE BUG — role was bypassed
      if (!role) {
        navigate("/select-role", { replace: true });
        return;
      }

      if (role === "qa") {
        navigate("/qa-entry", { replace: true });
        return;
      }

      // exporter / importer
      setLoading(false);
    }

    run();
  }, []);

  if (loading) return <div className="p-10">Loading…</div>;

  return <UserDashboard />;
}
