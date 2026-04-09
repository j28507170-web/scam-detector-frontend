const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// ✅ ROOT CHECK
app.get("/", (req, res) => {
  res.json({
    message: "Scam Detector Backend Running ✅",
    status: "active",
    version: "1.0.0"
  });
});

// ✅ SCAN API (MAIN FIX)
app.post("/api/scan", (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ message: "URL required" });
  }

  // fake AI scoring (temporary working logic)
  const score = Math.floor(Math.random() * 100);

  let risk = "Low";
  if (score > 70) risk = "High";
  else if (score > 40) risk = "Medium";

  return res.json({
    score,
    risk,
    message: `Analysis complete for ${url}`
  });
});

// ❌ 404 HANDLER (IMPORTANT)
app.use((req, res) => {
  res.status(404).json({
    error: "Endpoint not found",
    path: req.originalUrl,
    method: req.method
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});