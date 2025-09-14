import type { User } from "@/app/types/user"
import { SwiperCard } from "@/entities/slides/lib/swiper-card"
import { SliderButtons } from "@/features/slides"
import { SwipePhotos } from "@/ui/sliders/swipe-photo"
import SvgPoint from "@/assets/icons/Point.tsx"
import Button from "@/shared/ui/buttons/button.tsx"
import SvgArrow from "@/assets/icons/Arrow.tsx"
import { useState } from "react"
import { MoreInformation } from "@/widgets/modals/more-information"

type SliderCardProps = {
  data: User[]
}

export const SliderCard = ({ data }: SliderCardProps) => {
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
  const [isMore, setIsMore] = useState(false)

  return (
    <div className=" flex flex-col gap-2 w-full max-w-[430px] h-full mx-auto mb-20">
      <div
        className="relative w-full h-[430px] mini-mobile:h-[490px] flex justify-center overflow-hidden touch-none select-none"
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
                  className={`absolute z-20 w-full h-full rounded-[20px] pointer-events-none ${position.x < 0 ? "bg-[#dc00003e]" : "bg-[#03dc0043]"}`}
                ></div>

                <div className="relative w-full h-full">
                  <SwipePhotos
                    photo_url={
                      Array.isArray(item.photo_url) ? item.photo_url : []
                    }
                  />
                  <div
                    onMouseDown={(e) => e.stopPropagation()}
                    className="absolute flex flex-col justify-center items-center w-full bottom-23 z-50"
                  >
                    <p className="text-white text-[25px] mini-mobile:text-[30px] font-ManropeM">
                      {item.first_name}, {item.age}
                    </p>
                    <div className="flex justify-center items-center">
                      <SvgPoint className="w-[27px] h-[27px] text-white" />
                      <p className="text-white text-[15px] mini-mobile:text-[18px] font-ManropeM">
                        {item?.city}, {item.photo_url?.length} фото
                      </p>
                    </div>
                  </div>
                  <SliderButtons currentUserId={item.id} />
                </div>
              </div>
            )
          })}
        </div>
      </div>
      <MoreInformation setIsMore={setIsMore} isMore={isMore} data={data} />
      <div className="px-2">
        <Button
          onClick={() => setIsMore(true)}
          className="w-full h-[35px]"
          variant={"green"}
        >
          Подробнее <SvgArrow />
        </Button>
      </div>
    </div>
  )
}
