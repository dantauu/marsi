import SvgArrow from "../../assets/icons/Arrow"
import SvgLocation from "../../assets/icons/Location"
import { SliderRange } from "../../features/search/ui/slider-range"

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

const Location = () => {
  return (
    <div className="flex flex-col gap-2">
      <div className="">
        <p className="font-HelveticaB text-[20px]">Местоположение</p>
      </div>
      <div className="h-[60px] flex justify-between items-center px-2 rounded-[10px] bg-black">
        <SvgLocation />
        <div className="flex items-center gap-2">
          <p className="text-white font-ManropeM text-[18px]">
            Москва, Московская область
          </p>
          <SvgArrow className="text-white w-[20px] h-[20px]" />
        </div>
      </div>
    </div>
  )
}

export { FilterSlide, Location }
