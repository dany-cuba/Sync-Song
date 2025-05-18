"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSocket } from "@/hooks/use-socket";
import { createRoom } from "@/services/room-socket";
import { ArrowLeft, Music } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function CreateRoomPage() {
  const socket = useSocket();
  const router = useRouter();
  const [userName, setUserName] = useState<string>("");

  const handleCreateRoom = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!socket) {
      toast.error("No se pudo conectar al servidor");
      return;
    }

    try {
      const { msg, room } = await createRoom(socket, { userName });

      toast.success(msg);
      router.push(`/room/${room?.id}`);
      return;
    } catch (error: string | any) {
      return typeof error?.message === "string"
        ? toast.error(error.message)
        : toast.error("Error al crear la sala");
    }
  };

  return (
    <main className="container mx-auto flex flex-1 flex-col items-center justify-center px-4">
      <div className="w-full max-w-md rounded-xl bg-black/30 p-6 backdrop-blur-lg">
        <div className="mb-6 flex items-center justify-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-600">
            <Music className="h-6 w-6 text-white" />
          </div>
        </div>

        <h1 className="mb-6 text-center text-2xl font-bold text-white">
          Crear una nueva sala
        </h1>

        <form onSubmit={handleCreateRoom} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="userName" className="text-white">
              Tu nombre
            </Label>
            <Input
              id="userName"
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
            Crear sala
          </Button>
        </form>
      </div>
    </main>
  );
}
