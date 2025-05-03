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

const ROOM_PREFIX = "room:";

export { SOCKET_EVENTS, ROOM_EVENTS, ROOM_PREFIX };
