import { Range } from "react-range"
import React from "react"

type SlideRangeProps = {
  values: [number, number]
  min: number
  max: number
  setValues: React.Dispatch<React.SetStateAction<[number, number]>>
}

const MIN_DISTANCE = 2

const SliderRange = ({ values, min, max, setValues }: SlideRangeProps) => {
  return (
    <Range
      values={values}
      step={1}
      min={min}
      max={max}
      onChange={(newValues: number[]) => {
        const [minVal, maxVal] = newValues
        if (maxVal - minVal < MIN_DISTANCE) {
          if (values[0] !== minVal) {
            setValues([maxVal - MIN_DISTANCE, maxVal])
          } else {
            setValues([minVal, minVal + MIN_DISTANCE])
          }
        } else {
          setValues(newValues as [number, number])
        }
      }}
      renderTrack={({ props, children }) => (
        <div
          {...props}
          className="w-[92%] h-[8px] bg-gray-300 rounded-[4px]"
          style={{ ...props.style }}
        >
          <div
            className="h-full bg-[#31C29F] rounded-[4px]"
            style={{
              width: `${((values[1] - values[0]) / (max - min)) * 100}%`,
              marginLeft: `${((values[0] - min) / (max - min)) * 100}%`,
            }}
          />
          {children}
        </div>
      )}
      renderThumb={({ props }) => (
        <div
          {...props}
          className="absolute w-[35px] h-[35px] top-0 bg-[#31C29F] rounded-full border-2 border-white"
        />
      )}
    />
  )
}

export default SliderRange
