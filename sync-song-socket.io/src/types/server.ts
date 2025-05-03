import express from "express";
import { Server } from "http";
import { Server as SocketServer } from "socket.io";

export interface ServerConfig {
  url: string;
  port: number;
  app: express.Application;
  server: Server;
  io: SocketServer;
}
