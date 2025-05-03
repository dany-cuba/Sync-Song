"use client";

import { createContext, useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import { BACKEND_URL } from "@/config/env.config";

export const SocketContext = createContext<Socket | null>(null);

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const socketRef = useRef<Socket | null>(null);
  const [_, forceUpdate] = useState(0); // Para hacer rerender una vez conectado

  useEffect(() => {
    if (!socketRef.current) {
      socketRef.current = io(BACKEND_URL);

      socketRef.current.on("connect", () => {
        console.log("✅ Conectado al servidor de Socket.IO");
        forceUpdate((n) => n + 1); // Fuerza rerender para que useSocket retorne el socket ya conectado
      });

      socketRef.current.on("connect_error", (err) => {
        console.log("❌ Error de conexión:", err.message);
      });
    }

    return () => {
      socketRef.current?.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={socketRef.current}>
      {children}
    </SocketContext.Provider>
  );
};
