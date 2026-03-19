export default function TrustBadge({ score }) {
  let color = "gray";
  let label = "UNKNOWN";

  if (score >= 85) {
    color = "green";
    label = "HIGH TRUST";
  } else if (score >= 60) {
    color = "orange";
    label = "MEDIUM TRUST";
  } else {
    color = "red";
    label = "LOW TRUST";
  }

  return (
    <div
      style={{
        padding: "10px 20px",
        background: color,
        color: "white",
        display: "inline-block",
        borderRadius: "6px",
        marginBottom: "20px",
        fontWeight: "bold"
      }}
    >
      {label} ({score})
    </div>
  );
}
