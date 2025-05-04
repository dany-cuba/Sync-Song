import { RoomState } from "./room";

export interface RoomResponse {
  success?: boolean;
  error?: string;
  room?: RoomState;
}