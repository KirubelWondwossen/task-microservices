const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

const tasks = [];

router.post("/", authMiddleware, (req, res) => {
  const { title, description } = req.body;

  const task = {
    id: tasks.length + 1,
    title,
    description,
    owner: req.user.username,
  };

  tasks.push(task);
  res.status(201).json(task);
});

// Get user tasks (protected)
router.get("/", authMiddleware, (req, res) => {
  const userTasks = tasks.filter((task) => task.owner === req.user.username);
  res.json(userTasks);
});

module.exports = router;
