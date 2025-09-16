import SvgCross from "@/assets/icons/Cross"
import { useAppDispatch } from "@/redux/hooks"
import { handleDislike, handleLike } from "@/redux/slices/slider-slice.ts"
import Button from "@/shared/ui/buttons/button.tsx"
import {
  useDislikeUserMutation,
  useLikeUserMutation,
} from "@/shared/api/likes.ts"
import { useUserMe } from "@/lib/hooks/use-current-user.ts"
import SvgHeart from "@/assets/icons/Heart.tsx"
import { removedUser } from "@/redux/slices/users.ts"

export const SliderButtons = ({
  currentUserId,
}: {
  currentUserId: string | undefined
}) => {
  const dispatch = useAppDispatch()
  const [likeUser] = useLikeUserMutation()
  const [dislikeUser] = useDislikeUserMutation()
  const { user } = useUserMe()

  const handleLikeUser = () => {
    if (currentUserId && user?.id) {
      likeUser({ likerId: user?.id, likedId: currentUserId })
      dispatch(handleLike())
      dispatch(removedUser(currentUserId))
    }
  }

  const handleDislikeUser = () => {
    if (currentUserId && user?.id) {
      dislikeUser({ dislikerId: user?.id, dislikedId: currentUserId })
      dispatch(handleDislike())
    }
  }
  return (
    <div className="absolute bottom-0 z-50 w-full flex items-center justify-center gap-5 px-3 pb-4">
      <Button
        className="w-[65px] h-[65px] bg-white rounded-full py-1"
        variant="default"
        onClick={() => handleDislikeUser()}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <SvgCross className="w-[40px] h-[40px] text-black" />
      </Button>
      <Button
        className="w-[65px] h-[65px] bg-white rounded-full py-1"
        variant="default"
        onClick={() => handleLikeUser()}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <SvgHeart className="w-[40px] h-[40px] text-main-red" />
      </Button>
    </div>
  )
}
