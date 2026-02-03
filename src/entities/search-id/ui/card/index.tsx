import type { User } from "@/app/types/user.ts"
import { SwipePhotos } from "@/ui/sliders/swipe-photo"
import { SwiperCard } from "@/entities/slides/lib/swiper-card"
import { Buttons } from "@/features/search-id/index.ts"
import SvgPoint from "@/assets/icons/Point.tsx"
import { MoreInformation } from "@/widgets/modals/more-information"
import Button from "@/shared/ui/buttons/button.tsx"
import SvgArrow from "@/assets/icons/Arrow.tsx"
import { useState } from "react"

type SliderCardProps = {
  data: User[]
}

export const SearchIdCard = ({ data }: SliderCardProps) => {
  const { currentIndex } = SwiperCard({ data })
  const currentUser = data[currentIndex] ?? data[data.length - 1] ?? null
  const [isMore, setIsMore] = useState(false)

  return (
    <div className="flex flex-col gap-2 w-full max-w-[430px] h-full mx-auto mb-20">
      <div className="relative w-full h-[430px] mini-mobile:h-[490px] flex justify-center overflow-hidden">
        <div className="relative w-full h-min">
          {data.map((item) => {
            return (
              <div
                key={item.id}
                className="flex flex-col justify-between gap-5 absolute w-full transition-all duration-500 ease-out"
              >
                <div className="relative w-full h-full">
                  <SwipePhotos photo_url={item.photo_url} />
                  <div className="absolute flex flex-col items-center justify-center w-full bottom-20 z-20 px-3">
                    <p className="text-white text-[25px] mini-mobile:text-[30px] font-ManropeM">
                      {item.first_name}, {item.age ? item.age : "?"}
                    </p>
                    <div className="flex justify-center items-center">
                      <SvgPoint className="w-[27px] h-[27px] text-white" />
                      <p className="text-white text-[15px] mini-mobile:text-[18px] font-ManropeM">
                        {item?.city ? item?.city : "Не указано"},{" "}
                        {item.photo_url?.items.length} фото
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
      <MoreInformation
        currentUser={currentUser}
        setIsMore={setIsMore}
        isMore={isMore}
        data={data}
      />
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
