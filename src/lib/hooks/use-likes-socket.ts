import { io, Socket } from "socket.io-client"
import { useEffect } from "react"
import { userApi } from "@/shared/api/user.ts"
import { useAppDispatch, useAppSelector } from "@/redux/hooks.ts"
import likeSound from "@/assets/sound/like.mp3"
import { useNotify } from "@/shared/lib/hooks/use-notify.tsx"

let socket: Socket

export const useLikesSocket = (userId?: string) => {
  const dispatch = useAppDispatch()
  const { notify } = useNotify()
  const { volume, muted } = useAppSelector((state) => state.volume)
  useEffect(() => {
    if (!userId) return
    const audio = new Audio(likeSound)

    socket = io(import.meta.env.VITE_BASE_URL, {
      query: { userId },
    })
    socket.on("new_like", ({ from }) => {
      audio.currentTime = 0
      audio.volume = muted ? 0 : volume / 100
      audio.play().catch((e) => {
        console.error(e)
      })
      notify({
        message: `${from} поставил(а) вам лайк!`,
        icon: "❤️",
      })
      dispatch(userApi.util.invalidateTags([{ type: "LikesToMe", id: userId }]))
    })

    socket.on("like_remove", ({ from }) => {
      notify({
        message: `${from} отменил(а) лайк`,
        icon: "💔",
      })
      dispatch(userApi.util.invalidateTags([{ type: "LikesToMe", id: userId }]))
    })

    socket.on("incomingUnlike", ({ from }) => {
      notify({
        message: `${from} не принял(а) лайк`,
        icon: "💔",
      })
      dispatch(userApi.util.invalidateTags([{ type: "LikesToMe", id: userId }]))
      dispatch(userApi.util.invalidateTags([{ type: "MyLikes", id: userId }]))
    })

    return () => {
      socket.disconnect()
    }
  }, [userId])
}
