const express = require("express");
const router = express.Router(); // ✅ THIS WAS MISSING
const { supabase } = require("../supabase");
const QRCode = require("qrcode");

// ---------------------------------------------
// GET PENDING SUBMISSIONS ONLY
// ---------------------------------------------
router.get("/list", async (req, res) => {
  const { data, error } = await supabase
    .from("export_submissions")
    .select("*")
    .eq("status", "PENDING")
    .order("submitted_at", { ascending: false });

  if (error) return res.status(500).json({ error });
  res.json(data);
});

// ---------------------------------------------
// GET DETAILS BY ID
// ---------------------------------------------
router.get("/:id", async (req, res) => {
  const { data, error } = await supabase
    .from("export_submissions")
    .select("*")
    .eq("id", req.params.id)
    .single();

  if (error) return res.status(500).json({ error });
  res.json(data);
});

// ---------------------------------------------
// APPROVE SUBMISSION → GENERATE QR
// ---------------------------------------------
router.post("/approve", async (req, res) => {
  const { id } = req.body;
  if (!id) return res.status(400).json({ error: "Missing submission ID" });

  const vc_hash = "hash_" + id.slice(0, 8);
  const tx_hash = "tx_" + id.slice(0, 8);

  const qrPayload = `${process.env.FRONTEND_URL}/verify?id=${id}`;
  const qrPng = await QRCode.toBuffer(qrPayload);

  const fileName = `qr/${id}.png`;

  const { error: uploadErr } = await supabase.storage
    .from("demeter")
    .upload(fileName, qrPng, {
      contentType: "image/png",
      upsert: true,
    });

  if (uploadErr) {
    return res.status(500).json({ error: "QR upload failed" });
  }

  const qr_url =
    process.env.SUPABASE_URL +
    "/storage/v1/object/public/demeter/" +
    fileName;

  const { error: updateErr } = await supabase
    .from("export_submissions")
    .update({
      status: "APPROVED",
      vc_hash,
      tx_hash,
      qr_url,
    })
    .eq("id", id);

  if (updateErr) return res.status(500).json({ error: updateErr });

  res.json({ success: true, qr_url });
});

module.exports = router;
