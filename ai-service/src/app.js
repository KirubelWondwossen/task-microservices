const express = require("express");
require("dotenv").config();
const axios = require("axios");

const app = express();
app.use(express.json());

app.post("/analyze", async (req, res) => {
  const { description } = req.body;

  if (!description) {
    return res.status(400).json({ message: "Description required" });
  }

  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [
              {
                text: `
Classify the difficulty of the following task as exactly one word:
Easy, Medium, or Hard.

Task:
"${description}"

Respond with only one word.
`,
              },
            ],
          },
        ],
      }
    );

    const text = response.data.candidates[0].content.parts[0].text.trim();

    let difficulty = "Easy";
    if (text.includes("Hard")) difficulty = "Hard";
    else if (text.includes("Medium")) difficulty = "Medium";

    res.json({ difficulty });
  } catch (err) {
    console.error("Gemini error:", err.response?.data || err.message);
    res.json({ difficulty: "Medium" }); // safe fallback
  }
});

app.get("/health", (req, res) => {
  res.json({ status: "AI Service running (Gemini 2.5 Flash)" });
});

app.listen(4003, () => {
  console.log("AI Service running on port 4003");
});
