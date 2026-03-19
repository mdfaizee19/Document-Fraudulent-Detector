import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function QAReview() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/qa/${id}`)
      .then(res => setData(res.data))
      .catch(() => alert("Failed to load submission"));
  }, [id]);

  const approve = async () => {
    await axios.post("http://localhost:4000/qa/approve", { id });
    navigate("/qa");
  };

  if (!data) {
    return (
      <div className="p-10 font-serif text-neutral-600">
        Loading inspection record…
      </div>
    );
  }

  const s = data.structured;

  return (
    <div className="min-h-screen bg-white font-serif">

      {/* Header */}
      <div className="border-b border-neutral-200">
        <div className="max-w-5xl mx-auto px-10 py-6 flex items-center justify-between">
          <div className="flex items-center">
            <img
              src="/assets/logo_demeter.webp"
              alt="Demeter"
              className="w-9 h-9 mr-3 object-contain"
            />
            <h1 className="text-xl font-semibold text-neutral-900">
              Inspection Review
            </h1>
          </div>

          <button
            onClick={() => navigate(-1)}
            className="text-sm text-neutral-600 hover:text-neutral-900"
          >
            ← Back
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-10 py-10">

        {/* Trust Score */}
        <section className="mb-10">
          <h2 className="text-lg font-semibold text-neutral-900 mb-2">
            Trust Score
          </h2>

          <div className="w-full bg-neutral-200 h-2 rounded">
            <div
              className="bg-neutral-900 h-2 rounded"
              style={{ width: `${s.trustScore}%` }}
            />
          </div>

          <p className="mt-2 text-sm text-neutral-600">
            Score: <span className="font-medium">{s.trustScore}</span> / 100
          </p>

          <p className="mt-1 text-xs text-neutral-500">
            Trust score is a system-generated indicator and does not replace manual inspection.
          </p>
        </section>

        {/* Exporter */}
        <section className="mb-10">
          <h2 className="text-lg font-semibold text-neutral-900 mb-3">
            Exporter Details
          </h2>

          <div className="border border-neutral-200 rounded-md p-6 text-sm space-y-2">
            <p>
              <span className="text-neutral-500">Name:</span>{" "}
              <span className="font-medium text-neutral-800">{s.exporter.name}</span>
            </p>
            <p>
              <span className="text-neutral-500">Address:</span>{" "}
              <span className="text-neutral-800">{s.exporter.address}</span>
            </p>
            <p>
              <span className="text-neutral-500">Contact:</span>{" "}
              <span className="text-neutral-800">{s.exporter.contact}</span>
            </p>
          </div>
        </section>

        {/* Shipment */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-neutral-900 mb-3">
            Shipment Details
          </h2>

          <div className="border border-neutral-200 rounded-md p-6 text-sm space-y-2">
            <p>
              <span className="text-neutral-500">Product:</span>{" "}
              <span className="text-neutral-800">{s.shipment.productName}</span>
            </p>
            <p>
              <span className="text-neutral-500">HS Code:</span>{" "}
              <span className="text-neutral-800">{s.shipment.hsCode}</span>
            </p>
            <p>
              <span className="text-neutral-500">Quantity:</span>{" "}
              <span className="text-neutral-800">{s.shipment.quantityKg} kg</span>
            </p>
            <p>
              <span className="text-neutral-500">Destination:</span>{" "}
              <span className="text-neutral-800">{s.shipment.destinationCountry}</span>
            </p>
          </div>
        </section>

        {/* Approval */}
        <div className="border-t border-neutral-200 pt-8 flex justify-end">
          <button
            onClick={approve}
            className="bg-neutral-900 text-white px-6 py-3 rounded-md text-sm hover:bg-neutral-800 transition"
          >
            Approve & Issue Verifiable Credential
          </button>
        </div>
      </div>
    </div>
  );
}
