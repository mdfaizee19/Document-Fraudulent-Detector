const fs = require("fs");
const path = require("path");

function saveInspection(structured, ocr) {
  const dir = path.join(__dirname, "../../data/inspections");
  const filePath = path.join(dir, "llm_result.json");

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  const payload = {
    structured,
    ocr,
    savedAt: new Date().toISOString(),
  };

  fs.writeFileSync(filePath, JSON.stringify(payload, null, 2));

  return { filePath };
}

module.exports = saveInspection;
