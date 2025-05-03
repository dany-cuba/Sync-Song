import { RoomState } from "./room";

export interface CreateRoomResponse {
  success?: boolean;
  error?: string;
  room?: RoomState;
}