import { useAppDispatch } from "@/redux/hooks"
import { handleLike } from "@/redux/slices/slider-slice.ts"
import Button from "@/shared/ui/buttons/button.tsx"
import { useGetMyLikesQuery, useLikeUserMutation } from "@/shared/api/likes.ts"
import { useCurrentUser } from "@/shared/lib/hooks/use-current-user.ts"
import SvgHeart from "@/assets/icons/Heart.tsx"
import { useMemo } from "react"
import SvgBack from "@/assets/icons/Back.tsx"
import { useNavigate } from "@tanstack/react-router"
import { useNotify } from "@/shared/lib/hooks/use-notify.tsx"

export const Buttons = ({
  currentUserId,
}: {
  currentUserId: string | undefined
}) => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { notify } = useNotify()
  const { user } = useCurrentUser()
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
        className="w-[52px] h-[52px] bg-[var(--color-bg-surface)] rounded-full py-1"
        variant="default"
        onClick={() => navigate({ to: "/search" })}
      >
        <SvgBack className="w-[30px] h-[30px] text-[var(--color-icons-card)] " />
      </Button>
      <Button
        className="w-[52px] h-[52px] bg-[var(--color-bg-surface)] rounded-full py-1"
        variant="default"
        onClick={() => handleLikeUser()}
      >
        <SvgHeart
          className={`w-[37px] h-[37px] text-[var(--color-icons-card)] ${liked && "text-main-red duration-150"}`}
        />
      </Button>
    </div>
  )
}
