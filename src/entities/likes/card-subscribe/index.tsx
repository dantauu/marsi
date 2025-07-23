import { LikeCard } from "@/shared/ui/like-card"
import { useGetMyLikesQuery } from "@/shared/api/user.ts"
import { useCurrentUser } from "@/lib/hooks/use-current-user.ts"

export const MyLikesCard = () => {
  const { user: currentUser } = useCurrentUser()
  if (!currentUser) throw new Error("Not user")
  const { data: users } = useGetMyLikesQuery(currentUser?.id, {
    skip: !currentUser?.id
  })
  return <LikeCard users={users} isLocked={false} />
}
