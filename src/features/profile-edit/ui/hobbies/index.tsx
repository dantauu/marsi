import Button from "@/shared/ui/buttons/button.tsx"
import SvgPlus from "@/assets/icons/Plus.tsx"
import { cn } from "@/lib/utils/cn.tsx"
import SvgCrossOrigin from "@/assets/icons/CrossOrigin.tsx"

export const AddHobbies = ({
  className,
  onClick,
  onRemove,
  text,
}: {
  className?: string
  onClick: () => void
  text: string[]
  onRemove: (v: string) => void
}) => {
  const isValue = text.length === 3
  return (
    <div
      onClick={onClick}
      className={cn(
        "flex flex-col justify-center gap-4 py-[6px] px-[4px] w-full shadow-shadow-block" +
          " rounded-[18px]",
        className
      )}
    >
      <div>
        <p className="text-xl font-HelveticaB">Увлечения</p>
        <div className="flex flex-wrap gap-3">
          {text.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-center px-1 rounded-[10px] shadow-shadow-block w-fit"
            >
              <p className="text-[17px]">{item}</p>
              <Button
                type="button"
                onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                  e.stopPropagation()
                  onRemove(item)
                }}
                variant="default"
              >
                <SvgCrossOrigin />
              </Button>
            </div>
          ))}
        </div>
        {!isValue && (
          <Button
            type="button"
            className={`w-full h-[50px] text-lg bg-black text-white font-HelveticaB rounded-[10px] ${text.length >= 1 && "mt-4"}`}
            variant={"default"}
          >
            Добавить <SvgPlus className="w-[30px] h-[30px]" />
          </Button>
        )}
      </div>
    </div>
  )
}
