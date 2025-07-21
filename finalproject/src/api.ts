const API_BASE = "https://crptotask.onrender.com";

// Create
export const addTask = async (task: { title: string; description: string }) => {
  const res = await fetch(`${API_BASE}/tasks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  });
  return res.json();
};

// Read
export const getTasks = async () => {
  const res = await fetch(`${API_BASE}/tasks`);
  return res.json();
};

// Update
export const updateTask = async (id: string, updates: any) => {
  const res = await fetch(`${API_BASE}/tasks/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updates),
  });
  return res.json();
};

// Toggle
export const toggleTaskStatus = async (id: string) => {
  const res = await fetch(`${API_BASE}/tasks/${id}/toggle`, {
    method: "PATCH",
  });
  return res.json();
};

// Delete
export const deleteTask = async (id: string) => {
  const res = await fetch(`${API_BASE}/tasks/${id}`, {
    method: "DELETE",
  });
  return res.json();
};
