import SvgCheck from "@/assets/icons/Check"
import SvgCross from "@/assets/icons/Cross"
import {
  startDragging,
  updatePosition,
  endDragging,
} from "@/redux/slices/slider-slice.ts"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import type { CardProps } from "@/app/types/global.ts"
import { MockCardData } from "@/lib/data/cards.ts"

const SWIPE_THRESHOLD = 50

export const SliderCard = ({ data }: { data: CardProps[] }) => {
  const avatar = new Map<number, string>(
    MockCardData.map((item) => [item.id, item.avatar])
  )
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

  return (
    <div
      className="swipe-container relative w-full h-fit px-1 flex items-center justify-center overflow-hidden touch-none select-none"
      onMouseDown={onSwipeStart}
      onTouchStart={onSwipeStart}
      onMouseMove={onSwipeMove}
      onTouchMove={onSwipeMove}
      onMouseUp={onSwipeEnd}
      onTouchEnd={onSwipeEnd}
      onMouseLeave={onSwipeEnd}
      style={{ touchAction: "none" }}
    >
      <div className="relative w-full h-[550px]">
        {data.map((item, index) => (
          <div
            key={item.id}
            className="absolute top-0 left-0 w-full h-full transition-all duration-500 ease-out"
            style={{
              transform: getCardTransform(index),
              opacity:
                index === currentIndex
                  ? 1
                  : index === currentIndex + 1
                    ? Math.abs(position.x) / SWIPE_THRESHOLD
                    : 0,
              zIndex: index === currentIndex ? 2 : 1,
              pointerEvents: index === currentIndex ? "auto" : "none",
            }}
          >
            <SvgCross
              className="w-[96px] h-[96px] absolute top-55 left-33 text-red-500 transition-opacity duration-100 z-10"
              style={{
                opacity:
                  index === currentIndex && position.x < 0
                    ? getOpacity(position.x)
                    : 0,
              }}
            />

            <SvgCheck
              className="w-[96px] h-[96px] absolute top-55 right-33 text-green-500 transition-opacity duration-100 z-10"
              style={{
                opacity:
                  index === currentIndex && position.x > 0
                    ? getOpacity(position.x)
                    : 0,
              }}
            />

            <div className="relative w-full h-full">
              <div className="w-full h-full inset-0">
                <img
                  className="w-full h-full object-cover object-center rounded-[28px]"
                  src={avatar.get(Number(item.id))}
                  alt=""
                />
                <div className="absolute bottom-4 left-4">
                  <p className="text-white text-[40px] font-ManropeM">
                    {item.username}, {item.age}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
