import { useRef } from "react"
import { useAppDispatch, useAppSelector } from "@/redux/hooks.ts"
import {
  endDragging,
  startDragging,
  updatePosition,
} from "@/redux/slices/slider-slice.ts"
import { useLikeUserMutation } from "@/shared/api/user.ts"
import { useCurrentUser } from "@/lib/hooks/use-current-user.ts"
import type { User } from "@/app/types/global"

export const SwiperCard = ({ data }: { data: User[] }) => {
  const SWIPE_THRESHOLD = 50
  const [likeUser] = useLikeUserMutation()
  const { user } = useCurrentUser()
  const dispatch = useAppDispatch()
  const { currentIndex, position, isDragging, exitDirection } = useAppSelector(
    (state) => state.slider
  )

  // Трекинг свайпа
  const startX = useRef(0)
  const startY = useRef(0)
  const isHorizontalSwipe = useRef(false)
  const hasDirectionDetermined = useRef(false)

  const getTouchCoords = (e: React.TouchEvent | React.MouseEvent) => {
    if ("touches" in e) {
      return {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
      }
    } else {
      return {
        x: e.clientX,
        y: e.clientY,
      }
    }
  }

  const getEndClientX = (e: React.TouchEvent | React.MouseEvent): number => {
    if ("changedTouches" in e) {
      return e.changedTouches[0].clientX
    } else {
      return e.clientX
    }
  }

  const onSwipeStart = (e: React.TouchEvent | React.MouseEvent) => {
    const { x, y } = getTouchCoords(e)
    startX.current = x
    startY.current = y
    isHorizontalSwipe.current = false
    hasDirectionDetermined.current = false
    dispatch(startDragging({ x }))
  }

  const onSwipeMove = (e: React.TouchEvent | React.MouseEvent) => {
    if (!isDragging) return

    const { x, y } = getTouchCoords(e)
    const deltaX = x - startX.current
    const deltaY = y - startY.current

    if (!hasDirectionDetermined.current) {
      if (Math.abs(deltaX) > 10 || Math.abs(deltaY) > 10) {
        isHorizontalSwipe.current = Math.abs(deltaX) > Math.abs(deltaY)
        hasDirectionDetermined.current = true
      }
    }

    // свайп горизонтальный - обновление позиции
    if (isHorizontalSwipe.current) {
      dispatch(updatePosition(x))
    }
  }

  const onSwipeEnd = async (e: React.TouchEvent | React.MouseEvent) => {
    if (!isDragging || !isHorizontalSwipe.current) return
    const clientX = getEndClientX(e)
    dispatch(endDragging(clientX))

    const deltaX = clientX - startX.current
    const swipedRight = deltaX > SWIPE_THRESHOLD
    if (swipedRight && user?.id) {
      try {
        const likedUserId = data[currentIndex].id
        await likeUser({
          likerId: user?.id,
          likedId: likedUserId,
        }).unwrap()
        console.log("💚 Liked:", likedUserId)
      } catch (err) {
        console.error("Ошибка при лайке:", err)
      }
    }
  }

  const getOpacity = (x: number) => {
    const absX = Math.min(Math.abs(x), SWIPE_THRESHOLD)
    return absX / (SWIPE_THRESHOLD / 1.2)
  }

  const getCardRotation = () => {
    const maxAngle = 5
    const angle = (position.x / SWIPE_THRESHOLD) * maxAngle
    return `rotateZ(${Math.max(-maxAngle, Math.min(angle, maxAngle))}deg)`
  }

  const getCardTransform = (index: number) => {
    if (index === currentIndex) {
      return `translateX(${position.x}px)`
    } else if (index === currentIndex - 1 && exitDirection === "left") {
      return "translateX(-100%)"
    } else if (index === currentIndex - 1 && exitDirection === "right") {
      return "translateX(100%)"
    } else if (index === currentIndex + 1) {
      return "translateX(100%)"
    }
    return `translateX(${(index - currentIndex) * 100}%)`
  }

  return {
    getCardTransform,
    getOpacity,
    getCardRotation,
    onSwipeStart,
    onSwipeMove,
    onSwipeEnd,
    currentIndex,
    SWIPE_THRESHOLD,
    position,
  }
}
