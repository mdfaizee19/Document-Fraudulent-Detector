require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { createClient } = require("@supabase/supabase-js");

// ----------------------------------------------------
// INITIALIZE EXPRESS FIRST (IMPORTANT)
// ----------------------------------------------------
const app = express();
app.use(cors());
app.use(express.json());

// ----------------------------------------------------
// SUPABASE CLIENT — now SAFE to attach to app.locals
// ----------------------------------------------------
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

app.locals.supabase = supabase;

// ----------------------------------------------------
// ROUTES
// ----------------------------------------------------
app.use("/exporter", require("./routes/exporterRoutes"));
app.use("/qa", require("./routes/qaRoutes"));
app.use("/inspection", require("./routes/inspectionRoutes"));
app.use("/ocr", require("./routes/ocrRoutes"));
app.use("/auth", require("./routes/authRoutes"));
// ----------------------------------------------------
// START SERVER
// ----------------------------------------------------
app.listen(4000, () => console.log("Backend running on port 4000"));
