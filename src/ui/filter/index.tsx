import SliderRange from "@/ui/filter/slider-range.tsx"

type FilterSlideProps = {
  title: string
  values: [number, number]
  min: number
  max: number
  setValues: (values: [number, number]) => void
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
        <p className="font-HelveticaB text-[20px] text-[var(--color-text-black)]">
          {title}
        </p>
        <div className="flex justify-center gap-2 w-[110px] h-[30px] bg-[var(--color-bg-drag-field)] rounded-[7px]">
          <span className="font-HelveticaB text-[var(--color-text-white)] text-[20px]">
            {values[0]}
          </span>
          <span className="font-HelveticaB text-[var(--color-text-white)] text-[20px]">
            {" "}
            -{" "}
          </span>
          <span className="font-HelveticaB text-[var(--color-text-white)] text-[20px]">
            {values[1]}
          </span>
        </div>
      </div>
      <SliderRange values={values} min={min} max={max} setValues={setValues} />
    </div>
  )
}
