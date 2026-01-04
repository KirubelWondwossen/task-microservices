const express = require("express");
const axios = require("axios");
const Task = require("../models/Task");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

/**
 * POST /tasks
 * Create task → AI decides difficulty
 */
router.post("/", authMiddleware, async (req, res) => {
  const { title, description } = req.body;

  if (!title || !description) {
    return res.status(400).json({ message: "Missing fields" });
  }

  try {
    // 🔥 Call AI Service
    const aiResponse = await axios.post("http://localhost:4003/analyze", {
      description,
    });

    const difficulty = aiResponse.data.difficulty;

    const task = await Task.create({
      title,
      description,
      difficulty,
      owner: req.user.username,
    });

    res.status(201).json(task);
  } catch (err) {
    console.error("Task creation error:", err.message);
    res.status(500).json({ message: "Failed to create task" });
  }
});

router.get("/", authMiddleware, async (req, res) => {
  const tasks = await Task.find({ owner: req.user.username });
  res.json(tasks);
});

module.exports = router;
