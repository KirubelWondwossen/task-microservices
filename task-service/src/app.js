require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");

const taskRoutes = require("./routes/taskRoutes");

const app = express();

connectDB();

app.use(express.json());
app.use("/tasks", taskRoutes);

app.get("/health", (req, res) => {
  res.json({ status: "Task Service running" });
});

app.listen(4002, () => {
  console.log("Task Service running on port 4002");
});
