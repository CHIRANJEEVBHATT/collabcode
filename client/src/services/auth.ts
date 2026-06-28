const BASE_URL = "http://localhost:5000";

export async function login(username: string, password: string) {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  const data = await res.json();

  if (!res.ok) throw new Error(data.message || "Failed to login");

  // store token and user
  if (data.token) localStorage.setItem("token", data.token);
  if (data.user) localStorage.setItem("user", JSON.stringify(data.user));

  return data;
}

export async function register(username: string, password: string, email?: string) {
  const res = await fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password, email }),
  });

  const data = await res.json();

  if (!res.ok) throw new Error(data.message || "Failed to register");

  if (data.token) localStorage.setItem("token", data.token);
  if (data.user) localStorage.setItem("user", JSON.stringify(data.user));

  return data;
}

export async function me() {
  const token = localStorage.getItem("token");

  if (!token) throw new Error("No token");

  const res = await fetch(`${BASE_URL}/auth/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  const data = await res.json();

  if (!res.ok) {
    // clear invalid token
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    throw new Error(data.message || "Not authenticated");
  }

  if (data.user) localStorage.setItem("user", JSON.stringify(data.user));

  return data.user;
}

export function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
}
