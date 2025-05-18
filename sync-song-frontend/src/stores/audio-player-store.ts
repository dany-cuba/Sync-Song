import { Song } from "@/types/audio";
import { create } from "zustand";

interface AudioPlayerStore {
  currentSong: Song | null;
  isPlaying: boolean;
  play: (song: Song) => void;
  pause: () => void;
  stop: () => void;
}

const useAudioPlayerStore = create<AudioPlayerStore>((set) => ({
  currentSong: null,
  isPlaying: false,
  play: (song) => set({ currentSong: song, isPlaying: true }),
  pause: () => set({ isPlaying: false }),
  stop: () => set({ currentSong: null, isPlaying: false }),
}));

export default useAudioPlayerStore;
