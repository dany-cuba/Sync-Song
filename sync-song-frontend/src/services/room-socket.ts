"use client";

import { ROOM_EVENTS } from "@/constants/socket";
import { RoomState } from "@/types/room";
import { RoomResponse } from "@/types/socket";
import { Socket } from "socket.io-client";

export const createRoom = (
  socket: Socket,
  payload: { userName: string }
): { room?: RoomState; msg: string } => {
  const { userName } = payload;
  let room: RoomState | undefined;

  socket.emit(ROOM_EVENTS.CREATE, { userName }, (response: RoomResponse) => {
    if (response.error) {
      throw new Error(response.error);
    }
    const { room: roomResponse } = response;
    room = roomResponse;
  });

  return { room, msg: "Sala creada con éxito" };
};

export const joinRoom = (
  socket: Socket,
  payload: { roomId: string; userName: string }
): { msg: string } => {
  const { roomId, userName } = payload;

  // Emitir evento de unión a la sala
  socket.emit(
    ROOM_EVENTS.JOIN,
    { roomId, userName },
    (response: RoomResponse) => {
      if (response.error) {
        throw new Error(response.error);
      }
    }
  );

  return { msg: "Te has unido a la sala" };
};
