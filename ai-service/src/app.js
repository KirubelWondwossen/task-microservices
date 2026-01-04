const express = require("express");
require("dotenv").config();

const app = express();
app.use(express.json());

app.post("/analyze", async (req, res) => {
  const { description } = req.body;

  if (!description) {
    return res.status(400).json({ message: "Description required" });
  }

  // TEMP LOGIC (we'll replace with Gemini next)
  let difficulty = "Easy";
  if (description.length > 100) difficulty = "Medium";
  if (description.length > 200) difficulty = "Hard";

  res.json({ difficulty });
});

app.get("/health", (req, res) => {
  res.json({ status: "AI Service running" });
});

app.listen(4003, () => {
  console.log("AI Service running on port 4003");
});
