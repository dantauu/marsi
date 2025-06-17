import Button from "@/shared/ui/buttons/button.tsx"
import SvgPlus from "@/assets/icons/Plus.tsx"
import { cn } from "@/lib/utils.tsx"

export const Hobbies = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        "flex flex-col justify-center gap-4 py-[6px] px-[4px] w-full shadow-shadow-block" +
          " rounded-[18px]",
        className
      )}
    >
      <div>
        <p className="text-xl font-HelveticaB">Увлечения</p>
        <Button
          className="w-full h-[50px] text-lg bg-black text-white font-HelveticaB rounded-[10px]"
          variant={"default"}
        >
          Добавить <SvgPlus className="w-[30px] h-[30px]" />
        </Button>
      </div>
    </div>
  )
}
