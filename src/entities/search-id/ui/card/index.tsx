import type { User } from "@/app/types/global.d.ts"
import { MainInfoUser } from "@/entities/slides/ui/slider-card/main-info-user.tsx"
import { SwipePhotos } from "@/ui/sliders/swipe-photo"
import { SwiperCard } from "@/entities/slides/lib/swiper-card"
import { Buttons } from "@/features/search-id/index.ts"

type SliderCardProps = {
  data: User[]
}

export const SearchIdCard = ({ data }: SliderCardProps) => {
  const { currentIndex } = SwiperCard({ data })
  const currentUser = data[currentIndex] ?? data[data.length - 1] ?? null

  return (
    <div className="flex flex-col gap-5 w-full max-w-[430px] h-full mx-auto mb-20 border-1 rounded-[29px]">
      <div className="relative w-full h-[440px] mini-mobile:h-[500px] flex justify-center overflow-hidden touch-none select-none">
        <div className="relative w-full h-min">
          {data.map((item) => {
            return (
              <div
                key={item.id}
                className="flex flex-col justify-between gap-5 absolute w-full transition-all duration-500 ease-out"
              >
                <div className="relative w-full h-full">
                  <SwipePhotos
                    photo_url={
                      Array.isArray(item.photo_url) ? item.photo_url : []
                    }
                  />
                  <div className="absolute bottom-18 z-20 px-3">
                    <p className="text-white text-[35px] mini-mobile:text-[40px] font-ManropeM">
                      {item.first_name}, {item.age}
                    </p>
                  </div>
                  <Buttons currentUserId={item.id} />
                </div>
              </div>
            )
          })}
        </div>
      </div>
      <MainInfoUser user={currentUser} />
    </div>
  )
}
