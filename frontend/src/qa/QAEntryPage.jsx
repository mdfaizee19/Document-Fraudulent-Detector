import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function QAEntryPage() {
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [pass, setPass] = useState("");

  function handleLogin() {
    if (id.length > 0 && pass.length > 0) {
      navigate("/qa");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white font-serif">
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

        <h2 className="text-center text-lg font-semibold text-neutral-900 mb-2">
          QA Inspector Access
        </h2>

        <p className="text-center text-sm text-neutral-600 mb-8">
          Authorized inspectors only. All access attempts are logged.
        </p>

        <input
          className="w-full border border-neutral-300 px-3 py-2.5 rounded-md mb-4 text-sm"
          placeholder="Inspector ID"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />

        <input
          className="w-full border border-neutral-300 px-3 py-2.5 rounded-md mb-6 text-sm"
          placeholder="Password"
          type="password"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
        />

        <button
          className="w-full bg-neutral-900 text-white py-2.5 rounded-md hover:bg-neutral-800 transition"
          onClick={handleLogin}
        >
          Continue
        </button>
      </div>
    </div>
  );
}
