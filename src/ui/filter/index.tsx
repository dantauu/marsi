import React from "react"
import SliderRange from "@/ui/filter/slider-range.tsx"

type FilterSlideProps = {
  title: string
  values: [number, number]
  min: number
  max: number
  setValues: React.Dispatch<React.SetStateAction<[number, number]>>
}

export const FilterSlide = ({
  title,
  values,
  min,
  max,
  setValues,
}: FilterSlideProps) => {
  return (
    <div className="flex flex-col items-center gap-7">
      <div className="w-full flex items-center justify-between">
        <p className="font-HelveticaB text-[20px]">{title}</p>
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
      <SliderRange values={values} min={min} max={max} setValues={setValues} />
    </div>
  )
}
