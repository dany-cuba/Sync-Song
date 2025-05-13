const SOCKET_EVENTS = {
  CONNECT: "connection",
  DISCONNECT: "disconnect",
};

const ROOM_EVENTS = {
  CREATE: "room:create",
  JOIN: "room:join",
  UPDATE: "room:update",
  SYNC: "room:sync",
  LEAVE: "room:leave",
  USERS: "room:users",
};

const AUDIO_EVENTS = {
  PLAY: "audio:play",
  PAUSE: "audio:pause",
  SEEK: "audio:seek",
  VOLUME: "audio:volume",
  TIME_UPDATE: "audio:timeupdate",
  ENDED: "audio:ended",
};

const MUSIC_LIBRARY_EVENTS = {
  SYNC: "library:sync",
}

const ROOM_PREFIX = "room:";

export { SOCKET_EVENTS, ROOM_EVENTS, ROOM_PREFIX, AUDIO_EVENTS, MUSIC_LIBRARY_EVENTS };
