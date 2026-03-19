// backend/src/routes/authRoutes.js
const express = require("express");
const router = express.Router();
const { supabase } = require("../supabase");

router.post("/set-role", async (req, res) => {
  const { userId, role } = req.body;

  if (!userId || !role)
    return res.status(400).json({ error: "Missing fields" });

  await supabase
    .from("users")
    .upsert({ id: userId, role }, { onConflict: "id" });

  return res.json({ success: true, role });
});

router.get("/get-role/:id", async (req, res) => {
  const { id } = req.params;

  const { data } = await supabase
    .from("users")
    .select("role")
    .eq("id", id)
    .single();

  return res.json({ role: data?.role || null });
});

module.exports = router;
