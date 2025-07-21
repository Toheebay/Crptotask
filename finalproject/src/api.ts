const API_BASE = "https://crptotask.onrender.com"; // change when deploying

export const testAPI = async () => {
  const res = await fetch(`${API_BASE}/test`);
  const data = await res.json();
  return data;
};
