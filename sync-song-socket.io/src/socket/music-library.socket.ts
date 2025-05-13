import { Socket } from "socket.io";
import { MUSIC_LIBRARY_EVENTS } from "../constants/socket";
import { redis } from "../config/redis";
import { MusicLibraryData, Song } from "../types/music-library";

export const sendMusicLibrary = async (socket: Socket) => {
  // get and emit the music library
  const data = await redis.get("songs");
  if (!data) {
    socket.emit(MUSIC_LIBRARY_EVENTS.SYNC, {
      error: "No se encontró la biblioteca de música",
    });

    return;
  }

  const songs: Song[] = JSON.parse(data);

  const musicLibraryData: MusicLibraryData = {
    songs,
  };
  socket.emit(MUSIC_LIBRARY_EVENTS.SYNC, musicLibraryData);
};
