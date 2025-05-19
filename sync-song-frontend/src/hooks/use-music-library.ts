"use client";

import useAudioPlayerStore from "@/stores/audio-player-store";
import { Song } from "@/types/audio";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export const useMusicLibrary = () => {
  const [musicLibrary, setMusicLibrary] = useState<Song[]>([]);
  const [loading, setLoading] = useState(true);

  const setCurrentSong = useAudioPlayerStore((state) => state.setCurrentSong);

  useEffect(() => {
    const fetchMusicLibrary = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/song");

        if (!response.ok) {
          throw new Error("Error fetching music library");
        }

        const data: Song[] = await response.json();

        setMusicLibrary(data);
        if (data.length > 0) {
          setCurrentSong(data[0]); // Set the first song as the current song
        }
      } catch (error) {
        console.error("Error fetching music library:", error);
        toast.error("Error al obtener la biblioteca de música");
      } finally {
        setLoading(false);
      }
    };

    fetchMusicLibrary();
  }, []);

  return { musicLibrary, loading };
};
