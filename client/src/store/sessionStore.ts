type SessionState = {
  username: string;
  roomId: string;
  isConnected: boolean;

  setUsername: (username: string) => void;
  setRoomId: (roomId: string) => void;
  setConnected: (connected: boolean) => void;
  clearSession: () => void;
};