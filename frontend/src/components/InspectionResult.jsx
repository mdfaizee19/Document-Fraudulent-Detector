import { useState } from "react";
import axios from "axios";

export default function InspectionResult({ data }) {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async () => {
    try {
      await axios.post("http://localhost:4000/inspection/submit", {
        structured: data.structured, // THIS IS THE LLM OUTPUT
        ocr: data.ocr                // optional but useful
      });

      setSubmitted(true);
    } catch (err) {
      console.error(err);
      alert("Submit failed");
    }
  };

  if (submitted) return <h2>Submitted Successfully</h2>;

  return (
    <div>
      <h2>Inspection Output</h2>

      {/* Render clean form-like inspection details */}
      <pre style={{ textAlign: "left", marginTop: "20px" }}>
        {JSON.stringify(data.structured, null, 2)}
      </pre>

      <button 
        onClick={handleSubmit}
        style={{ marginTop: "20px", padding: "10px 20px" }}
      >
        Approve & Submit
      </button>
    </div>
  );
}
