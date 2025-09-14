import type { User } from "@/app/types/user"
import { MainInfoUser } from "@/shared/ui/user/main-info"
import { SwipePhotos } from "@/ui/sliders/swipe-photo"
import { SwiperCard } from "@/entities/slides/lib/swiper-card"
import { Buttons } from "@/features/search-id/index.ts"
import SvgPoint from "@/assets/icons/Point.tsx"

type SliderCardProps = {
  data: User[]
}

export const SearchIdCard = ({ data }: SliderCardProps) => {
  const { currentIndex } = SwiperCard({ data })
  const currentUser = data[currentIndex] ?? data[data.length - 1] ?? null

  return (
    <div className="flex flex-col gap-5 w-full max-w-[430px] h-full mx-auto mb-20">
      <div className="relative w-full h-[430px] mini-mobile:h-[460px] flex justify-center overflow-hidden">
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
                  <div className="absolute flex flex-col items-center justify-center w-full bottom-23 z-20 px-3">
                    <p className="text-white text-[25px] mini-mobile:text-[30px] font-ManropeM">
                      {item.first_name}, {item.age ? item.age : "?"}
                    </p>
                    <div className="flex justify-center items-center">
                      <SvgPoint className="w-[27px] h-[27px] text-white" />
                      <p className="text-white text-[15px] mini-mobile:text-[18px] font-ManropeM">
                        {item?.city ? item?.city : "Не указано"},{" "}
                        {item.photo_url?.length} фото
                      </p>
                    </div>
                  </div>
                  <Buttons currentUserId={item.id} />
                </div>
              </div>
            )
          })}
        </div>
      </div>
      {/*<MainInfoUser user={currentUser} />*/}
    </div>
  )
}
