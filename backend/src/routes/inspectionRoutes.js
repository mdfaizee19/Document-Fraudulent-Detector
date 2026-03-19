const express = require("express");
const router = express.Router();
const saveInspection = require("../middleware/saveInspection");

router.post("/submit", async (req, res) => {
  try {
    const { structured, ocr } = req.body;

    if (!structured) {
      return res.status(400).json({ error: "Missing structured data" });
    }

    const { filePath } = saveInspection(structured, ocr);

    res.json({
      success: true,
      message: "LLM result saved successfully",
      savedTo: filePath
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not save inspection" });
  }
});

module.exports = router;
