import SvgCross from "@/assets/icons/Cross"
import { useAppDispatch } from "@/redux/hooks"
import { handleDislike, handleLike } from "@/redux/slices/slider-slice.ts"
import Button from "@/shared/ui/buttons/button.tsx"
import { useLikeUserMutation } from "@/shared/api/user.ts"
import { useUserMe } from "@/lib/hooks/use-current-user.ts"
import SvgHeart from "@/assets/icons/Heart.tsx"

export const SliderButtons = ({
  currentUserId,
}: {
  currentUserId: string | undefined
}) => {
  const dispatch = useAppDispatch()
  const [likeUser] = useLikeUserMutation()
  const { user } = useUserMe()

  const handleLikeUser = () => {
    if (currentUserId && user?.id) {
      likeUser({ likerId: user?.id, likedId: currentUserId })
      dispatch(handleLike())
    }
  }
  return (
    <div className="absolute bottom-0 z-50 w-full flex items-center justify-between px-3">
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
        <SvgHeart className="w-[50px] h-[50px] text-[#fff9]" />
      </Button>
    </div>
  )
}
