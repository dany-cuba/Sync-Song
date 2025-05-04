type AudioPayload = {
  userName: string;
  roomId: string;
  songId: string;
  currentTime: number;
  isPlaying: boolean;
};

type AudioResponse = {
  success: boolean;
  error?: string;
};


export { AudioPayload, AudioResponse };
