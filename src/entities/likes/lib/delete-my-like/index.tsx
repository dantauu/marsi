import type { User } from "@/app/types/user"
import { useNotify } from "@/shared/lib/hooks/use-notify.tsx"
import {
  useUnlikeIncomingUserMutation,
  useUnlikeUserMutation,
} from "@/shared/api/likes.ts"

type StatusDeleteUserProps = {
  currentUser: User | null
  variant: "my_like" | "incoming_like"
}

export const useDeleteLike = ({
  currentUser,
  variant,
}: StatusDeleteUserProps) => {
  const { notify } = useNotify()
  const [unlikeUser] = useUnlikeUserMutation()
  const [unlikeIncomingUser] = useUnlikeIncomingUserMutation()
  const handleUnlike = async (userId: string) => {
    if (!currentUser?.id) return
    const scrollY = window.scrollY
    try {
      const action =
        variant === "my_like"
          ? unlikeUser({ likedId: userId, likerId: currentUser.id })
          : unlikeIncomingUser({ likedId: currentUser.id, likerId: userId })

      await notify(action.unwrap(), {
        success: "Готово",
        error: "Ошибка",
        loading: "Удаление...",
      })
      window.scrollTo({ top: scrollY })
    } catch (error) {
      console.error(error)
    }
  }
  return { handleUnlike }
}
