const express = require("express");
require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

app.post("/analyze", async (req, res) => {
  const { description } = req.body;

  if (!description) {
    return res.status(400).json({ message: "Description required" });
  }

  try {
    const prompt = `
Classify the difficulty of the following task as exactly one word:
Easy, Medium, or Hard.

Task:
"${description}"

Respond with only one word.
`;

    const result = await model.generateContent(prompt);
    const text = result.response.text().trim();

    let difficulty = "Easy";
    if (text.includes("Hard")) difficulty = "Hard";
    else if (text.includes("Medium")) difficulty = "Medium";

    res.json({ difficulty });
  } catch (err) {
    console.error("Gemini error:", err.message);
    res.json({ difficulty: "Medium" }); // fallback
  }
});

app.get("/health", (req, res) => {
  res.json({ status: "AI Service running with Gemini" });
});

app.listen(4003, () => {
  console.log("AI Service running on port 4003");
});
