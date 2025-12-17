import { io, Socket } from "socket.io-client"
import { useEffect, useRef } from "react"
import { userApi } from "@/shared/api/user.ts"
import { useAppDispatch, useAppSelector } from "@/redux/hooks.ts"
import likeSound from "@/assets/sound/like.mp3"
import { useNotify } from "@/shared/lib/hooks/use-notify.tsx"


export const useLikesSocket = (userId?: string) => {
  const dispatch = useAppDispatch()
  const { notify } = useNotify()
  const { muted } = useAppSelector((state) => state.volume)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const socketRef = useRef<Socket | null>(null)

  useEffect(() => {
    audioRef.current = new Audio(likeSound)
  }, [])

  useEffect(() => {
    if (!userId) return

    const socket = io(import.meta.env.VITE_BASE_URL, {
      query: { userId },
    })

    socketRef.current = socket

    socket.on("new_like", ({ from }) => {
      if (!muted && audioRef.current) {
        audioRef.current.currentTime = 0
        audioRef.current.play().catch((e) => {
          console.error(e)
        })
      }
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
  }, [userId, dispatch, notify])
}
