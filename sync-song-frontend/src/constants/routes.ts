export const ROUTES = {
  home: "/",
  createRoom: "/room/create",
  joinRoom: "/room/join",
  uploadMusic: "/upload",
  room: (roomId: string) => `/room/${roomId}`,
};
