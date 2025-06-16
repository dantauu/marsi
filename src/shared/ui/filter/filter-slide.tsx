import { SliderRange } from "@/features/search/ui/slider-range"

type FilterSlideProps = {
  title: string
  values: number[]
  min: number
  max: number
  setValues: (values: number[]) => void
}

const FilterSlide = ({
  title,
  values,
  min,
  max,
  setValues,
}: FilterSlideProps) => {
  return (
    <div className="flex flex-col gap-7">
      <div className="flex items-center justify-between">
        <div className="">
          <p className="font-HelveticaB text-[20px]">{title}</p>
        </div>
        <div className="flex justify-center gap-2 w-[110px] h-[30px] bg-black rounded-[7px]">
          <span className="font-HelveticaB text-white text-[20px]">
            {values[0]}
          </span>
          <span className="font-HelveticaB text-white text-[20px]"> - </span>
          <span className="font-HelveticaB text-white text-[20px]">
            {values[1]}
          </span>
        </div>
      </div>
      <SliderRange
        defaultValue={values}
        value={values}
        onValueChange={setValues}
        step={1}
        min={min}
        max={max}
        className="w-full"
      />
    </div>
  )
}

export { FilterSlide }
