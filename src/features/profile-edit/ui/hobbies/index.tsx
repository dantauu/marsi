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
  const isValue = text?.length === 3
  return (
    <div
      onClick={onClick}
      className={cn(
        "flex flex-col justify-center gap-4 py-[6px] px-[4px] w-full shadow-easy bg-[var(--color-bg-muted-white)]" +
          " rounded-[18px]",
        className
      )}
    >
      <div>
        <p className="font-HelveticaB text-[18px] mini-mobile:text-[20px] text-[var(--color-text-black)]">
          Увлечения
        </p>
        <div className="flex flex-wrap gap-3">
          {text?.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-center px-1 rounded-[10px] shadow-hard w-fit"
            >
              <p className="text-[17px] text-[var(--color-text-black)]">
                {item}
              </p>
              <Button
                type="button"
                onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                  e.stopPropagation()
                  onRemove(item)
                }}
                variant="default"
              >
                <SvgCrossOrigin className="text-[var(--color-text-black)]" />
              </Button>
            </div>
          ))}
        </div>
        {!isValue && (
          <Button
            type="button"
            className={`w-full h-[50px] text-[16px] mini-mobile:text-[18px] bg-black text-[var(--color-text-white)] font-HelveticaB rounded-[10px] ${text.length >= 1 && "mt-4"}`}
            variant={"default"}
          >
            Добавить{" "}
            <SvgPlus className="w-[25px] h-[25px] mini-mobile:w-[30px] mini-mobile:h-[30px] stroke-3" />
          </Button>
        )}
      </div>
    </div>
  )
}
