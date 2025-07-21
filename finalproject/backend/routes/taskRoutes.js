import express from "express";
import Task from "../models/Task.js";

const router = express.Router();

// Create Task
router.post("/", async (req, res) => {
  try {
    const task = new Task(req.body);
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: "Failed to create task", details: error.message });
  }
});

// Get All Tasks
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch tasks", details: error.message });
  }
});

// Toggle Complete / Update Status
router.patch("/:id/toggle", async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ error: "Task not found" });

    task.status = task.status === "completed" ? "todo" : "completed";
    await task.save();

    res.json(task);
  } catch (err) {
    res.status(500).json({ error: "Toggle failed", details: err.message });
  }
});

// Edit Task
router.put("/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!task) return res.status(404).json({ error: "Task not found" });

    res.json(task);
  } catch (err) {
    res.status(500).json({ error: "Update failed", details: err.message });
  }
});

// Delete Task
router.delete("/:id", async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Task deleted" });
  } catch (err) {
    res.status(500).json({ error: "Delete failed", details: err.message });
  }
});

export default router;
