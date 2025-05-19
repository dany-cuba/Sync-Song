"use client";

import { AudioPlayer } from "@/components/audio-player";
import SongQueueItem from "@/components/song-queue";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { mockMembers } from "@/constants/mock-data";
import { useMusicLibrary } from "@/hooks/use-music-library";
import { ListMusic, Loader2, Music, UsersIcon } from "lucide-react";
import { useState } from "react";

export default function RoomPage() {
  const { musicLibrary, loading } = useMusicLibrary();
  const [activeTab, setActiveTab] = useState("queue");

  return (
    <main className="container mx-auto flex flex-1 flex-col px-4 py-6 gap-6">
      {/* Reproductor de música */}
      <AudioPlayer />

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

              {loading ? (
                <div className="flex justify-center w-full py-1">
                  <Loader2 className="size-8 animate-spin text-purple-500" />
                </div>
              ) : (
                musicLibrary.map((song) => (
                  <SongQueueItem key={song.fileId} song={song} />
                ))
              )}

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
  );
}
