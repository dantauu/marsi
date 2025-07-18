import SvgCheck from "@/assets/icons/Check"
import SvgCross from "@/assets/icons/Cross"
import type { User } from "@/app/types/global.d.ts"
import { SwiperCard } from "@/entities/slides/lib/swiper-card"
import { useUserPhoto } from "@/lib/hooks/use-user-photo.ts"
import { MainInfoUser } from "@/entities/slides/ui/slider-card/main-info-user.tsx"
import { SliderButtons } from "@/features/slides"
import { SwipePhotos } from "@/ui/sliders/slides"

export const SliderCard = ({ data }: { data: User[] }) => {
  //remove this
  const { mockAvatar, userPhoto } = useUserPhoto()

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
      <div className="relative w-full h-screen">
        {data.map((item, index) => {
          const photo =
            userPhoto.get(item.id) ?? mockAvatar.get(Number(item.id)) ?? ""
          return (
            <div
              key={item.id}
              className="absolute w-full h-fit border-1 rounded-[29px] transition-all duration-500 ease-out"
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
                  <SwipePhotos photo_url={Array.isArray(photo) ? photo : [photo]} />
                  <div className="absolute bottom-18 px-3">
                    <p className="text-white text-[40px] font-ManropeM">
                      {item.first_name}, {item.age}
                    </p>
                  </div>
                <SliderButtons />
              </div>
              <MainInfoUser />
            </div>
          )
        })}
      </div>
    </div>
  )
}
