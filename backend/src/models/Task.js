const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
    },

    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "Medium",
    },

    status: {
      type: String,
      enum: ["pending", "completed"],
      default: "Pending",
    },
  },
  { timestamps: true },
);

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
