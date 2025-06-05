// type CardData = {
//   id: number
//   name: string
//   age: number
//   avatar: string
// }

import NotifyLastCard from "@/features/slides/ui/notify-last-card"
import SliderButtons from "@/features/slides/ui/slider-buttons"
import SliderCard from "@/intities/slides/ui/slider-card"

const Slides = () => {
  return (
    <div className="flex flex-col gap-5 px-2">
      <NotifyLastCard />
      <SliderCard />
      <SliderButtons />
    </div>
  )
}

export default Slides
