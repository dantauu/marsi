import { useAppDispatch } from "@/redux/hooks"
import { handleLike } from "@/redux/slices/slider-slice.ts"
import Button from "@/shared/ui/buttons/button.tsx"
import { useGetMyLikesQuery, useLikeUserMutation } from "@/shared/api/likes.ts"
import { useUserMe } from "@/lib/hooks/use-current-user.ts"
import SvgHeart from "@/assets/icons/Heart.tsx"
import { useNotify } from "@/lib/hooks/use-notify.ts"
import { useMemo } from "react"
import SvgBack from "@/assets/icons/Back.tsx"
import { useNavigate } from "@tanstack/react-router"

export const Buttons = ({
  currentUserId,
}: {
  currentUserId: string | undefined
}) => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { notify } = useNotify()
  const { user } = useUserMe()
  const [likeUser] = useLikeUserMutation()
  const { data: likedUser, refetch } = useGetMyLikesQuery(user?.id ?? "", {
    skip: !user?.id,
  })
  const liked = useMemo(
    () => likedUser?.some((u) => u.id === currentUserId),
    [likedUser, currentUserId]
  )

  const handleLikeUser = async () => {
    if (currentUserId && user?.id && !liked) {
      const scrollY = window.scrollY
      dispatch(handleLike())
      await notify(
        likeUser({ likerId: user?.id, likedId: currentUserId }).unwrap(),
        {
          success: "Лайк поставлен",
          error: "Что то пошло не так",
          loading: "Ожидание...",
        }
      )
      await refetch()
      window.scrollTo({ top: scrollY })
    }
  }
  return (
    <div className="absolute bottom-0 z-5 w-full flex items-center justify-center gap-5 px-3 pb-4">
      <Button
        className="w-[65px] h-[65px] bg-white rounded-full py-1"
        variant="default"
        onClick={() => navigate({ to: "/search" })}
      >
        <SvgBack className="w-[42px] h-[42px] text-[#0005] " />
      </Button>
      <Button
        className="w-[65px] h-[65px] bg-white rounded-full py-1"
        variant="default"
        onClick={() => handleLikeUser()}
      >
        <SvgHeart
          className={`w-[50px] h-[50px] text-[#0005] ${liked && "text-main-red duration-150"}`}
        />
      </Button>
    </div>
  )
}
