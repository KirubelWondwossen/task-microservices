const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    difficulty: { type: String, required: true },
    owner: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", taskSchema);
