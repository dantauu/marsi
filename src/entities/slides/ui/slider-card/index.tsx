import type { User } from "@/app/types/global.d.ts"
import { SwiperCard } from "@/entities/slides/lib/swiper-card"
import { MainInfoUser } from "@/entities/slides/ui/slider-card/main-info-user.tsx"
import { SliderButtons } from "@/features/slides"
import { SwipePhotos } from "@/ui/sliders/slides"

type SliderCardProps = {
  data: User[]
}

export const SliderCard = ({ data }: SliderCardProps) => {
  //remove this
  const {
    onSwipeStart,
    onSwipeMove,
    onSwipeEnd,
    getCardTransform,
    getCardRotation,
    getOpacity,
    currentIndex,
    position,
    SWIPE_THRESHOLD,
  } = SwiperCard({ data })

  return (
    <div className="flex flex-col gap-5 w-full max-w-[430px] h-full mx-auto mb-20 border-1 rounded-[29px]">
      <div
        className="relative w-full h-[440px] mini-mobile:h-[500px] flex justify-center overflow-hidden touch-none select-none"
        onMouseDown={onSwipeStart}
        onTouchStart={onSwipeStart}
        onMouseMove={onSwipeMove}
        onTouchMove={onSwipeMove}
        onMouseUp={onSwipeEnd}
        onTouchEnd={onSwipeEnd}
        onMouseLeave={onSwipeEnd}
        style={{ touchAction: "pan-y" }}
      >
        <div className="relative w-full h-min">
          {data.map((item, index) => {
            return (
              <div
                key={item.id}
                className="flex flex-col justify-between gap-5 absolute w-full transition-all duration-500 ease-out"
                style={{
                  transform:
                    index === currentIndex
                      ? `${getCardTransform(index)} ${getCardRotation()}`
                      : getCardTransform(index),
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
                <div
                  style={{
                    opacity:
                      index === currentIndex &&
                      (position.x < 0 || position.x > 0)
                        ? getOpacity(position.x)
                        : 0,
                  }}
                  className={`absolute z-20 w-full h-full rounded-[29px] pointer-events-none ${position.x < 0 ? "bg-[#dc00003e]" : "bg-[#03dc0043]"}`}
                ></div>

                <div className="relative w-full h-full">
                  <SwipePhotos
                    photo_url={
                      Array.isArray(item.photo_url) ? item.photo_url : []
                    }
                  />
                  <div className="absolute bottom-18 z-50 px-3">
                    <p className="text-white text-[35px] mini-mobile:text-[40px] font-ManropeM">
                      {item.first_name}, {item.age}
                    </p>
                  </div>
                  <SliderButtons currentUserId={item.id} />
                </div>
              </div>
            )
          })}
        </div>
      </div>
      <MainInfoUser user={data[currentIndex]} />
    </div>
  )
}
