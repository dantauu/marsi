import SvgCross from "@/assets/icons/Cross"
import { useAppDispatch } from "@/redux/hooks"
import { handleDislike, handleLike } from "@/redux/slices/slider-slice.ts"
import Button from "@/shared/ui/buttons/button.tsx"
import { useGetMyLikesQuery, useLikeUserMutation } from "@/shared/api/user.ts"
import { useCurrentUser } from "@/lib/hooks/use-current-user.ts"
import SvgHeart from "@/assets/icons/Heart.tsx"
import { useNotify } from "@/lib/hooks/use-notify.ts"

export const Buttons = ({
  currentUserId,
}: {
  currentUserId: string | undefined
}) => {
  const dispatch = useAppDispatch()
  const { user } = useCurrentUser()
  const [likeUser] = useLikeUserMutation()
  const { data: likedUser, refetch } = useGetMyLikesQuery(user?.id ?? "")
  const liked = likedUser?.some((u) => u.id === currentUserId)
  const { notify } = useNotify()

  const handleLikeUser = async () => {
    if (currentUserId && user?.id) {
      dispatch(handleLike())
      await notify(likeUser({ likerId: user?.id, likedId: currentUserId }).unwrap(), {
        success: "Лайк поставлен",
        error: "Что то пошло не так",
        loading: "Загрузка..."
      })
      refetch()
    }
  }
  return (
    <div className="absolute bottom-0 z-5 w-full flex items-center justify-between px-3">
      <Button
        className="w-[100px] bg-main-red rounded-[14px] py-1"
        variant="default"
        onClick={() => dispatch(handleDislike())}
      >
        <SvgCross className="w-[50px] h-[50px] text-[#fff9] " />
      </Button>
      <Button
        className="w-[100px] bg-main-green rounded-[14px] py-1"
        variant="default"
        onClick={() => handleLikeUser()}
      >
        <SvgHeart className={`w-[50px] h-[50px] text-[#fff9] ${liked && "text-main-red duration-150"}`} />
      </Button>
    </div>
  )
}
