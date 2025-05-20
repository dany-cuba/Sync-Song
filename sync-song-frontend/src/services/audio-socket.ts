"use client";

import { AUDIO_EVENTS } from "@/constants/socket";
import { Song } from "@/types/audio";
import { Socket } from "socket.io-client";

type AudioResponse = {
  success: boolean;
  error?: string;
};

export const playAudio = (socket: Socket, roomId: string): void => {
  socket.emit(AUDIO_EVENTS.PLAY, { roomId }, (response: AudioResponse) => {
    if (!response.success) {
      throw new Error(response.error || "Error al reproducir la música");
    }
  });
};

export const pauseAudio = (socket: Socket, roomId: string): void => {
  socket.emit(AUDIO_EVENTS.PAUSE, { roomId }, (response: AudioResponse) => {
    if (!response.success) {
      throw new Error(response.error || "Error al pausar la música");
    }
  });
};

export const changeSong = (socket: Socket, roomId: string, song: Song) => {
  socket.emit(
    AUDIO_EVENTS.CHANGE_SONG,
    { roomId, songId: song.fileId },
    (response: AudioResponse) => {
      if (!response.success) {
        throw new Error(response.error || "Error al cambiar la canción");
      } 
    }
  );
};
