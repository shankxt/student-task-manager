const express = require("express");
const {
  createTask,
  getAllTasks,
  getTaskByID,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");
const router = express.Router();

router.post("/", createTask);
router.get("/", getAllTasks);
router.get("/:id", getTaskByID);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

module.exports = router;
