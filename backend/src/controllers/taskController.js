const Task = require("../models/Task");

const createTask = async (req, res) => {
  try {
    const { title, description, priority, status } = req.body;

    const existingTask = await Task.findOne({ title });

    if (existingTask) {
      return res.status(409).json({
        success: false,
        msg: "This task title already exists",
      });
    }

    if (!title || !title.trim()) {
      return res.status(409).json({
        success: false,
        msg: "title should not be empty",
      });
    }

    const task = await Task.create({
      title,
      description,
      priority,
      status,
    });

    res.status(201).json({
      success: true,
      msg: "Task created successfully",
      data: task,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      msg: "Internal server error",
      err: err.message,
    });
  }
};

const getTaskByID = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({
        success: false,
        msg: "Task not found",
      });
    }
    return res.status(200).json({
      success: true,
      msg: "Task fetched successfully",
      data: task,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      msg: "Internal server error",
      error: err.message,
    });
  }
};

const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({});

    return res.status(200).json({
      success: true,
      msg: "Tasks fetched successfully",
      data: tasks,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      msg: "Internal server error",
      error: err.message,
    });
  }
};

const updateTask = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedTask = await Task.findByIdAndUpdate(id, req.body, {
      returnDocument: "after",
      runValidators: true,
    });
    if (!updatedTask) {
      return res.status(404).json({
        success: false,
        msg: "Task not found",
      });
    }
    return res.status(200).json({
      success: true,
      msg: "Task updated successfully",
      data: updatedTask,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      msg: "Internal server error",
      err: err.message,
    });
  }
};

const patchTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

   
    if (!["pending", "completed"].includes(status)) {
      return res.status(400).json({
        success: false,
        msg: "Status must be pending or completed",
      });
    }

    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { status: status },
      { returnDocument: "after", runValidators: true },
    );

   
    if (!updatedTask) {
      return res.status(404).json({
        success: false,
        msg: "Task not found",
      });
    }

    return res.status(200).json({
      success: true,
      msg: "Task updated successfully",
      data: updatedTask,
      
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      msg: "Internal server error",
      err: err.message,
    });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findByIdAndDelete(id);

    if (!task) {
      return res.status(404).json({
        success: false,
        msg: "Task not found",
      });
    }
    return res.status(200).json({
      success: true,
      msg: "Task deleted successfully",
      data: task,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      msg: "Internal server error",
      err: err.message,
    });
  }
};

module.exports = {
  createTask,
  getAllTasks,
  getTaskByID,
  updateTask,
  deleteTask,
};
