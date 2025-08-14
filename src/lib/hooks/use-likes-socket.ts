import { io, Socket } from "socket.io-client"
import { useEffect } from "react"
import { toast } from "react-hot-toast"

let socket: Socket

export const useLikesSocket = (userId?: string) => {
  useEffect(() => {
    if (!userId) return
    socket = io(import.meta.env.VITE_BASE_URL, {
      query: { userId }
    })
    socket.on("new_like", ({ from }) => {
      toast.success(`Пользователь ${from} поставил вам лайк!`, {
        icon: "💜",
        duration: 3000
      })
    })

    return () => {
      socket.disconnect()
    }
  }, [userId])
}