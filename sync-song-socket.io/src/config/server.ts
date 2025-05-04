import express from "express";
import cors from "cors";
import { createServer, Server as NativeServer } from "http";
import { DefaultEventsMap, Server as SocketServer } from "socket.io";
import { HOST, PORT } from "./env.config";
import { ServerConfig } from "../types/server";
import { setupSocket } from "../socket";

class Server implements ServerConfig {
  host: string;
  port: number;
  app: express.Application;
  server: NativeServer;
  io: SocketServer<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>;

  constructor() {
    this.host = HOST;
    this.port = Number(PORT);
    this.app = express();
    this.server = createServer(this.app);
    this.io = new SocketServer(this.server, {
      cors: {
        origin: "*",
      },
    });

    this.middlewares();
    this.socket();
    this.routes();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.static("public"));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  socket() {
    setupSocket(this.io);
  }

  routes() {
    // room routes
    // this.app.use("/room", RoomRouter);

    this.app.get("/", (req, res) => {
      res.status(200).send("Hello, world!");
    });

    this.app.get("/", (req, res) => {
      res.status(404).send("404 Not Found");
    });
  }

  listen() {
    this.server.listen(this.port, () => {
      console.log(`🚀 Server running on port: ${this.port}`);
    });
  }
}

export default Server;
