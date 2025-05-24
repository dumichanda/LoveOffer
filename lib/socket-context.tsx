"use client"

import { createContext, useContext, type ReactNode } from "react"

interface SocketContextType {
  socket: null
  isConnected: boolean
}

const SocketContext = createContext<SocketContextType>({
  socket: null,
  isConnected: false,
})

export function SocketProvider({ children }: { children: ReactNode }) {
  return <SocketContext.Provider value={{ socket: null, isConnected: false }}>{children}</SocketContext.Provider>
}

export const useSocket = () => useContext(SocketContext)
