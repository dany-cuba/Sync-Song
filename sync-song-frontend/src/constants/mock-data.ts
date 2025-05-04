const env = process.env.NODE_ENV || "development";

// Datos de ejemplo
const mockSongs = [
  {
    id: 1,
    title: "Riri",
    artist: "Young Miko",
    cover: "/placeholder.svg?height=40&width=40",
    src:
      env === "production"
        ? "https://7baz7ly5c7.ufs.sh/f/O3tllwcIS2Rubf9oQB4ndmVcuqPbSWgph3e0tDK24izoZXs8"
        : "/music/Young Miko - Riri.mp3",
  },
  {
    id: 2,
    title: "Lisa",
    artist: "Young Miko",
    cover: "/placeholder.svg?height=40&width=40",
    src:
      env === "production"
        ? "https://7baz7ly5c7.ufs.sh/f/O3tllwcIS2Ru4cBQD1OqiJltO0RInd9fK8bgMXQA1WkcT4Hj"
        : "/music/Young Miko - Lisa.mp3",
  },
];

const mockMembers = [
  {
    id: 1,
    name: "Carlos",
    avatar: "/placeholder.svg?height=40&width=40",
    isHost: true,
  },
  { id: 2, name: "María", avatar: "/placeholder.svg?height=40&width=40" },
  { id: 3, name: "Juan", avatar: "/placeholder.svg?height=40&width=40" },
  { id: 4, name: "Ana", avatar: "/placeholder.svg?height=40&width=40" },
];

export { mockSongs, mockMembers };
