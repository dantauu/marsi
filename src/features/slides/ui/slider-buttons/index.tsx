import { useAppDispatch } from "@/redux/hooks"
import { handleDislike, handleLike } from "@/redux/slices/slider-slice.ts"
import Button from "@/shared/ui/buttons/button.tsx"
import {
  useDislikeUserMutation,
  useLikeUserMutation,
} from "@/shared/api/likes.ts"
import { useUserData } from "@/shared/lib/hooks/use-user-data.ts"
import SvgHeart from "@/assets/icons/Heart.tsx"
import SvgCrossOrigin from "@/assets/icons/CrossOrigin.tsx"

export const SliderButtons = ({
  currentUserId,
}: {
  currentUserId: string | undefined
}) => {
  const dispatch = useAppDispatch()
  const [likeUser] = useLikeUserMutation()
  const [dislikeUser] = useDislikeUserMutation()
  const { user } = useUserData()

  const handleLikeUser = () => {
    if (currentUserId && user?.id) {
      likeUser({ likerId: user?.id, likedId: currentUserId })
      dispatch(handleLike())
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
        className="w-[58px] h-[58px] bg-white rounded-full"
        variant="default"
        onClick={() => handleDislikeUser()}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <SvgCrossOrigin className="w-[37px] h-[37px] text-black" />
      </Button>
      <Button
        className="w-[58px] h-[58px] bg-white rounded-full pt-1"
        variant="default"
        onClick={() => handleLikeUser()}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <SvgHeart className="w-[37px] h-[37px] text-main-red" />
      </Button>
    </div>
  )
}
