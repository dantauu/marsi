import { LikeCard } from "@/shared/ui/like-card"
import { useGetMyLikesQuery } from "@/shared/api/likes.ts"
import { useUserMe } from "@/shared/lib/hooks/use-user-me.ts"
import LoadingBalls from "@/shared/ui/loading/balls.tsx"
import { useGetUsersStatus } from "@/entities/likes/lib/utils/status-get-users"
import { useDeleteLike } from "@/entities/likes/lib/delete-my-like"

export const MyLikesList = () => {
  const { user: currentUser, isLoading: userLoading } = useUserMe()
  const {
    data: users,
    isFetching,
    isSuccess,
    isLoading,
    isError,
  } = useGetMyLikesQuery(currentUser?.id ?? "", {
    skip: !currentUser?.id,
  })
  const { handleUnlike, isUnlikeLoading } = useDeleteLike({
    currentUser: currentUser,
    variant: "my_like",
  })
  useGetUsersStatus({ isSuccess, isFetching, isError })
  if (userLoading || isLoading || !currentUser)
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
      isUnlikeLoading={isUnlikeLoading}
      isLocked={false}
    />
  )
}
