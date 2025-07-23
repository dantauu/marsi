import { LikeCard } from "@/shared/ui/like-card"
import { useCurrentUser } from "@/lib/hooks/use-current-user.ts"

export const MyLikesCard = () => {
  const { user: currentUser } = useCurrentUser()
  if (!currentUser) throw new Error("Not user")
  return <LikeCard isLocked={false} />
}
