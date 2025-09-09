import hobbiesData from "@/lib/data/hobbies.ts"
import type { Hobbies } from "@/app/types/global.d.ts"

export const EditHobbies = ({
  value,
  onChange,
}: {
  value: string[] | undefined
  onChange: (v: string[]) => void
}) => {
  if (!value) return
  const handleClick = (hobby: Hobbies) => {
    const exists = value.includes(hobby.title)
    if (!exists && value.length >= 3) return
    const newValue = exists
      ? value.filter((t) => t !== hobby.title)
      : [...value, hobby.title]
    onChange(newValue)
  }
  return (
    <div className="grid grid-cols-2 gap-2 bg-[#0001] rounded-[5px] py-2 px-1">
      {hobbiesData.map((item) => (
        <div
          key={item.id}
          onClick={() => handleClick(item)}
          className={`flex items-center h-[40px] gap-0.5 px-2 rounded-[10px] bg-white ${value.includes(item.title) && "border-2"}`}
        >
          <div>{item.icon}</div>
          <div className="text-[14px]">{item.title}</div>
        </div>
      ))}
      <p>Выбрано: {value.length} из 3</p>
    </div>
  )
}
