import { SocketContext } from "@/context/socket-provider";
import { useContext } from "react";

export const useSocket = () => useContext(SocketContext);
