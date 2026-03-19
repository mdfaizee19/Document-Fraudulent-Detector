import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function QALoginPage() {
  const [id, setId] = useState("");
  const [pass, setPass] = useState("");
  const navigate = useNavigate();

  function login() {
    navigate("/qa");
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl w-96 shadow">
        <h1 className="text-xl font-semibold mb-5 text-center">
          QA Inspector Login
        </h1>

        <input
          className="w-full border p-2 rounded mb-3"
          placeholder="Inspector ID"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />

        <input
          type="password"
          className="w-full border p-2 rounded mb-3"
          placeholder="Password"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
        />

        <button
          onClick={login}
          className="w-full bg-black text-white py-2 rounded"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
