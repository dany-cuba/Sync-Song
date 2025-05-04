import express from "express";
import { Server } from "http";
import { Server as SocketServer } from "socket.io";

export interface ServerConfig {
  host: string;
  port: number;
  app: express.Application;
  server: Server;
  io: SocketServer;
}
