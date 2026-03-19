import { useNavigate } from "react-router-dom";

export default function SelectRolePage() {
  const navigate = useNavigate();

  function chooseRole(role) {
    localStorage.setItem("role", role);

    if (role === "qa") {
      navigate("/qa-entry");
    } else {
      navigate("/dashboard");
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
          Select your role
        </h2>

        <p className="text-center text-sm text-neutral-600 mb-8">
          Choose how you will interact with the Demeter verification system.
        </p>

        <button
          onClick={() => chooseRole("exporter")}
          className="w-full border border-neutral-900 text-neutral-900 py-3 rounded-md mb-4 hover:bg-neutral-100 transition"
        >
          Exporter / Importer
        </button>

        <button
          onClick={() => chooseRole("qa")}
          className="w-full border border-neutral-300 text-neutral-800 py-3 rounded-md hover:bg-neutral-100 transition"
        >
          QA Inspector
        </button>
      </div>
    </div>
  );
}
