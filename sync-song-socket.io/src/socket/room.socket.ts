import { Socket } from "socket.io";
import { ROOM_EVENTS, ROOM_PREFIX } from "../constants/socket";
import { redis } from "../config/redis";
import { generateRoomId } from "../lib/room";
import {
  CreateRoomPayload,
  JoinRoomPayload,
  LeaveRoomPayload,
  RoomResponse,
  RoomState,
  UpdateRoomPayload,
} from "../types/room";

export const createRoom = (socket: Socket) => {
  socket.on(
    ROOM_EVENTS.CREATE,
    async (
      { userName }: CreateRoomPayload,
      callback?: (response: RoomResponse) => void
    ) => {
      let roomId = generateRoomId();
      let key = `${ROOM_PREFIX}${roomId}`;
      let exists = await redis.get(key);

      while (exists) {
        roomId = generateRoomId();
        key = `${ROOM_PREFIX}${roomId}`;
        exists = await redis.get(key);
      }

      const roomState: RoomState = {
        id: roomId,
        queue: [],
        users: [{ name: userName }],
        isPlaying: false,
        currentSong: null,
        currentTime: 0,
        createdBy: userName,
        createdAt: Date.now(),
      };

      await redis.set(key, JSON.stringify(roomState), { EX: 3600 });
      socket.join(roomId);
      callback?.({ success: true, room: roomState });
      // socket.emit(ROOM_EVENTS.SYNC, roomState);
    }
  );
};

export const joinRoom = (socket: Socket) => {
  socket.on(
    ROOM_EVENTS.JOIN,
    async (
      { roomId, userName }: JoinRoomPayload,
      cb?: (response: RoomResponse) => void
    ) => {
      const key = `${ROOM_PREFIX}${roomId}`;
      const data = await redis.get(key);
      if (!data) return cb?.({ error: "No se encontró la sala" });

      const room: RoomState = JSON.parse(data);
      const alreadyIn = room.users.some((u) => u.name === userName);

      if (!alreadyIn) {
        room.users.push({ name: userName });
      }

      await redis.set(key, JSON.stringify(room), { EX: 3600 });
      socket.join(roomId);
      // currentRoom = roomId;
      cb?.({ success: true, room });
    }
  );
};

export const updateRoom = (socket: Socket) => {
  socket.on(
    ROOM_EVENTS.UPDATE,
    async ({ roomId, state }: UpdateRoomPayload) => {
      await redis.set(`${ROOM_PREFIX}${roomId}`, JSON.stringify(state), {
        EX: 3600,
      });
      socket.to(roomId).emit(ROOM_EVENTS.SYNC, state);
    }
  );
};

export const leaveRoom = (socket: Socket) => {
  socket.on(
    ROOM_EVENTS.LEAVE,
    async ({ roomId, userName }: LeaveRoomPayload) => {
      const key = `${ROOM_PREFIX}${roomId}`;
      const data = await redis.get(key);
      if (!data) return;

      const room: RoomState = JSON.parse(data);
      room.users = room.users.filter((u) => u.name !== userName);

      await redis.set(key, JSON.stringify(room), { EX: 3600 });
      socket.leave(roomId);
    }
  );
};
