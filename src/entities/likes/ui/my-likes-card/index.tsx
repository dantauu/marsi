import { LikeCard } from "@/shared/ui/like-card"
import { useCurrentUser } from "@/shared/lib/hooks/use-current-user.ts"
import { useDeleteLike, useGetUsersStatus } from "@/features/likes"
import { useGetLikes } from "@/shared/lib/hooks/use-get-likes.ts"
import { LoadingCircleBase } from "@/shared/ui/loading/circle.tsx"

export const MyLikesList = () => {
  const { user: currentUser, isLoading: userLoading } = useCurrentUser()
  const {
    myLikes,
    fetchingMyLikes,
    loadingMyLikes,
    errorMyLikes,
    successMyLikes,
  } = useGetLikes()

  const { handleUnlike, isPending } = useDeleteLike({
    currentUser: currentUser,
    variant: "my_like",
  })
  useGetUsersStatus({
    isSuccess: successMyLikes,
    isFetching: fetchingMyLikes,
    isError: errorMyLikes,
  })
  if (userLoading || loadingMyLikes || !currentUser)
    return <LoadingCircleBase />
  return (
    <LikeCard
      isMessage={false}
      users={myLikes}
      likesTitle={"Лайки от меня"}
      onUnlike={handleUnlike}
      isUnlikeLoading={isPending}
      isLocked={false}
    />
  )
}
