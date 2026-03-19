import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

export default function VerifyVC() {
  const [params] = useSearchParams();
  const id = params.get("id");
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:4000/qa/${id}`)
      .then(res => setData(res.data));
  }, [id]);

  if (!data) return <p className="p-10">Verifying…</p>;

  return (
    <div className="p-10 text-center">
      <h1 className="text-3xl font-bold">Credential Verified ✅</h1>

      <p className="mt-3 font-semibold">
        Exporter: {data.structured.exporter.name}
      </p>

      <p>Status: {data.status}</p>

      <pre className="mt-6 bg-gray-100 p-4 text-left max-w-3xl mx-auto rounded">
        {JSON.stringify(data.structured, null, 2)}
      </pre>
    </div>
  );
}
