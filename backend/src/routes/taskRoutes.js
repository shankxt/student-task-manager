const express = require("express");
const {
  createTask,
  getAllTasks,
  getTaskByID,
  updateTask,
  deleteTask,
  patchTask,
} = require("../controllers/taskController");
const router = express.Router();

router.post("/", createTask);
router.get("/", getAllTasks);
router.get("/:id", getTaskByID);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);
router.patch("/:id", patchTask);

module.exports = router;
