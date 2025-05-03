import { Server } from "socket.io";
import { userPing } from "./user.socket";
import { createRoom, joinRoom, updateRoom } from "./room.socket";

export const setupSocket = (io: Server) => {
  io.on("connection", (socket) => {
    console.log(`🎧 New client connected: ${socket.id}`);

    // Handle user events
    userPing(socket);

    // Handle room events
    createRoom(socket);
    joinRoom(socket);
    updateRoom(socket);

    socket.on("disconnect", () => {
      console.log(`🚪 Client disconnected: ${socket.id}`);
    });

    // socket.on(SOCKET_EVENTS.DISCONNECT, async () => {
    //   console.log("👋 Usuario desconectado");

    //   if (!currentRoom) return;

    //   setTimeout(async () => {
    //     const room = io.sockets.adapter.rooms.get(currentRoom!);
    //     const userCount = room ? room.size : 0;

    //     if (userCount === 0) {
    //       console.log(`🧹 Sala ${currentRoom} vacía, eliminando estado...`);
    //       await redis.del(`${ROOM_PREFIX}${currentRoom}`);
    //     }
    //   }, 100);
    // });
  });
};
