import { io, Socket } from "socket.io-client"
import { useEffect } from "react"
import { toast } from "react-hot-toast"
import { userApi } from "@/shared/api/user.ts"
import { useAppDispatch } from "@/redux/hooks.ts"

let socket: Socket

export const useLikesSocket = (userId?: string) => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    if (!userId) return
    socket = io(import.meta.env.VITE_BASE_URL, {
      query: { userId },
    })
    socket.on("new_like", ({ from }) => {
      toast.success(`Пользователь ${from} поставил(а) вам лайк!`, {
        icon: "💜",
        duration: 3000,
        style: {
          marginTop: "80px",
        },
      })
      dispatch(userApi.util.invalidateTags([{ type: "LikesToMe", id: userId }]))
    })

    return () => {
      socket.disconnect()
    }
  }, [userId])
}
