"use client";

import { pauseAudio, playAudio } from "@/services/audio-socket";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useSocket } from "./use-socket";
import { toast } from "sonner";
import { useSocketListener } from "./use-socket-listener";
import { AUDIO_EVENTS } from "@/constants/socket";

const useAudioPlayer = () => {
  const params = useParams();
  const roomId = params.id as string;

  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [songDuration, setSongDuration] = useState(0);
  const [buffered, setBuffered] = useState(0);

  const socket = useSocket();

  useSocketListener(socket, AUDIO_EVENTS.PLAY, (data) => {
    setIsPlaying(true);
  });

  useSocketListener(socket, AUDIO_EVENTS.PAUSE, (data) => {
    setIsPlaying(false);
  });

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Configurar eventos
    const handleDurationChange = () => {
      setSongDuration(audio.duration);
    };

    const setAudioTime = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    const updateBuffered = () => {
      if (!audio) return;

      if (audio.buffered.length > 0) {
        const end = audio.buffered.end(audio.buffered.length - 1);
        setBuffered(end);
      }
    };

    // Agregar event listeners
    audio.addEventListener("durationchange", handleDurationChange);
    audio.addEventListener("timeupdate", setAudioTime);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("progress", updateBuffered);

    // 👇 Chequear si la metadata ya está lista
    if (audio.readyState >= 1) {
      setSongDuration(audio.duration);
    }

    // Cleanup
    return () => {
      audio.removeEventListener("loadeddata", handleDurationChange);
      audio.removeEventListener("timeupdate", setAudioTime);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("progress", updateBuffered);
    };
  }, []);

  // Efecto para manejar la reproducción/pausa
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.play().catch((error) => {
        console.error("Error al reproducir:", error);
        setIsPlaying(false);
      });
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  // Efecto para manejar cambios en el tiempo actual
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (Math.abs(audio.currentTime - currentTime) > 1) {
      audio.currentTime = currentTime;
    }
  }, [currentTime]);

  const handleCurrentTimeChange = (value: number[]) => {
    setCurrentTime(value[0]);
  };

  const handleIsPlayingToggle = () => {
    if (!audioRef.current || !audioRef.current.duration)
      return toast.error("No hay canción en reproducción");

    if (!socket) return toast.error("No hay conexión al servidor");

    // check if the audio is already playing
    if (audioRef.current.paused) {
      try {
        playAudio(socket, roomId);
        setIsPlaying((prev) => !prev);
      } catch (error) {
        return toast.error("Error al reproducir la música");
      }
    } else {
      try {
        pauseAudio(socket, roomId);
        setIsPlaying((prev) => !prev);
      } catch (error) {
        return toast.error("Error al pausar la música");
      }
    }
  };

  return {
    audioRef,
    isPlaying,
    currentTime,
    songDuration,
    buffered,
    handleCurrentTimeChange,
    handleIsPlayingToggle,
  };
};

export default useAudioPlayer;
