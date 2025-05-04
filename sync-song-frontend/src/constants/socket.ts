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

export { ROOM_EVENTS, AUDIO_EVENTS };