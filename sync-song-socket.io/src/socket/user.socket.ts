import { Socket } from "socket.io";

type PingData = { msg: string };
type PingResponse = { msg: string };

export const userPing = (socket: Socket) => {
  socket.on("ping", (data: PingData, cb?: (res: PingResponse) => void) => {
    console.log("ping received:", data);
    cb?.({ msg: "pong" });
    socket.emit("pong", { msg: "pong" });
  });
};
