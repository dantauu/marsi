import { useState } from "react"
import type { Goals } from "@/app/types/global.ts"
import goalData from "@/lib/data/user-goal.tsx"

export const EditGoal = ({
  value,
  onChange,
}: {
  value: string | string[] | number | undefined | null
  onChange: (v: string) => void
}) => {
  const [isActive, setIsActive] = useState(
    typeof value === "string" ? value : ""
  )
  const handleClick = (goal: Goals) => {
    onChange(goal.title)
    setIsActive(goal.title)
  }
  return (
    <div className="flex flex-col py-2 gap-5 bg-[#0001] rounded-[5px]">
      {goalData.map((item) => (
        <div
          key={item.id}
          onClick={() => handleClick(item)}
          className={`flex h-[80px] rounded-[10px] bg-[var(--color-bg-muted-white)] ${isActive === item.title && "border-2"}`}
        >
          <div className="flex gap-2 items-center text-[var(--color-icons-black)] pl-2">
            {item.icon}
            <div className="flex flex-col gap-1 text-[var(--color-text-black)]">
              <p className="font-HelveticaB">{item.title}</p>
              <p className="text-[15px]">{item.description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
