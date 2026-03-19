const mongoose = require("mongoose");

const InspectionSchema = new mongoose.Schema({
  structured: Object,
  ocr: Object,
  submittedAt: Date,
  status: String
});

module.exports = mongoose.model("Inspection", InspectionSchema);
