import React, { useEffect, useState } from "react";

const API_BASE = "https://crptotask.onrender.com/api"; // or http://localhost:5000/api for local

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // Fetch tasks from MongoDB
  useEffect(() => {
    fetch(`${API_BASE}/tasks`)
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch((err) => console.error("Failed to fetch tasks:", err));
  }, []);

  // Handle form submission to add task
  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;

    const newTask = { title, description, status: "todo" };

    try {
      const res = await fetch(`${API_BASE}/tasks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTask),
      });

      const savedTask = await res.json();
      setTasks([savedTask, ...tasks]); // Add new task to top
      setTitle(""); // Reset form
      setDescription("");
    } catch (err) {
      console.error("Failed to add task:", err);
    }
  };

  return (
    <div className="max-w-xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">📝 Add a Task</h2>

      <form onSubmit={handleAddTask} className="space-y-4 mb-8">
        <input
          type="text"
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-2 border rounded"
        />
        <textarea
          placeholder="Task description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-4 py-2 border rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Task
        </button>
      </form>

      <h2 className="text-xl font-semibold mb-4">📋 Task List</h2>

      {tasks.length === 0 ? (
        <p>No tasks found.</p>
      ) : (
        <ul className="space-y-3">
          {tasks.map((task) => (
            <li key={task._id} className="border p-4 rounded shadow">
              <strong>{task.title}</strong>
              <p>{task.description}</p>
              <p className="text-sm text-gray-500">Status: {task.status}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskManager;
