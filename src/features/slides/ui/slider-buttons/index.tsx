import SvgCheck from "@/assets/icons/Check"
import SvgCross from "@/assets/icons/Cross"
import { useAppDispatch } from "@/redux/hooks"
import { handleDislike, handleLike } from "@/redux/slices/slider-slice.ts"
import Button from "@/shared/ui/buttons/button.tsx"

export const SliderButtons = () => {
  const dispatch = useAppDispatch()
  return (
    <div className="flex items-center justify-between gap-5">
      <Button variant="default" onClick={() => dispatch(handleDislike())}>
        <SvgCross className="w-[82px] h-[82px] text-main-red" />
      </Button>
      <Button variant="default" onClick={() => dispatch(handleLike())}>
        <SvgCheck className="w-[82px] h-[82px] text-main-green" />
      </Button>
    </div>
  )
}
