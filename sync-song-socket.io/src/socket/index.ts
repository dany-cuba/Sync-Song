import { Server } from "socket.io";
import { userPing } from "./user.socket";
import { createRoom, joinRoom, updateRoom } from "./room.socket";
import { changeSong, pauseAudio, playAudio } from "./audio.socket";

export const setupSocket = (io: Server) => {
  io.on("connection", (socket) => {
    console.log(`🎧 New client connected: ${socket.id}`);

    // Handle user events
    userPing(socket);

    // Handle room events
    createRoom(socket);
    joinRoom(socket);
    updateRoom(socket);

    // Handle audio events
    playAudio(socket);
    pauseAudio(socket);
    changeSong(socket);

    socket.on("disconnect", () => {
      console.log(`🚪 Client disconnected: ${socket.id}`);
    });
  });
};
