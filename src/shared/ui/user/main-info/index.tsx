import type { User } from "@/app/types/user.ts"
import Button from "@/shared/ui/buttons/button.tsx"
import SvgPoint from "@/assets/icons/Point.tsx"
import SvgRuler from "@/assets/icons/Ruler.tsx"
import SvgTarget from "@/assets/icons/Target.tsx"
import { Swiper, SwiperSlide } from "swiper/react"
import { useState } from "react"
import SvgCrossOrigin from "@/assets/icons/CrossOrigin.tsx"

type MainInfoUserProps = {
  user: User
  setIsMore: (value: boolean) => void
}

export const MainInfoUser = ({ user, setIsMore }: MainInfoUserProps) => {
  const photos = user.photo_url?.items
  const [currentIndex, setCurrentIndex] = useState(0)
  return (
    <div className="">
      <div className="relative top-4">
        <p className="absolute top-4 left-1/2 -translate-x-1/2 z-2 px-3 py-1 rounded-md bg-black/50 text-white text-[16.5px]">
          {currentIndex + 1}/{photos?.length}
        </p>
        <Swiper
          spaceBetween={20}
          onSlideChange={(slide) => setCurrentIndex(slide.activeIndex)}
        >
          {photos?.map((item, i) => (
            <SwiperSlide key={i}>
              <img
                src={item.large}
                className="w-full h-full max-h-[450px] min-h-[390px] object-cover rounded-t-[15px]"
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <Button
          onClick={() => setIsMore(false)}
          className="absolute rounded-full z-10 top-4 right-4 p-1 bg-white text-[#0008]"
          variant={"default"}
        >
          <SvgCrossOrigin className="w-[35px] h-[35px]" />
        </Button>
      </div>
      <div className="absolute z-1 w-full max-w-[550px] max-h-[56.5vh] -mt-4 flex h-full flex-col gap-5 p-4 px-2 bg-[var(--color-bg-surface)] rounded-[29px] shadow-hard text-[var(--color-text-black)]">
        <div className="flex items-center gap-2">
          <p className="text-[24px]">{user?.first_name || "Не указано"},</p>
          <p className="text-[20px]">{user?.age || "?"}</p>
          <div className="flex items-end -ml-2 -mt-1">
            <SvgPoint className="w-[30px] h-[30px] text-[var(--color-icons-card)]" />
            <p className="text-[18px]">{user?.city || "Неизвестно"}</p>
          </div>
        </div>
        {user?.about_me && (
          <div>
            <p className="font-ManropeM text-[14.5px]">- {user?.about_me}</p>
          </div>
        )}
        <div className="flex items-center gap-4">
          <div className="flex items-center -ml-2">
            <SvgRuler className="w-[38px] h-[38px] fill-[var(--color-icons-card)] text-[var(--color-icons-card)]" />
            <p className="text-[17px]">
              {user?.height || "Неизвестно"} {user?.height && "см"}
            </p>
          </div>
          <div className="flex items-center gap-2 -ml-1">
            <SvgTarget className="w-[34px] h-[34px] fill-[var(--color-icons-card)]" />
            <p className="text-[16.5px] pt-1">{user?.goal || "Неизвестно"}</p>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex">
            {user?.hobbies?.length ? (
              <div className="flex flex-wrap gap-x-3 gap-y-2">
                {user.hobbies?.map((item, index) => (
                  <p
                    key={index}
                    className="shadow-hard bg-[var(--color-bg-muted-white)] text-[15px] p-1 rounded-[5px] font-ManropeM"
                  >
                    {item}
                  </p>
                ))}
              </div>
            ) : (
              <p className="text-[18px]">Неизвестно</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
