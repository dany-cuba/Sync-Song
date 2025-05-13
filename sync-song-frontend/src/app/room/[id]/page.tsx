"use client";

import { AudioPlayer } from "@/components/audio-player";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { mockMembers, mockSongs } from "@/constants/mock-data";
import { ListMusic, Music, UsersIcon } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useSocketListener } from "@/hooks/use-socket-listener";
import { MUSIC_LIBRARY_EVENTS } from "@/constants/socket";
import { MusicLibraryData } from "@/types/music-library";
import { useSocket } from "@/hooks/use-socket";
import { toast } from "sonner";

export default function RoomPage() {
  const params = useParams();
  const roomId = params.id;
  const socket = useSocket();

  const [activeTab, setActiveTab] = useState("queue");

  // Listen for the SYNC event to get the music library
  useSocketListener(
    socket,
    MUSIC_LIBRARY_EVENTS.SYNC,
    (data: MusicLibraryData) => {
      if (data.error) {
        toast.error(data.error);
      } else {
        toast.success("Biblioteca de música sincronizada");
        console.log("MUSIC_LIBRARY", data.songs);
      }
    }
  );

  return (
    <>
      <header className="container mx-auto py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="relative h-8 w-8">
              <div className="absolute h-full w-full animate-pulse rounded-full bg-white/20"></div>
              <div className="absolute inset-1 rounded-full bg-white"></div>
              <div className="absolute inset-2 rounded-full bg-purple-600"></div>
              <div className="absolute inset-4 rounded-full bg-white"></div>
            </div>
            <h1 className="text-xl font-bold text-white">Sync Song</h1>
          </Link>
          <div className="rounded-full bg-white/10 px-4 py-1 text-sm text-white backdrop-blur-md">
            Sala: {roomId}
          </div>
        </div>
      </header>

      <main className="container mx-auto flex flex-1 flex-col px-4 py-6 gap-6">
        {/* Reproductor de música */}
        <AudioPlayer song={mockSongs[0]} />

        <div>
          {/* Pestañas */}
          <div className="mb-4 flex border-b border-white/20">
            <button
              className={`flex items-center gap-2 px-4 py-2 text-sm ${
                activeTab === "queue"
                  ? "border-b-2 border-white font-medium text-white"
                  : "text-purple-200 hover:text-white"
              }`}
              onClick={() => setActiveTab("queue")}
            >
              <ListMusic className="h-4 w-4" />
              Cola de reproducción
            </button>
            <button
              className={`flex items-center gap-2 px-4 py-2 text-sm ${
                activeTab === "members"
                  ? "border-b-2 border-white font-medium text-white"
                  : "text-purple-200 hover:text-white"
              }`}
              onClick={() => setActiveTab("members")}
            >
              <UsersIcon className="h-4 w-4" />
              Integrantes
            </button>
          </div>

          {/* Contenido de las pestañas */}
          <div className="flex-1 rounded-xl bg-black/20 p-4 backdrop-blur-sm">
            {activeTab === "queue" ? (
              <div className="space-y-2">
                <h3 className="mb-4 text-lg font-medium text-white">
                  Cola de reproducción
                </h3>
                {mockSongs.slice(1).map((song, index) => (
                  <div
                    key={song.id}
                    className={`flex items-center gap-3 rounded-lg p-2 ${
                      index === 0 ? "bg-white/10" : "hover:bg-white/5"
                    }`}
                  >
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded bg-purple-800">
                      {index === 0 ? (
                        <div className="h-3 w-3 animate-pulse rounded-full bg-white"></div>
                      ) : (
                        <span className="text-sm text-white">{index + 1}</span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="truncate font-medium text-white">
                        {song.title}
                      </p>
                      <p className="truncate text-sm text-purple-200">
                        {song.artist}
                      </p>
                    </div>
                  </div>
                ))}
                <Button className="mt-4 w-full bg-white/10 text-white hover:bg-white/20">
                  <Music className="mr-2 h-4 w-4" />
                  Añadir canción
                </Button>
              </div>
            ) : (
              <div className="space-y-2">
                <h3 className="mb-4 text-lg font-medium text-white">
                  Integrantes de la sala
                </h3>
                {mockMembers.map((member) => (
                  <div
                    key={member.id}
                    className="flex items-center gap-3 rounded-lg p-2 hover:bg-white/5"
                  >
                    <Avatar>
                      <AvatarImage
                        src={member.avatar || "/placeholder.svg"}
                        alt={member.name}
                      />
                      <AvatarFallback className="bg-purple-700 text-white">
                        {member.name.substring(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-medium text-white">
                        {member.name}
                        {member.isHost && (
                          <span className="ml-2 rounded bg-purple-600 px-1.5 py-0.5 text-xs">
                            Host
                          </span>
                        )}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
