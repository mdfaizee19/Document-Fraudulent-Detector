import { useEffect, useState } from "react";
import { supabase } from "../supabase";
import { useNavigate } from "react-router-dom";

export default function ProtectedRoute({ children, role }) {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function check() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      // 🚨 Only enforce Supabase auth for NON-QA routes
      if (!session && role !== "qa") {
        navigate("/login", { replace: true });
        return;
      }

      // 🚨 Role enforcement via localStorage
      if (role) {
        const storedRole = localStorage.getItem("role");
        if (storedRole !== role) {
          navigate("/dashboard", { replace: true });
          return;
        }
      }

      setLoading(false);
    }

    check();
  }, []);

  if (loading) return <div className="p-10">Loading…</div>;

  return children;
}
