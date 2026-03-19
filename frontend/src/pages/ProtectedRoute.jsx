// src/auth/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { supabase } from "../supabase";
import { useEffect, useState } from "react";

export default function ProtectedRoute({ children, role }) {
  const [ok, setOk] = useState(null);

  useEffect(() => {
    async function check() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return setOk(false);

      const { data } = await supabase
        .from("users")
        .select("role")
        .eq("id", user.id)
        .single();

      if (!data) return setOk(false);

      if (role && data.role !== role) return setOk(false);

      setOk(true);
    }
    check();
  }, []);

  if (ok === null) return <div className="p-10">Loading...</div>;

  return ok ? children : <Navigate to="/login" />;
}
