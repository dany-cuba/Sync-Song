"use client";

import { ROOM_EVENTS } from "@/constants/socket";
import { RoomState } from "@/types/room";
import { RoomResponse } from "@/types/socket";
import { Socket } from "socket.io-client";

export const createRoom = (
  socket: Socket,
  payload: { userName: string }
): Promise<{ room?: RoomState; msg: string }> => {
  const { userName } = payload;

  return new Promise((resolve, reject) => {
    socket.emit(ROOM_EVENTS.CREATE, { userName }, (response: RoomResponse) => {
      if (response.error) {
        return reject(new Error(response.error));
      }

      resolve({
        room: response.room,
        msg: "Sala creada con éxito",
      });
    });
  });
};


export const joinRoom = async (
  socket: Socket,
  payload: { roomId: string; userName: string }
): Promise<{ msg: string }> => {
  const { roomId, userName } = payload;

  await new Promise<void>((resolve, reject) => {
    socket.emit(
      ROOM_EVENTS.JOIN,
      { roomId, userName },
      (response: RoomResponse) => {
        if (response.error) {
          return reject(new Error(response.error));
        }
        resolve();
      }
    );
  });

  return { msg: "Te has unido a la sala" };
};

