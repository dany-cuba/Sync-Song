"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSocket } from "@/hooks/use-socket";
import { ArrowLeft, Users } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type React from "react";
import { useState } from "react";
import { toast } from "sonner";

export default function JoinRoomPage() {
  const socket = useSocket();
  const router = useRouter();
  const [roomId, setRoomId] = useState("");
  const [userName, setUserName] = useState("");

  const handleJoinRoom = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (!socket) {
        return toast.error("No se pudo conectar al servidor.");
      }

      // Emitir evento de unión a la sala
      socket.emit(
        "room:join",
        { roomId, userName },
        (response: { success: boolean; room?: any; error?: string }) => {
          if (response.error) {
            return toast.error(response.error);
          }

          if (response.success && response.room) {
            toast.success("Te has unido a la sala.");
            router.push(`/room/${roomId}`);
          }
        }
      );
    } catch (err) {
      toast.error("No se pudo unir a la sala. Verifica el código.");
    }
  };

  return (
    <>
      <header className="container mx-auto py-6">
        <div className="flex items-center">
          <Link href="/" className="flex items-center gap-2 text-white">
            <ArrowLeft className="h-5 w-5" />
            <span>Volver</span>
          </Link>
        </div>
      </header>

      <main className="container mx-auto flex flex-1 flex-col items-center justify-center px-4">
        <div className="w-full max-w-md rounded-xl bg-black/30 p-6 backdrop-blur-lg">
          <div className="mb-6 flex items-center justify-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-600">
              <Users className="h-6 w-6 text-white" />
            </div>
          </div>

          <h1 className="mb-6 text-center text-2xl font-bold text-white">
            Unirse a una sala
          </h1>

          <form onSubmit={handleJoinRoom} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="room-id" className="text-white">
                Código de la sala
              </Label>
              <Input
                id="room-id"
                placeholder="Ej: abc123"
                value={roomId}
                onChange={(e) => setRoomId(e.target.value)}
                className="bg-white/10 text-white placeholder:text-white/50"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="user-name" className="text-white">
                Tu nombre
              </Label>
              <Input
                id="user-name"
                placeholder="Ej: Carlos"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="bg-white/10 text-white placeholder:text-white/50"
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-white text-purple-900 hover:bg-purple-100"
            >
              Unirse a la sala
            </Button>
          </form>
        </div>
      </main>
    </>
  );
}
