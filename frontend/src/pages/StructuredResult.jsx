import TrustBadge from "../components/TrustBadge";

export default function StructuredResult({ data }) {
  const s = data.structured;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Exporter Document Summary</h1>

      <TrustBadge score={s.trustScore} />

      <section>
        <h2>Inspection</h2>
        <p><strong>ID:</strong> {s.inspectionId}</p>
        <p><strong>Status:</strong> {s.status}</p>
        <p><strong>Submitted At:</strong> {s.submittedAt}</p>
      </section>

      <section>
        <h2>Exporter Information</h2>
        <p><strong>Name:</strong> {s.exporter.name}</p>
        <p><strong>Address:</strong> {s.exporter.address}</p>
        <p><strong>Exporter ID:</strong> {s.exporter.exporterId}</p>
        <p><strong>Contact:</strong> {s.exporter.contact}</p>
      </section>

      <section>
        <h2>Shipment Details</h2>
        <p><strong>HS Code:</strong> {s.shipment.hsCode}</p>
        <p><strong>Product Name:</strong> {s.shipment.productName}</p>
        <p><strong>Batch Number:</strong> {s.shipment.batchNumber}</p>
        <p><strong>Lot Numbers:</strong> {s.shipment.lotNumbers.join(", ")}</p>
        <p><strong>Quantity (kg):</strong> {s.shipment.quantityKg}</p>
        <p><strong>Destination:</strong> {s.shipment.destinationCountry}</p>
        <p><strong>Expected Ship Date:</strong> {s.shipment.expectedShipDate}</p>
      </section>

      <section>
        <h2>Documents</h2>
        {Object.entries(s.documents).map(([doc, obj]) => (
          <div key={doc} style={{ marginBottom: "20px" }}>
            <h3>{doc}</h3>
            <p><strong>File:</strong> {obj.fileUrl}</p>
            <p><strong>Hash:</strong> {obj.sha256}</p>
            {obj.fields &&
  Object.entries(obj.fields).map(([k, v]) => (

              <p key={k}><strong>{k}:</strong> {v}</p>
            ))}
          </div>
        ))}
      </section>

      <section>
        <h2>Evidence Photos</h2>
        {s.evidence?.photos?.length > 0 &&
  s.evidence.photos.map((p, i) => (

          <div key={i}>
            <p><strong>Photo URL:</strong> {p.fileUrl}</p>
            <p><strong>Hash:</strong> {p.sha256}</p>
            <p><strong>Timestamp:</strong> {p.exif.timestamp}</p>
            <p><strong>GPS:</strong> {p.exif.gps}</p>
          </div>
        ))}
      </section>
      <button
  onClick={async () => {
    await fetch("http://localhost:4000/inspection/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    alert("Submitted for QA inspection");
  }}
  style={{
    marginTop: "20px",
    background: "green",
    color: "white",
    padding: "12px 24px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer"
  }}
>
  Submit for QA Review
</button>

    </div>
  );
}
