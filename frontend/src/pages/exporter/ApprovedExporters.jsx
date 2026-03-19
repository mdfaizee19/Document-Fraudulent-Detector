import { useEffect, useState } from "react";
import ExporterNavbar from "../../components/ExporterNavbar";
import axios from "axios";

export default function ApprovedExporters() {
  const [list, setList] = useState([]);
  const [q, setQ] = useState("");

  useEffect(() => {
    axios.get("http://localhost:4000/qa/exporters/verified")
      .then(res => setList(res.data));
  }, []);

  const filtered = list.filter(e =>
    e.structured?.exporter?.name?.toLowerCase().includes(q.toLowerCase())
  );

  return (
    <div>
      <ExporterNavbar />

      <div className="p-10">
        <h2 className="text-2xl font-bold mb-4">Approved Exporters</h2>

        <input
          placeholder="Search exporter..."
          className="border p-2 mb-6 w-80"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />

        <div className="grid grid-cols-3 gap-6">
          {filtered.map((e) => (
            <div key={e.id} className="border p-4 rounded shadow">
              <h3 className="font-bold">
                {e.structured.exporter.name}
              </h3>
              <p className="text-sm text-gray-600">Certified Exporter</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
