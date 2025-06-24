import SvgCheckSvg from "@/assets/icons/CheckSvg.tsx"
import { cn } from "@/lib/utils.tsx"

const listPossibilities = [
  { id: 1, text: "Возможность сразу написать" },
  { id: 2, text: "Просмотр лайков без взаимности" },
  { id: 3, text: "Расширенные фильтры" },
]

export const Possibilities = ({ className }: { className?: string }) => {
  return (
    <div className={cn("flex flex-col gap-3", className)}>
      {listPossibilities.map((item) => (
        <div key={item.id} className="flex items-center gap-2">
          <SvgCheckSvg />
          <div className="px-1.5 shadow-shadow-block rounded-[5px]">
            <p className="text-[19px]">{item.text}</p>
          </div>
        </div>
      ))}
    </div>
  )
}