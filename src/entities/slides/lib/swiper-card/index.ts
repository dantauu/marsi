import { useAppDispatch, useAppSelector } from "@/redux/hooks.ts"
import {
  endDragging,
  startDragging,
  updatePosition,
} from "@/redux/slices/slider-slice.ts"

export const SwiperCard = () => {
  const SWIPE_THRESHOLD = 50

  const dispatch = useAppDispatch()
  const { currentIndex, position, isDragging, exitDirection } = useAppSelector(
    (state) => state.slider
  )

  const getClientX = (
    e: React.TouchEvent | React.MouseEvent
  ): { x: number } => {
    if ("touches" in e) {
      return {
        x: e.touches[0].clientX,
      }
    } else {
      return {
        x: e.clientX,
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
    const { x } = getClientX(e)
    dispatch(startDragging({ x }))
  }

  const onSwipeMove = (e: React.TouchEvent | React.MouseEvent) => {
    if (!isDragging) return
    const { x } = getClientX(e)
    dispatch(updatePosition(x))
  }

  const onSwipeEnd = (e: React.TouchEvent | React.MouseEvent) => {
    if (!isDragging) return
    const clientX = getEndClientX(e)
    dispatch(endDragging(clientX))
  }

  const getOpacity = (x: number) => {
    const absX = Math.min(Math.abs(x), SWIPE_THRESHOLD)
    return absX / (SWIPE_THRESHOLD / 2)
  }

  const getCardTransform = (index: number) => {
    if (index === currentIndex) {
      // Текущая карточка
      return `translateX(${position.x}px)`
    } else if (index === currentIndex - 1 && exitDirection === "left") {
      // Предыдущая карточка при свайпе влево
      return "translateX(-100%)"
    } else if (index === currentIndex - 1 && exitDirection === "right") {
      // Предыдущая карточка при свайпе вправо
      return "translateX(100%)"
    } else if (index === currentIndex + 1) {
      // Следующая карточка
      return "translateX(100%)"
    }
    return `translateX(${(index - currentIndex) * 100}%)`
  }

  return {
    getCardTransform,
    getOpacity,
    onSwipeStart,
    onSwipeMove,
    onSwipeEnd,
    currentIndex,
    SWIPE_THRESHOLD,
    position,
  }
}
