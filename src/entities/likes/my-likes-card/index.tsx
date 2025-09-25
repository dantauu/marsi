import { LikeCard } from "@/shared/ui/like-card"
import {
  useGetMyLikesQuery,
  useUnlikeUserMutation,
} from "@/shared/api/likes.ts"
import { useUserMe } from "@/shared/lib/hooks/use-user-me.ts"
import LoadingBalls from "@/shared/ui/loading"

export const MyLikesList = () => {
  const { user: currentUser, isLoading: userLoading } = useUserMe()
  const {
    data: users,
    isFetching,
    refetch,
  } = useGetMyLikesQuery(currentUser?.id ?? "", {
    skip: !currentUser?.id,
  })
  const [unlikeUser, { isLoading: unlikeLoading }] = useUnlikeUserMutation()
  const handleUnlike = async (likedId: string) => {
    if (!currentUser?.id) return
    const scrollY = window.scrollY
    try {
      await unlikeUser({ likedId, likerId: currentUser?.id })
      await refetch()
      window.scrollTo({ top: scrollY })
    } catch (error) {
      console.error(error)
    }
  }
  if (userLoading || unlikeLoading || isFetching || !currentUser)
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingBalls />
      </div>
    )
  return (
    <LikeCard
      isMessage={false}
      users={users}
      likesTitle={"Лайки от меня"}
      onUnlike={handleUnlike}
      isLocked={false}
    />
  )
}
