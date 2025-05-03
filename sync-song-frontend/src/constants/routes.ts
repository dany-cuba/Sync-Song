export const ROUTES = {
  home: "/",
  createRoom: "/room/create",
  joinRoom: "/room/join",
  room: (roomId: string) => `/room/${roomId}`,
};
