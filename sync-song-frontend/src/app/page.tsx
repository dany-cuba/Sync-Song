"use client";

import { Button } from "@/components/ui/button";
import { PlusCircle, Users } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSocket } from "@/hooks/use-socket";
import { ROUTES } from "@/constants/routes";
import { toast } from "sonner";
import { useSocketListener } from "@/hooks/use-socket-listener";

export default function LandingPage() {
  const router = useRouter();
  const socket = useSocket();

  useSocketListener<{ msg: string }>(socket, "pong", (data) => {
    console.log("Pong received:", data);
  });

  const handlePing = () => {
    if (!socket) return toast.error("Socket not connected");

    socket.emit("ping", { msg: "ping" }, (response: any) => {
      console.log("Ping response:", response);
    });
  };

  return (
    <div className="flex min-h-screen flex-col">
      <header className="container mx-auto py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="relative h-10 w-10">
              <div className="absolute h-full w-full animate-pulse rounded-full bg-white/20"></div>
              <div className="absolute inset-1 rounded-full bg-white"></div>
              <div className="absolute inset-2 rounded-full bg-purple-600"></div>
              <div className="absolute inset-4 rounded-full bg-white"></div>
            </div>
            <h1 className="text-2xl font-bold text-white">Sync Song</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto flex flex-1 flex-col items-center justify-center px-4 text-center">
        <div className="max-w-3xl">
          <h2 className="mb-6 text-5xl font-bold text-white md:text-6xl">
            Escucha música en sincronía con tus amigos
          </h2>
          <p className="mb-12 text-xl text-purple-100">
            Crea una sala, invita a tus amigos y disfruten juntos de la misma
            música en tiempo real.
          </p>

          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button
              size="lg"
              className="w-full gap-2 bg-white text-purple-900 hover:bg-purple-100 sm:w-auto"
              onClick={() => router.push(ROUTES.createRoom)}
            >
              <PlusCircle className="h-5 w-5" />
              Crear una sala
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="w-full gap-2 border-white text-white hover:bg-white/10 sm:w-auto"
              onClick={() => router.push(ROUTES.joinRoom)}
            >
              <Users className="h-5 w-5" />
              Unirse a una sala
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="w-full gap-2 border-white text-white hover:bg-white/10 sm:w-auto"
              onClick={handlePing}
            >
              <Users className="h-5 w-5" />
              Ping - Pong
            </Button>
          </div>
        </div>

        <div className="mt-20 flex w-full max-w-4xl justify-center">
          <div className="relative w-full rounded-xl bg-black/30 p-6 backdrop-blur-lg">
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 transform rounded-full bg-purple-600 p-4 shadow-lg">
              <div className="h-10 w-10 rounded-full bg-white"></div>
            </div>
            <p className="mt-6 text-center text-lg text-white">
              Sincroniza la música que amas con las personas que te importan
            </p>
          </div>
        </div>
      </main>

      <footer className="container mx-auto py-6">
        <p className="text-center text-sm text-purple-200">
          © {new Date().getFullYear()} Sync Song. Todos los derechos reservados.
        </p>
      </footer>
    </div>
  );
}
