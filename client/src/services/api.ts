const BASE_URL = "http://localhost:5000";

async function request<T>(url: string, options?: RequestInit): Promise<T> {
  const token = localStorage.getItem("token");

  const headers = new Headers(options?.headers as HeadersInit || {});

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const response = await fetch(`${BASE_URL}${url}`, {
    ...options,
    headers,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
}

export function createRoom(roomId: string, owner: string) {
  return request("/rooms", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      roomId,
      owner,
    }),
  });
}

export function getRoom(roomId: string) {
  return request(`/rooms/${roomId}`);
}

export function getRoomHistory(roomId: string) {
  return request(`/room-history/${roomId}`);
}

export function saveRoomHistory(roomId: string, latestCode: string, language = "javascript") {
  return request(`/room-history`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ roomId, latestCode, language }),
  });
}