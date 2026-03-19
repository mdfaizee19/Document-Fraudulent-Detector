// backend/src/services/ocrService.js

const Tesseract = require("tesseract.js");
const fs = require("fs");
const imageHash = require("image-hash");

// ----- OCR -----
async function runOCR(filePath) {
  try {
    const { data } = await Tesseract.recognize(filePath, "eng");
    return data.text || "";
  } catch (err) {
    console.error("OCR ERROR:", err);
    return "";
  }
}

// ----- FRAUD CHECK -----
function getImageHash(filePath) {
  return new Promise((resolve) => {
    imageHash(filePath, 16, true, (err, data) => {
      if (err) resolve("hash_error");
      else resolve(data);
    });
  });
}

async function fraudCheck(filePath) {
  try {
    if (!fs.existsSync(filePath)) {
      return { score: 100, hash: "err", suspicious: true };
    }

    const ext = filePath.split(".").pop().toLowerCase();

    // Skip hashing for PDFs → they are not images
    if (ext === "pdf") {
      return {
        score: 10, // low fraud score for PDF
        hash: "pdf_skipped",
        suspicious: false
      };
    }

    const stats = fs.statSync(filePath);
    const sizeKB = stats.size / 1024;

    let fraudScore = 0;

    // basic size check
    if (sizeKB < 20) fraudScore += 10;

    // run hash ONLY for valid image types
    const hashVal = await getImageHash(filePath).catch(() => "hash_error");

    if (hashVal === "hash_error") fraudScore += 10;

    return {
      score: fraudScore,
      hash: hashVal,
      suspicious: fraudScore > 40
    };
  } catch (err) {
    return { score: 100, hash: "err", suspicious: true };
  }
}


// ----- MAIN -----
async function processAllDocuments(files) {

  const docs = {
    commercialInvoice: files.commercialInvoice?.[0]?.path,
    packingList: files.packingList?.[0]?.path,
    phytosanitaryCertificate: files.phytosanitaryCertificate?.[0]?.path,
    certificateOfOrigin: files.certificateOfOrigin?.[0]?.path,
    productTestReport: files.productTestReport?.[0]?.path,
    exporterDeclaration: files.exporterDeclaration?.[0]?.path,
    evidence: files.evidence?.[0]?.path
  };

  console.log("Received files:", docs);

  const output = {};

  const textDocs = [
    "commercialInvoice",
    "packingList",
    "phytosanitaryCertificate",
    "certificateOfOrigin",
    "productTestReport",
    "exporterDeclaration"
  ];

  // ---- PROCESS ALL TEXT DOCUMENTS ----
  for (let key of textDocs) {
    const filePath = docs[key];

    if (!filePath || !fs.existsSync(filePath)) {
      output[key] = { text: "", fraud: { score: 100, suspicious: true } };
      continue;
    }

    const text = await runOCR(filePath);
    const fraud = await fraudCheck(filePath);

    output[key] = { text, fraud };
  }

  // ---- PROCESS EVIDENCE (FRAUD ONLY) ----
  const evidencePath = docs.evidence;

  const evidenceFraud =
    evidencePath && fs.existsSync(evidencePath)
      ? await fraudCheck(evidencePath)
      : { score: 100, suspicious: true };

  output.evidence = { fraud: evidenceFraud };

  return output;
}

module.exports = { processAllDocuments };
