const express = require("express");
const router = express.Router();
const { supabase } = require("../supabase");

// ------------------------------------------------------------
// GET /exporter/my/:id → list my submissions
// ------------------------------------------------------------
router.get("/my/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from("export_submissions")
      .select("id, structured, status, vc_hash, tx_hash, qr_url, submitted_at")
      .eq("exporter_id", id);

    if (error) throw error;

    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch" });
  }
});

// ------------------------------------------------------------
// GET /exporter/verified → show all verified exporters
// ------------------------------------------------------------
router.get("/verified", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("export_submissions")
      .select("id, structured, qr_url, tx_hash")
      .eq("status", "VERIFIED");

    if (error) throw error;

    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to load verified exporters" });
  }
});

module.exports = router;
