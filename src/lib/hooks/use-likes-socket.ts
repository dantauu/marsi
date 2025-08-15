import { io, Socket } from "socket.io-client"
import { useEffect } from "react"
import { toast } from "react-hot-toast"
import { userApi } from "@/shared/api/user.ts"
import { useAppDispatch } from "@/redux/hooks.ts"
import likeSound from "@/assets/sound/like.mp3"

let socket: Socket

export const useLikesSocket = (userId?: string) => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    if (!userId) return
    const audio = new Audio(likeSound)

    socket = io(import.meta.env.VITE_BASE_URL, {
      query: { userId },
    })
    socket.on("new_like", ({ from }) => {
      audio.currentTime = 0
      audio.play().catch((e) => {
        console.error(e)
      })
      toast.success(`${from} поставил(а) вам лайк!`, {
        icon: "💜",
        duration: 3000,
        style: {
          marginTop: "80px",
        },
      })
      dispatch(userApi.util.invalidateTags([{ type: "LikesToMe", id: userId }]))
    })

    socket.on("like_remove", ({ from }) => {
      toast.success(`${from} отменил(а) лайк`, {
        icon: "💔",
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
