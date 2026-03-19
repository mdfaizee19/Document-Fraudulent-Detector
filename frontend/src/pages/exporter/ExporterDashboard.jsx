import { useEffect, useState } from "react";
import axios from "axios";

export default function ExporterDashboard() {
  const [verified, setVerified] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/exporters/verified")
      .then((res) => setVerified(res.data));
  }, []);

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold">Verified Exporters</h1>

      <div className="mt-6 space-y-4">
        {verified.map((item) => (
          <div key={item.id} className="border p-4 rounded shadow">
            <p><b>Name:</b> {item.structured.exporter.name}</p>
            <p><b>Product:</b> {item.structured.shipment.productName}</p>

            {item.qr_url && (
              <img
                src={item.qr_url}
                alt="QR Code"
                className="mt-3 w-32 h-32"
              />
            )}
          </div>
        ))}

        {verified.length === 0 && (
          <p className="text-gray-600">No verified exporters yet.</p>
        )}
      </div>
    </div>
  );
}
