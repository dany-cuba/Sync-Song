import { Socket } from "socket.io";
import { AUDIO_EVENTS } from "../constants/socket";
import { AudioPayload, AudioResponse } from "../types/audio";

export const playAudio = (socket: Socket) => {
  socket.on(
    AUDIO_EVENTS.PLAY,
    (payload: AudioPayload, callback?: (response: AudioResponse) => void) => {
      const { roomId } = payload;

      // check if the user is in the room
      if (!socket.rooms.has(roomId)) {
        return callback?.({ success: false, error: "No estás en la sala" });
      }

      // Emit the play event to all users in the room
      socket.broadcast.to(roomId).emit(AUDIO_EVENTS.PLAY, "Playing audio");

      // Call the callback function to acknowledge the event
      callback?.({ success: true });
    }
  );
};

export const pauseAudio = (socket: Socket) => {
  socket.on(
    AUDIO_EVENTS.PAUSE,
    (payload: AudioPayload, callback?: (response: AudioResponse) => void) => {
      const { roomId } = payload;

      // check if the user is in the room
      if (!socket.rooms.has(roomId)) {
        return callback?.({ success: false, error: "No estás en la sala" });
      }

      // Emit the pause event to all users in the room
      socket.broadcast.to(roomId).emit(AUDIO_EVENTS.PAUSE, "Pausing audio");

      // Call the callback function to acknowledge the event
      callback?.({ success: true });
    }
  );
}
