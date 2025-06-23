import doubler from "@/assets/images/double.svg"
import Button from "@/shared/ui/buttons/button.tsx"
import { cn } from "@/lib/utils.tsx"
import SvgCheckSvg from "@/assets/icons/CheckSvg.tsx"

export const Purchase = () => {
  return (
    <div className="relative flex flex-col items-center">
      <div>
        <img src={doubler} />
      </div>
      <Button
        variant="green"
        className="w-[210px] h-[60px] text-xl absolute bottom-[45px] -translate-x-1/2 bg-blur-green"
      >
        Приобрести
      </Button>
    </div>
  )
}

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

export const PremiumText = () => {
  return (
    <div className="w-full h-[70px] flex justify-center items-center bg-gradient-bg rounded-[10px]">
      <p className="text-[20px]">
        Больше возможностей с{" "}
        <span className="text-gradient-text font-HelveticaB">
          Marsi Premium
        </span>
      </p>
    </div>
  )
}
