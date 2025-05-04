interface RoomState {
  id: string;
  queue: any[]; // Replace `any` with a specific type if you know the structure of the queue items
  users: { name: string }[];
  isPlaying: boolean;
  currentSong: any | null; // Replace `any` with a specific type if you know the structure of the song
  currentTime: number;
  createdBy: string;
  createdAt: number;
}

interface RoomResponse {
  success?: boolean;
  error?: string;
  room?: RoomState;
}

interface CreateRoomPayload {
  userName: string;
}

interface JoinRoomPayload {
  roomId: string;
  userName: string;
}

interface UpdateRoomPayload {
  roomId: string;
  state: Partial<RoomState>;
}

interface LeaveRoomPayload {
  roomId: string;
  userName: string;
}

export {
  RoomState,
  CreateRoomPayload,
  JoinRoomPayload,
  RoomResponse,
  UpdateRoomPayload,
  LeaveRoomPayload,
};
