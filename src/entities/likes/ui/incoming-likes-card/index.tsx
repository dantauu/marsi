import { LikeCard } from "@/shared/ui/like-card"
import { useGetLikesToMeQuery } from "@/shared/api/likes.ts"
import { useUserMe } from "@/shared/lib/hooks/use-user-me.ts"
import LoadingBalls from "@/shared/ui/loading/balls.tsx"
import { useGetUsersStatus } from "@/entities/likes/lib/utils/status-get-users"
import { useDeleteLike } from "@/entities/likes/lib/delete-my-like"

export const IncomingLikesList = () => {
  const { user: currentUser, isLoading: userLoading } = useUserMe()
  const {
    data: users,
    isFetching,
    isSuccess,
    isLoading,
    isError,
  } = useGetLikesToMeQuery(currentUser?.id ?? "", {
    skip: !currentUser?.id,
  })
  const { handleUnlike } = useDeleteLike({
    currentUser,
    variant: "incoming_like",
  })
  useGetUsersStatus({ isFetching, isSuccess, isError })
  if (userLoading || isLoading || !currentUser)
    return (
      <div className="flex items-center justify-center h-screen">
        <LoadingBalls />
      </div>
    )
  return (
    <LikeCard
      isMessage={true}
      users={users}
      likesTitle={"Входящие лайки"}
      onUnlike={handleUnlike}
      isLocked={false}
    />
  )
}
