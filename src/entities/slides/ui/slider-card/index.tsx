import SvgCheck from "@/assets/icons/Check"
import SvgCross from "@/assets/icons/Cross"
import type { UserCard } from "@/app/types/global.d.ts"
import { MockCardData } from "@/lib/data/cards.ts"
import { SwiperCard } from "@/entities/slides/lib/swiper-card"

export const SliderCard = ({ data }: { data: UserCard[] }) => {
  const avatar = new Map<number, string>(
    MockCardData.map((item) => [item.id, item.avatar])
  )
  const {
    onSwipeStart,
    onSwipeMove,
    onSwipeEnd,
    getCardTransform,
    getOpacity,
    currentIndex,
    position,
    SWIPE_THRESHOLD,
  } = SwiperCard()

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
