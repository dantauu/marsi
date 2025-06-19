import { SliderButtons, NotifyLastCard } from "@/features/slides"
import { SliderCard } from "@/entities/slides"

const Slides = () => {
  return (
    <div data-testid="slides" className="flex flex-col gap-5 px-2 pb-[150px]">
      <NotifyLastCard />
      <SliderCard />
      <SliderButtons />
    </div>
  )
}

export default Slides
