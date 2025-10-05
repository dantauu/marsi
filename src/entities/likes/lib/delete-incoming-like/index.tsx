import { useNotify } from "@/shared/lib/hooks/use-notify.tsx"
import { useUnlikeUserMutation } from "@/shared/api/likes.ts"
import type { User } from "@/app/types/user"

type StatusDeleteUserProps = {
  currentUser: User | null
  refetch: () => Promise<unknown>
}

export const useDeleteIncomingLike = ({
  currentUser,
  refetch,
}: StatusDeleteUserProps) => {
  const { notify } = useNotify()
  const [unlikeUser] = useUnlikeUserMutation()
  const handleUnlike = async (likedId: string) => {
    if (!currentUser?.id) return
    const scrollY = window.scrollY
    try {
      await notify(unlikeUser({ likedId, likerId: currentUser.id }).unwrap(), {
        success: "Готово",
        error: "Ошибка",
        loading: "Удаление...",
      })
      await refetch()
      window.scrollTo({ top: scrollY })
    } catch (error) {
      console.error(error)
    }
  }
  return { handleUnlike }
}
