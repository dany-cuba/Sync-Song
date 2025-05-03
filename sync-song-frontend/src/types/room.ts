export interface RoomState {
  id: string;
  queue: any[]; // Replace `any` with a specific type if you know the structure of the queue items
  users: { name: string }[];
  isPlaying: boolean;
  currentSong: any | null; // Replace `any` with a specific type if you know the structure of the song
  currentTime: number;
  createdBy: string;
  createdAt: number;
}
