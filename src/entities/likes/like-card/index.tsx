import { MockCardData } from "@/lib/data/cards.ts"
import Button from "@/shared/ui/buttons/button.tsx"
import SvgArrow from "@/assets/icons/Arrow.tsx"

export const LikeCard = ({ isLocked = false }: { isLocked?: boolean }) => {
  return (
    <div className="flex flex-col gap-7">
      {MockCardData.map((item) => (
        <div className="relative flex justify-between items-center rounded-[10px] shadow-shadow-block px-0.5 py-1.5">
          {isLocked && (
            <div className="absolute inset-0 rounded-[10px] bg-[rgba(255,255,255,0.6)] backdrop-blur-sm flex items-center justify-center">
              <Button variant="green" className="px-3 py-2">
                Приобрести подписку <SvgArrow />{" "}
              </Button>
            </div>
          )}
          <div className="flex items-center gap-1">
            <img
              className="min-w-[80px] h-[80px] object-cover rounded-full"
              src={item.avatar}
            />
            <p className="text-lg text-ellipsis overflow-hidden whitespace-nowrap max-w-[83px]">
              {item.name}, {item.age}
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="red" className="w-[100px] h-[35px]">
              Удалить
            </Button>
            <Button variant="green" className="w-[100px] h-[35px]">
              Написать
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}
