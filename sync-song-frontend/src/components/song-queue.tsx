"use client";

import { useSocket } from "@/hooks/use-socket";
import { cn } from "@/lib/utils";
import { changeSong } from "@/services/audio-socket";
import useAudioPlayerStore from "@/stores/audio-player-store";
import { Song } from "@/types/audio";
import { Music } from "lucide-react";
import { useParams } from "next/navigation";
import { toast } from "sonner";

const SongQueueItem = ({ song }: { song: Song }) => {
  const socket = useSocket();
  const params = useParams();
  const roomId = params.id as string;

  const currentSong = useAudioPlayerStore((state) => state.currentSong);
  const setCurrentSong = useAudioPlayerStore((state) => state.setCurrentSong);

  const handleClick = () => {
    if (!socket) {
      toast.error("Error de conexión");
      return;
    }

    try {
      changeSong(socket, roomId, song);
      setCurrentSong(song);
    } catch (err: any) {
      toast.error(err);
    }
  };

  return (
    <article
      key={song.fileId}
      className={cn("flex items-center gap-3 rounded-lg p-2 cursor-pointer", {
        "bg-purple-200": currentSong?.fileId === song.fileId,
      })}
      onClick={handleClick}
    >
      <div
        className={cn(
          "flex h-10 w-10 flex-shrink-0 items-center justify-center rounded",
          {
            "bg-purple-200 text-purple-900":
              currentSong?.fileId !== song.fileId,
            "bg-purple-900": currentSong?.fileId === song.fileId,
          }
        )}
      >
        <Music className="size-5" />
      </div>
      <div className="flex-1 min-w-0">
        <p
          className={cn("truncate font-medium", {
            "text-purple-900": currentSong?.fileId === song.fileId,
            "text-white": currentSong?.fileId !== song.fileId,
          })}
        >
          {song.embeddedMetadata?.Title}
        </p>
        <p
          className={cn("truncate text-sm", {
            "text-purple-900": currentSong?.fileId === song.fileId,
            "text-purple-200": currentSong?.fileId !== song.fileId,
          })}
        >
          {song.embeddedMetadata?.Artist}
        </p>
      </div>
    </article>
  );
};

export default SongQueueItem;
