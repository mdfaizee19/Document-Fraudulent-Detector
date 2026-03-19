import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function ExporterProfile() {
  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:4000/qa/${id}`)
      .then(res => setData(res.data));
  }, [id]);

  if (!data) return <p className="p-10">Loading…</p>;

  const s = data.structured;

  return (
    <div className="p-10 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold">{s.exporter.name}</h1>
      <p className="text-gray-600">Certified Exporter</p>

      <div className="mt-6">
        <h2 className="font-semibold">Shipment</h2>
        <p>{s.shipment.productName}</p>
        <p>{s.shipment.quantityKg} kg</p>
      </div>

      {data.qr_url && (
        <div className="mt-6 text-center">
          <img src={data.qr_url} className="w-48 mx-auto" />
          <p className="text-sm mt-2">Verifiable Credential</p>
        </div>
      )}
    </div>
  );
}
