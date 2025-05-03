import { useEffect, useRef, useState } from "react";

const useAudioPlayer = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [songDuration, setSongDuration] = useState(0);
  const [buffered, setBuffered] = useState(0);

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
    setIsPlaying((prev) => !prev);
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
