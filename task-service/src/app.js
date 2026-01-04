const express = require("express");
const app = express();

app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ status: "Task Service running" });
});

app.listen(4002, () => {
  console.log("Task Service on port 4002");
});
