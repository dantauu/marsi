import { MainInfoUser } from "@/shared/ui/user/main-info"
import type { User } from "@/app/types/user"
import { SwiperCard } from "@/entities/slides/lib/swiper-card"

type SliderCardProps = {
  data: User[]
  isMore: boolean
  setIsMore: (value: boolean) => void
}

export const MoreInformation = ({ data, isMore, setIsMore }: SliderCardProps) => {
  const { currentIndex } = SwiperCard({ data })
  if(!isMore) return
  return (
    <div className="fixed inset-0 flex justify-center z-50 top-2 left-0">
      <div className="w-full max-w-[550px]">
        <MainInfoUser setIsMore={setIsMore} user={data[currentIndex]} />
      </div>
    </div>
  )
}