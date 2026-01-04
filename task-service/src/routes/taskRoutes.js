const express = require("express");
const axios = require("axios");
const authMiddleware = require("../middleware/authMiddleware");
const Task = require("../models/Task");

const router = express.Router();

// Create task (protected)
router.post("/", authMiddleware, async (req, res) => {
  const { title, description } = req.body;

  try {
    // Call AI Service
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
    console.error(err.message);
    res.status(500).json({ message: "Task creation failed" });
  }
});

router.get("/", authMiddleware, async (req, res) => {
  const tasks = await Task.find({ owner: req.user.username });
  res.json(tasks);
});

module.exports = router;
