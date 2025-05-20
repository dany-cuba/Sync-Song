import { Song } from "@/types/audio";
import { Socket } from "socket.io-client";
import { create } from "zustand";

interface AudioPlayerStore {
  currentSong: Song | null;
  isPlaying: boolean;
  currentTime: number;
  buffered: number;
  error: string | null;
  setCurrentSong: (song: Song) => void;
  setIsPlaying: (isPlaying: boolean) => void;
  setCurrentTime: (time: number) => void;
  setBuffered: (value: number) => void;
}

const useAudioPlayerStore = create<AudioPlayerStore>((set) => ({
  currentSong: null,
  isPlaying: false,
  currentTime: 0,
  buffered: 0,
  error: null,
  setCurrentSong: (song) => {
    set({ currentSong: song, currentTime: 0, buffered: 0 });
  },
  setIsPlaying: (isPlaying) => set({ isPlaying }),
  setCurrentTime: (time) => set({ currentTime: time }),
  setBuffered: (value) => set({ buffered: value }),
}));

export default useAudioPlayerStore;
