"use client";

import { pauseAudio, playAudio } from "@/services/audio-socket";
import { useParams } from "next/navigation";
import { useEffect, useRef } from "react";
import { useSocket } from "./use-socket";
import { toast } from "sonner";
import { useSocketListener } from "./use-socket-listener";
import { AUDIO_EVENTS } from "@/constants/socket";
import useAudioPlayerStore from "@/stores/audio-player-store";
import { useMusicLibrary } from "./use-music-library";

const useAudioPlayer = () => {
  const params = useParams();
  const roomId = params.id as string;

  const audioRef = useRef<HTMLAudioElement>(null);
  const socket = useSocket();
  const { getSongById } = useMusicLibrary();

  const {
    isPlaying,
    setIsPlaying,
    currentSong,
    currentTime,
    setCurrentTime,
    setBuffered,
    setCurrentSong,
  } = useAudioPlayerStore();

  // Socket listeners
  useSocketListener(socket, AUDIO_EVENTS.PLAY, (_) => {
    setIsPlaying(true);
  });

  useSocketListener(socket, AUDIO_EVENTS.PAUSE, (_) => {
    setIsPlaying(false);
  });

  useSocketListener(socket, AUDIO_EVENTS.CHANGE_SONG, (songId: string) => {
    const song = getSongById(songId);
    if (song) {
      setCurrentSong(song);
    }
  });

  // Event listeners
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    const updateBuffered = () => {
      if (audio.buffered.length > 0) {
        const end = audio.buffered.end(audio.buffered.length - 1);
        setBuffered(end);
      }
    };

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("progress", updateBuffered);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("progress", updateBuffered);
    };
  }, []);

  // Reproducir / Pausar según el estado global
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentSong) return;

    if (isPlaying) {
      audio.play().catch((error) => {
        console.error("Error al reproducir:", error);
        setIsPlaying(false);
      });
    } else {
      audio.pause();
    }
  }, [isPlaying, currentSong]);

  // Si el currentTime en la store cambia, lo reflejas
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (Math.abs(audio.currentTime - currentTime) > 1) {
      audio.currentTime = currentTime;
    }
  }, [currentTime]);

  const handleIsPlayingToggle = () => {
    if (!audioRef.current?.duration) return toast.error("No hay canción");
    if (!socket) return toast.error("Sin conexión");

    if (audioRef.current.paused) {
      playAudio(socket, roomId);
      setIsPlaying(true);
    } else {
      pauseAudio(socket, roomId);
      setIsPlaying(false);
    }
  };

  return {
    audioRef,
    currentSong,
    isPlaying,
    currentTime,
    handleIsPlayingToggle,
  };
};

export default useAudioPlayer;
