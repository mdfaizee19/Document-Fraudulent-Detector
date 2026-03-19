import { useState } from "react";
import { supabase } from "../supabase";
import axios from "axios";

/* ---------------- ICONS (STYLE-ONLY ADJUSTED) ---------------- */

const FileIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-6 h-6 text-neutral-600"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
    <polyline points="14 2 14 8 20 8" />
  </svg>
);

const CheckIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-4 h-4 text-neutral-700"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const UploadIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-5 h-5 text-neutral-400"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="17 8 12 3 7 8" />
    <line x1="12" x2="12" y1="3" y2="15" />
  </svg>
);

/* ---------------- UPLOAD CARD ---------------- */

const UploadCard = ({ field, onFileChange, file }) => {
  const isUploaded = !!file;

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files?.[0]) {
      onFileChange(field.key, e.dataTransfer.files[0]);
    }
  };

  return (
    <div
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
      className={`bg-white border rounded-md p-6 flex flex-col items-center justify-center font-serif transition-colors
        ${
          isUploaded
            ? "border-neutral-400"
            : "border-neutral-200 hover:border-neutral-400"
        }`}
    >
      <FileIcon />

      <h3 className="mt-3 text-sm font-semibold text-neutral-800 text-center">
        {field.label}
      </h3>

      <div
        className={`mt-4 w-full p-4 border border-dashed rounded-md cursor-pointer text-center text-sm
          ${
            isUploaded
              ? "border-neutral-400 bg-neutral-50"
              : "border-neutral-300 hover:bg-neutral-50"
          }`}
        onClick={() =>
          document.getElementById(`file-upload-${field.key}`).click()
        }
      >
        <input
          id={`file-upload-${field.key}`}
          type="file"
          className="hidden"
          onChange={(e) =>
            e.target.files?.[0] && onFileChange(field.key, e.target.files[0])
          }
        />

        {isUploaded ? (
          <div className="flex items-center justify-center gap-2 text-neutral-700">
            <CheckIcon />
            <span className="truncate">{file.name}</span>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-1 text-neutral-500">
            <UploadIcon />
            <span>Click or drop document</span>
          </div>
        )}
      </div>
    </div>
  );
};

/* ---------------- MAIN PAGE ---------------- */

export default function UploadPage() {
  const [files, setFiles] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fields = [
    { key: "commercialInvoice", label: "Commercial Invoice" },
    { key: "packingList", label: "Packing List" },
    { key: "phytosanitaryCertificate", label: "Phytosanitary Certificate" },
    { key: "certificateOfOrigin", label: "Certificate of Origin" },
    { key: "productTestReport", label: "Product Test Report" },
    { key: "exporterDeclaration", label: "Exporter Declaration" },
    { key: "evidence", label: "Evidence (Photos)" },
  ];

  const handleFileChange = (key, file) => {
    setFiles((prev) => ({ ...prev, [key]: file }));
  };

  const handleSubmit = async () => {
    setError("");

    const { data } = await supabase.auth.getUser();
    if (!data?.user?.id) {
      setError("User not logged in");
      return;
    }

    if (!fields.every((f) => files[f.key])) {
      setError("Please upload all required documents.");
      return;
    }

    const form = new FormData();
    Object.entries(files).forEach(([k, v]) => form.append(k, v));
    form.append("exporterId", data.user.id);

    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:4000/ocr/upload-all",
        form,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (res.data.success) {
        setFiles({});
        setError("Documents submitted successfully.");
      } else {
        setError("Upload failed.");
      }
    } catch {
      setError("Upload failed.");
    }

    setLoading(false);
  };

  const allFilesSelected = fields.every((f) => files[f.key]);

  return (
    <div className="min-h-screen bg-white p-8 font-serif relative">
      {/* BACK BUTTON */}
      <button
        onClick={() => window.history.back()}
        className="absolute top-6 left-6 text-sm text-neutral-600 underline"
      >
        ← Back
      </button>

      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-semibold text-center text-neutral-900 mb-10">
          Upload Export Documents
        </h1>

        {error && (
          <div className="mb-6 text-center text-sm text-neutral-700 border border-neutral-300 p-3 rounded-md">
            {error}
          </div>
        )}

        <div className="flex flex-col items-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {fields.slice(0, 4).map((f) => (
              <UploadCard
                key={f.key}
                field={f}
                onFileChange={handleFileChange}
                file={files[f.key]}
              />
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl">
            {fields.slice(4).map((f) => (
              <UploadCard
                key={f.key}
                field={f}
                onFileChange={handleFileChange}
                file={files[f.key]}
              />
            ))}
          </div>
        </div>

        <div className="text-center mt-12">
          <button
            disabled={!allFilesSelected || loading}
            onClick={handleSubmit}
            className={`px-10 py-3 rounded-md text-sm font-semibold border transition
              ${
                allFilesSelected
                  ? "border-neutral-700 text-neutral-900 hover:bg-neutral-100"
                  : "border-neutral-300 text-neutral-400 cursor-not-allowed"
              }`}
          >
            {loading ? "Submitting…" : "Submit Documents"}
          </button>
        </div>
      </div>
    </div>
  );
}
