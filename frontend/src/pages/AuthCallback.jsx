import { useEffect } from "react";
import { supabase } from "../supabase";
import { useNavigate } from "react-router-dom";

export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {

      navigate("/select-role", { replace: true });
    });
  }, []);

  return <div className="p-10 text-center">Completing login…</div>;
}
