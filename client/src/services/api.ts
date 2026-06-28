const BASE_URL = "http://localhost:5000";

async function request<T>(url: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${BASE_URL}${url}`, options);

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