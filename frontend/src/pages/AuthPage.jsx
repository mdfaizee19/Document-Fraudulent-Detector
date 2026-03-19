// src/pages/AuthPage.jsx
import { useState } from "react";
import { supabase } from "../supabase";
import { useNavigate } from "react-router-dom";

export default function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("exporter");
  const [error, setError] = useState("");

  async function handleGoogle() {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: window.location.origin + "/auth/callback",
      },
    });
  }

  async function handleEmail() {
    setError("");

    if (mode === "signup") {
      const { data, error } = await supabase.auth.signUp(
        { email, password },
        { redirectTo: window.location.origin + "/auth/callback" }
      );

      if (error) return setError(error.message);

      await fetch("http://localhost:4000/auth/set-role", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: data.user.id, role }),
      });

      alert("Check your email to confirm your account.");
      return;
    }

    if (mode === "login") {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) return setError(error.message);

      navigate("/dashboard");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white font-serif relative">

      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-6 left-6 text-sm text-neutral-600 hover:text-neutral-900"
      >
        ← Back
      </button>

      <div className="w-[420px] bg-white border border-neutral-200 rounded-md p-10">

        {/* Logo */}
        <div className="flex items-center justify-center mb-8">
          <img
            src="/assets/logo_demeter.webp"
            alt="Demeter"
            className="w-10 h-10 mr-3 object-contain"
          />
          <h1 className="text-xl font-semibold text-neutral-900">
            DEMETER
          </h1>
        </div>

        <h2 className="text-center text-lg font-semibold text-neutral-900 mb-6">
          {mode === "login" ? "Sign in to your account" : "Create a new account"}
        </h2>

        <button
          onClick={handleGoogle}
          className="w-full border border-neutral-300 text-neutral-800 py-2.5 rounded-md mb-5 hover:bg-neutral-50 transition"
        >
          Continue with Google
        </button>

        <div className="flex items-center my-6">
          <div className="flex-grow border-t border-neutral-200"></div>
          <span className="mx-3 text-xs text-neutral-400">OR</span>
          <div className="flex-grow border-t border-neutral-200"></div>
        </div>

        {mode === "signup" && (
          <select
            className="w-full border border-neutral-300 px-3 py-2.5 rounded-md mb-4 text-sm"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="exporter">Exporter / Importer</option>
            <option value="qa">QA Inspector</option>
          </select>
        )}

        <input
          type="email"
          className="w-full border border-neutral-300 px-3 py-2.5 rounded-md mb-4 text-sm"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="w-full border border-neutral-300 px-3 py-2.5 rounded-md mb-4 text-sm"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && (
          <p className="text-sm text-neutral-700 mb-4">
            {error}
          </p>
        )}

        <button
          onClick={handleEmail}
          className="w-full bg-neutral-900 text-white py-2.5 rounded-md mb-6 hover:bg-neutral-800 transition"
        >
          {mode === "login" ? "Continue" : "Create account"}
        </button>

        <p className="text-center text-sm text-neutral-600">
          {mode === "login" ? (
            <>
              Don’t have an account?{" "}
              <span
                className="underline cursor-pointer"
                onClick={() => setMode("signup")}
              >
                Sign up
              </span>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <span
                className="underline cursor-pointer"
                onClick={() => setMode("login")}
              >
                Login
              </span>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
