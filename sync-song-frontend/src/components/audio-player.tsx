"use client";

import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import useAudioPlayer from "@/hooks/use-audio-player";
import { formatTime } from "@/lib/time";
import useAudioPlayerStore from "@/stores/audio-player-store";
import { Pause, Play, SkipBack, SkipForward } from "lucide-react";

export function AudioPlayer() {
  const {
    audioRef,
    buffered,
    currentTime,
    isPlaying,
    songDuration,
    handleCurrentTimeChange,
    handleIsPlayingToggle,
  } = useAudioPlayer();

  const song = useAudioPlayerStore((state) => state.currentSong);

  return (
    <div className="rounded-xl bg-black/30 p-6 backdrop-blur-lg">
      <audio ref={audioRef} src={song?.url} preload="metadata" />

      <div className="flex flex-col items-center gap-6 md:flex-row">
        <div className="w-full max-w-48 flex-shrink-0 overflow-hidden rounded-lg bg-purple-700">
          <img
            src={"/placeholder.svg"}
            alt={`${song?.embeddedMetadata?.Title} cover`}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="flex flex-1 flex-col w-full gap-4">
          <div className="flex flex-col gap-2 text-center md:text-left">
            <h2 className="text-2xl font-bold text-white">
              {song?.embeddedMetadata?.Title ?? "-"}
            </h2>
            <p className="text-purple-200">{song?.embeddedMetadata?.Artist ?? "Desconocido"}</p>
          </div>

          <div className="flex flex-col relative gap-2">
            {/* Barra de buffering (atrás del slider) */}
            <div className="absolute left-0 h-2 z-20 w-full pointer-events-none">
              <div
                className="h-full rounded-full bg-purple-400/30"
                style={{ width: `${(buffered / (songDuration || 1)) * 100}%` }}
              />
            </div>

            {/* Slider real */}
            <Slider
              value={[currentTime]}
              max={songDuration || 100}
              step={1}
              onValueChange={handleCurrentTimeChange}
              className="relative z-10"
            />

            <div className="flex justify-between text-xs text-purple-200">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(songDuration)}</span>
            </div>
          </div>

          <div className="flex items-center justify-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/10"
              aria-label="Anterior canción"
            >
              <SkipBack className="size-6" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-12 w-12 rounded-full bg-white text-purple-900 hover:bg-purple-600"
              onClick={handleIsPlayingToggle}
              disabled={!song}
              aria-label={isPlaying ? "Pausar" : "Reproducir"}
            >
              {isPlaying ? (
                <Pause className="size-6" />
              ) : (
                <Play className="size-6 ml-0.5" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/10"
              aria-label="Siguiente canción"
            >
              <SkipForward className="size-6" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
