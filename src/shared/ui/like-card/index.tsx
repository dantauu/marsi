import Button from "@/shared/ui/buttons/button.tsx"
import SvgArrow from "@/assets/icons/Arrow.tsx"
import {
  useGetLikesToMeQuery,
  useUnlikeUserMutation,
} from "@/shared/api/user.ts"
import { useCurrentUser } from "@/lib/hooks/use-current-user.ts"
import LoadingBalls from "@/shared/ui/loading"

export const LikeCard = ({ isLocked }: { isLocked?: boolean }) => {
  const {
    user: currentUser,
    isLoading: userLoading,
    isFetching: userFetching,
  } = useCurrentUser()
  const [unlikeUser, { isLoading }] = useUnlikeUserMutation()
  const {
    data: users,
    isFetching: likesFetching,
  } = useGetLikesToMeQuery(currentUser?.id ?? "", {
    skip: !currentUser?.id,
  })
  const handleUnlikeUser = async (likedId: string) => {
    if (!currentUser?.id) return
    try {
      await unlikeUser({ likerId: currentUser?.id, likedId })
    } catch (error) {
      console.error(error)
    }
  }
  const isPending = userLoading || userFetching || !currentUser || likesFetching

  if (isPending) {
    return <LoadingBalls />
  }
  return (
    <div>
      {users && users.length > 0 ? (
        <div className="flex flex-col gap-7">
          {users.map((item) => (
            <div
              key={item.id}
              className="relative flex justify-between items-center rounded-[10px] shadow-shadow-block px-0.5 py-1.5"
            >
              {isLocked && (
                <div className="absolute z-1 inset-0 rounded-[10px] flex items-center justify-center">
                  <Button variant="green" className="px-3 py-2">
                    Приобрести подписку <SvgArrow />{" "}
                  </Button>
                </div>
              )}
              <div
                className={`flex items-center gap-1 ${isLocked && "filter blur-[5px] inset-0"}`}
              >
                <img
                  className="min-w-[80px] h-[80px] object-cover rounded-full"
                  src={
                    Array.isArray(item.photo_url)
                      ? item.photo_url[0]
                      : item.photo_url
                  }
                />
                <p className="text-lg text-ellipsis overflow-hidden whitespace-nowrap max-w-[83px]">
                  {item.first_name}, {item.age}
                </p>
              </div>
              <div className={`flex gap-2 ${isLocked && "blur-[4px] filter"}`}>
                <Button
                  disabled={isLoading}
                  onClick={() => handleUnlikeUser(item.id)}
                  variant="red"
                  className="w-[100px] h-[35px]"
                >
                  Удалить
                </Button>
                <Button
                  variant="green"
                  className="w-[100px] h-[35px]"
                >
                  Написать
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>Пока никого нет</p>
      )}
    </div>
  )
}
