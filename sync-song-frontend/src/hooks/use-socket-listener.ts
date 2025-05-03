"use client";

import { useEffect } from "react";
import { Socket } from "socket.io-client";

/**
 * Hook para manejar listeners de socket sin duplicados
 */
export const useSocketListener = <T>(
  socket: Socket | null,
  event: string,
  callback: (data: T) => void
) => {
  useEffect(() => {
    if (!socket) return;

    const listener = (data: T) => callback(data);

    socket.on(event, listener);

    // Limpieza para evitar múltiples registros
    return () => {
      socket.off(event, listener);
    };
  }, [socket, event, callback]);
};
