import Button from "@/shared/ui/buttons/button.tsx"
import { useNavigate } from "@tanstack/react-router"
import SvgHeart from "@/assets/icons/Heart.tsx"
import SvgLongArrow from "@/assets/icons/LongArrow.tsx"

type LikeBlockProps = {
  title: string
  path: string
  rotate: boolean
}

export const LikeBlock = ({ title, path, rotate }: LikeBlockProps) => {
  const navigate = useNavigate()
  return (
    <div className="bg-[#66CEB5] h-[120px] rounded-[15px] px-4">
      <p className="text-center text-[19px] text-white">{title}</p>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {rotate ? (
            <div className="flex items-center ml-[12px]">
              <SvgLongArrow className="w-[80px] h-[50px] rotate-180" />
              <SvgHeart className="w-[90px] h-[90px] rotate-25 text-main-red" />
            </div>
          ) : (
            <div className="flex items-center">
              <SvgHeart className="w-[90px] h-[90px] rotate-25 text-main-red" />
              <SvgLongArrow className="w-[80px] h-[50px]" />
            </div>
          )}
        </div>
        <Button
          className="p-1 px-5 rounded-[10px] bg-white shadow-shadow-block"
          onClick={() => navigate({ to: path })}
          variant={"default"}
        >
          Перейти
        </Button>
      </div>
    </div>
  )
}
