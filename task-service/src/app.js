const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const taskRoutes = require("./routes/taskRoutes");

const app = express();
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected (Task Service)"))
  .catch(console.error);

app.use("/tasks", taskRoutes); // ← REQUIRED

app.listen(4002, () => {
  console.log("Task Service running on port 4002");
});
