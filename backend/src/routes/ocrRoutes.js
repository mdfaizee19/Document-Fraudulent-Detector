// src/routes/ocrRoutes.js
const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const { processAllDocuments } = require("../services/ocrService");
const { extractStructuredJSON } = require("../services/extractionService");
const { supabase } = require("../supabase");

// -----------------------------
// UPLOAD + OCR + SAVE TO DB
// -----------------------------
router.post(
  "/upload-all",
  upload.fields([
    { name: "commercialInvoice", maxCount: 1 },
    { name: "packingList", maxCount: 1 },
    { name: "phytosanitaryCertificate", maxCount: 1 },
    { name: "certificateOfOrigin", maxCount: 1 },
    { name: "productTestReport", maxCount: 1 },
    { name: "exporterDeclaration", maxCount: 1 },
    { name: "evidence", maxCount: 1 }
  ]),
  async (req, res) => {
    try {
      // -------------------------------
      // 1. Validate exporter
      // -------------------------------
      const exporterId = req.body.exporterId;
      console.log("BODY RECEIVED:", req.body);

      if (!exporterId) {
        return res.status(400).json({ error: "Missing exporterId" });
      }

      // -------------------------------
      // 2. OCR extraction
      // -------------------------------
      const ocrOutput = await processAllDocuments(req.files);
      console.log("OCR DONE");

      // -------------------------------
      // 3. LLM structured extraction
      // -------------------------------
      const structured = JSON.parse(
        await extractStructuredJSON(JSON.stringify(ocrOutput))
      );

      // -------------------------------
      // 4. Save into Supabase
      // -------------------------------
      const { data, error } = await supabase
        .from("export_submissions")
        .insert({
          exporter_id: exporterId,
          structured,
          ocr: ocrOutput,
          status: "PENDING",
          submitted_at: new Date().toISOString()
        })
        .select()
        .single();

      if (error) {
        console.log(error);
        return res.status(500).json({ error: "DB insert failed" });
      }

      // -------------------------------
      // 5. Return success
      // -------------------------------
      return res.json({
        success: true,
        submissionId: data.id
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Upload failed" });
    }
  }
);

module.exports = router;
