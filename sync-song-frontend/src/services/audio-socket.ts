"use client";

import { AUDIO_EVENTS } from "@/constants/socket";
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
