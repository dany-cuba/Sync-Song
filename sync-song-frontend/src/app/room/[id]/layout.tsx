"use client";

import { useSocket } from "@/hooks/use-socket";
import { joinRoom } from "@/services/room-socket";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { useEffect } from "react";

const RoomLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const params = useParams();
  const { id: roomId } = params as { id: string };

  const socket = useSocket();
  const router = useRouter();

  useEffect(() => {
    if (!socket) return;

    const connect = async () => {
      try {
        await joinRoom(socket, { roomId, userName: "!!USERNAME FALTA" });
      } catch (err) {
        toast.error("Error al unirse a la sala");
        router.push("/");
      }
    };

    connect();
  }, [socket, roomId, router]);

  return children;
};

export default RoomLayout;
