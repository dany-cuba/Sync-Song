import { Music } from "lucide-react";
import React from "react";

const SongQueueItem = ({
  song,
}: {
  song: {
    id: number;
    title: string;
    artist: string;
    cover: string;
    src: string;
  };
}) => {
  return (
    <article
      key={song.id}
      className={"flex items-center gap-3 rounded-lg p-2 bg-white/10"}
    >
      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded bg-purple-900">
        <Music className="size-5" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="truncate font-medium text-white">{song.title}</p>
        <p className="truncate text-sm text-purple-200">{song.artist}</p>
      </div>
    </article>
  );
};

export default SongQueueItem;
