import { RangeSlider } from "@mantine/core"
import React from "react"


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
    <div className="flex flex-col gap-7">
      <div className="flex items-center justify-between">
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
      <RangeSlider
        value={values}
        onChange={setValues}
        label={null}
        pushOnOverlap={false}
        thumbSize={35}
        minRange={2}
        min={min}
        max={max}
        step={1}
        styles={{
          thumb: {
            backgroundColor: "#31c29f",
            border: "2px solid white",
          },
          bar: {
            backgroundColor: "#31c29f",
          },
        }}
      />
    </div>
  )
}
